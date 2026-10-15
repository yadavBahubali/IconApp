import { GeneratedIcon } from '../types/icon';

// SVG Data URIs for instant preview out of the box
export const DEFAULT_SAMPLE_ICONS: GeneratedIcon[] = [
  {
    id: 'sample-coffee-3d',
    createdAt: Date.now() - 3600000,
    name: 'Coffee Cup 3D',
    prompt:
      'A professional high-quality 3D isometric app icon of a coffee cup with rising steam, vibrant orange theme with amber gold accents, isolated on a white background, Apple App Store style, studio rim lighting, Pixar 3D aesthetic, high resolution, no text, no words.',
    imageUrl:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fff7ed" />
      <stop offset="100%" stop-color="#fed7aa" />
    </radialGradient>
    <linearGradient id="cup" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb923c" />
      <stop offset="50%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>
    <linearGradient id="liquid" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78350f" />
      <stop offset="100%" stop-color="#451a03" />
    </linearGradient>
    <linearGradient id="handle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdba74" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="20" flood-color="#7c2d12" flood-opacity="0.35" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="115" fill="url(#bg)" />
  <g filter="url(#shadow)">
    <!-- Plate -->
    <ellipse cx="256" cy="380" rx="170" ry="45" fill="#f97316" opacity="0.25" />
    <ellipse cx="256" cy="370" rx="150" ry="38" fill="#ffffff" />
    <ellipse cx="256" cy="370" rx="130" ry="32" fill="#fff7ed" />

    <!-- Handle -->
    <path d="M330 220 C420 220, 420 330, 320 330" fill="none" stroke="url(#handle)" stroke-width="36" stroke-linecap="round" />

    <!-- Cup Body -->
    <path d="M140 180 L180 340 C190 370, 322 370, 332 340 L372 180 Z" fill="url(#cup)" />
    <!-- Cup Rim Highlight -->
    <ellipse cx="256" cy="180" rx="116" ry="32" fill="#fdba74" />
    <ellipse cx="256" cy="180" rx="108" ry="28" fill="url(#liquid)" />
    <!-- Foam Heart -->
    <path d="M256 182 C256 174, 240 166, 230 176 C218 188, 256 202, 256 202 C256 202, 294 188, 282 176 C272 166, 256 174, 256 182 Z" fill="#ffedd5" />
    
    <!-- Steam -->
    <path d="M210 130 C200 100, 230 70, 220 40" fill="none" stroke="#fdba74" stroke-width="12" stroke-linecap="round" opacity="0.8" />
    <path d="M256 120 C246 85, 276 55, 266 25" fill="none" stroke="#f97316" stroke-width="14" stroke-linecap="round" opacity="0.7" />
    <path d="M302 130 C292 100, 322 70, 312 40" fill="none" stroke="#fed7aa" stroke-width="10" stroke-linecap="round" opacity="0.8" />
  </g>
</svg>
`),
    config: {
      category: 'food',
      customSubject: 'Coffee Cup with steam',
      style: '3d',
      primaryColor: '#F97316',
      secondaryColor: '#FBBF24',
      bgStyle: 'white',
      platformMask: 'ios',
      customDirectives: 'warm lighting, rich crema, foam art',
      engine: 'gemini',
    },
  },
  {
    id: 'sample-wallet-flat',
    createdAt: Date.now() - 7200000,
    name: 'Crypto Vault Flat',
    prompt:
      'A flat vector minimalist app icon of a gold vault safe with crypto coin, clean geometric silhouettes, electric indigo theme with cyan accents, Apple Human Interface guidelines, high contrast, no text, no words.',
    imageUrl:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#312e81" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.3" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="115" fill="url(#bg2)" />
  <g filter="url(#glow)">
    <rect x="110" y="110" width="292" height="292" rx="48" fill="#1e1b4b" stroke="#818cf8" stroke-width="8" />
    <!-- Safe Dial -->
    <circle cx="256" cy="256" r="88" fill="#06b6d4" />
    <circle cx="256" cy="256" r="64" fill="#1e1b4b" />
    <circle cx="256" cy="256" r="28" fill="#fbbf24" />
    <!-- Spokes -->
    <rect x="250" y="180" width="12" height="24" rx="6" fill="#818cf8" />
    <rect x="250" y="308" width="12" height="24" rx="6" fill="#818cf8" />
    <rect x="180" y="250" width="24" height="12" rx="6" fill="#818cf8" />
    <rect x="308" y="250" width="24" height="12" rx="6" fill="#818cf8" />
    <!-- Keyhole -->
    <circle cx="360" cy="256" r="8" fill="#38bdf8" />
  </g>
</svg>
`),
    config: {
      category: 'finance',
      customSubject: 'Gold Vault Safe',
      style: 'flat',
      primaryColor: '#6366F1',
      secondaryColor: '#06B6D4',
      bgStyle: 'dark',
      platformMask: 'ios',
      customDirectives: 'clean flat vector',
      engine: 'gemini',
    },
  },
  {
    id: 'sample-health-gradient',
    createdAt: Date.now() - 10800000,
    name: 'Pulse Heart Gradient',
    prompt:
      'An ultra-modern vibrant frosted glassmorphism app icon of a pulsing heart monitor, fluid mesh gradients, emerald mint and cyber blue theme, sleek iOS 18 design language, no text, no words.',
    imageUrl:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="50%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <filter id="heartShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#10b981" flood-opacity="0.4" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="115" fill="url(#bg3)" />
  <g filter="url(#heartShadow)">
    <path d="M256 390 C256 390 120 295 120 200 C120 145 160 115 210 115 C235 115 250 130 256 142 C262 130 277 115 302 115 C352 115 392 145 392 200 C392 295 256 390 256 390 Z" fill="#047857" opacity="0.35" />
    <!-- Frosted Glass Heart Overlay -->
    <path d="M256 370 C256 370 140 285 140 195 C140 150 175 125 215 125 C238 125 250 138 256 148 C262 138 274 125 297 125 C337 125 372 150 372 195 C372 285 256 370 256 370 Z" fill="#059669" opacity="0.6" stroke="#6ee7b7" stroke-width="4" />
    <!-- EKG Line -->
    <path d="M150 256 L200 256 L220 210 L245 310 L275 180 L295 280 L315 256 L362 256" fill="none" stroke="url(#pulseGrad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>
`),
    config: {
      category: 'health',
      customSubject: 'Pulsing Heart Monitor',
      style: 'gradient',
      primaryColor: '#10B981',
      secondaryColor: '#38BDF8',
      bgStyle: 'dark',
      platformMask: 'ios',
      customDirectives: 'glowing EKG line, frosted glass heart',
      engine: 'gemini',
    },
  },
];
