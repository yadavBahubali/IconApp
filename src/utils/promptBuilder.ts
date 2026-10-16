import { IconConfig, StyleId, CategoryId, StyleOption, CategoryOption, ColorPreset } from '../types/icon';

export const CATEGORIES: CategoryOption[] = [
  {
    id: 'finance',
    name: 'Finance & Crypto',
    iconName: 'Landmark',
    description: 'Banking, crypto, wallets, charts, and investment',
    popularSubjects: ['Gold Vault', 'Crypto Wallet', 'Bull Market Chart', 'Credit Card Chip', 'Piggy Bank'],
  },
  {
    id: 'food',
    name: 'Food & Drink',
    iconName: 'Coffee',
    description: 'Cafes, restaurants, culinary dishes, and drinks',
    popularSubjects: ['Coffee Cup with Steam', 'Artisan Bakery Croissant', 'Chef Hat & Whisk', 'Cocktail Glass', 'Sushi Roll'],
  },
  {
    id: 'game',
    name: 'Gaming & Play',
    iconName: 'Gamepad2',
    description: 'Gamepads, swords, shields, fantasy, and arcade',
    popularSubjects: ['Glowing Game Controller', 'Crystal Fantasy Shield', 'Arcade Joystick', 'Dragon Emblem', 'Magic Potion Flask'],
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    iconName: 'HeartPulse',
    description: 'Wellness, cardiology, exercise, and meditation',
    popularSubjects: ['Pulsing Heart Monitor', 'Dumbbell & Flame', 'Zen Lotus Flower', 'Smart Fitness Ring', 'Water Hydration Drop'],
  },
  {
    id: 'social',
    name: 'Social & Chat',
    iconName: 'MessageSquareShare',
    description: 'Messaging, networking, camera, and community',
    popularSubjects: ['Chat Speech Bubble', 'Camera Aperture Ring', 'Paper Airplane Message', 'Microphone On Air', 'Sparkling Star'],
  },
  {
    id: 'productivity',
    name: 'Productivity & Tools',
    iconName: 'Briefcase',
    description: 'Task checklists, code editor, calendar, and notes',
    popularSubjects: ['Glowing Checklist Checkmark', 'Lightning Bolt Cloud', 'Compass Needle', 'Atomic Code Core', 'Fountain Pen Tip'],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Store',
    iconName: 'ShoppingBag',
    description: 'Shopping bags, delivery parcels, and shopping carts',
    popularSubjects: ['Modern Shopping Bag', 'Delivery Drone Parcel', 'Diamond Jewelry Ring', 'Gift Box with Ribbon', 'Price Tag Badge'],
  },
  {
    id: 'travel',
    name: 'Travel & Maps',
    iconName: 'Navigation',
    description: 'Aviation, navigation pins, luggage, and exploration',
    popularSubjects: ['Supersonic Airplane', 'Navigation Map Pin', 'Vintage Leather Suitcase', 'Globe with Rings', 'Mountain Summit'],
  },
  {
    id: 'education',
    name: 'Education & Science',
    iconName: 'GraduationCap',
    description: 'Academics, books, telescope, and laboratory',
    popularSubjects: ['Graduation Cap & Scroll', 'Open Glowing Book', 'Microscope Lens', 'Space Telescope', 'DNA Double Helix'],
  },
  {
    id: 'custom',
    name: 'Custom Idea',
    iconName: 'Sparkles',
    description: 'Type any custom app icon concept or company theme',
    popularSubjects: ['Cybernetic Neural Brain', 'Origami Bird', 'Hourglass with Golden Sand', 'Acoustic Guitar Pick'],
  },
];

export const STYLES: StyleOption[] = [
  {
    id: 'flat',
    name: 'Flat Minimal',
    tagline: 'Clean 2D Vector & Bold Geometry',
    description: 'High contrast, geometric silhouettes, zero gradients, iconic Apple Human Interface guidelines.',
    badge: '2D Vector',
    previewGradient: 'from-amber-400 to-orange-500',
    lightingPrompt: 'flat lighting, crisp contrast, pure vector aesthetic',
    aestheticPrompt: 'flat vector minimalist app icon, clean geometric silhouettes, bold solid shapes, zero gradients, crisp vector illustration, Apple Human Interface guidelines, high contrast',
  },
  {
    id: '3d',
    name: '3D Isometric',
    tagline: 'Pixar Glossy & Smooth Isometric Depth',
    description: 'Smooth clay & glossy plastic shaders, tactile volume, ambient occlusion, studio rim lights.',
    badge: '3D Glossy',
    previewGradient: 'from-blue-500 to-indigo-600',
    lightingPrompt: 'studio rim lighting, soft diffuse ambient occlusion, glossy reflective highlights',
    aestheticPrompt: 'professional high-quality 3D isometric app icon, smooth glossy plastic and soft clay shaders, Pixar 3D rendered aesthetic, isometric depth, soft ambient occlusion, studio rim light, Apple App Store style',
  },
  {
    id: 'skeuomorphic',
    name: 'Skeuomorphic',
    tagline: 'Tactile Materials & Luxury Glass/Metal',
    description: 'Brushed metal, polished glass accents, fine debossed bevels, tactile realism, iOS classic prestige.',
    badge: 'Tactile Realism',
    previewGradient: 'from-emerald-500 to-teal-700',
    lightingPrompt: 'directional spot lighting, micro-shadows, realistic subsurface specular highlights',
    aestheticPrompt: 'hyper-realistic skeuomorphic app icon, rich tactile textures, brushed metal, polished glass accents, fine bevels and debossed details, authentic lighting and depth, luxury craftsmanship',
  },
  {
    id: 'line-art',
    name: 'Line Art / Monoline',
    tagline: 'Monoline Contours & Elegant Wireframe',
    description: 'Clean uniform stroke weight, elegant wireframe glyph badge, minimalist graphic silhouette.',
    badge: 'Crisp Glyph',
    previewGradient: 'from-fuchsia-500 to-pink-600',
    lightingPrompt: 'clean monoline illumination, zero clutter, high graphic legibility',
    aestheticPrompt: 'elegant minimalist line art glyph app icon, clean monoline strokes, uniform stroke weight, crisp modern wireframe icon badge, vector contour, refined minimalism',
  },
  {
    id: 'gradient',
    name: 'Modern Gradient',
    tagline: 'Frosted Glassmorphism & Mesh Glow',
    description: 'Vibrant multi-layer frosted translucent glass, inner neon glow, ultra-smooth mesh color flow.',
    badge: 'iOS 18 Mesh',
    previewGradient: 'from-purple-500 to-pink-500',
    lightingPrompt: 'soft frosted back-illumination, translucent optical refractions, gentle inner glow',
    aestheticPrompt: 'ultra-modern vibrant frosted glassmorphism app icon, fluid mesh gradients, multi-layer translucent glass plates, subtle inner glow, sleek iOS 18 design language',
  },
  {
    id: 'claymorphism',
    name: 'Claymorphism',
    tagline: 'Puffy Matte 3D & Playful Volume',
    description: 'Soft rounded marshmallow clay aesthetic, friendly puffy volume, gentle studio lighting.',
    badge: 'Puffy Clay',
    previewGradient: 'from-rose-400 to-amber-300',
    lightingPrompt: 'soft omni-directional softbox lighting, matte finish, zero harsh glares',
    aestheticPrompt: 'soft 3D claymorphic app icon, cute puffy matte clay aesthetic, rounded puffy 3D volume, gentle studio lighting, playful tactile form',
  },
  {
    id: 'pixel-art',
    name: 'Retro Pixel Art',
    tagline: '16-Bit Nostalgia & Isometric Sprite',
    description: 'Crisp pixel grid, vibrant arcade palette, charming nostalgic retro game console badge.',
    badge: '16-Bit Arcade',
    previewGradient: 'from-yellow-400 to-red-500',
    lightingPrompt: 'pixel-perfect lighting, authentic dithering, crisp edges',
    aestheticPrompt: 'nostalgic 16-bit retro pixel art app icon, crisp pixel grid, vibrant arcade color grading, clean isometric pixel sprite, retro gaming emblem',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    tagline: 'Futuristic Dark Mode & Electric Glow',
    description: 'Deep obsidian backdrop with glowing luminescent circuit traces and electric edge lasers.',
    badge: 'Neon Glow',
    previewGradient: 'from-cyan-500 to-blue-600',
    lightingPrompt: 'high-contrast neon edge emission, luminescent holographic bloom, deep ambient darkness',
    aestheticPrompt: 'futuristic cyberpunk neon app icon, dark slate background, electric neon edge glow, high-tech holographic circuitry accents, glowing high-contrast emblem',
  },
];

export const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Vibrant Orange', primary: '#F97316', secondary: '#FBBF24', bgHex: '#FFF7ED' },
  { name: 'Electric Indigo', primary: '#6366F1', secondary: '#A855F7', bgHex: '#EEF2FF' },
  { name: 'Emerald Mint', primary: '#10B981', secondary: '#06B6D4', bgHex: '#ECFDF5' },
  { name: 'Sunset Coral', primary: '#F43F5E', secondary: '#FB923C', bgHex: '#FFF1F2' },
  { name: 'Apple Cyber Blue', primary: '#0284C7', secondary: '#38BDF8', bgHex: '#F0F9FF' },
  { name: 'Midnight Violet', primary: '#8B5CF6', secondary: '#EC4899', bgHex: '#F5F3FF' },
  { name: 'Gold & Obsidian', primary: '#EAB308', secondary: '#F59E0B', bgHex: '#0F172A' },
  { name: 'Monochrome Slate', primary: '#1E293B', secondary: '#64748B', bgHex: '#F8FAFC' },
];

/**
 * Builds the comprehensive "Secret Prompt" according to the application blueprint.
 * e.g., "A professional high-quality 3D isometric app icon of a coffee cup, vibrant orange theme,
 * centered, isolated on a white background, Apple App Store style, high resolution, no text, no words."
 */
export function buildSecretPrompt(config: IconConfig): string {
  const selectedStyle = STYLES.find((s) => s.id === config.style) || STYLES[1];
  const selectedCategory = CATEGORIES.find((c) => c.id === config.category) || CATEGORIES[0];

  // Derive target subject
  let subject = config.customSubject.trim();
  if (!subject) {
    subject = selectedCategory.popularSubjects[0] || 'app symbol';
  }

  // Background directive
  let bgClause = 'isolated on a pristine white background';
  if (config.bgStyle === 'dark') {
    bgClause = 'centered on a sleek deep dark slate background';
  } else if (config.bgStyle === 'gradient') {
    bgClause = `blended seamlessly onto a soft harmonious gradient background featuring ${config.secondaryColor}`;
  } else if (config.bgStyle === 'transparent') {
    bgClause = 'cleanly centered and isolated, pure solid background, crisp standalone silhouette';
  } else if (config.bgStyle === 'pastel') {
    bgClause = 'resting on a soothing subtle pastel tint background';
  }

  // Color clause
  const colorClause = `dominant color scheme of ${config.primaryColor} with vibrant accents of ${config.secondaryColor}`;

  // Platform style clause
  const platformClause =
    config.platformMask === 'android-circle' || config.platformMask === 'android-squircle'
      ? 'Google Play Store modern adaptive icon style'
      : 'Apple iOS App Store and macOS HIG icon design standard';

  // Negative and quality directives
  const qualityClause =
    'high resolution, award-winning mobile UI design, perfectly centered composition, beautiful focal point, clean silhouette, no text, no letters, no typography, no words, no watermark, no photo borders, no ugly distortions';

  // Custom directives
  const customClause = config.customDirectives.trim() ? `, ${config.customDirectives.trim()}` : '';

  // Brand and company logo directives
  let brandClause = '';
  if (config.brandLogo) {
    const { companyName, logoDataUrl, mode } = config.brandLogo;
    const parts: string[] = [];

    if (companyName && companyName.trim()) {
      parts.push(`for brand and company "${companyName.trim()}"`);
    }

    if (logoDataUrl) {
      if (mode === 'motif') {
        parts.push('incorporating the company brand logo as the central iconic emblem and primary design motif');
      } else if (mode === 'adaptation') {
        parts.push('faithfully translating the uploaded company brand logo aesthetic into a unified tactile app icon');
      } else {
        parts.push('stylized in the distinctive geometric silhouette and brand hallmarks of the company logo');
      }
    }

    if (parts.length > 0) {
      brandClause = `, ${parts.join(', ')}`;
    }
  }

  // Compose prompt
  const secretPrompt = `A ${selectedStyle.aestheticPrompt} of ${subject}${brandClause}, ${colorClause}, ${bgClause}, ${platformClause}, ${selectedStyle.lightingPrompt}${customClause}, ${qualityClause}.`;

  return secretPrompt;
}
