import type { Result } from "@/lib/content"

// Development data for the results section, every item marked `sample: true`,
// so production builds drop it. Replace with the institute's real results
// before launch (see docs/content-requests.md). `course` is a course slug.
// Years run 2023–2026 (literals, not derived from the build year).
//
// Photos are decorative stand-ins: the alt text is empty and a few frames carry
// a `position` where the top of the photo would cut the face.

const PHOTO_SIZES: Record<string, [number, number]> = {
  "01": [740, 493],
  "02": [250, 375],
  "03": [740, 493],
  "04": [612, 407],
  "05": [740, 493],
  "06": [622, 350],
  "07": [600, 900],
  "08": [740, 493],
  "09": [740, 493],
}

function pic(n: keyof typeof PHOTO_SIZES, position?: string) {
  const [width, height] = PHOTO_SIZES[n]
  return {
    src: `/images/results/sample/student-${n}.jpg`,
    alt: "",
    width,
    height,
    ...(position ? { position } : {}),
  }
}

// student-05 has the face right of centre; frame it there.
const pic05 = () => pic("05", "80% 0%")

function sub(...pairs: [string, number][]) {
  return pairs.map(([name, marks]) => ({ name, marks }))
}

const class10 = {
  sample: true,
  class: "Class 10",
  course: "classes-9-10",
  exam: "CBSE",
} as const

const science = {
  sample: true,
  class: "Class 12",
  course: "class-11-12-science",
  exam: "CBSE",
  stream: "Science",
} as const

const commerce = {
  sample: true,
  class: "Class 12",
  course: "class-11-12-commerce",
  exam: "CBSE",
  stream: "Commerce",
} as const

const humanities = {
  sample: true,
  class: "Class 12",
  course: "class-11-12-humanities",
  exam: "CBSE",
  stream: "Humanities",
} as const

const entrance = {
  sample: true,
  class: "Entrance",
  course: "rms-rimc-sainik",
} as const

const RMS_CHAIL = "Rashtriya Military School, Chail"
const RMS_AJMER = "Rashtriya Military School, Ajmer"
const RIMC_DEHRADUN = "Rashtriya Indian Military College, Dehradun"

export const results: Result[] = [
  // ---------- 2026 · Class 10 ----------
  {
    ...class10,
    id: "2026-aanya-sharma",
    studentName: "Aanya Sharma",
    year: 2026,
    percentage: 96.2,
    subjects: sub(
      ["Maths", 99],
      ["Science", 97],
      ["English", 95],
      ["Hindi", 94],
      ["Social Studies", 96],
    ),
    highlight: true,
    photo: pic("02"),
  },
  {
    ...class10,
    id: "2026-rohan-bisht",
    studentName: "Rohan Bisht",
    year: 2026,
    percentage: 91.4,
    subjects: sub(
      ["Maths", 95],
      ["Science", 92],
      ["English", 88],
      ["Hindi", 90],
      ["Social Studies", 92],
    ),
    photo: pic("01"),
  },
  {
    ...class10,
    id: "2026-tanishka-malhotra",
    studentName: "Tanishka Malhotra",
    year: 2026,
    percentage: 93.6,
    subjects: sub(
      ["Maths", 96],
      ["Science", 94],
      ["English", 91],
      ["Hindi", 92],
      ["Social Studies", 95],
    ),
    photo: pic05(),
  },
  {
    ...class10,
    id: "2026-riya-chaudhary",
    studentName: "Riya Chaudhary",
    year: 2026,
    percentage: 89.8,
    subjects: sub(
      ["Maths", 92],
      ["Science", 90],
      ["English", 87],
      ["Hindi", 88],
      ["Social Studies", 92],
    ),
  },
  {
    ...class10,
    id: "2026-aditya-yadav",
    studentName: "Aditya Yadav",
    year: 2026,
    percentage: 87.2,
    subjects: sub(
      ["Maths", 91],
      ["Science", 86],
      ["English", 84],
      ["Hindi", 87],
      ["Social Studies", 88],
    ),
    photo: pic("03"),
  },
  {
    ...class10,
    id: "2026-sneha-gupta",
    studentName: "Sneha Gupta",
    year: 2026,
    percentage: 86.0,
    subjects: sub(
      ["Maths", 88],
      ["Science", 85],
      ["English", 87],
      ["Hindi", 84],
      ["Social Studies", 86],
    ),
    photo: pic("08"),
  },
  {
    ...class10,
    id: "2026-kunal-mehra",
    studentName: "Kunal Mehra",
    year: 2026,
    percentage: 84.6,
    subjects: sub(
      ["Maths", 89],
      ["Science", 82],
      ["English", 83],
      ["Hindi", 84],
      ["Social Studies", 85],
    ),
  },

  // ---------- 2025 · Class 10 ----------
  {
    ...class10,
    id: "2025-priya-joshi",
    studentName: "Priya Joshi",
    year: 2025,
    percentage: 94.8,
    subjects: sub(["Maths", 98], ["Science", 95], ["English", 90]),
    photo: pic("09"),
  },
  {
    ...class10,
    id: "2025-navneet-rathore",
    studentName: "Navneet Rathore",
    year: 2025,
    percentage: 91.2,
    subjects: sub(["Maths", 94], ["Science", 91], ["English", 88]),
    photo: pic("04"),
  },
  {
    ...class10,
    id: "2025-devansh-kapoor",
    studentName: "Devansh Kapoor",
    year: 2025,
    percentage: 88.0,
    subjects: sub(["Maths", 92], ["Science", 86]),
  },
  {
    ...class10,
    id: "2025-farhan-qureshi",
    studentName: "Farhan Qureshi",
    year: 2025,
    percentage: 86.8,
    subjects: sub(["Maths", 90], ["Science", 85], ["English", 84]),
    photo: pic("06"),
  },
  {
    ...class10,
    id: "2025-simran-kaur",
    studentName: "Simran Kaur",
    year: 2025,
    percentage: 85.6,
    subjects: sub(["Maths", 88], ["Science", 84], ["English", 86]),
  },
  {
    ...class10,
    id: "2025-lakshmi-iyer",
    studentName: "Lakshmi Iyer",
    year: 2025,
    percentage: 83.4,
    subjects: sub(["Maths", 85], ["Science", 82], ["English", 86]),
    photo: pic("02"),
  },

  // ---------- 2024 · Class 10 ----------
  {
    ...class10,
    id: "2024-tanvi-bhatt",
    studentName: "Tanvi Bhatt",
    year: 2024,
    percentage: 92.0,
    subjects: sub(["Maths", 94], ["Science", 93], ["English", 89]),
    photo: pic05(),
  },
  {
    ...class10,
    id: "2024-gurpreet-singh",
    studentName: "Gurpreet Singh",
    year: 2024,
    percentage: 90.6,
    subjects: sub(["Maths", 93], ["Science", 90], ["English", 87]),
  },
  {
    ...class10,
    id: "2024-anjali-menon",
    studentName: "Anjali Menon",
    year: 2024,
    percentage: 87.4,
    subjects: sub(["Maths", 89], ["Science", 86], ["English", 90]),
    photo: pic("08"),
  },
  {
    ...class10,
    id: "2024-samuel-dsouza",
    studentName: "Samuel D'Souza",
    year: 2024,
    percentage: 84.2,
    subjects: sub(["Maths", 86], ["Science", 82], ["English", 88]),
    photo: pic("07"),
  },
  {
    ...class10,
    id: "2024-harsh-verma",
    studentName: "Harsh Verma",
    year: 2024,
    percentage: 82.8,
    subjects: sub(["Maths", 85], ["Science", 81]),
  },

  // ---------- 2023 · Class 10 ----------
  {
    ...class10,
    id: "2023-ishita-rawat",
    studentName: "Ishita Rawat",
    year: 2023,
    percentage: 98.0,
    subjects: sub(
      ["Maths", 100],
      ["Science", 98],
      ["English", 96],
      ["Social Studies", 97],
    ),
    photo: pic("09"),
  },
  {
    ...class10,
    id: "2023-aman-dobhal",
    studentName: "Aman Dobhal",
    year: 2023,
    percentage: 91.8,
    subjects: sub(["Maths", 95], ["Science", 92], ["English", 88]),
    photo: pic("01"),
  },
  {
    ...class10,
    id: "2023-pallavi-nair",
    studentName: "Pallavi Nair",
    year: 2023,
    percentage: 89.0,
    subjects: sub(["Maths", 91], ["Science", 88], ["English", 90]),
  },
  {
    ...class10,
    id: "2023-jasleen-kaur",
    studentName: "Jasleen Kaur",
    year: 2023,
    percentage: 86.6,
    subjects: sub(["Maths", 88], ["Science", 86], ["English", 85]),
    photo: pic("02"),
  },
  {
    ...class10,
    id: "2023-mohammad-zaid",
    studentName: "Mohammad Zaid",
    year: 2023,
    percentage: 84.0,
    subjects: sub(["Maths", 87], ["Science", 83], ["English", 82]),
    photo: pic("03"),
  },
  {
    ...class10,
    id: "2023-vandana-bisht",
    studentName: "Vandana Bisht",
    year: 2023,
    percentage: 82.2,
    subjects: sub(["Maths", 84], ["Science", 80], ["English", 85]),
  },

  // ---------- 2026 · Class 12 ----------
  {
    ...science,
    id: "2026-ishaan-rawat",
    studentName: "Ishaan Rawat",
    year: 2026,
    percentage: 93.0,
    subjects: sub(["Physics", 94], ["Chemistry", 92], ["Mathematics", 96]),
    highlight: true,
    photo: pic("04"),
  },
  {
    ...science,
    id: "2026-meera-bhandari",
    studentName: "Meera Bhandari",
    year: 2026,
    percentage: 90.4,
    subjects: sub(
      ["Physics", 91],
      ["Chemistry", 90],
      ["Mathematics", 92],
      ["English", 88],
      ["Biology", 91],
    ),
    photo: pic05(),
  },
  {
    ...science,
    id: "2026-arjun-rautela",
    studentName: "Arjun Rautela",
    year: 2026,
    percentage: 88.0,
    subjects: sub(
      ["Physics", 88],
      ["Chemistry", 87],
      ["Mathematics", 91],
      ["English", 85],
      ["Computer Science", 89],
    ),
  },
  {
    ...commerce,
    id: "2026-kavya-negi",
    studentName: "Kavya Negi",
    year: 2026,
    percentage: 90.6,
    subjects: sub(["Accountancy", 94], ["Economics", 91]),
    photo: pic("08"),
  },
  {
    ...commerce,
    id: "2026-ananya-arora",
    studentName: "Ananya Arora",
    year: 2026,
    percentage: 90.0,
    subjects: sub(
      ["Accountancy", 92],
      ["Business Studies", 90],
      ["Economics", 89],
      ["English", 88],
      ["Mathematics", 91],
    ),
  },
  {
    ...humanities,
    id: "2026-aditi-mamgain",
    studentName: "Aditi Mamgain",
    year: 2026,
    percentage: 90.2,
    subjects: sub(
      ["Political Science", 93],
      ["Economics", 90],
      ["English", 89],
    ),
    photo: pic("09"),
  },
  {
    ...humanities,
    id: "2026-harshita-pant",
    studentName: "Harshita Pant",
    year: 2026,
    percentage: 88.6,
    subjects: sub(
      ["Political Science", 91],
      ["Economics", 88],
      ["English", 87],
    ),
    photo: pic("02"),
  },

  // ---------- 2025 · Class 12 ----------
  {
    ...science,
    id: "2025-sanya-kohli",
    studentName: "Sanya Kohli",
    year: 2025,
    percentage: 94.0,
    subjects: sub(["Physics", 93], ["Chemistry", 94], ["Mathematics", 96]),
    photo: pic05(),
  },
  {
    ...science,
    id: "2025-mohit-pundir",
    studentName: "Mohit Pundir",
    year: 2025,
    percentage: 89.2,
    subjects: sub(["Physics", 88], ["Chemistry", 90], ["Maths", 93]),
  },
  {
    ...commerce,
    id: "2025-fatima-khan",
    studentName: "Fatima Khan",
    year: 2025,
    percentage: 91.6,
    subjects: sub(
      ["Accountancy", 94],
      ["Business Studies", 91],
      ["Economics", 90],
    ),
    photo: pic("08"),
  },
  {
    ...commerce,
    id: "2025-ritesh-ahuja",
    studentName: "Ritesh Ahuja",
    year: 2025,
    percentage: 87.8,
    subjects: sub(
      ["Accountancy", 90],
      ["Business Studies", 87],
      ["Economics", 86],
    ),
  },
  {
    ...humanities,
    id: "2025-nidhi-rana",
    studentName: "Nidhi Rana",
    year: 2025,
    percentage: 92.4,
    subjects: sub(["Political Science", 95], ["History", 93]),
    highlight: true,
    photo: pic("09"),
  },

  // ---------- 2024 · Class 12 (no Humanities) ----------
  {
    ...science,
    id: "2024-divya-rautela",
    studentName: "Divya Rautela",
    year: 2024,
    percentage: 97.2,
    subjects: sub(["Physics", 97], ["Chemistry", 96], ["Mathematics", 99]),
    photo: pic("02"),
  },
  {
    ...science,
    id: "2024-yash-dhami",
    studentName: "Yash Dhami",
    year: 2024,
    percentage: 87.6,
    subjects: sub(["Physics", 85], ["Maths", 91]),
  },
  {
    ...science,
    id: "2024-karan-bisht",
    studentName: "Karan Bisht",
    year: 2024,
    percentage: 85.2,
    subjects: sub(["Physics", 83], ["Chemistry", 85], ["Mathematics", 88]),
    photo: pic("06"),
  },
  {
    ...commerce,
    id: "2024-ritika-panwar",
    studentName: "Ritika Panwar",
    year: 2024,
    percentage: 86.4,
    subjects: sub(
      ["Accountancy", 89],
      ["Business Studies", 87],
      ["Economics", 84],
    ),
    photo: pic05(),
  },

  // ---------- 2023 · Class 12 ----------
  {
    ...science,
    id: "2023-anirudh-pande",
    studentName: "Anirudh Pande",
    year: 2023,
    percentage: 97.8,
    subjects: sub(["Physics", 98], ["Chemistry", 97], ["Mathematics", 99]),
    photo: pic("07"),
  },
  {
    ...science,
    id: "2023-shalini-gusain",
    studentName: "Shalini Gusain",
    year: 2023,
    percentage: 91.0,
    subjects: sub(["Physics", 90], ["Chemistry", 92], ["Biology", 93]),
  },
  {
    ...commerce,
    id: "2023-harleen-kaur",
    studentName: "Harleen Kaur",
    year: 2023,
    percentage: 92.8,
    subjects: sub(
      ["Accountancy", 95],
      ["Business Studies", 92],
      ["Economics", 91],
    ),
    photo: pic("08"),
  },
  {
    ...commerce,
    id: "2023-rohit-aggarwal",
    studentName: "Rohit Aggarwal",
    year: 2023,
    percentage: 88.2,
    subjects: sub(
      ["Accountancy", 91],
      ["Business Studies", 87],
      ["Economics", 86],
    ),
    photo: pic("01"),
  },
  {
    ...commerce,
    id: "2023-pratik-sah",
    studentName: "Pratik Sah",
    year: 2023,
    percentage: 84.6,
    subjects: sub(
      ["Accountancy", 86],
      ["Business Studies", 84],
      ["Economics", 82],
    ),
  },
  {
    ...humanities,
    id: "2023-neha-chauhan",
    studentName: "Neha Chauhan",
    year: 2023,
    percentage: 89.6,
    subjects: sub(["Political Science", 92], ["History", 90], ["English", 87]),
    photo: pic("09"),
  },
  {
    ...humanities,
    id: "2023-abhay-pal",
    studentName: "Abhay Pal",
    year: 2023,
    percentage: 86.0,
    subjects: sub(["Political Science", 88], ["History", 85], ["English", 84]),
  },

  // ---------- Entrance ----------
  {
    ...entrance,
    id: "2026-aryan-thakur",
    studentName: "Aryan Thakur",
    year: 2026,
    exam: "AISSEE",
    entryClass: 6,
    outcome: {
      title: "Sainik",
      note: "Admitted · AISSEE",
      school: "Sainik School, Kunjpura",
    },
    highlight: true,
    photo: pic("03"),
  },
  {
    ...entrance,
    id: "2026-yuvraj-chandel",
    studentName: "Yuvraj Chandel",
    year: 2026,
    exam: "AISSEE",
    entryClass: 9,
    outcome: {
      title: "Sainik",
      note: "Admitted · AISSEE",
      school: "Sainik School, Ghorakhal",
    },
  },
  {
    ...entrance,
    id: "2026-atharv-kandwal",
    studentName: "Atharv Kandwal",
    year: 2026,
    exam: "RMS CET",
    entryClass: 6,
    outcome: {
      title: "RMS",
      note: "Admitted · RMS CET",
      school: RMS_CHAIL,
    },
    photo: pic("04"),
  },
  {
    ...entrance,
    id: "2026-vihaan-negi",
    studentName: "Vihaan Negi",
    year: 2026,
    exam: "RMS CET",
    entryClass: 6,
    outcome: {
      title: "RMS",
      note: "Admitted · RMS CET",
      school: RMS_AJMER,
    },
    photo: pic("06"),
  },
  {
    ...entrance,
    id: "2025-kabir-chauhan",
    studentName: "Kabir Chauhan",
    year: 2025,
    exam: "RMS CET",
    entryClass: 9,
    outcome: {
      title: "RMS",
      note: "Admitted · RMS CET",
      school: RMS_CHAIL,
    },
  },
  {
    ...entrance,
    id: "2025-ishika-bhardwaj",
    studentName: "Ishika Bhardwaj",
    year: 2025,
    exam: "AISSEE",
    entryClass: 6,
    outcome: {
      title: "Sainik",
      note: "Admitted · AISSEE",
      school: "Sainik School, Kunjpura",
    },
    photo: pic("02"),
  },
  {
    ...entrance,
    id: "2024-arnav-saini",
    studentName: "Arnav Saini",
    year: 2024,
    exam: "RIMC",
    entryClass: 8,
    outcome: {
      title: "RIMC",
      note: "Admitted · RIMC",
      school: RIMC_DEHRADUN,
    },
    highlight: true,
    photo: pic("07"),
  },
  {
    ...entrance,
    id: "2024-mihir-saxena",
    studentName: "Mihir Saxena",
    year: 2024,
    exam: "AISSEE",
    entryClass: 6,
    outcome: {
      title: "Sainik",
      note: "Admitted · AISSEE",
      school: "Sainik School, Rewari",
    },
  },
  {
    ...entrance,
    id: "2023-lakshya-bisht",
    studentName: "Lakshya Bisht",
    year: 2023,
    exam: "RMS CET",
    entryClass: 9,
    outcome: {
      title: "RMS",
      note: "Admitted · RMS CET",
      school: RMS_AJMER,
    },
    photo: pic("01"),
  },
  {
    ...entrance,
    id: "2023-aarush-panwar",
    studentName: "Aarush Panwar",
    year: 2023,
    exam: "AISSEE",
    entryClass: 9,
    outcome: {
      title: "Sainik",
      note: "Admitted · AISSEE",
      school: "Sainik School, Kunjpura",
    },
  },
]
