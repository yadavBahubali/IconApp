import React from 'react';
import { History, Trash2, ArrowUpRight, Calendar, Sparkles, X } from 'lucide-react';
import { GeneratedIcon } from '../types/icon';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: GeneratedIcon[];
  onSelectIcon: (icon: GeneratedIcon) => void;
  onDeleteIcon: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectIcon,
  onDeleteIcon,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-orange-400" />
            <h3 className="text-base font-bold text-white">Icon History</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
              {history.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-rose-400 hover:text-rose-300 transition"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of past icons */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
              <Sparkles className="w-8 h-8 text-slate-600" />
              <p className="text-sm font-semibold text-slate-400">No icons generated yet</p>
              <p className="text-xs text-slate-500">
                Your creations will be saved locally as you generate them.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-slate-800 bg-slate-850 hover:border-slate-700 transition flex items-center gap-3.5 group"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    onSelectIcon(item);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0 cursor-pointer shadow-md group-hover:scale-105 transition-transform"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div
                  onClick={() => {
                    onSelectIcon(item);
                    onClose();
                  }}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-orange-400 transition">
                      {item.name}
                    </h4>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {item.config.style}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {item.prompt}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteIcon(item.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                  title="Remove from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
