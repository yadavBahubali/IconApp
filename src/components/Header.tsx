import React from 'react';
import {
  Layers,
  History,
  Info,
  Cpu,
  Key,
} from 'lucide-react';
import { IconConfig } from '../types/icon';

interface HeaderProps {
  historyCount: number;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenInfo: () => void;
  config: IconConfig;
}

export const Header: React.FC<HeaderProps> = ({
  historyCount,
  onOpenHistory,
  onOpenSettings,
  onOpenInfo,
  config,
}) => {
  const hasActiveSessionKey = Boolean(
    config.geminiApiKey || config.openaiApiKey || config.azureFoundryApiKey
  );

  const getEngineDisplayLabel = () => {
    if (config.engine === 'microsoft-foundry') return 'MS Foundry';
    if (config.engine === 'dall-e-3') return 'DALL·E 3';
    return 'Gemini 3.1';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-bold text-sm sm:text-lg tracking-tight text-white whitespace-nowrap">
                App Icon Studio
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 hidden xs:inline-block">
                AI + Vector
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/80 whitespace-nowrap">
                by <strong className="text-orange-300 font-semibold">Kuldeep Yadav</strong>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block truncate">
              Preset-driven Icon Builder & Multi-Platform Asset Pack Exporter
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Active Engine / Settings Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 transition"
            title="Configure AI Engine & API Keys"
          >
            <Cpu className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="hidden lg:inline text-slate-400">Engine:</span>
            <span className="font-semibold text-white">
              {getEngineDisplayLabel()}
            </span>
          </button>

          {/* Temporary Session API Key Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
              hasActiveSessionKey
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
            title="Configure temporary in-memory API key (auto-erased on exit)"
          >
            <Key
              className={`w-3.5 h-3.5 shrink-0 ${
                hasActiveSessionKey ? 'text-emerald-400' : 'text-amber-400'
              }`}
            />
            <span className="hidden sm:inline">
              {hasActiveSessionKey ? 'Key: Active' : 'API Key'}
            </span>
            <span className="sm:hidden font-semibold">
              {hasActiveSessionKey ? 'Active' : 'Key'}
            </span>
            {hasActiveSessionKey && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {/* Architecture Info Button */}
          <button
            type="button"
            onClick={onOpenInfo}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition"
            title="View Icon Architecture Blueprint"
          >
            <Info className="w-4 h-4 text-slate-300" />
          </button>

          {/* History Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition"
            title="View previously generated icons"
          >
            <History className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-orange-500 text-white">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
