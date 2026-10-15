import React, { useState } from 'react';
import {
  Smartphone,
  Laptop,
  Globe,
  Store,
  Wifi,
  Battery,
  Phone,
  Compass,
  MessageCircle,
  Music,
  Camera,
  Calendar,
  Image,
  Clock,
  Sparkles,
  Download,
  Share2,
} from 'lucide-react';
import { GeneratedIcon, IconConfig } from '../types/icon';

interface MockupShowcaseProps {
  activeIcon: GeneratedIcon | null;
  config: IconConfig;
}

type MockupTab = 'ios' | 'android' | 'macos' | 'appstore' | 'browser';

export const MockupShowcase: React.FC<MockupShowcaseProps> = ({ activeIcon, config }) => {
  const [activeTab, setActiveTab] = useState<MockupTab>('ios');

  const appName = config.customSubject
    ? config.customSubject.split(' ')[0] + 'App'
    : 'StudioApp';

  const iconSrc = activeIcon?.imageUrl || '';

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Mockup Header Tabs */}
      <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Live Platform Mockups
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'ios'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iOS Home</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'android'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('macos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'macos'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>macOS Dock</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('appstore')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'appstore'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>App Store</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('browser')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'browser'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Browser Tab</span>
          </button>
        </div>
      </div>

      {/* Mockup Display Area */}
      <div className="p-6 sm:p-8 flex items-center justify-center bg-slate-950/80 min-h-[460px]">
        {/* 1. iOS Home Screen Mockup */}
        {activeTab === 'ios' && (
          <div className="w-[300px] h-[580px] rounded-[48px] border-4 border-slate-700 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-950 p-4 shadow-2xl relative flex flex-col justify-between overflow-hidden ring-1 ring-white/10">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-end px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between text-[11px] text-white px-3 pt-1 z-10 font-semibold">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Home Screen Icons Grid */}
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 pt-8 px-1">
              {/* Dummy row 1 */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-[22.5%] bg-blue-500 shadow-md flex items-center justify-center text-white">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-white/90">Calendar</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-[22.5%] bg-amber-500 shadow-md flex items-center justify-center text-white">
                  <Image className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-white/90">Photos</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-[22.5%] bg-slate-800 shadow-md flex items-center justify-center text-white">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-white/90">Camera</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-[22.5%] bg-rose-500 shadow-md flex items-center justify-center text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-white/90">Clock</span>
              </div>

              {/* Dummy row 2 with YOUR APP HERO */}
              <div className="flex flex-col items-center gap-1 relative group">
                <div className="w-12 h-12 rounded-[22.5%] overflow-hidden shadow-lg shadow-orange-500/30 border border-white/20 ring-2 ring-orange-500/80 transition-transform group-hover:scale-105">
                  {iconSrc ? (
                    <img src={iconSrc} alt="Your App" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
                      App
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-orange-300 font-bold max-w-[60px] truncate text-center">
                  {appName}
                </span>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                  1
                </span>
              </div>

              {/* Other apps */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-[22.5%] bg-emerald-500 shadow-md flex items-center justify-center text-white">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-white/90">FaceTime</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-[22.5%] bg-cyan-500 shadow-md flex items-center justify-center text-white">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-white/90">Maps</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-[22.5%] bg-indigo-500 shadow-md flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] text-white/90">Chat</span>
              </div>
            </div>

            {/* Bottom Dock */}
            <div className="w-full py-2.5 px-3 rounded-[28px] bg-white/20 backdrop-blur-xl flex items-center justify-around border border-white/20 shadow-lg">
              <div className="w-11 h-11 rounded-[22.5%] bg-green-500 shadow-md flex items-center justify-center text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div className="w-11 h-11 rounded-[22.5%] bg-blue-500 shadow-md flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <div className="w-11 h-11 rounded-[22.5%] bg-emerald-400 shadow-md flex items-center justify-center text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="w-11 h-11 rounded-[22.5%] bg-red-500 shadow-md flex items-center justify-center text-white">
                <Music className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* 2. Android Adaptive Circle Mockup */}
        {activeTab === 'android' && (
          <div className="w-[300px] h-[580px] rounded-[44px] border-4 border-slate-700 bg-gradient-to-b from-teal-950 via-slate-900 to-black p-4 shadow-2xl relative flex flex-col justify-between overflow-hidden ring-1 ring-white/10">
            {/* Status bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-300 px-3 pt-1">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Google Search Bar Widget */}
            <div className="mt-4 px-3 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs text-slate-400 shadow-md">
              <span className="font-bold text-white pl-1">G</span>
              <span className="text-[11px]">Search apps & web...</span>
              <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
            </div>

            {/* Center Adaptive Icon Display */}
            <div className="flex flex-col items-center justify-center my-auto space-y-3">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl shadow-orange-500/40 border-2 border-white/20 ring-4 ring-orange-500/30 transition-transform hover:scale-105">
                {iconSrc ? (
                  <img src={iconSrc} alt="Your App" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-orange-500" />
                )}
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-white block">{appName}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Adaptive Circle (192 × 192 xxxhdpi)
                </span>
              </div>
            </div>

            {/* Bottom Android Dock */}
            <div className="flex items-center justify-around py-3 border-t border-slate-800/80">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white">
                <Camera className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* 3. macOS Dock Mockup */}
        {activeTab === 'macos' && (
          <div className="w-full max-w-lg flex flex-col items-center space-y-6">
            <div className="text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                macOS Desktop Dock Preview
              </span>
              <p className="text-xs text-slate-500">
                Shows 3D tilted elevation with ambient dock reflection
              </p>
            </div>

            {/* macOS Dock Container */}
            <div className="px-4 py-3 rounded-2xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-end gap-3 sm:gap-4 relative">
              {/* Dummy Dock items */}
              <div className="w-12 h-12 rounded-[22.5%] bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-md flex items-center justify-center text-white text-xs font-bold transition-transform hover:-translate-y-2">
                Finder
              </div>
              <div className="w-12 h-12 rounded-[22.5%] bg-gradient-to-tr from-slate-700 to-slate-900 shadow-md flex items-center justify-center text-white text-xs font-bold transition-transform hover:-translate-y-2">
                Launch
              </div>
              <div className="w-12 h-12 rounded-[22.5%] bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md flex items-center justify-center text-white text-xs font-bold transition-transform hover:-translate-y-2">
                <Compass className="w-6 h-6" />
              </div>

              {/* YOUR APP ICON IN DOCK */}
              <div className="flex flex-col items-center transition-transform hover:-translate-y-4 duration-200 cursor-pointer">
                <div className="w-14 h-14 rounded-[22.5%] overflow-hidden shadow-2xl shadow-orange-500/40 border border-white/30 ring-2 ring-orange-500">
                  {iconSrc ? (
                    <img src={iconSrc} alt="Your App" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-orange-500" />
                  )}
                </div>
                {/* Active App Indicator Dot */}
                <div className="w-1 h-1 rounded-full bg-white mt-1 shadow-sm" />
              </div>

              <div className="w-12 h-12 rounded-[22.5%] bg-gradient-to-tr from-purple-600 to-pink-500 shadow-md flex items-center justify-center text-white text-xs font-bold transition-transform hover:-translate-y-2">
                <Music className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 rounded-[22.5%] bg-gradient-to-tr from-slate-600 to-slate-800 shadow-md flex items-center justify-center text-white text-xs font-bold transition-transform hover:-translate-y-2">
                Settings
              </div>
            </div>
          </div>
        )}

        {/* 4. App Store Product Card */}
        {activeTab === 'appstore' && (
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-5">
            {/* Store Header */}
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[22.5%] overflow-hidden shadow-xl border border-white/10 shrink-0">
                {iconSrc ? (
                  <img src={iconSrc} alt="Your App" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-orange-500" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {appName}
                </h3>
                <p className="text-xs text-slate-400">
                  {config.customSubject || 'Professional Mobile Experience'}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    className="px-5 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow transition"
                  >
                    GET
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded-full text-slate-400 hover:text-white"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Store Stats */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Ratings</span>
                <span className="text-sm font-bold text-white">4.9 ★</span>
                <span className="text-[9px] text-slate-500 block">12K Reviews</span>
              </div>
              <div className="border-x border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Category</span>
                <span className="text-sm font-bold text-white capitalize">
                  {config.category}
                </span>
                <span className="text-[9px] text-slate-500 block">Top #1</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Age</span>
                <span className="text-sm font-bold text-white">4+</span>
                <span className="text-[9px] text-slate-500 block">Years Old</span>
              </div>
            </div>

            {/* What's New */}
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-white block">What's New in Version 2.0</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Brand new studio icon designed with precision vector contours and high-definition resolution support.
              </p>
            </div>
          </div>
        )}

        {/* 5. Browser Tab Favicon Mockup */}
        {activeTab === 'browser' && (
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
            {/* Browser Window Bar */}
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-mono text-slate-500">Google Chrome / Safari</span>
              <div className="w-12" />
            </div>

            {/* Active Browser Tab */}
            <div className="px-4 pt-2 pb-0 bg-slate-950 flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-xl bg-slate-900 border-t border-x border-slate-800 text-xs text-white max-w-xs shadow-sm">
                {/* 16x16 / 32x32 Favicon */}
                <div className="w-4 h-4 rounded-sm overflow-hidden shrink-0 border border-white/20">
                  {iconSrc ? (
                    <img src={iconSrc} alt="Favicon" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-orange-500" />
                  )}
                </div>
                <span className="font-medium truncate">{appName} - Official Website</span>
                <span className="text-slate-500 text-[10px] ml-1">✕</span>
              </div>
            </div>

            {/* URL Bar */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
              <div className="flex-1 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono flex items-center gap-2">
                <span className="text-emerald-400 font-bold">🔒</span>
                <span>https://www.{appName.toLowerCase()}.com</span>
              </div>
            </div>

            {/* Page Body Placeholder */}
            <div className="p-8 text-center text-slate-400 text-xs space-y-2">
              <Globe className="w-8 h-8 mx-auto text-slate-600 animate-pulse" />
              <p className="font-semibold text-slate-300">Favicon Live Rendering</p>
              <p className="text-[11px] text-slate-500">
                Rendered at 16×16, 32×32, and 64×64 for bookmarks and browser title bars.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
