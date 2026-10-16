import React, { useState, useRef } from 'react';
import {
  Building2,
  Upload,
  Link2,
  Trash2,
  Palette,
  Sparkles,
  Check,
  ShieldCheck,
  Layers,
  Info,
} from 'lucide-react';
import { IconConfig, BrandLogoMode } from '../types/icon';

interface BrandLogoUploaderProps {
  config: IconConfig;
  onChangeConfig: (newConfig: Partial<IconConfig>) => void;
}

export const BrandLogoUploader: React.FC<BrandLogoUploaderProps> = ({
  config,
  onChangeConfig,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [colorExtracted, setColorExtracted] = useState<{ primary: string; secondary: string } | null>(null);
  const [isCopiedColors, setIsCopiedColors] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const brand = config.brandLogo;

  // Extract dominant colors from uploaded logo using canvas
  const extractColorsFromImage = (dataUrl: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 64;
        canvas.height = 64;
        ctx.drawImage(img, 0, 0, 64, 64);

        const imgData = ctx.getImageData(0, 0, 64, 64).data;
        const colorCounts: Record<string, number> = {};

        for (let i = 0; i < imgData.length; i += 16) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];

          // Ignore transparent or near-white / near-black background pixels for brand dominance
          if (a < 128) continue;
          const brightness = (r + g + b) / 3;
          if (brightness > 245 || brightness < 15) continue;

          // Bucket to 16 steps
          const quantR = Math.round(r / 24) * 24;
          const quantG = Math.round(g / 24) * 24;
          const quantB = Math.round(b / 24) * 24;
          const hex = `#${((1 << 24) + (quantR << 16) + (quantG << 8) + quantB).toString(16).slice(1)}`;

          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }

        const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
        if (sortedColors.length >= 2) {
          setColorExtracted({
            primary: sortedColors[0][0],
            secondary: sortedColors[1][0],
          });
        } else if (sortedColors.length === 1) {
          setColorExtracted({
            primary: sortedColors[0][0],
            secondary: '#F97316',
          });
        }
      } catch (e) {
        console.warn('Canvas color extraction failed', e);
      }
    };
    img.src = dataUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, SVG, JPG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChangeConfig({
          brandLogo: {
            logoDataUrl: dataUrl,
            logoMimeType: file.type,
            fileName: file.name,
            companyName: brand?.companyName || '',
            mode: brand?.mode || 'motif',
          },
        });
        extractColorsFromImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyColors = () => {
    if (colorExtracted) {
      onChangeConfig({
        primaryColor: colorExtracted.primary,
        secondaryColor: colorExtracted.secondary,
      });
      setIsCopiedColors(true);
      setTimeout(() => setIsCopiedColors(false), 2000);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsLoadingUrl(true);
    try {
      // Test image loading
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        onChangeConfig({
          brandLogo: {
            logoDataUrl: urlInput.trim(),
            logoMimeType: 'image/png',
            fileName: 'Online Logo Link',
            companyName: brand?.companyName || '',
            mode: brand?.mode || 'motif',
          },
        });
        extractColorsFromImage(urlInput.trim());
        setIsLoadingUrl(false);
        setShowUrlInput(false);
        setUrlInput('');
      };
      img.onerror = () => {
        // Fallback: set url directly so prompt builder still references it
        onChangeConfig({
          brandLogo: {
            logoDataUrl: urlInput.trim(),
            logoMimeType: 'image/png',
            fileName: 'Brand Logo URL',
            companyName: brand?.companyName || '',
            mode: brand?.mode || 'motif',
          },
        });
        setIsLoadingUrl(false);
        setShowUrlInput(false);
        setUrlInput('');
      };
      img.src = urlInput.trim();
    } catch {
      setIsLoadingUrl(false);
    }
  };

  const handleRemoveLogo = () => {
    onChangeConfig({
      brandLogo: undefined,
    });
    setColorExtracted(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdateBrand = (updates: Partial<NonNullable<IconConfig['brandLogo']>>) => {
    onChangeConfig({
      brandLogo: {
        companyName: '',
        mode: 'motif',
        ...brand,
        ...updates,
      },
    });
  };

  const modes: { id: BrandLogoMode; title: string; desc: string }[] = [
    {
      id: 'motif',
      title: 'Emblem Motif',
      desc: 'Transforms your logo symbol into the core 3D/vector app emblem.',
    },
    {
      id: 'adaptation',
      title: 'Style Adaptation',
      desc: 'Adapts your logo aesthetic into the chosen design style (clay, neon, 3D).',
    },
    {
      id: 'silhouette',
      title: 'Silhouette & Colors',
      desc: 'Harmonizes the icon layout around your logo geometry & color balance.',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Company & Brand Logo</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Optional
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Share your brand or company logo to generate tailored, brand-conditioned app icons
            </p>
          </div>
        </div>

        {brand?.logoDataUrl && (
          <button
            type="button"
            onClick={handleRemoveLogo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove Logo</span>
          </button>
        )}
      </div>

      {/* Company Name & Brand Identifier */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Company / Brand Name
          </label>
          <input
            type="text"
            value={brand?.companyName || ''}
            onChange={(e) => handleUpdateBrand({ companyName: e.target.value })}
            placeholder="e.g. Acme Corp, FinPulse, Stripe"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/60"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Brand Integration Mode
          </label>
          <select
            value={brand?.mode || 'motif'}
            onChange={(e) => handleUpdateBrand({ mode: e.target.value as BrandLogoMode })}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/60"
          >
            <option value="motif">Emblem Motif (Primary Subject)</option>
            <option value="adaptation">Style Adaptation (Redesign Aesthetic)</option>
            <option value="silhouette">Silhouette & Geometric Accents</option>
          </select>
        </div>
      </div>

      {/* Logo Dropzone & Preview Box */}
      {!brand?.logoDataUrl ? (
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/svg+xml,image/jpeg,image/webp"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700/80 hover:border-orange-500/60 rounded-2xl p-6 text-center cursor-pointer transition bg-slate-950/40 hover:bg-slate-950/70 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto text-orange-400 transition mb-3">
              <Upload className="w-5 h-5 group-hover:scale-110 transition transform" />
            </div>
            <p className="text-xs font-bold text-slate-200 group-hover:text-white mb-1">
              Click to upload company logo or drag & drop here
            </p>
            <p className="text-[11px] text-slate-400">
              Supports PNG (transparent recommended), SVG, JPG, or WebP
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>{showUrlInput ? 'Hide logo URL input' : 'Or share via logo URL'}</span>
            </button>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Session-only memory</span>
            </span>
          </div>

          {showUrlInput && (
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              />
              <button
                type="submit"
                disabled={isLoadingUrl}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition disabled:opacity-50"
              >
                {isLoadingUrl ? 'Loading...' : 'Load'}
              </button>
            </form>
          )}
        </div>
      ) : (
        /* Uploaded Logo Active Preview Card */
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-orange-500/30 shadow-lg space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Logo Checkerboard thumbnail */}
              <div className="w-16 h-16 rounded-xl bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(-45deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1e293b_75%),linear-gradient(-45deg,transparent_75%,#1e293b_75%)] bg-[size:10px_10px] bg-slate-900 border border-slate-700 flex items-center justify-center p-1.5 overflow-hidden shadow-inner">
                <img
                  src={brand.logoDataUrl}
                  alt="Company Logo Preview"
                  className="max-h-full max-w-full object-contain filter drop-shadow"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    {brand.companyName || brand.fileName || 'Company Logo'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Attached
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  AI will use this brand logo to shape your custom app icon
                </p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                  <span>Mode: {brand.mode.toUpperCase()}</span>
                  <span>•</span>
                  <span>In-memory session</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] text-slate-400 hover:text-white underline font-medium"
              >
                Change logo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png,image/svg+xml,image/jpeg,image/webp"
                className="hidden"
              />
            </div>
          </div>

          {/* Color Extraction Banner */}
          {colorExtracted && (
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs text-slate-300 font-medium">Extracted Brand Colors:</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-5 h-5 rounded-lg border border-white/20 shadow-sm"
                    style={{ backgroundColor: colorExtracted.primary }}
                    title={`Primary: ${colorExtracted.primary}`}
                  />
                  <span
                    className="w-5 h-5 rounded-lg border border-white/20 shadow-sm"
                    style={{ backgroundColor: colorExtracted.secondary }}
                    title={`Secondary: ${colorExtracted.secondary}`}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyColors}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  isCopiedColors
                    ? 'bg-emerald-500 text-white'
                    : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30'
                }`}
              >
                {isCopiedColors ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" />
                    <span>Apply Brand Colors</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Integration Mode Visual Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {modes.map((m) => {
              const isSelected = (brand.mode || 'motif') === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleUpdateBrand({ mode: m.id })}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    isSelected
                      ? 'bg-orange-500/10 border-orange-500/50 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{m.title}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-orange-400" />}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">{m.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
