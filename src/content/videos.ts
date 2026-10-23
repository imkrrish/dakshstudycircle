import type { Video } from "@/lib/content-schema"

// The institute's free Maths playlists (public, channel "Anil sir").
// Thumbnails are each playlist's first video, 16:9. They are decorative
// (alt ""): the card title already names the playlist.
function thumbnail(videoId: string): Video["thumbnail"] {
  return {
    src: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    alt: "",
    width: 1280,
    height: 720,
  }
}

export const videos: Video[] = [
  {
    id: "basic-maths",
    title: "Basic Maths",
    youtubePlaylistId: "PL1U-FkOAme7YKYV3l0377G8GQ81RLmcLL",
    thumbnail: thumbnail("ORM9n_3l6a0"),
    subject: "Maths",
  },
  {
    id: "class-9-maths",
    title: "Class 9 Maths",
    youtubePlaylistId: "PL1U-FkOAme7ZKO5pLGJ11gvRWwgPKHy3g",
    thumbnail: thumbnail("AV88-3xyGCk"),
    class: "Class 9",
    subject: "Maths",
  },
  {
    id: "class-10-maths",
    title: "Class 10 Maths",
    youtubePlaylistId: "PL1U-FkOAme7Zfuf7cDorbDMLDxJfEc6pM",
    thumbnail: thumbnail("9WvzdheqQLM"),
    class: "Class 10",
    subject: "Maths",
  },
  {
    id: "class-11-maths",
    title: "Class 11 Maths",
    youtubePlaylistId: "PL1U-FkOAme7YhCHy2Lf5rd1m1QjDQ5H5A",
    thumbnail: thumbnail("VS82s8anin8"),
    class: "Class 11",
    subject: "Maths",
  },
  {
    id: "class-12-maths",
    title: "Class 12 Maths",
    youtubePlaylistId: "PL1U-FkOAme7Z8fDk2XWvn-iGSdglsVkQy",
    thumbnail: thumbnail("MXR_BA7ReYI"),
    class: "Class 12",
    subject: "Maths",
  },
]
