import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./sanity.client";

const imageBuilder = createImageUrlBuilder(sanityClient);

/**
 * Returns a Sanity image URL builder instance for a given source.
 * Chain methods like .width(), .height(), .fit(), .format(), .auto() etc.
 *
 * Usage:
 *   urlFor(image).width(800).height(600).format("webp").auto("format").url()
 */
export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source);
}

// ─── Preset helpers ───────────────────────────────────────────────────────────

export function getImageUrl(
  source: SanityImageSource,
  width: number,
  height?: number
): string {
  const builder = imageBuilder.image(source).width(width).auto("format").format("webp");
  return height ? builder.height(height).url() : builder.url();
}

export function getBlurDataUrl(source: SanityImageSource): string {
  return imageBuilder
    .image(source)
    .width(20)
    .height(20)
    .blur(10)
    .format("webp")
    .url();
}

export function getOgImageUrl(source: SanityImageSource): string {
  return imageBuilder
    .image(source)
    .width(1200)
    .height(630)
    .fit("crop")
    .format("webp")
    .url();
}

export function getThumbUrl(source: SanityImageSource): string {
  return imageBuilder
    .image(source)
    .width(400)
    .height(300)
    .fit("crop")
    .format("webp")
    .url();
}

export function getHeroUrl(source: SanityImageSource): string {
  return imageBuilder
    .image(source)
    .width(1920)
    .height(1080)
    .fit("crop")
    .format("webp")
    .quality(85)
    .url();
}

// ─── Dimensions helper ────────────────────────────────────────────────────────

export function getImageDimensions(source: SanityImageSource & {
  asset?: { metadata?: { dimensions?: { width: number; height: number; aspectRatio: number } } };
}): { width: number; height: number; aspectRatio: number } | null {
  const dims = (source as {
    asset?: { metadata?: { dimensions?: { width: number; height: number; aspectRatio: number } } };
  }).asset?.metadata?.dimensions;
  return dims ?? null;
}
