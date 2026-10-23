import type { Result } from "@/lib/content-schema"

// MOCK: development data for the results section. Replace with the institute's
// real results before launch.
//
// Photo credits (Unsplash Licence: free use, attribution appreciated).
// Source URL is https://images.unsplash.com/photo-<id>:
//   boy-holding-yellow-book.jpg     Muhammad Zaid    1623303366639-0e330d7c3d9f
//   boy-smiling-checked-shirt.jpg   Nehal Patel      1603185030522-05d4497bb180
//   boy-school-uniform-tie.jpg      Assad Tanoli     1698992939360-7a413b5419ce
//   girl-braid-smiling.jpg          Yogendra Singh   1618245472177-2a74ad3b994a
//   girl-striped-top-doorway.jpg    Soubhagya Ranjan 1665072692785-8dd0c152f7a5
//   girl-smiling-portrait.jpg       Razib Hossain    1674278882093-3870ef98e826
//   girl-pink-top-portrait.jpg      Rajesh Rajput    1582887122254-f271875d0594
//   girl-long-hair-pink-wall.jpg    LJ               1497486443155-158cceb6629a
//   girl-laughing-bw.jpg            LJ               1497487231007-0a45e7b4b68a
//   young-woman-green-leaves.jpg    Atul Pandey      1768326205103-0ad658551cea
// Some photos are reused across results; fine for development.
function photo(file: string, alt: string): Result["photo"] {
  return { src: `/mock/people/${file}.jpg`, alt, width: 600, height: 750 }
}

export const results: Result[] = [
  {
    id: "2026-aanya-sharma",
    studentName: "Aanya Sharma",
    year: 2026,
    class: "Class 10",
    course: "Classes 9–10 tuition",
    exam: "CBSE",
    percentage: 96.2,
    subjects: [
      { name: "Maths", marks: 99 },
      { name: "Science", marks: 97 },
    ],
    photo: photo("girl-smiling-portrait", "Aanya Sharma"),
    highlight: true,
  },
  {
    id: "2026-rohan-bisht",
    studentName: "Rohan Bisht",
    year: 2026,
    class: "Class 10",
    course: "Classes 9–10 tuition",
    exam: "CBSE",
    percentage: 91.4,
    subjects: [
      { name: "Maths", marks: 95 },
      { name: "Science", marks: 92 },
      { name: "English", marks: 88 },
    ],
    photo: photo("boy-smiling-checked-shirt", "Rohan Bisht"),
  },
  {
    id: "2026-ishaan-rawat",
    studentName: "Ishaan Rawat",
    year: 2026,
    class: "Class 12",
    course: "Classes 11–12 tuition",
    exam: "CBSE",
    stream: "Science",
    percentage: 93.0,
    subjects: [
      { name: "Physics", marks: 94 },
      { name: "Chemistry", marks: 92 },
      { name: "Maths", marks: 96 },
    ],
    photo: photo("boy-holding-yellow-book", "Ishaan Rawat"),
    highlight: true,
  },
  {
    id: "2026-kavya-negi",
    studentName: "Kavya Negi",
    year: 2026,
    class: "Class 12",
    course: "Classes 11–12 tuition",
    exam: "CBSE",
    stream: "Commerce",
    percentage: 90.6,
    subjects: [
      { name: "Accountancy", marks: 94 },
      { name: "Economics", marks: 91 },
    ],
    photo: photo("girl-braid-smiling", "Kavya Negi"),
  },
  {
    id: "2026-aryan-thakur",
    studentName: "Aryan Thakur",
    year: 2026,
    class: "Entrance",
    course: "RMS/RIMC/Sainik prep",
    exam: "AISSEE",
    outcome: { title: "Sainik School", note: "Admitted · AISSEE" },
    photo: photo("boy-school-uniform-tie", "Aryan Thakur"),
    highlight: true,
  },
  {
    id: "2025-priya-joshi",
    studentName: "Priya Joshi",
    year: 2025,
    class: "Class 10",
    course: "Classes 9–10 tuition",
    exam: "CBSE",
    percentage: 94.8,
    subjects: [
      { name: "Maths", marks: 98 },
      { name: "Science", marks: 95 },
      { name: "English", marks: 90 },
    ],
    photo: photo("girl-striped-top-doorway", "Priya Joshi"),
  },
  {
    id: "2025-devansh-kapoor",
    studentName: "Devansh Kapoor",
    year: 2025,
    class: "Class 10",
    course: "Classes 9–10 tuition",
    exam: "CBSE",
    percentage: 88.0,
    subjects: [
      { name: "Maths", marks: 92 },
      { name: "Science", marks: 86 },
    ],
    photo: photo("boy-holding-yellow-book", "Devansh Kapoor"),
  },
  {
    id: "2025-simran-kaur",
    studentName: "Simran Kaur",
    year: 2025,
    class: "Class 10",
    course: "Classes 9–10 tuition",
    exam: "CBSE",
    percentage: 85.6,
    subjects: [
      { name: "Maths", marks: 88 },
      { name: "Science", marks: 84 },
      { name: "English", marks: 86 },
    ],
    photo: photo("girl-pink-top-portrait", "Simran Kaur"),
  },
  {
    id: "2025-mohit-pundir",
    studentName: "Mohit Pundir",
    year: 2025,
    class: "Class 12",
    course: "Classes 11–12 tuition",
    exam: "CBSE",
    stream: "Science",
    percentage: 89.2,
    subjects: [
      { name: "Physics", marks: 88 },
      { name: "Chemistry", marks: 90 },
      { name: "Maths", marks: 93 },
    ],
    photo: photo("boy-school-uniform-tie", "Mohit Pundir"),
  },
  {
    id: "2025-nidhi-rana",
    studentName: "Nidhi Rana",
    year: 2025,
    class: "Class 12",
    course: "Classes 11–12 tuition",
    exam: "CBSE",
    stream: "Humanities",
    percentage: 92.4,
    subjects: [
      { name: "Political Science", marks: 95 },
      { name: "History", marks: 93 },
    ],
    photo: photo("girl-long-hair-pink-wall", "Nidhi Rana"),
    highlight: true,
  },
  {
    id: "2025-kabir-chauhan",
    studentName: "Kabir Chauhan",
    year: 2025,
    class: "Entrance",
    course: "RMS/RIMC/Sainik prep",
    exam: "RMS CET",
    outcome: { title: "Rashtriya Military School", note: "Admitted · RMS CET" },
    photo: photo("boy-smiling-checked-shirt", "Kabir Chauhan"),
  },
  {
    id: "2024-tanvi-bhatt",
    studentName: "Tanvi Bhatt",
    year: 2024,
    class: "Class 10",
    course: "Classes 9–10 tuition",
    exam: "CBSE",
    percentage: 92.0,
    subjects: [
      { name: "Maths", marks: 94 },
      { name: "Science", marks: 93 },
      { name: "English", marks: 89 },
    ],
    photo: photo("girl-laughing-bw", "Tanvi Bhatt"),
  },
  {
    id: "2024-harsh-verma",
    studentName: "Harsh Verma",
    year: 2024,
    class: "Class 10",
    course: "Classes 9–10 tuition",
    exam: "CBSE",
    percentage: 82.8,
    subjects: [
      { name: "Maths", marks: 85 },
      { name: "Science", marks: 81 },
    ],
    photo: photo("boy-holding-yellow-book", "Harsh Verma"),
  },
  {
    id: "2024-ritika-panwar",
    studentName: "Ritika Panwar",
    year: 2024,
    class: "Class 12",
    course: "Classes 11–12 tuition",
    exam: "CBSE",
    stream: "Commerce",
    percentage: 86.4,
    subjects: [
      { name: "Accountancy", marks: 89 },
      { name: "Business Studies", marks: 87 },
      { name: "Economics", marks: 84 },
    ],
    photo: photo("young-woman-green-leaves", "Ritika Panwar"),
  },
  {
    id: "2024-yash-dhami",
    studentName: "Yash Dhami",
    year: 2024,
    class: "Class 12",
    course: "Classes 11–12 tuition",
    exam: "CBSE",
    stream: "Science",
    percentage: 87.6,
    subjects: [
      { name: "Physics", marks: 85 },
      { name: "Maths", marks: 91 },
    ],
    photo: photo("boy-smiling-checked-shirt", "Yash Dhami"),
  },
  {
    id: "2024-arnav-saini",
    studentName: "Arnav Saini",
    year: 2024,
    class: "Entrance",
    course: "RMS/RIMC/Sainik prep",
    exam: "RIMC",
    outcome: { title: "RIMC", note: "Selected · RIMC Dehradun" },
    photo: photo("boy-school-uniform-tie", "Arnav Saini"),
    highlight: true,
  },
]
