const shimmerSvg = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f5f5f5" offset="20%" />
      <stop stop-color="#e8e8e8" offset="50%" />
      <stop stop-color="#f5f5f5" offset="70%" />
    </linearGradient>
    <pattern id="p" width="200%" height="100%">
      <rect width="50%" height="100%" fill="url(#g)" />
      <rect x="50%" width="50%" height="100%" fill="url(#g)" transform="translate(100%,0)" />
      <animateTransform
        attributeName="patternTransform"
        type="translate"
        from="-100% 0"
        to="100% 0"
        dur="1.6s"
        repeatCount="indefinite"
      />
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#p)" />
</svg>`;

function toBase64(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(str);
}

/**
 * Returns a `data:image/svg+xml;base64,...` shimmer string
 * suitable for use as `blurDataURL` in next/image.
 */
export function shimmerBlur(width = 700, height = 475): string {
  return `data:image/svg+xml;base64,${toBase64(shimmerSvg(width, height))}`;
}

// Precomputed common sizes
export const BLUR_CARD = shimmerBlur(600, 400);
export const BLUR_SQUARE = shimmerBlur(400, 400);
export const BLUR_HERO = shimmerBlur(1920, 1080);
export const BLUR_GALLERY = shimmerBlur(800, 600);
export const BLUR_OG = shimmerBlur(1200, 630);
