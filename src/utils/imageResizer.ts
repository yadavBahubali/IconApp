import { PlatformSize, PlatformMask } from '../types/icon';

export const PLATFORM_SIZES: PlatformSize[] = [
  // iOS
  { platform: 'ios', name: 'App Store Master', subpath: 'ios', filename: 'AppIcon-1024.png', width: 1024, height: 1024, purpose: 'App Store Marketing' },
  { platform: 'ios', name: 'iPhone App @3x', subpath: 'ios', filename: 'AppIcon-60@3x.png', width: 180, height: 180, density: '@3x', purpose: 'iPhone Home Screen' },
  { platform: 'ios', name: 'iPhone App @2x', subpath: 'ios', filename: 'AppIcon-60@2x.png', width: 120, height: 120, density: '@2x', purpose: 'iPhone Home Screen' },
  { platform: 'ios', name: 'iPad Pro', subpath: 'ios', filename: 'AppIcon-83.5@2x.png', width: 167, height: 167, density: '@2x', purpose: 'iPad Pro Home Screen' },
  { platform: 'ios', name: 'iPad App @2x', subpath: 'ios', filename: 'AppIcon-76@2x.png', width: 152, height: 152, density: '@2x', purpose: 'iPad Home Screen' },
  { platform: 'ios', name: 'iPad App @1x', subpath: 'ios', filename: 'AppIcon-76@1x.png', width: 76, height: 76, density: '@1x', purpose: 'iPad Home Screen' },
  { platform: 'ios', name: 'Spotlight & Settings @3x', subpath: 'ios', filename: 'AppIcon-29@3x.png', width: 87, height: 87, density: '@3x', purpose: 'Settings / Spotlight' },
  { platform: 'ios', name: 'Spotlight & Settings @2x', subpath: 'ios', filename: 'AppIcon-29@2x.png', width: 58, height: 58, density: '@2x', purpose: 'Settings / Spotlight' },
  { platform: 'ios', name: 'Notification @3x', subpath: 'ios', filename: 'AppIcon-20@3x.png', width: 60, height: 60, density: '@3x', purpose: 'Notifications' },
  { platform: 'ios', name: 'Notification @2x', subpath: 'ios', filename: 'AppIcon-20@2x.png', width: 40, height: 40, density: '@2x', purpose: 'Notifications' },

  // Android
  { platform: 'android', name: 'Google Play Store', subpath: 'android', filename: 'playstore-icon-512.png', width: 512, height: 512, purpose: 'Play Store Listing' },
  { platform: 'android', name: 'Launcher xxxhdpi', subpath: 'android/mipmap-xxxhdpi', filename: 'ic_launcher.png', width: 192, height: 192, density: 'xxxhdpi', purpose: 'App Drawer' },
  { platform: 'android', name: 'Launcher xxhdpi', subpath: 'android/mipmap-xxhdpi', filename: 'ic_launcher.png', width: 144, height: 144, density: 'xxhdpi', purpose: 'App Drawer' },
  { platform: 'android', name: 'Launcher xhdpi', subpath: 'android/mipmap-xhdpi', filename: 'ic_launcher.png', width: 96, height: 96, density: 'xhdpi', purpose: 'App Drawer' },
  { platform: 'android', name: 'Launcher hdpi', subpath: 'android/mipmap-hdpi', filename: 'ic_launcher.png', width: 72, height: 72, density: 'hdpi', purpose: 'App Drawer' },
  { platform: 'android', name: 'Launcher mdpi', subpath: 'android/mipmap-mdpi', filename: 'ic_launcher.png', width: 48, height: 48, density: 'mdpi', purpose: 'App Drawer' },

  // Web & PWA
  { platform: 'web', name: 'Apple Touch Icon', subpath: 'web', filename: 'apple-touch-icon.png', width: 180, height: 180, purpose: 'iOS Safari Bookmark' },
  { platform: 'web', name: 'PWA Icon 512', subpath: 'web', filename: 'icon-512.png', width: 512, height: 512, purpose: 'PWA Splash Screen' },
  { platform: 'web', name: 'PWA Icon 192', subpath: 'web', filename: 'icon-192.png', width: 192, height: 192, purpose: 'PWA Home Icon' },
  { platform: 'web', name: 'Favicon 64x64', subpath: 'web', filename: 'favicon-64x64.png', width: 64, height: 64, purpose: 'Desktop Browser' },
  { platform: 'web', name: 'Favicon 32x32', subpath: 'web', filename: 'favicon-32x32.png', width: 32, height: 32, purpose: 'Browser Tab' },
  { platform: 'web', name: 'Favicon 16x16', subpath: 'web', filename: 'favicon-16x16.png', width: 16, height: 16, purpose: 'Browser Tab Mini' },

  // Windows & Desktop
  { platform: 'windows', name: 'Windows Large Tile', subpath: 'windows', filename: 'app-256.png', width: 256, height: 256, purpose: 'Start Menu Large Tile' },
  { platform: 'windows', name: 'Windows Medium Tile', subpath: 'windows', filename: 'app-128.png', width: 128, height: 128, purpose: 'Start Menu Tile' },
  { platform: 'windows', name: 'Windows Taskbar', subpath: 'windows', filename: 'app-48.png', width: 48, height: 48, purpose: 'Taskbar / Desktop' },
  { platform: 'windows', name: 'Windows Small Icon', subpath: 'windows', filename: 'app-32.png', width: 32, height: 32, purpose: 'File Explorer Icon' },
];

/**
 * Creates an HTML Image element from a data URL or image path.
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('Failed to load image for resizing: ' + e));
    img.src = src;
  });
}

/**
 * Applies platform shape clipping (iOS squircle, circle, etc.) to a canvas context
 */
function applyMaskToCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mask: PlatformMask
) {
  if (mask === 'square') return;

  ctx.beginPath();
  if (mask === 'android-circle') {
    const r = Math.min(width, height) / 2;
    ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
  } else if (mask === 'ios' || mask === 'macos') {
    // Apple continuous squircle approx (corner radius approx 22.5% of dimension)
    const radius = width * 0.225;
    ctx.roundRect(0, 0, width, height, radius);
  } else if (mask === 'android-squircle') {
    // Android rounded square
    const radius = width * 0.3;
    ctx.roundRect(0, 0, width, height, radius);
  } else if (mask === 'windows') {
    // Windows subtle tile radius
    const radius = width * 0.08;
    ctx.roundRect(0, 0, width, height, radius);
  }
  ctx.closePath();
  ctx.clip();
}

/**
 * Resizes an image into target dimensions with high-quality bicubic smoothing
 * and optional platform shape clipping.
 */
export async function resizeImageToBlob(
  sourceImage: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  mask: PlatformMask = 'square'
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // Smooth scaling configuration
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (mask !== 'square') {
    ctx.save();
    applyMaskToCanvas(ctx, targetWidth, targetHeight, mask);
  }

  ctx.drawImage(sourceImage, 0, 0, targetWidth, targetHeight);

  if (mask !== 'square') {
    ctx.restore();
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Canvas toBlob failed'));
    }, 'image/png');
  });
}

/**
 * Convenience helper to get a resized data URL
 */
export async function resizeImageToDataUrl(
  sourceImage: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  mask: PlatformMask = 'square'
): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas 2D context not available');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (mask !== 'square') {
    ctx.save();
    applyMaskToCanvas(ctx, targetWidth, targetHeight, mask);
  }

  ctx.drawImage(sourceImage, 0, 0, targetWidth, targetHeight);

  if (mask !== 'square') {
    ctx.restore();
  }

  return canvas.toDataURL('image/png');
}
