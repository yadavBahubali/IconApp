import React from 'react';
import { COLOR_PRESETS } from '../utils/promptBuilder';
import { IconConfig, BackgroundStyle, PlatformMask } from '../types/icon';
import { Palette, Layers, Smartphone, Sparkles } from 'lucide-react';

interface ColorPickerProps {
  config: IconConfig;
  onChangeConfig: (newConfig: Partial<IconConfig>) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ config, onChangeConfig }) => {
  const bgStyles: { id: BackgroundStyle; label: string; desc: string }[] = [
    { id: 'white', label: 'Clean White', desc: 'Apple Store standard white isolation' },
    { id: 'dark', label: 'Deep Dark', desc: 'Midnight slate contrast' },
    { id: 'gradient', label: 'Soft Gradient', desc: 'Harmonious secondary tint' },
    { id: 'transparent', label: 'Isolated', desc: 'Clean object silhouette' },
    { id: 'pastel', label: 'Pastel Tint', desc: 'Gentle muted backdrop' },
  ];

  const platformMasks: { id: PlatformMask; label: string; desc: string }[] = [
    { id: 'ios', label: 'iOS Squircle', desc: 'Apple continuous curve' },
    { id: 'android-circle', label: 'Android Round', desc: 'Google Pixel adaptive circle' },
    { id: 'android-squircle', label: 'Android Squircle', desc: 'Rounded squircle' },
    { id: 'macos', label: 'macOS Dock', desc: 'Tilted dock curve' },
    { id: 'windows', label: 'Windows Tile', desc: 'Modern desktop tile' },
    { id: 'square', label: 'Raw Square', desc: '1024x1024 full bleed master' },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center border border-orange-500/30">
            3
          </span>
          <h2 className="text-sm font-bold text-white tracking-wide uppercase">
            Step 3: Colors & Backdrop
          </h2>
        </div>
        <span className="text-[11px] text-slate-400">
          Harmonic Palette
        </span>
      </div>

      {/* Preset Swatches */}
      <div>
        <label className="text-xs font-medium text-slate-300 block mb-2">
          Curated Color Harmonies:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COLOR_PRESETS.map((preset) => {
            const isMatch =
              config.primaryColor.toLowerCase() === preset.primary.toLowerCase() &&
              config.secondaryColor.toLowerCase() === preset.secondary.toLowerCase();

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() =>
                  onChangeConfig({
                    primaryColor: preset.primary,
                    secondaryColor: preset.secondary,
                  })
                }
                className={`p-2 rounded-xl border flex items-center gap-2.5 transition text-left ${
                  isMatch
                    ? 'border-orange-500 bg-orange-500/10 ring-1 ring-orange-500/40 text-white'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex -space-x-1 shrink-0">
                  <span
                    className="w-5 h-5 rounded-full border border-black/30 shadow-sm"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <span
                    className="w-5 h-5 rounded-full border border-black/30 shadow-sm"
                    style={{ backgroundColor: preset.secondary }}
                  />
                </div>
                <span className="text-xs font-semibold leading-tight line-clamp-1">{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Primary & Secondary Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
        <div>
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between mb-1.5">
            <span>Primary Motif Color</span>
            <span className="text-[11px] font-mono text-slate-400">{config.primaryColor}</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.primaryColor}
              onChange={(e) => onChangeConfig({ primaryColor: e.target.value })}
              className="w-10 h-10 rounded-lg cursor-pointer bg-slate-800 border border-slate-700 p-0.5"
            />
            <input
              type="text"
              value={config.primaryColor}
              onChange={(e) => onChangeConfig({ primaryColor: e.target.value })}
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between mb-1.5">
            <span>Secondary / Accent Color</span>
            <span className="text-[11px] font-mono text-slate-400">{config.secondaryColor}</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.secondaryColor}
              onChange={(e) => onChangeConfig({ secondaryColor: e.target.value })}
              className="w-10 h-10 rounded-lg cursor-pointer bg-slate-800 border border-slate-700 p-0.5"
            />
            <input
              type="text"
              value={config.secondaryColor}
              onChange={(e) => onChangeConfig({ secondaryColor: e.target.value })}
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Background Style and Platform Mask */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Background Style */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <label className="text-xs font-medium text-slate-300 block">
            Background Atmosphere:
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {bgStyles.map((bg) => (
              <button
                key={bg.id}
                type="button"
                onClick={() => onChangeConfig({ bgStyle: bg.id })}
                className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition ${
                  config.bgStyle === bg.id
                    ? 'border-orange-500 bg-orange-500/15 text-white font-semibold'
                    : 'border-slate-800 bg-slate-850 text-slate-400 hover:text-slate-200'
                }`}
              >
                {bg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Mask */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <label className="text-xs font-medium text-slate-300 block">
            Target Platform Shape Mask:
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {platformMasks.map((mask) => (
              <button
                key={mask.id}
                type="button"
                onClick={() => onChangeConfig({ platformMask: mask.id })}
                className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition ${
                  config.platformMask === mask.id
                    ? 'border-orange-500 bg-orange-500/15 text-white font-semibold'
                    : 'border-slate-800 bg-slate-850 text-slate-400 hover:text-slate-200'
                }`}
              >
                {mask.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
