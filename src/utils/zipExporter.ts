import JSZip from 'jszip';
import { PLATFORM_SIZES, loadImage, resizeImageToBlob } from './imageResizer';
import { PlatformMask } from '../types/icon';

/**
 * Generates an official Xcode Assets.xcassets/AppIcon.appiconset/Contents.json manifest
 */
function generateXcodeContentsJson(): string {
  return JSON.stringify(
    {
      images: [
        { idiom: 'iphone', size: '20x20', scale: '2x', filename: 'AppIcon-20@2x.png' },
        { idiom: 'iphone', size: '20x20', scale: '3x', filename: 'AppIcon-20@3x.png' },
        { idiom: 'iphone', size: '29x29', scale: '2x', filename: 'AppIcon-29@2x.png' },
        { idiom: 'iphone', size: '29x29', scale: '3x', filename: 'AppIcon-29@3x.png' },
        { idiom: 'iphone', size: '40x40', scale: '2x', filename: 'AppIcon-40@2x.png' },
        { idiom: 'iphone', size: '40x40', scale: '3x', filename: 'AppIcon-60@2x.png' },
        { idiom: 'iphone', size: '60x60', scale: '2x', filename: 'AppIcon-60@2x.png' },
        { idiom: 'iphone', size: '60x60', scale: '3x', filename: 'AppIcon-60@3x.png' },
        { idiom: 'ipad', size: '20x20', scale: '1x', filename: 'AppIcon-20@2x.png' },
        { idiom: 'ipad', size: '20x20', scale: '2x', filename: 'AppIcon-20@2x.png' },
        { idiom: 'ipad', size: '29x29', scale: '1x', filename: 'AppIcon-29@2x.png' },
        { idiom: 'ipad', size: '29x29', scale: '2x', filename: 'AppIcon-29@2x.png' },
        { idiom: 'ipad', size: '40x40', scale: '1x', filename: 'AppIcon-40@2x.png' },
        { idiom: 'ipad', size: '40x40', scale: '2x', filename: 'AppIcon-40@2x.png' },
        { idiom: 'ipad', size: '76x76', scale: '1x', filename: 'AppIcon-76@1x.png' },
        { idiom: 'ipad', size: '76x76', scale: '2x', filename: 'AppIcon-76@2x.png' },
        { idiom: 'ipad', size: '83.5x83.5', scale: '2x', filename: 'AppIcon-83.5@2x.png' },
        { idiom: 'ios-marketing', size: '1024x1024', scale: '1x', filename: 'AppIcon-1024.png' },
      ],
      info: {
        version: 1,
        author: 'AppIconStudio',
      },
    },
    null,
    2
  );
}

/**
 * Generates a modern site.webmanifest for Web / PWA deployment
 */
function generateWebManifest(appName: string): string {
  return JSON.stringify(
    {
      name: appName,
      short_name: appName,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
    },
    null,
    2
  );
}

/**
 * Builds and downloads the complete multi-platform Icon Asset Pack ZIP
 */
export async function generateIconPackZip(
  sourceImageUrl: string,
  appName: string = 'AppIcon',
  mask: PlatformMask = 'square',
  svgContent?: string,
  onProgress?: (percent: number, currentTask: string) => void
): Promise<Blob> {
  const zip = new JSZip();
  const sourceImage = await loadImage(sourceImageUrl);

  const totalSizes = PLATFORM_SIZES.length;
  let completed = 0;

  // Process all platform sizes concurrently
  for (const sizeConfig of PLATFORM_SIZES) {
    onProgress?.(
      Math.round((completed / (totalSizes + 2)) * 100),
      `Resizing ${sizeConfig.platform.toUpperCase()} ${sizeConfig.width}x${sizeConfig.height}...`
    );

    // Apply platform-appropriate mask if specified
    const maskToApply =
      mask === 'square'
        ? 'square'
        : sizeConfig.platform === 'ios'
        ? 'ios'
        : sizeConfig.platform === 'android'
        ? mask === 'android-circle'
          ? 'android-circle'
          : 'android-squircle'
        : mask;

    const blob = await resizeImageToBlob(
      sourceImage,
      sizeConfig.width,
      sizeConfig.height,
      maskToApply
    );

    // Add to corresponding ZIP folder path
    const filePath = `${sizeConfig.subpath}/${sizeConfig.filename}`;
    zip.file(filePath, blob);

    completed++;
  }

  // Add Xcode Assets Contents.json
  zip.file('ios/AppIcon.appiconset/Contents.json', generateXcodeContentsJson());

  // Add PWA site.webmanifest
  zip.file('web/site.webmanifest', generateWebManifest(appName));

  // Add SVG vector if available
  if (svgContent) {
    zip.file('vector/app-icon.svg', svgContent);
  }

  // Add README integration instructions
  const readme = `# ${appName} - Multi-Platform App Icon Pack

Generated with App Icon Studio — Developed by Kuldeep Yadav.

## Included Directories:
- **/ios/**: iOS Xcode AppIcon assets (iPhone, iPad, App Store 1024x1024) and Contents.json
- **/android/**: Android mipmap resources (xxxhdpi, xxhdpi, xhdpi, hdpi, mdpi) + 512x512 Play Store asset
- **/web/**: Favicons (16x16, 32x32, 64x64), Apple Touch Icon (180x180), PWA icons (192, 512), and site.webmanifest
- **/windows/**: Windows Start Menu tiles and desktop icons (256, 128, 48, 32)
${svgContent ? '- **/vector/**: Scalable vector graphic (SVG) for infinite resolution scaling\n' : ''}

### Quick Install Guide:
1. **iOS**: Drag the \`ios/\` folder directly into Xcode Assets.xcassets.
2. **Android**: Copy \`android/mipmap-*/\` into your Android Studio project under \`app/src/main/res/\`.
3. **Web**: Place files in your public root and reference \`<link rel="icon" href="/favicon-32x32.png">\`.
`;
  zip.file('README.md', readme);

  onProgress?.(95, 'Bundling ZIP archive...');

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  onProgress?.(100, 'Ready!');
  return zipBlob;
}

/**
 * Triggers a browser download of a given Blob with filename
 */
export function triggerFileDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
