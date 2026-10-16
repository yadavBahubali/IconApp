import React, { useEffect } from 'react';
import { Sparkles, Layers, Sliders, Cpu, Download, X, Code2 } from 'lucide-react';

interface ArchitectureInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureInfoModal: React.FC<ArchitectureInfoModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl my-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Icon Generator Blueprint Architecture
              </h3>
              <span className="text-[10px] text-orange-400 font-medium">
                Developed by <strong className="text-white">Kuldeep Yadav</strong>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm p-1.5 rounded-lg hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <h4 className="font-semibold text-orange-400 mb-1 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-orange-400" />
              1. The User Interface (The "Ask")
            </h4>
            <p className="text-slate-400">
              Preset-driven controls eliminate blank-page syndrome. Users select a Category (Finance, Gaming, Health, Social, etc.), Style (Flat, 3D Isometric, Skeuomorphic, Line Art), and Primary/Secondary color harmonies.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <h4 className="font-semibold text-orange-400 mb-1 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-orange-400" />
              2. The Logic (The "Secret Prompt Builder")
            </h4>
            <p className="text-slate-400">
              Transforms simple user choices into a comprehensive studio prompt with isolated framing, app store grade lighting, clean centered geometry, and negative prompt guardrails against text, watermarks, and clutter.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <h4 className="font-semibold text-orange-400 mb-1 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-orange-400" />
              3. AI Engines & Session-Only Keys
            </h4>
            <p className="text-slate-400">
              Integrates Gemini 3.1 Flash-Lite, OpenAI DALL-E 3, and Microsoft AI Foundry. Temporary RAM storage guarantees API keys are erased as soon as the session closes.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <h4 className="font-semibold text-orange-400 mb-1 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-orange-400" />
              4. Complete Platform Downsampling (PNG Pack)
            </h4>
            <p className="text-slate-400">
              Downsamples the master 1024x1024 asset with bicubic filtering for iOS (@1x, @2x, @3x + Xcode <code className="text-orange-300 font-mono">Contents.json</code>), Android mipmap folders (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi), Web favicons, and Windows tiles.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <h4 className="font-semibold text-orange-400 mb-1 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-orange-400" />
              5. Vectorization (SVG Output)
            </h4>
            <p className="text-slate-400">
              Color quantization and contour path synthesis convert pixel bitmaps into true resolution-independent, multi-layer <code className="text-orange-300 font-mono">.SVG</code> vector files.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
