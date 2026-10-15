export type StyleId =
  | 'flat'
  | '3d'
  | 'skeuomorphic'
  | 'line-art'
  | 'gradient'
  | 'claymorphism'
  | 'pixel-art'
  | 'cyberpunk';

export type CategoryId =
  | 'finance'
  | 'game'
  | 'health'
  | 'social'
  | 'productivity'
  | 'food'
  | 'ecommerce'
  | 'travel'
  | 'education'
  | 'custom';

export type BackgroundStyle = 'white' | 'dark' | 'gradient' | 'transparent' | 'pastel';

export type PlatformMask = 'ios' | 'android-circle' | 'android-squircle' | 'macos' | 'windows' | 'square';

export interface StyleOption {
  id: StyleId;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  previewGradient: string;
  lightingPrompt: string;
  aestheticPrompt: string;
}

export interface CategoryOption {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  popularSubjects: string[];
}

export interface ColorPreset {
  name: string;
  primary: string;
  secondary: string;
  bgHex: string;
}

export interface IconConfig {
  category: CategoryId;
  customSubject: string;
  style: StyleId;
  primaryColor: string;
  secondaryColor: string;
  bgStyle: BackgroundStyle;
  platformMask: PlatformMask;
  customDirectives: string;
  engine: 'gemini' | 'dall-e-3';
  geminiApiKey?: string;
  openaiApiKey?: string;
}

export interface PlatformSize {
  platform: 'ios' | 'android' | 'web' | 'windows';
  name: string;
  subpath: string;
  filename: string;
  width: number;
  height: number;
  density?: string;
  purpose?: string;
}

export interface GeneratedIcon {
  id: string;
  createdAt: number;
  name: string;
  prompt: string;
  imageUrl: string;
  svgData?: string;
  config: IconConfig;
}
