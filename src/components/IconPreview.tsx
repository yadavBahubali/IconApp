import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  FileCode2,
  FolderArchive,
  Layers,
  ZoomIn,
  ZoomOut,
  Grid,
  Check,
  Smartphone,
  Eye,
  Loader2,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { GeneratedIcon, IconConfig, PlatformMask } from '../types/icon';
import { triggerFileDownload } from '../utils/zipExporter';

interface IconPreviewProps {
  activeIcon: GeneratedIcon | null;
  config: IconConfig;
  isGenerating: boolean;
  onGenerate: () => void;
  onOpenExportModal: () => void;
  onDownloadZip: () => void;
  onDownloadSvg: () => void;
  isVectorizing: boolean;
  generationError: string | null;
  onChangeMask: (mask: PlatformMask) => void;
}

export const IconPreview: React.FC<IconPreviewProps> = ({
  activeIcon,
  config,
  isGenerating,
  onGenerate,
  onOpenExportModal,
  onDownloadZip,
  onDownloadSvg,
  isVectorizing,
  generationError,
  onChangeMask,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showCheckerboard, setShowCheckerboard] = useState<boolean>(true);
  const [copiedDataUrl, setCopiedDataUrl] = useState<boolean>(false);
  const [showBrandComparison, setShowBrandComparison] = useState<boolean>(false);

  // Mask CSS radius calculation
  const getMaskClass = (mask: PlatformMask) => {
    switch (mask) {
      case 'android-circle':
        return 'rounded-full';
      case 'ios':
      case 'macos':
        return 'rounded-[22.5%]';
      case 'android-squircle':
        return 'rounded-[30%]';
      case 'windows':
        return 'rounded-xl';
      case 'square':
      default:
        return 'rounded-none';
    }
  };

  const handleCopyPng = async () => {
    if (!activeIcon?.imageUrl) return;
    try {
      await navigator.clipboard.writeText(activeIcon.imageUrl);
      setCopiedDataUrl(true);
      setTimeout(() => setCopiedDataUrl(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top Preview Bar */}
      <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Studio Master Preview
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono border border-slate-700">
            1024 × 1024 HD
          </span>
        </div>

        {/* Viewport Tools */}
        <div className="flex items-center gap-1.5">
          {config.brandLogo?.logoDataUrl && (
            <button
              type="button"
              onClick={() => setShowBrandComparison(!showBrandComparison)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                showBrandComparison
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700'
              }`}
              title="Compare with uploaded brand logo side-by-side"
            >
              <Building2 className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Compare with Logo</span>
              <span className="sm:hidden">Logo</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowCheckerboard(!showCheckerboard)}
            className={`p-1.5 rounded-lg border text-xs transition ${
              showCheckerboard
                ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
            title="Toggle transparency grid"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-800/60 text-slate-400 hover:text-white transition"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[10px] font-mono text-slate-400 w-9 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.25))}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-800/60 text-slate-400 hover:text-white transition"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Viewport Stage */}
      <div
        className={`flex-1 min-h-[260px] sm:min-h-[340px] md:min-h-[380px] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden transition-colors ${
          showCheckerboard
            ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950'
            : 'bg-slate-950'
        }`}
      >
        {/* Glow backdrop behind icon */}
        <div
          className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full opacity-20 blur-3xl pointer-events-none transition-all duration-700"
          style={{
            backgroundColor: config.primaryColor || '#f97316',
          }}
        />

        {/* Display Canvas / Image */}
        <div
          className="relative transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {activeIcon?.imageUrl ? (
            showBrandComparison && config.brandLogo?.logoDataUrl ? (
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-slate-950/70 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl">
                {/* Brand Logo Source */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(-45deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1e293b_75%),linear-gradient(-45deg,transparent_75%,#1e293b_75%)] bg-[size:10px_10px] bg-slate-900 border border-slate-700 p-3 flex items-center justify-center shadow-lg">
                    <img
                      src={config.brandLogo.logoDataUrl}
                      alt="Original Brand Logo"
                      className="max-h-full max-w-full object-contain filter drop-shadow"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 mt-2 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-orange-400" />
                    <span>{config.brandLogo.companyName || 'Brand Logo'}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Source Asset</span>
                </div>

                {/* Arrow indicator */}
                <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center text-xs font-bold sm:rotate-0 rotate-90">
                  →
                </div>

                {/* Synthesized App Icon */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-32 h-32 sm:w-40 sm:h-40 overflow-hidden shadow-2xl border border-white/10 ${getMaskClass(
                      config.platformMask
                    )}`}
                    style={{
                      boxShadow: `0 20px 40px -10px ${config.primaryColor}33`,
                    }}
                  >
                    <img
                      src={activeIcon.imageUrl}
                      alt={activeIcon.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-orange-400 mt-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-orange-400" />
                    <span>App Store Icon</span>
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {config.platformMask.toUpperCase()} Mask
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative group">
                {/* Outer Shadow for 3D elevation */}
                <div
                  className={`w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 overflow-hidden shadow-2xl transition-all duration-300 relative border border-white/10 ${getMaskClass(
                    config.platformMask
                  )}`}
                  style={{
                    boxShadow: `0 25px 50px -12px ${config.primaryColor}33, 0 12px 24px -8px rgba(0,0,0,0.5)`,
                  }}
                >
                  <img
                    src={activeIcon.imageUrl}
                    alt={activeIcon.name}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />

                  {/* Glass reflection sheen on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
                </div>

                {/* Floating resolution tag */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-mono text-slate-300 shadow-md whitespace-nowrap">
                  {config.platformMask.toUpperCase()} MASK
                </div>
              </div>
            )
          ) : (
            <div className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-3xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-center p-4 sm:p-6 text-slate-500">
              <Layers className="w-10 h-10 sm:w-12 sm:h-12 mb-3 text-slate-600 animate-pulse" />
              <p className="text-xs sm:text-sm font-semibold text-slate-400">Ready to synthesize</p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                Configure your presets and hit "Generate App Icon"
              </p>
            </div>
          )}

          {/* Loading Overlay */}
          {isGenerating && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center text-center p-6 border border-orange-500/40 z-20 animate-fade-in">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-4">
                <div className="absolute inset-0 rounded-2xl bg-orange-500/20 animate-ping" />
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 text-white animate-spin" />
                </div>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Synthesizing App Icon...
              </p>
              <p className="text-[11px] sm:text-xs text-orange-400 font-mono mt-1">
                Applying secret prompt formula
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Generation Error Alert if any */}
      {generationError && (
        <div className="px-5 py-2.5 bg-rose-500/10 border-t border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span className="flex-1">{generationError}</span>
        </div>
      )}

      {/* Shape Quick Switcher */}
      <div className="px-4 sm:px-5 py-2.5 border-t border-slate-800/80 bg-slate-900 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px] font-medium hidden md:inline">
          Preview Mask:
        </span>
        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 justify-start sm:justify-end scrollbar-none">
          <button
            type="button"
            onClick={() => onChangeMask('ios')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              config.platformMask === 'ios'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            iOS Squircle
          </button>
          <button
            type="button"
            onClick={() => onChangeMask('android-circle')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              config.platformMask === 'android-circle'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Android Round
          </button>
          <button
            type="button"
            onClick={() => onChangeMask('windows')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              config.platformMask === 'windows'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Windows Tile
          </button>
          <button
            type="button"
            onClick={() => onChangeMask('square')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              config.platformMask === 'square'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Raw Square
          </button>
        </div>
      </div>

      {/* Blueprint Action Bar (Generate, Download PNG Pack, Download SVG) */}
      <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
        {/* Primary Generate Button */}
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Studio Icon...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>Generate App Icon</span>
            </>
          )}
        </button>

        {/* Blueprint Section 4 Action Buttons: PNG Pack + SVG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Download PNG Pack (Zip) */}
          <button
            type="button"
            onClick={onDownloadZip}
            disabled={!activeIcon || isGenerating}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Download full multi-platform ZIP (iOS, Android, Windows, Web)"
          >
            <FolderArchive className="w-4 h-4 text-orange-400" />
            <span>Download PNG Pack (.ZIP)</span>
          </button>

          {/* Download SVG (Vectorizer) */}
          <button
            type="button"
            onClick={onDownloadSvg}
            disabled={!activeIcon || isGenerating || isVectorizing}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Convert bitmap to vector and download SVG"
          >
            {isVectorizing ? (
              <>
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>Tracing Vector...</span>
              </>
            ) : (
              <>
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span>Download SVG (Vector)</span>
              </>
            )}
          </button>
        </div>

        {/* Export Matrix Details Link */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={onOpenExportModal}
            className="text-[11px] text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1 transition"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Inspect All Export Resolutions & Assets</span>
          </button>

          <button
            type="button"
            onClick={handleCopyPng}
            disabled={!activeIcon}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition disabled:opacity-30"
          >
            {copiedDataUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Data URI</span>
              </>
            ) : (
              <span>Copy Data URI</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
