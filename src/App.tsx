/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryPicker } from './components/CategoryPicker';
import { StyleSelector } from './components/StyleSelector';
import { ColorPicker } from './components/ColorPicker';
import { PromptInspector } from './components/PromptInspector';
import { IconPreview } from './components/IconPreview';
import { MockupShowcase } from './components/MockupShowcase';
import { ExportModal } from './components/ExportModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { GeneratedIcon, IconConfig, PlatformMask } from './types/icon';
import { buildSecretPrompt } from './utils/promptBuilder';
import { DEFAULT_SAMPLE_ICONS } from './utils/sampleIcons';
import { vectorizeImage } from './utils/vectorizer';
import { generateIconPackZip, triggerFileDownload } from './utils/zipExporter';
import { loadImage } from './utils/imageResizer';

const LOCAL_STORAGE_KEY = 'app_icon_studio_history_v1';

export default function App() {
  // Preset configuration state
  const [config, setConfig] = useState<IconConfig>({
    category: 'food',
    customSubject: 'Coffee Cup with steam',
    style: '3d',
    primaryColor: '#F97316',
    secondaryColor: '#FBBF24',
    bgStyle: 'white',
    platformMask: 'ios',
    customDirectives: '',
    engine: 'gemini',
    openaiApiKey: '',
  });

  // Active icon state (initialized with first sample)
  const [activeIcon, setActiveIcon] = useState<GeneratedIcon | null>(
    DEFAULT_SAMPLE_ICONS[0]
  );

  // History state
  const [history, setHistory] = useState<GeneratedIcon[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load history from localStorage', e);
    }
    return DEFAULT_SAMPLE_ICONS;
  });

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string | undefined>(undefined);
  const [isVectorizing, setIsVectorizing] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  const [zipProgress, setZipProgress] = useState<{
    percent: number;
    task: string;
  } | null>(null);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('LocalStorage save failed (possible quota)', e);
    }
  }, [history]);

  // Update config helper
  const handleUpdateConfig = (newConfig: Partial<IconConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  // Convert current active icon to SVG vector
  const handleVectorize = async (imgUrl: string): Promise<string> => {
    try {
      setIsVectorizing(true);
      const img = await loadImage(imgUrl);
      const svg = await vectorizeImage(img, { colorCount: 16, resolution: 128 });
      setSvgContent(svg);
      return svg;
    } catch (err) {
      console.error('Vectorization error:', err);
      return '';
    } finally {
      setIsVectorizing(false);
    }
  };

  // Generate icon handler
  const handleGenerate = async () => {
    setGenerationError(null);
    setIsGenerating(true);

    const secretPrompt = buildSecretPrompt(config);
    const appName = config.customSubject
      ? config.customSubject.split(' ')[0]
      : 'AppIcon';

    try {
      const response = await fetch('/api/generate-icon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: secretPrompt,
          engine: config.engine,
          openaiApiKey: config.openaiApiKey,
          geminiApiKey: config.geminiApiKey,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.imageUrl) {
        throw new Error(data.error || 'Failed to synthesize icon with AI model.');
      }

      // Sanitize config before adding to history (never store keys in history / localStorage)
      const sanitizedConfig = {
        ...config,
        geminiApiKey: undefined,
        openaiApiKey: undefined,
      };

      const newIcon: GeneratedIcon = {
        id: `icon-${Date.now()}`,
        createdAt: Date.now(),
        name: `${appName} ${config.style.toUpperCase()}`,
        prompt: secretPrompt,
        imageUrl: data.imageUrl,
        config: sanitizedConfig,
      };

      setActiveIcon(newIcon);
      setHistory((prev) => [newIcon, ...prev]);

      // Pre-vectorize in the background
      handleVectorize(data.imageUrl);
    } catch (err: any) {
      console.error('Generation Error:', err);
      const errorMessage =
        err?.message ||
        'Network error or model unavailable. Please check your network or API keys.';
      setGenerationError(errorMessage);

      // Create a smart fallback canvas icon so user can still preview, resize, and test all outputs
      createProceduralFallbackIcon(secretPrompt, appName);
    } finally {
      setIsGenerating(false);
    }
  };

  // Procedural canvas fallback icon generator (guarantees the user is never stuck)
  const createProceduralFallbackIcon = (prompt: string, appName: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, config.primaryColor);
    grad.addColorStop(1, config.secondaryColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Inner frosted circle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(512, 512, 340, 0, Math.PI * 2);
    ctx.fill();

    // Central graphic motif
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(512, 440, 140, 0, Math.PI * 2);
    ctx.fill();

    // Stylized emblem base
    ctx.beginPath();
    ctx.roundRect(332, 600, 360, 140, 36);
    ctx.fill();

    const dataUrl = canvas.toDataURL('image/png');

    const sanitizedConfig = {
      ...config,
      geminiApiKey: undefined,
      openaiApiKey: undefined,
    };

    const fallbackIcon: GeneratedIcon = {
      id: `fallback-${Date.now()}`,
      createdAt: Date.now(),
      name: `${appName} (Design Preview)`,
      prompt: prompt,
      imageUrl: dataUrl,
      config: sanitizedConfig,
    };

    setActiveIcon(fallbackIcon);
    setHistory((prev) => [fallbackIcon, ...prev]);
    handleVectorize(dataUrl);
  };

  // Download complete multi-platform PNG Pack (.ZIP)
  const handleDownloadZip = async () => {
    if (!activeIcon) return;
    try {
      const appName = config.customSubject
        ? config.customSubject.replace(/[^a-zA-Z0-9]/g, '')
        : 'AppIcon';

      let currentSvg = svgContent;
      if (!currentSvg) {
        currentSvg = await handleVectorize(activeIcon.imageUrl);
      }

      setZipProgress({ percent: 10, task: 'Starting pack generator...' });

      const zipBlob = await generateIconPackZip(
        activeIcon.imageUrl,
        appName,
        config.platformMask,
        currentSvg,
        (percent, task) => {
          setZipProgress({ percent, task });
        }
      );

      triggerFileDownload(zipBlob, `${appName}-icon-pack.zip`);
    } catch (err) {
      console.error('Failed to generate ZIP archive', err);
    } finally {
      setZipProgress(null);
    }
  };

  // Download direct SVG file
  const handleDownloadSvg = async () => {
    if (!activeIcon) return;
    try {
      let currentSvg = svgContent;
      if (!currentSvg) {
        currentSvg = await handleVectorize(activeIcon.imageUrl);
      }
      if (!currentSvg) return;

      const blob = new Blob([currentSvg], { type: 'image/svg+xml;charset=utf-8' });
      const appName = config.customSubject
        ? config.customSubject.replace(/[^a-zA-Z0-9]/g, '')
        : 'app-icon';
      triggerFileDownload(blob, `${appName}-vector.svg`);
    } catch (err) {
      console.error('Failed to download SVG', err);
    }
  };

  // Delete from history
  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear history
  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-white">
      {/* App Navigation Header */}
      <Header
        historyCount={history.length}
        onOpenHistory={() => setShowHistoryDrawer(true)}
        config={config}
        onChangeConfig={handleUpdateConfig}
      />

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Blueprint Banner */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-orange-950/40 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
              <span>Blueprint Architecture</span>
              <span className="text-slate-500">•</span>
              <span>No Writing Descriptions Needed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI App Icon Generator & Asset Studio
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Pick your presets, let our Secret Prompt Builder synthesize studio-grade aesthetics, and export production-ready PNG packs for iOS, Android, Windows, and scalable SVGs.
            </p>
          </div>

          {/* Decorative glowing gradient orbs */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
          <div className="absolute right-40 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* 2-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The Ask & The Logic (Steps 1, 2, 3, Secret Prompt) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Category & Subject */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-md">
              <CategoryPicker
                config={config}
                onChangeConfig={handleUpdateConfig}
              />
            </div>

            {/* Step 2: Style Selection */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-md">
              <StyleSelector
                config={config}
                onChangeConfig={handleUpdateConfig}
              />
            </div>

            {/* Step 3: Colors & Platform Mask */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-md">
              <ColorPicker
                config={config}
                onChangeConfig={handleUpdateConfig}
              />
            </div>

            {/* The Logic: Prompt Inspector */}
            <PromptInspector
              config={config}
              onChangeConfig={handleUpdateConfig}
            />
          </div>

          {/* Right Column: Preview, Actions & Mockups */}
          <div className="lg:col-span-5 space-y-6 sticky top-20">
            {/* Master Studio Preview & Output Buttons */}
            <IconPreview
              activeIcon={activeIcon}
              config={config}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              onOpenExportModal={() => setShowExportModal(true)}
              onDownloadZip={handleDownloadZip}
              onDownloadSvg={handleDownloadSvg}
              isVectorizing={isVectorizing}
              generationError={generationError}
              onChangeMask={(mask) => handleUpdateConfig({ platformMask: mask })}
            />

            {/* Live Interactive Mockups */}
            <MockupShowcase
              activeIcon={activeIcon}
              config={config}
            />
          </div>
        </div>
      </main>

      {/* Export Asset Modal */}
      <ExportModal
        activeIcon={activeIcon}
        mask={config.platformMask}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onDownloadZip={handleDownloadZip}
        onDownloadSvg={handleDownloadSvg}
        svgContent={svgContent}
        isVectorizing={isVectorizing}
        zipProgress={zipProgress}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={showHistoryDrawer}
        onClose={() => setShowHistoryDrawer(false)}
        history={history}
        onSelectIcon={(icon) => {
          setActiveIcon(icon);
          setConfig((prev) => ({
            ...icon.config,
            geminiApiKey: prev.geminiApiKey,
            openaiApiKey: prev.openaiApiKey,
          }));
          handleVectorize(icon.imageUrl);
        }}
        onDeleteIcon={handleDeleteHistory}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 App Icon Studio. Built for iOS, Android, Windows & Web.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Xcode Asset Catalogs</span>
            <span>•</span>
            <span>Android Mipmaps</span>
            <span>•</span>
            <span>PWA Manifest</span>
            <span>•</span>
            <span>Vector SVG</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
