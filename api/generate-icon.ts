import { GoogleGenAI } from '@google/genai';

interface ExtendedRequest {
  method?: string;
  body?: any;
  query?: Record<string, string | string[]>;
  headers?: Record<string, string | string[] | undefined>;
}

interface ExtendedResponse {
  statusCode: number;
  status?: (code: number) => ExtendedResponse;
  json?: (data: any) => void;
  setHeader: (name: string, value: string) => void;
  end: (chunk?: any) => void;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // Setup CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Helper function to return JSON responses reliably across Vercel and Node runtimes
  const sendJson = (code: number, data: any) => {
    const r = res as any;
    if (typeof r.status === 'function' && typeof r.json === 'function') {
      return r.status(code).json(data);
    }
    res.statusCode = code;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  // Handle preflight CORS OPTIONS request
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Handle GET health check request
  if (req.method === 'GET') {
    return sendJson(200, {
      status: 'ok',
      service: 'App Icon Studio Generator API (Vercel Serverless Function)',
      author: 'Developed by Kuldeep Yadav',
      usage: 'Send a POST request with { prompt, engine, ... } to generate icons',
      supportedEngines: ['gemini', 'microsoft-foundry', 'dall-e-3'],
    });
  }

  // Reject unsupported HTTP methods
  if (req.method !== 'POST') {
    return sendJson(405, {
      error: `Method ${req.method || 'UNKNOWN'} Not Allowed. Please send an HTTP POST request.`,
    });
  }

  try {
    // Parse body if it arrived as a raw JSON string
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return sendJson(400, { error: 'Invalid JSON request body.' });
      }
    }
    body = body || {};

    const {
      prompt,
      engine = 'gemini',
      openaiApiKey = '',
      geminiApiKey = '',
      azureFoundryApiKey = '',
      azureFoundryEndpoint = '',
      azureDeployment = 'dall-e-3',
      logoDataUrl = '',
    } = body;

    if (!prompt || typeof prompt !== 'string') {
      return sendJson(400, { error: 'A prompt string is required in the request body.' });
    }

    // 1. Microsoft AI Foundry Flow
    if (engine === 'microsoft-foundry' || azureFoundryApiKey) {
      const keyToUse =
        azureFoundryApiKey ||
        process.env.AZURE_FOUNDRY_API_KEY ||
        process.env.AZURE_OPENAI_API_KEY;
      const rawEndpoint =
        azureFoundryEndpoint ||
        process.env.AZURE_FOUNDRY_ENDPOINT ||
        process.env.AZURE_OPENAI_ENDPOINT;
      const deploymentName = azureDeployment || 'dall-e-3';

      if (!keyToUse || !rawEndpoint) {
        return sendJson(400, {
          error:
            'Microsoft AI Foundry requires both an API Key and an Endpoint URL (e.g. https://your-resource.openai.azure.com).',
        });
      }

      const cleanEndpoint = rawEndpoint.replace(/\/+$/, '');
      const requestUrl = cleanEndpoint.includes('/openai/deployments')
        ? cleanEndpoint
        : `${cleanEndpoint}/openai/deployments/${deploymentName}/images/generations?api-version=2024-02-01`;

      const foundryRes = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': keyToUse,
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          response_format: 'b64_json',
        }),
      });

      if (!foundryRes.ok) {
        const errData: any = await foundryRes.json().catch(() => ({}));
        return sendJson(foundryRes.status, {
          error:
            errData?.error?.message ||
            `Microsoft AI Foundry returned status ${foundryRes.status}. Check your Endpoint, Deployment name, and API key.`,
        });
      }

      const data: any = await foundryRes.json();
      const b64 = data.data?.[0]?.b64_json;
      const directUrl = data.data?.[0]?.url;

      if (b64) {
        return sendJson(200, {
          success: true,
          imageUrl: `data:image/png;base64,${b64}`,
          engine: 'microsoft-foundry',
          promptUsed: prompt,
        });
      } else if (directUrl) {
        return sendJson(200, {
          success: true,
          imageUrl: directUrl,
          engine: 'microsoft-foundry',
          promptUsed: prompt,
        });
      }
    }

    // 2. OpenAI DALL-E 3 Flow
    if (engine === 'dall-e-3' || openaiApiKey) {
      const keyToUse = openaiApiKey || process.env.OPENAI_API_KEY;
      if (!keyToUse) {
        return sendJson(400, {
          error:
            'OpenAI API key not configured. Please provide an in-memory session OpenAI key or select the Gemini engine.',
        });
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
        const errData: any = await openAiRes.json().catch(() => ({}));
        return sendJson(openAiRes.status, {
          error: errData?.error?.message || `OpenAI API returned status ${openAiRes.status}`,
        });
      }

      const data: any = await openAiRes.json();
      const b64 = data.data?.[0]?.b64_json;
      if (b64) {
        return sendJson(200, {
          success: true,
          imageUrl: `data:image/png;base64,${b64}`,
          engine: 'dall-e-3',
          promptUsed: prompt,
        });
      }
    }

    // 3. Google Gemini Image Generation Flow
    const activeGeminiKey = geminiApiKey || process.env.GEMINI_API_KEY;
    if (!activeGeminiKey) {
      return sendJson(400, {
        error:
          'Gemini API Key not configured. Please enter your temporary session API key in the Settings modal (gear icon at top-right) or set GEMINI_API_KEY in your Vercel project environment variables.',
      });
    }

    const clientToUse = new GoogleGenAI({
      apiKey: activeGeminiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    // Prepare content parts for Gemini (supports multimodal brand logo reference)
    const contentParts: any[] = [];
    if (logoDataUrl && typeof logoDataUrl === 'string' && logoDataUrl.startsWith('data:image/')) {
      const match = logoDataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (match) {
        contentParts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        });
      }
    }
    contentParts.push({ text: prompt });

    try {
      let response: any;
      try {
        response = await clientToUse.models.generateContent({
          model: 'gemini-3.1-flash-lite-image',
          contents: {
            parts: contentParts,
          },
          config: {
            imageConfig: {
              aspectRatio: '1:1',
            },
          },
        });
      } catch (multiModalErr) {
        // Fallback to text-only if reference image parsing fails
        if (contentParts.length > 1) {
          console.warn('Multimodal logo reference failed on Vercel, falling back to text prompt:', multiModalErr);
          response = await clientToUse.models.generateContent({
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
        } else {
          throw multiModalErr;
        }
      }

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          const imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
          return sendJson(200, {
            success: true,
            imageUrl: imageUrl,
            engine: 'gemini-3.1-flash-lite-image',
            promptUsed: prompt,
          });
        }
      }

      const textOutput = response.text || 'No image part returned';
      return sendJson(502, {
        error: `Model returned text instead of image: ${textOutput.slice(0, 200)}`,
      });
    } catch (genError: any) {
      console.error('Gemini image generation error on Vercel:', genError);
      return sendJson(500, {
        error: genError?.message || 'Error occurred while generating image with Gemini.',
      });
    }
  } catch (error: any) {
    console.error('API Error in /api/generate-icon on Vercel:', error);
    return sendJson(500, {
      error: error?.message || 'Internal server error while processing icon generation.',
    });
  }
}
