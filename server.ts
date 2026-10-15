import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '50mb' }));

// Shared Gemini client utility
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Generate icon API endpoint
app.post('/api/generate-icon', async (req, res) => {
  try {
    const {
      prompt,
      engine = 'gemini', // 'gemini' | 'dall-e-3'
      openaiApiKey = '',
      geminiApiKey = '',
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'A prompt string is required' });
      return;
    }

    // 1. OpenAI DALL-E 3 Flow (if requested or user key provided)
    if (engine === 'dall-e-3' || openaiApiKey) {
      const keyToUse = openaiApiKey || process.env.OPENAI_API_KEY;
      if (!keyToUse) {
        res.status(400).json({
          error: 'OpenAI API key not configured. Please provide an in-memory session OpenAI key or use the built-in Gemini image engine.',
        });
        return;
      }

      const openAiRes = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${keyToUse}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'b64_json',
        }),
      });

      if (!openAiRes.ok) {
        const errData = await openAiRes.json().catch(() => ({}));
        res.status(openAiRes.status).json({
          error: errData?.error?.message || `OpenAI API returned status ${openAiRes.status}`,
        });
        return;
      }

      const data = await openAiRes.json();
      const b64 = data.data?.[0]?.b64_json;
      if (b64) {
        res.json({
          success: true,
          imageUrl: `data:image/png;base64,${b64}`,
          engine: 'dall-e-3',
          promptUsed: prompt,
        });
        return;
      }
    }

    // 2. Google Gemini Image Generation Flow
    const activeGeminiKey = geminiApiKey || process.env.GEMINI_API_KEY;
    if (!activeGeminiKey) {
      res.status(400).json({
        error: 'Gemini API Key not found. Please enter your temporary API key in the session settings (auto-removed on tab close).',
      });
      return;
    }

    // Create client for this request (uses user session key or default)
    const clientToUse = new GoogleGenAI({
      apiKey: activeGeminiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    // Generate image using Gemini image generation model
    try {
      const response = await clientToUse.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          const imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
          res.json({
            success: true,
            imageUrl: imageUrl,
            engine: 'gemini-3.1-flash-lite-image',
            promptUsed: prompt,
          });
          return;
        }
      }

      // If text response returned instead of image part
      const textOutput = response.text || 'No image part returned';
      res.status(502).json({
        error: `Model returned text instead of image: ${textOutput.slice(0, 200)}`,
      });
      return;
    } catch (genError: any) {
      console.error('Gemini image generation error:', genError);
      res.status(500).json({
        error: genError?.message || 'Error occurred while generating image with Gemini.',
      });
      return;
    }
  } catch (error: any) {
    console.error('API Error in /api/generate-icon:', error);
    res.status(500).json({
      error: error?.message || 'Internal server error while processing icon generation.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback handler for any client route to serve transformed index.html
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await fs.promises.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`App Icon Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
