import React, { useState, useEffect } from 'react';
import {
  Key,
  Lock,
  ShieldCheck,
  Check,
  Cpu,
  Trash2,
  ExternalLink,
  X,
  Server,
  Sparkles,
} from 'lucide-react';
import { IconConfig } from '../types/icon';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: IconConfig;
  onChangeConfig: (newConfig: Partial<IconConfig>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
}) => {
  const [selectedEngine, setSelectedEngine] = useState(config.engine || 'gemini');
  const [tempGeminiKey, setTempGeminiKey] = useState(config.geminiApiKey || '');
  const [tempOpenAiKey, setTempOpenAiKey] = useState(config.openaiApiKey || '');
  const [tempAzureKey, setTempAzureKey] = useState(config.azureFoundryApiKey || '');
  const [tempAzureEndpoint, setTempAzureEndpoint] = useState(config.azureFoundryEndpoint || '');
  const [tempAzureDeployment, setTempAzureDeployment] = useState(config.azureDeployment || 'dall-e-3');

  // Sync state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedEngine(config.engine || 'gemini');
      setTempGeminiKey(config.geminiApiKey || '');
      setTempOpenAiKey(config.openaiApiKey || '');
      setTempAzureKey(config.azureFoundryApiKey || '');
      setTempAzureEndpoint(config.azureFoundryEndpoint || '');
      setTempAzureDeployment(config.azureDeployment || 'dall-e-3');
    }
  }, [isOpen, config]);

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

  const handleApply = () => {
    onChangeConfig({
      engine: selectedEngine,
      geminiApiKey: tempGeminiKey.trim(),
      openaiApiKey: tempOpenAiKey.trim(),
      azureFoundryApiKey: tempAzureKey.trim(),
      azureFoundryEndpoint: tempAzureEndpoint.trim(),
      azureDeployment: tempAzureDeployment.trim() || 'dall-e-3',
    });
    onClose();
  };

  const handleClearAllKeys = () => {
    setTempGeminiKey('');
    setTempOpenAiKey('');
    setTempAzureKey('');
    setTempAzureEndpoint('');
    setTempAzureDeployment('dall-e-3');
    onChangeConfig({
      geminiApiKey: '',
      openaiApiKey: '',
      azureFoundryApiKey: '',
      azureFoundryEndpoint: '',
      azureDeployment: 'dall-e-3',
    });
  };

  const hasAnyKeyActive = Boolean(
    config.geminiApiKey || config.openaiApiKey || config.azureFoundryApiKey
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl my-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                AI Engine & Session API Keys
              </h3>
              <span className="text-[10px] sm:text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3 shrink-0" /> Temporary RAM only • Auto-cleared on window close
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

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {/* Privacy Guarantee Box */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Permanent Storage Guarantee</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 leading-relaxed">
              Your API keys remain strictly in volatile RAM memory during this browser session. When you close or refresh this tab, all custom keys are instantly deleted. They are never saved to localStorage, disk, or remote databases.
            </p>
          </div>

          {/* AI Engine Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Select Active Generation Engine:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* 1. Gemini */}
              <button
                type="button"
                onClick={() => setSelectedEngine('gemini')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedEngine === 'gemini'
                    ? 'border-orange-500 bg-orange-500/10 text-white ring-1 ring-orange-500/50'
                    : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    Gemini 3.1
                  </span>
                  {selectedEngine === 'gemini' && (
                    <Check className="w-4 h-4 text-orange-400 shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Google Studio Image Model (Default)
                </p>
              </button>

              {/* 2. OpenAI DALL-E 3 */}
              <button
                type="button"
                onClick={() => setSelectedEngine('dall-e-3')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedEngine === 'dall-e-3'
                    ? 'border-orange-500 bg-orange-500/10 text-white ring-1 ring-orange-500/50'
                    : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-sm font-semibold flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-orange-400" />
                    DALL·E 3
                  </span>
                  {selectedEngine === 'dall-e-3' && (
                    <Check className="w-4 h-4 text-orange-400 shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  OpenAI 1024×1024 Engine
                </p>
              </button>

              {/* 3. Microsoft AI Foundry */}
              <button
                type="button"
                onClick={() => setSelectedEngine('microsoft-foundry')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedEngine === 'microsoft-foundry'
                    ? 'border-cyan-500 bg-cyan-500/10 text-white ring-1 ring-cyan-500/50'
                    : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-sm font-semibold flex items-center gap-1">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    MS Foundry
                  </span>
                  {selectedEngine === 'microsoft-foundry' && (
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Azure AI Studio & Foundry
                </p>
              </button>
            </div>
          </div>

          {/* Microsoft AI Foundry Inputs */}
          {selectedEngine === 'microsoft-foundry' && (
            <div className="space-y-2.5 p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Microsoft AI Foundry Configuration
                </span>
                <a
                  href="https://ai.azure.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5"
                >
                  Azure Portal <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1">
                  Azure Endpoint URL:
                </label>
                <input
                  type="text"
                  placeholder="https://your-resource.openai.azure.com"
                  value={tempAzureEndpoint}
                  onChange={(e) => setTempAzureEndpoint(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">
                    Foundry API Key (Session Only):
                  </label>
                  <input
                    type="password"
                    placeholder="Azure key..."
                    value={tempAzureKey}
                    onChange={(e) => setTempAzureKey(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">
                    Deployment Name:
                  </label>
                  <input
                    type="text"
                    placeholder="dall-e-3"
                    value={tempAzureDeployment}
                    onChange={(e) => setTempAzureDeployment(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* OpenAI Key Input */}
          {selectedEngine === 'dall-e-3' && (
            <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950 border border-orange-500/30">
              <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                <span>OpenAI API Key (Session Only, for DALL·E 3)</span>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-orange-400 hover:underline flex items-center gap-0.5"
                >
                  Get OpenAI Key <ExternalLink className="w-3 h-3" />
                </a>
              </label>
              <input
                type="password"
                placeholder="sk-..."
                value={tempOpenAiKey}
                onChange={(e) => setTempOpenAiKey(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <p className="text-[10px] text-slate-400">
                Held in temporary memory only; wiped automatically upon leaving.
              </p>
            </div>
          )}

          {/* Gemini Session Key Input */}
          {selectedEngine === 'gemini' && (
            <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                <span>Custom Gemini API Key (Optional)</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-orange-400 hover:underline flex items-center gap-0.5"
                >
                  Get Gemini Key <ExternalLink className="w-3 h-3" />
                </a>
              </label>
              <input
                type="password"
                placeholder="AIzaSy... (leave blank to use default studio key)"
                value={tempGeminiKey}
                onChange={(e) => setTempGeminiKey(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <p className="text-[10px] text-slate-400">
                If left blank, the app uses your server environment GEMINI_API_KEY.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handleClearAllKeys}
            className="px-3 py-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            title="Erase all active session keys from memory"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Erase All Keys</span>
            <span className="sm:hidden">Erase</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg shadow-md transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apply for Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
