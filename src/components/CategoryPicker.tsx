import React from 'react';
import {
  Landmark,
  Gamepad2,
  HeartPulse,
  MessageSquareShare,
  Coffee,
  Briefcase,
  ShoppingBag,
  Navigation,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '../utils/promptBuilder';
import { CategoryId, IconConfig } from '../types/icon';

interface CategoryPickerProps {
  config: IconConfig;
  onChangeConfig: (newConfig: Partial<IconConfig>) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark,
  Gamepad2,
  HeartPulse,
  MessageSquareShare,
  Coffee,
  Briefcase,
  ShoppingBag,
  Navigation,
  GraduationCap,
  Sparkles,
};

export const CategoryPicker: React.FC<CategoryPickerProps> = ({ config, onChangeConfig }) => {
  const currentCategory = CATEGORIES.find((c) => c.id === config.category) || CATEGORIES[0];

  const handleSelectCategory = (id: CategoryId) => {
    const selected = CATEGORIES.find((c) => c.id === id);
    const newSubject = selected?.popularSubjects[0] || '';
    onChangeConfig({
      category: id,
      customSubject: newSubject,
    });
  };

  const handleSelectSubject = (subject: string) => {
    onChangeConfig({ customSubject: subject });
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center border border-orange-500/30">
            1
          </span>
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            Step 1: Category & Subject
          </h2>
        </div>
        <span className="text-[11px] text-slate-400">
          Preset-driven
        </span>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {CATEGORIES.map((cat) => {
          const IconComp = CATEGORY_ICONS[cat.iconName] || Sparkles;
          const isSelected = config.category === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat.id)}
              className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                isSelected
                  ? 'border-orange-500 bg-orange-500/10 text-white ring-1 ring-orange-500/50 shadow-md'
                  : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-2 rounded-lg mb-1.5 transition ${
                  isSelected ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <IconComp className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold leading-tight line-clamp-1">{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Popular Subject Chips */}
      <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-300">
            Popular {currentCategory.name} Concepts:
          </span>
          <span className="text-[10px] text-slate-400">Click to autofill</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {currentCategory.popularSubjects.map((subj) => {
            const isChipSelected = config.customSubject.toLowerCase() === subj.toLowerCase();
            return (
              <button
                key={subj}
                type="button"
                onClick={() => handleSelectSubject(subj)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                  isChipSelected
                    ? 'border-orange-500 bg-orange-500/20 text-orange-300 font-semibold shadow-sm'
                    : 'border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-slate-600 hover:text-white'
                }`}
              >
                {subj}
              </button>
            );
          })}
        </div>

        {/* Custom Subject Input */}
        <div className="pt-1">
          <label className="text-[11px] text-slate-400 block mb-1">
            Or type a specific subject / motif:
          </label>
          <input
            type="text"
            value={config.customSubject}
            onChange={(e) => onChangeConfig({ customSubject: e.target.value })}
            placeholder="e.g. Vintage espresso machine with gold valve"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>
    </div>
  );
};
