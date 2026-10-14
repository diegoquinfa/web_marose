import type { ImageValue } from "emdash";

/**
 * Resolves a CMS image value to a plain URL.
 *
 * `<Image>` from `emdash/ui` is the default renderer for CMS images, but the
 * React islands only receive serializable strings (`ProductView.photos`), so
 * the server sections resolve those URLs here. Local media has no `src`; the
 * media route serves it by `meta.storageKey` (falling back to the media id).
 */
export function mediaUrl(image: ImageValue | null | undefined): string {
	if (!image) return "";
	if (image.src) return image.src;

	const storageKey = image.meta?.storageKey;
	const key = typeof storageKey === "string" ? storageKey : image.id;
	return `/_emdash/api/media/file/${key}`;
}
