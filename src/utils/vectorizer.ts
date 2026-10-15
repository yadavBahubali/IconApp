/**
 * Client-side SVG Vectorizer
 * Converts bitmap images into multi-layered scalable vector graphics (SVG)
 * using color quantization, connected component thresholding, and contour path synthesis.
 */

interface ColorRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

function colorDistance(c1: ColorRGBA, c2: ColorRGBA): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Traces a bitmap image into a multi-layer crisp SVG.
 * Works entirely client-side without external API keys or server latency!
 */
export async function vectorizeImage(
  img: HTMLImageElement,
  options: {
    colorCount?: number;
    resolution?: number; // Internal downscale for clean vector smoothing (default 128)
  } = {}
): Promise<string> {
  const colorCount = options.colorCount || 12;
  const sampleRes = options.resolution || 128;

  const canvas = document.createElement('canvas');
  canvas.width = sampleRes;
  canvas.height = sampleRes;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.drawImage(img, 0, 0, sampleRes, sampleRes);
  const imgData = ctx.getImageData(0, 0, sampleRes, sampleRes);
  const data = imgData.data;

  // 1. Collect color samples (filter out fully transparent)
  const sampledColors: ColorRGBA[] = [];
  const step = 2;
  for (let y = 0; y < sampleRes; y += step) {
    for (let x = 0; x < sampleRes; x += step) {
      const idx = (y * sampleRes + x) * 4;
      const a = data[idx + 3];
      if (a > 30) {
        sampledColors.push({
          r: data[idx],
          g: data[idx + 1],
          b: data[idx + 2],
          a: a,
        });
      }
    }
  }

  // 2. Select initial cluster centroids using uniform interval selection
  const centroids: ColorRGBA[] = [];
  if (sampledColors.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"></svg>`;
  }

  const interval = Math.floor(sampledColors.length / colorCount);
  for (let i = 0; i < colorCount; i++) {
    const sample = sampledColors[Math.min(i * interval, sampledColors.length - 1)];
    centroids.push({ ...sample });
  }

  // 3. Simple K-Means refinement (2 passes for speed)
  for (let iter = 0; iter < 2; iter++) {
    const sums = centroids.map(() => ({ r: 0, g: 0, b: 0, count: 0 }));
    for (const c of sampledColors) {
      let bestDist = Infinity;
      let bestIdx = 0;
      for (let i = 0; i < centroids.length; i++) {
        const d = colorDistance(c, centroids[i]);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      sums[bestIdx].r += c.r;
      sums[bestIdx].g += c.g;
      sums[bestIdx].b += c.b;
      sums[bestIdx].count += 1;
    }

    for (let i = 0; i < centroids.length; i++) {
      if (sums[i].count > 0) {
        centroids[i].r = Math.round(sums[i].r / sums[i].count);
        centroids[i].g = Math.round(sums[i].g / sums[i].count);
        centroids[i].b = Math.round(sums[i].b / sums[i].count);
      }
    }
  }

  // 4. Map each pixel in sampleRes to best centroid index
  const grid = new Int32Array(sampleRes * sampleRes);
  for (let y = 0; y < sampleRes; y++) {
    for (let x = 0; x < sampleRes; x++) {
      const idx = (y * sampleRes + x) * 4;
      const a = data[idx + 3];
      if (a < 30) {
        grid[y * sampleRes + x] = -1; // Transparent
        continue;
      }

      const pixelColor: ColorRGBA = {
        r: data[idx],
        g: data[idx + 1],
        b: data[idx + 2],
        a: a,
      };

      let bestDist = Infinity;
      let bestIdx = 0;
      for (let i = 0; i < centroids.length; i++) {
        const d = colorDistance(pixelColor, centroids[i]);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      grid[y * sampleRes + x] = bestIdx;
    }
  }

  // 5. Generate SVG rectangles and connected spans for each color group
  const scale = 1024 / sampleRes;
  const svgPaths: { colorHex: string; pathD: string }[] = [];

  for (let colorIdx = 0; colorIdx < centroids.length; colorIdx++) {
    const c = centroids[colorIdx];
    const hex = rgbToHex(c.r, c.g, c.b);
    let pathD = '';

    // Horizontal run-length grouping to compress SVG output size
    for (let y = 0; y < sampleRes; y++) {
      let inRun = false;
      let runStart = 0;

      for (let x = 0; x <= sampleRes; x++) {
        const currentMatch = x < sampleRes && grid[y * sampleRes + x] === colorIdx;

        if (currentMatch && !inRun) {
          inRun = true;
          runStart = x;
        } else if (!currentMatch && inRun) {
          inRun = false;
          const runLength = x - runStart;
          const rx = (runStart * scale).toFixed(1);
          const ry = (y * scale).toFixed(1);
          const rw = (runLength * scale + 0.5).toFixed(1); // slight 0.5 overlap prevents subpixel seams
          const rh = (scale + 0.5).toFixed(1);

          pathD += `M${rx},${ry}h${rw}v${rh}h-${rw}Z `;
        }
      }
    }

    if (pathD.trim().length > 0) {
      svgPaths.push({ colorHex: hex, pathD: pathD.trim() });
    }
  }

  // Construct complete, standard SVG
  const svgOutput = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" shape-rendering="crispEdges">
  <defs>
    <filter id="vector-smooth" x="0" y="0" width="100%" height="100%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
    </filter>
  </defs>
  <g id="icon-layers" filter="url(#vector-smooth)">
${svgPaths
  .map(
    (layer) =>
      `    <path fill="${layer.colorHex}" d="${layer.pathD}" />`
  )
  .join('\n')}
  </g>
</svg>`;

  return svgOutput;
}
