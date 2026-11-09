import { z } from "zod"
import { sectionBase, type LoadedContent } from "../shared"
import type { GalleryPhoto } from "../collections/gallery"

// Which groups to show, in this order. Each group's photos come from the
// gallery collection.
export const GallerySectionSchema = z.strictObject({
  ...sectionBase,
  type: z.literal("gallery"),
  // Not shown yet; the page's hero carries the title.
  heading: z.string().min(1).optional(),
  intro: z.string().optional(),
  groups: z
    .array(
      z.strictObject({ group: z.string().min(1), heading: z.string().min(1) }),
    )
    .min(1),
})

export type GallerySection = z.infer<typeof GallerySectionSchema>
export type ResolvedGallerySection = Omit<GallerySection, "groups"> & {
  groups: Array<{ group: string; heading: string; photos: GalleryPhoto[] }>
}

// ---------- Resolving ----------

// Groups with no photos are dropped; undefined when none is left, so the whole
// section disappears.
export function resolveGallery(
  section: GallerySection,
  content: LoadedContent,
): ResolvedGallerySection | undefined {
  const groups = section.groups
    .map(({ group, heading }) => ({
      group,
      heading,
      photos: content.gallery.photos.filter((photo) => photo.group === group),
    }))
    .filter((g) => g.photos.length > 0)
  return groups.length > 0 ? { ...section, groups } : undefined
}

// ---------- Validation ----------

export function checkGalleries(
  label: string,
  sections: Array<{ type: string; id: string; [key: string]: unknown }>,
  groupIds: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "gallery") continue
    const seen = new Set<string>()
    for (const { group } of (section as GallerySection).groups) {
      if (!groupIds.has(group)) {
        errors.push(
          `${label}: gallery "${section.id}" has unknown group "${group}"`,
        )
      }
      if (seen.has(group)) {
        errors.push(
          `${label}: gallery "${section.id}" lists group "${group}" twice`,
        )
      }
      seen.add(group)
    }
  }
}
