import React, { useState } from 'react';
import { Terminal, Copy, Check, Eye, EyeOff, Sparkles, SlidersHorizontal } from 'lucide-react';
import { IconConfig } from '../types/icon';
import { buildSecretPrompt, STYLES, CATEGORIES } from '../utils/promptBuilder';

interface PromptInspectorProps {
  config: IconConfig;
  onChangeConfig: (newConfig: Partial<IconConfig>) => void;
}

export const PromptInspector: React.FC<PromptInspectorProps> = ({ config, onChangeConfig }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const secretPrompt = buildSecretPrompt(config);
  const selectedStyle = STYLES.find((s) => s.id === config.style) || STYLES[1];
  const selectedCategory = CATEGORIES.find((c) => c.id === config.category) || CATEGORIES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(secretPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
      {/* Header and Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                The Prompt Builder
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono border border-slate-700">
                Secret Prompt Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Translates UI selections into high-fidelity AI diffusion parameters
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            title={isExpanded ? 'Collapse prompt details' : 'Expand prompt details'}
          >
            {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Secret Prompt Box */}
      <div className="relative rounded-xl bg-slate-950 border border-slate-800/90 p-3 font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto">
        <div className="flex items-start gap-2">
          <span className="text-orange-400 select-none font-bold">»</span>
          <p className="flex-1 selection:bg-orange-500/30">
            {secretPrompt}
          </p>
        </div>
      </div>

      {/* Detailed Formula Breakdown when expanded */}
      {isExpanded && (
        <div className="pt-2 border-t border-slate-800/80 space-y-3 text-xs animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-[11px]">
              <span className="text-slate-400 block font-semibold mb-0.5">Motif & Category</span>
              <span className="text-orange-300 font-medium">
                {config.customSubject || selectedCategory.popularSubjects[0]} ({selectedCategory.name})
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-[11px]">
              <span className="text-slate-400 block font-semibold mb-0.5">Aesthetic Blueprint</span>
              <span className="text-orange-300 font-medium">
                {selectedStyle.name} ({selectedStyle.badge})
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-[11px]">
              <span className="text-slate-400 block font-semibold mb-0.5">Color Tokens</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: config.primaryColor }} />
                <span className="text-white font-mono">{config.primaryColor}</span>
                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: config.secondaryColor }} />
                <span className="text-white font-mono">{config.secondaryColor}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-[11px]">
              <span className="text-slate-400 block font-semibold mb-0.5">Negative Constraints</span>
              <span className="text-emerald-400 font-medium">
                no text, no typography, no watermarks, isolated
              </span>
            </div>
          </div>

          {/* Optional Directives Fine-tuner */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400" />
              <span>Optional Fine-Tune Directives (e.g. "subtle frosted glass", "gold foil rim"):</span>
            </label>
            <input
              type="text"
              value={config.customDirectives}
              onChange={(e) => onChangeConfig({ customDirectives: e.target.value })}
              placeholder="e.g. warm studio rim lights, metallic sheen, isometric 45 degree angle"
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
