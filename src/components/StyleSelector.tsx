import React from 'react';
import { STYLES } from '../utils/promptBuilder';
import { IconConfig, StyleId } from '../types/icon';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface StyleSelectorProps {
  config: IconConfig;
  onChangeConfig: (newConfig: Partial<IconConfig>) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ config, onChangeConfig }) => {
  // The 4 core requested styles
  const coreStyles = STYLES.slice(0, 4);
  const extraStyles = STYLES.slice(4);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center border border-orange-500/30">
            2
          </span>
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            Step 2: Style Selection
          </h2>
        </div>
        <span className="text-[11px] text-slate-400">
          Core 4 Blueprint Styles + Extras
        </span>
      </div>

      {/* Primary 4 Styles Grid (Blueprint Required) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {coreStyles.map((style) => {
          const isSelected = config.style === style.id;

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onChangeConfig({ style: style.id })}
              className={`group relative p-2.5 sm:p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 overflow-hidden ${
                isSelected
                  ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/40 shadow-lg shadow-orange-500/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {/* Visual Preview Banner */}
              <div
                className={`w-full h-16 sm:h-20 rounded-xl bg-gradient-to-br ${style.previewGradient} flex items-center justify-center mb-2 sm:mb-3 relative overflow-hidden shadow-inner`}
              >
                {/* Visual Style Representation Graphic */}
                {style.id === 'flat' && (
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 rounded-md bg-amber-500 rotate-45 transform" />
                  </div>
                )}
                {style.id === '3d' && (
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-t from-blue-700 to-indigo-300 shadow-2xl flex items-center justify-center border border-white/40 transform -rotate-6">
                    <div className="w-5 h-5 rounded-full bg-white/90 shadow-inner" />
                  </div>
                )}
                {style.id === 'skeuomorphic' && (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 border-2 border-white/60 shadow-2xl flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-b from-emerald-600 to-teal-900 border border-emerald-400/80 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-300" />
                    </div>
                  </div>
                )}
                {style.id === 'line-art' && (
                  <div className="w-12 h-12 rounded-xl border-2 border-dashed border-white/90 flex items-center justify-center bg-black/20">
                    <div className="w-6 h-6 border-2 border-white rounded-md" />
                  </div>
                )}

                {/* Badge */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-semibold text-white border border-white/10">
                  {style.badge}
                </div>

                {isSelected && (
                  <div className="absolute top-2 left-2 p-1 rounded-full bg-orange-500 text-white shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition">
                    {style.name}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {style.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Extended Styles (Foldable or Pill Selector) */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          More Trending Visual Styles:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {extraStyles.map((style) => {
            const isSelected = config.style === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => onChangeConfig({ style: style.id })}
                className={`px-3 py-2 rounded-xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'border-orange-500 bg-orange-500/15 text-white font-semibold shadow-sm'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold">{style.name}</div>
                  <div className="text-[10px] text-slate-400">{style.badge}</div>
                </div>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
