import { z } from "zod"
import { ImageSchema } from "../shared"

// A free YouTube playlist. Rows link out to it; the player embeds it only after a click.
export const VideoSchema = z.strictObject({
  id: z.string().min(1),
  title: z.string().min(1),
  youtubePlaylistId: z.string().regex(/^PL[\w-]+$/),
  thumbnail: ImageSchema,
  class: z
    .string()
    .regex(/^Class (1[0-2]|[1-9])$/)
    .optional(),
  subject: z.string().min(1),
})

export type Video = z.infer<typeof VideoSchema>

