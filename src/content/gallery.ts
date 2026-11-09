import type { GalleryGroup, GalleryPhoto } from "@/lib/content"

// Real photos from the centre (public/images/daksh-images/). Groups in display
// order; within a group the best photos come first.
export const galleryGroups: GalleryGroup[] = [
  { id: "the-centre", name: "The centre" },
  { id: "classrooms", name: "Classrooms" },
  { id: "tests", name: "Tests" },
  { id: "events", name: "Events" },
]

const dir = "/images/daksh-images"

export const gallery: GalleryPhoto[] = [
  // ---- The centre ----
  {
    id: "centre-daksh-sign",
    src: `${dir}/15-img.avif`,
    width: 2048,
    height: 1360,
    alt: "The DAKSH sign on a dark textured wall, with yellow balloons and reception signs",
    group: "the-centre",
  },
  {
    id: "centre-reception-desk",
    src: `${dir}/16-img.avif`,
    width: 1280,
    height: 960,
    alt: "The reception desk below the DAKSH sign, with balloons and flowers",
    group: "the-centre",
  },
  {
    id: "centre-daksh-wall-adult",
    src: `${dir}/18-img.avif`,
    width: 2048,
    height: 1360,
    alt: "An adult standing in front of the DAKSH sign, with balloons behind",
    group: "the-centre",
  },
  {
    id: "centre-reception-adult",
    src: `${dir}/21-img.avif`,
    width: 756,
    height: 1008,
    alt: "An adult seated at the reception desk below the DAKSH sign",
    group: "the-centre",
  },
  {
    // Near-duplicate of centre-reception-adult (21); kept as its own entry.
    id: "centre-reception-adult-close",
    src: `${dir}/12-img.avif`,
    width: 756,
    height: 1008,
    alt: "An adult smiling at the reception desk, with a laptop and office chairs",
    group: "the-centre",
  },
  {
    id: "centre-reception-adult-tall",
    src: `${dir}/6-img.avif`,
    width: 1152,
    height: 2048,
    alt: "An adult with a flag painted on one cheek, seated below the DAKSH sign",
    group: "the-centre",
  },
  {
    // Portrait idol: the face sits near the top, so a wide crop must keep the top.
    id: "centre-saraswati-idol",
    src: `${dir}/1-img.avif`,
    width: 958,
    height: 1280,
    alt: "A Saraswati idol with garlands of white and red flowers",
    group: "the-centre",
    focus: "top",
  },
  {
    id: "centre-logo",
    src: `${dir}/4-img.avif`,
    width: 3264,
    height: 1836,
    alt: "Daksh Study Circle logo",
    group: "the-centre",
  },
  {
    id: "centre-admissions-notice",
    src: `${dir}/5-img.avif`,
    width: 1280,
    height: 1280,
    alt: "An admissions notice for group tuition at Daksh Study Circle",
    group: "the-centre",
  },

  // ---- Classrooms ----
  {
    id: "classroom-empty-desks",
    src: `${dir}/13-img.avif`,
    width: 2048,
    height: 1360,
    alt: "An empty classroom with rows of blue desks and balloons on the wall",
    group: "classrooms",
  },
  {
    id: "classroom-students-writing",
    src: `${dir}/3-img.avif`,
    width: 1280,
    height: 958,
    alt: "Students writing at blue desks in a full classroom",
    group: "classrooms",
  },
  {
    // Same frame as classroom-students-writing (3).
    id: "classroom-students-writing-2",
    src: `${dir}/7-img.avif`,
    width: 1280,
    height: 958,
    alt: "A full classroom of students writing at blue desks",
    group: "classrooms",
  },

  // ---- Tests ----
  {
    id: "test-masked-students",
    src: `${dir}/2-img.avif`,
    width: 1280,
    height: 958,
    alt: "Students in masks writing a test at blue desks",
    group: "tests",
  },
  {
    id: "test-masked-students-rows",
    src: `${dir}/9-img.avif`,
    width: 958,
    height: 1280,
    alt: "Students in masks writing a test in rows of blue desks",
    group: "tests",
  },
  {
    // Same scene as test-masked-students-rows (9), tighter crop.
    id: "test-masked-students-close",
    src: `${dir}/17-img.avif`,
    width: 958,
    height: 1280,
    alt: "Students in masks writing a test at their desks, a closer view",
    group: "tests",
  },
  {
    id: "test-cctv-writing",
    src: `${dir}/20-img.avif`,
    width: 1280,
    height: 852,
    alt: "A CCTV view of students writing a test in a classroom",
    group: "tests",
  },
  {
    id: "test-cctv-desks",
    src: `${dir}/22-img.avif`,
    width: 1280,
    height: 591,
    alt: "A CCTV view of students writing at their desks",
    group: "tests",
  },
  {
    // 2.17:1 CCTV frame; the students sit right of centre.
    id: "test-cctv-seated",
    src: `${dir}/10-img.avif`,
    width: 1280,
    height: 591,
    alt: "A CCTV view of students seated at desks in a classroom",
    group: "tests",
    focus: "right",
  },

  // ---- Events ----
  {
    id: "event-ribbon-cutting",
    src: `${dir}/19-img.avif`,
    width: 2048,
    height: 1360,
    alt: "A red ribbon being cut at an entrance, with adults watching",
    group: "events",
  },
  {
    id: "event-new-year-2017",
    src: `${dir}/8-img.avif`,
    width: 882,
    height: 559,
    alt: "A group posing on a stage under a Happy New Year 2017 banner, two holding trophies",
    group: "events",
  },
  {
    id: "event-group-balloons",
    src: `${dir}/23-img.avif`,
    width: 789,
    height: 558,
    alt: "Seven adults posing together in front of balloons",
    group: "events",
  },
  {
    id: "event-new-year-2016",
    src: `${dir}/11-img.avif`,
    width: 585,
    height: 563,
    alt: "A group posing under a New Year 2016 banner, two wearing sashes",
    group: "events",
  },
  {
    id: "event-sashes",
    src: `${dir}/14-img.avif`,
    width: 583,
    height: 565,
    alt: "A group posing with two people wearing Mr. Daksh and Ms. Daksh sashes",
    group: "events",
  },
  {
    id: "event-sashes-balloons",
    src: `${dir}/24-img.avif`,
    width: 580,
    height: 563,
    alt: "Five people posing under balloons, two wearing Mr. Daksh and Ms. Daksh sashes",
    group: "events",
  },
]
