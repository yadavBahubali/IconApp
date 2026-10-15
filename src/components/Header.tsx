import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  History,
  Settings,
  Info,
  ExternalLink,
  Check,
  Cpu,
  Key,
  ShieldCheck,
  Trash2,
  Lock,
} from 'lucide-react';
import { IconConfig } from '../types/icon';

interface HeaderProps {
  historyCount: number;
  onOpenHistory: () => void;
  config: IconConfig;
  onChangeConfig: (newConfig: Partial<IconConfig>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  historyCount,
  onOpenHistory,
  config,
  onChangeConfig,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [tempGeminiKey, setTempGeminiKey] = useState(config.geminiApiKey || '');
  const [tempOpenAiKey, setTempOpenAiKey] = useState(config.openaiApiKey || '');

  const hasActiveSessionKey = Boolean(config.geminiApiKey || config.openaiApiKey);

  const handleApplyKeys = () => {
    onChangeConfig({
      geminiApiKey: tempGeminiKey.trim(),
      openaiApiKey: tempOpenAiKey.trim(),
    });
    setShowSettings(false);
  };

  const handleClearKeys = () => {
    setTempGeminiKey('');
    setTempOpenAiKey('');
    onChangeConfig({
      geminiApiKey: '',
      openaiApiKey: '',
    });
    setShowSettings(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">
                App Icon Studio
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                AI + Vector
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Preset-driven Icon Builder & Multi-Platform Asset Pack Exporter
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Temporary Session API Key Button */}
          <button
            onClick={() => {
              setTempGeminiKey(config.geminiApiKey || '');
              setTempOpenAiKey(config.openaiApiKey || '');
              setShowSettings(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
              hasActiveSessionKey
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
                : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-300'
            }`}
            title="Configure temporary in-memory API key (auto-erased on close)"
          >
            <Key className={`w-3.5 h-3.5 ${hasActiveSessionKey ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="hidden sm:inline">API Key:</span>
            <span className="font-semibold text-white">
              {hasActiveSessionKey ? 'Session Active' : 'Configure'}
            </span>
            {hasActiveSessionKey && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {/* Architecture Info */}
          <button
            onClick={() => setShowInfo(true)}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
            title="View Icon Architecture Blueprint"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* History Drawer Trigger */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-orange-500 text-white">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* API Key & Engine Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 flex items-start sm:items-center justify-center animate-fade-in">
          <div className="relative w-full max-w-lg my-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[90vh] overflow-hidden">
            {/* Modal Header - Always Visible */}
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/90">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white">Temporary Session API Key</h3>
                  <span className="text-[10px] sm:text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3 shrink-0" /> Auto-removed on app / tab close (zero disk storage)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white text-sm p-1.5 rounded-lg hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body - Scrollable if screen is short */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
              {/* Privacy Guarantee Box */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero Permanent Storage Guarantee</span>
                </div>
                <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                  Your keys remain strictly in volatile RAM memory while this browser tab is running. As soon as you close or reload the app, they are completely wiped. They are never written to localStorage, cookies, or saved on any server disk.
                </p>
              </div>

              {/* Engine Selector */}
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Active Image Generation Engine:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChangeConfig({ engine: 'gemini' })}
                    className={`p-3 rounded-xl border text-left transition ${
                      config.engine === 'gemini'
                        ? 'border-orange-500 bg-orange-500/10 text-white ring-1 ring-orange-500/50'
                        : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-semibold">Gemini 3.1</span>
                      {config.engine === 'gemini' && <Check className="w-4 h-4 text-orange-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      Google Studio Image Model (Fast 1:1 Icon Synthesizer)
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeConfig({ engine: 'dall-e-3' })}
                    className={`p-3 rounded-xl border text-left transition ${
                      config.engine === 'dall-e-3'
                        ? 'border-orange-500 bg-orange-500/10 text-white ring-1 ring-orange-500/50'
                        : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-semibold">OpenAI DALL·E 3</span>
                      {config.engine === 'dall-e-3' && <Check className="w-4 h-4 text-orange-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      OpenAI 1024×1024 Icon API (requires OpenAI Key)
                    </p>
                  </button>
                </div>
              </div>

              {/* Gemini Session Key Input */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Gemini API Key (Session Only)</span>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-orange-400 hover:underline flex items-center gap-0.5"
                  >
                    Get Gemini Key <ExternalLink className="w-3 h-3" />
                  </a>
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy... (leave blank to use default studio key)"
                  value={tempGeminiKey}
                  onChange={(e) => setTempGeminiKey(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <p className="text-[10px] text-slate-500">
                  Optional: If blank, uses your environment GEMINI_API_KEY.
                </p>
              </div>

              {/* OpenAI Session Key Input */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>OpenAI API Key (Session Only, for DALL·E 3)</span>
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-orange-400 hover:underline flex items-center gap-0.5"
                  >
                    Get OpenAI Key <ExternalLink className="w-3 h-3" />
                  </a>
                </label>
                <input
                  type="password"
                  placeholder="sk-..."
                  value={tempOpenAiKey}
                  onChange={(e) => setTempOpenAiKey(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <p className="text-[10px] text-slate-500">
                  Held in temporary RAM only; wiped immediately when you exit.
                </p>
              </div>
            </div>

            {/* Modal Footer - Always Visible */}
            <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={handleClearKeys}
                className="px-3 py-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear & Erase Now</span>
                <span className="sm:hidden">Clear</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyKeys}
                  className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg shadow-md transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply for Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Architecture Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 flex items-start sm:items-center justify-center animate-fade-in">
          <div className="relative w-full max-w-2xl my-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[85vh] overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/90">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  Icon Generator Blueprint Architecture
                </h3>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-slate-400 hover:text-white text-sm p-1.5 rounded-lg hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-3.5 text-xs text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h4 className="font-semibold text-orange-400 mb-1">
                  1. The User Interface (The "Ask")
                </h4>
                <p>
                  Zero guesswork for users: structured Presets for Category Selection (Finance, Game, Health, Food & Drink, Social), Style Selection (Flat, 3D, Skeuomorphic, Line Art), and Primary/Secondary Color Harmonization.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h4 className="font-semibold text-orange-400 mb-1">
                  2. The Logic (The "Prompt Builder")
                </h4>
                <p>
                  Synthesizes your preset choices into a calibrated "Secret Prompt" containing lighting directives, strict negative constraints (no text, no words, no watermark), and Apple HIG / Google Play framing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h4 className="font-semibold text-orange-400 mb-1">
                  3. Multi-Platform Output & Auto-Resizing
                </h4>
                <p>
                  Generates full master assets and downsamples with bicubic smoothing into complete platform packages: iOS (@1x, @2x, @3x + Xcode Contents.json), Android (mipmap densities), Web (favicons + webmanifest), and Windows.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <h4 className="font-semibold text-orange-400 mb-1">
                  4. Vectorization (SVG Output)
                </h4>
                <p>
                  Runs pixel-to-vector color quantization and path contour extraction to deliver real resolution-independent <code className="text-orange-300 font-mono">.SVG</code> vector files.
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950/90 flex justify-end shrink-0">
              <button
                onClick={() => setShowInfo(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
