import { z } from "zod"
import { ButtonSchema, ImageSchema, sectionBase, type LoadedContent } from "../shared"

export const videoPlayerBase = {
  ...sectionBase,
  type: z.literal("video-player"),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  intro: z.string().optional(),
  // "band": a deeper warm surface, full-bleed (same as split).
  tone: z.enum(["default", "band"]).optional(),
  actions: z.array(ButtonSchema).optional(),
}

// Authoring shape: videos are referenced by id; defaultVideo is the one shown
// first and must be among them. getPage() resolves them.
export const VideoPlayerSectionSchema = z.strictObject({
  ...videoPlayerBase,
  videos: z.array(z.string().min(1)).min(1),
  defaultVideo: z.string().min(1),
})

// What the component receives: plain data, URLs already built.
export const ResolvedVideoPlayerSectionSchema = z.strictObject({
  ...videoPlayerBase,
  defaultVideo: z.string().min(1),
  items: z
    .array(
      z.strictObject({
        id: z.string(),
        title: z.string(),
        href: z.string(),
        embedSrc: z.string(),
        thumbnail: ImageSchema,
        meta: z.string(),
      }),
    )
    .min(1),
})

export type VideoPlayerSection = z.infer<typeof VideoPlayerSectionSchema>
export type ResolvedVideoPlayerSection = z.infer<
  typeof ResolvedVideoPlayerSectionSchema
>

// ---------- Resolving ----------

// The only place YouTube playlist URLs are built.
function playlistHref(playlistId: string) {
  return `https://www.youtube.com/playlist?list=${playlistId}`
}

// Built here only; used by the player after a click. nocookie host, autoplay
// because the visitor has just pressed play.
function playlistEmbedSrc(playlistId: string) {
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1`
}

export function resolveVideoPlayer(
  section: VideoPlayerSection,
  content: LoadedContent,
): ResolvedVideoPlayerSection {
  const { videos: ids, ...rest } = section
  return {
    ...rest,
    items: ids.map((id) => {
      const video = content.videos.find((v) => v.id === id)
      if (!video) throw new Error(`[content] unknown video "${id}"`)
      return {
        id: video.id,
        title: video.title,
        href: playlistHref(video.youtubePlaylistId),
        embedSrc: playlistEmbedSrc(video.youtubePlaylistId),
        thumbnail: video.thumbnail,
        meta: "Playlist",
      }
    }),
  }
}

// ---------- Validation ----------

// Every video-player id must exist, and appear once per section; the default
// video must be one of them.
export function checkVideoPlayers(
  label: string,
  sections: Array<{ type: string; id: string; videos?: string[]; defaultVideo?: string; [key: string]: unknown }>,
  videoIds: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (section.type !== "video-player" || !section.videos) continue
    const where = `${label}: video-player "${section.id}"`
    const seen = new Set<string>()
    for (const id of section.videos) {
      if (!videoIds.has(id)) {
        errors.push(
          `${where}: unknown video "${id}". Known: ${[...videoIds].join(", ")}`,
        )
      }
      if (seen.has(id)) errors.push(`${where}: video "${id}" appears twice`)
      seen.add(id)
    }
    if (section.defaultVideo && !seen.has(section.defaultVideo)) {
      errors.push(
        `${where}: defaultVideo "${section.defaultVideo}" is not in its videos`,
      )
    }
  }
}

// A `social` button needs that platform in site.socials, or it would vanish.
export function checkSocialActions(
  label: string,
  sections: Array<{ id: string; actions?: Array<{ action: { type: string; platform?: string } }>; [key: string]: unknown }>,
  platforms: Set<string>,
  errors: string[],
) {
  for (const section of sections) {
    if (!("actions" in section) || !section.actions) continue
    for (const { action } of section.actions) {
      if (action.type === "social" && action.platform && !platforms.has(action.platform)) {
        errors.push(
          `${label}: "${section.id}" has a ${action.platform} button but site.socials has no ${action.platform}`,
        )
      }
    }
  }
}
