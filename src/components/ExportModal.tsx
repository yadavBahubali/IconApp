import React, { useState } from 'react';
import {
  FolderArchive,
  FileCode2,
  Download,
  Check,
  Copy,
  Layers,
  Smartphone,
  Laptop,
  Globe,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { PLATFORM_SIZES, loadImage, resizeImageToBlob } from '../utils/imageResizer';
import { GeneratedIcon, PlatformMask, PlatformSize } from '../types/icon';
import { triggerFileDownload } from '../utils/zipExporter';

interface ExportModalProps {
  activeIcon: GeneratedIcon | null;
  mask: PlatformMask;
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip: () => void;
  onDownloadSvg: () => void;
  svgContent?: string;
  isVectorizing: boolean;
  zipProgress?: { percent: number; task: string } | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  activeIcon,
  mask,
  isOpen,
  onClose,
  onDownloadZip,
  onDownloadSvg,
  svgContent,
  isVectorizing,
  zipProgress,
}) => {
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [copiedSvg, setCopiedSvg] = useState<boolean>(false);
  const [downloadingSingle, setDownloadingSingle] = useState<string | null>(null);

  if (!isOpen || !activeIcon) return null;

  const filteredSizes =
    filterPlatform === 'all'
      ? PLATFORM_SIZES
      : PLATFORM_SIZES.filter((s) => s.platform === filterPlatform);

  const handleDownloadSinglePng = async (sizeConfig: PlatformSize) => {
    try {
      setDownloadingSingle(sizeConfig.filename);
      const img = await loadImage(activeIcon.imageUrl);
      const blob = await resizeImageToBlob(
        img,
        sizeConfig.width,
        sizeConfig.height,
        mask
      );
      triggerFileDownload(blob, sizeConfig.filename);
    } catch (err) {
      console.error('Failed to download single PNG', err);
    } finally {
      setDownloadingSingle(null);
    }
  };

  const handleCopySvgCode = () => {
    if (!svgContent) return;
    navigator.clipboard.writeText(svgContent);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-6 flex items-start sm:items-center justify-center animate-fade-in">
      <div className="relative w-full max-w-4xl my-auto bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Export Asset Matrix & Resizer
              </h3>
              <p className="text-xs text-slate-400">
                Blueprint Output: Multi-Platform Downscaling & Vectorization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Blueprint Action Banner */}
        <div className="p-4 sm:p-6 bg-slate-950/80 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 1. Download PNG Pack */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <FolderArchive className="w-4 h-4 text-orange-400" />
                  Download PNG Pack (.ZIP)
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                  All Formats
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bundles iOS (@1x, @2x, @3x + Xcode Contents.json), Android mipmaps, Web favicons & site.webmanifest, and Windows tiles.
              </p>
            </div>

            <button
              onClick={onDownloadZip}
              disabled={!!zipProgress}
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition disabled:opacity-50"
            >
              {zipProgress ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{zipProgress.task} ({zipProgress.percent}%)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Complete ZIP Pack</span>
                </>
              )}
            </button>
          </div>

          {/* 2. Download SVG */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <FileCode2 className="w-4 h-4 text-cyan-400" />
                  Download SVG (Vector)
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                  Scalable
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Client-side vectorizer converts bitmap pixels into multi-layer crisp SVG contours for infinite resolution scaling.
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={onDownloadSvg}
                disabled={isVectorizing}
                className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-600/25 transition disabled:opacity-50"
              >
                {isVectorizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Vectorizing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download .SVG</span>
                  </>
                )}
              </button>

              {svgContent && (
                <button
                  onClick={handleCopySvgCode}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  title="Copy SVG XML Code"
                >
                  {copiedSvg ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSvg ? 'Copied' : 'XML'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Platform Filter Pills */}
        <div className="px-6 py-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto bg-slate-900/60">
          <span className="text-xs font-semibold text-slate-400 mr-2">Filter:</span>
          {['all', 'ios', 'android', 'web', 'windows'].map((plat) => (
            <button
              key={plat}
              onClick={() => setFilterPlatform(plat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                filterPlatform === plat
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Asset Table / Grid */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSizes.map((sizeConfig) => {
              const isDownloading = downloadingSingle === sizeConfig.filename;

              return (
                <div
                  key={`${sizeConfig.platform}-${sizeConfig.filename}-${sizeConfig.width}`}
                  className="p-3.5 rounded-xl border border-slate-800 bg-slate-850/60 flex items-center justify-between hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    {/* Thumbnail preview */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0 flex items-center justify-center p-0.5">
                      <img
                        src={activeIcon.imageUrl}
                        alt="icon preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{sizeConfig.name}</span>
                        {sizeConfig.density && (
                          <span className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-400">
                            {sizeConfig.density}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block font-mono">
                        {sizeConfig.width} × {sizeConfig.height} px
                      </span>
                    </div>
                  </div>

                  {/* 1-Click Single PNG Download */}
                  <button
                    onClick={() => handleDownloadSinglePng(sizeConfig)}
                    disabled={isDownloading}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition disabled:opacity-50"
                    title={`Download ${sizeConfig.filename}`}
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Total {PLATFORM_SIZES.length} calibrated platform resolutions + SVG vector
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
