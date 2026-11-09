import { z } from "zod"

export const GalleryGroupSchema = z.strictObject({
  id: z.string().min(1),
  // Display name, e.g. "The centre".
  name: z.string().min(1),
})

export const GalleryPhotoSchema = z.strictObject({
  id: z.string().min(1),
  src: z.string().min(1),
  // Pixel size as displayed (after any rotation).
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
  // Id of a group in the gallery's group list (checked when the content loads).
  group: z.string().min(1),
  // object-position when a frame crops the photo; set only where the default
  // (centre) crop could cut off the subject.
  focus: z.enum(["top", "center", "bottom", "left", "right"]).optional(),
})

export type GalleryGroup = z.infer<typeof GalleryGroupSchema>
export type GalleryPhoto = z.infer<typeof GalleryPhotoSchema>
