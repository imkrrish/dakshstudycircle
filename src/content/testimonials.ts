import type { Testimonial } from "@/lib/content-schema"

// MOCK: entries marked "// MOCK" are development data. Replace them with real
// testimonials before launch. The first three are real (from the old site).
//
// Photo credits (Unsplash Licence: free use, attribution appreciated).
// Source URL is https://images.unsplash.com/photo-<id>:
//   mother-red-sari.jpg          Prateek Jaiswal  1628477116196-48afe0d209e0
//   teen-boy-striped-jacket.jpg  Dipen Nagani     1617966225168-276b58a35602
//   mother-portrait-crop.jpg     Vivek Kumar      1589169011402-8b2cbd1ee593 (cropped to one face)
//   father-beard-portrait.jpg    Naim Ahmed       1607346256330-dee7af15f7c5
//   young-woman-outdoors.jpg     Kunal Goswami    1607189200597-4d0923ef98c6
function photo(src: string, alt: string, size: [number, number]) {
  return { src, alt, width: size[0], height: size[1] }
}

const mockPhoto = (file: string, alt: string) =>
  photo(`/mock/people/${file}`, alt, [600, 750])

export const testimonials: Testimonial[] = [
  {
    id: "rohit-singh",
    name: "Rohit Singh",
    role: "student",
    text: "Good institute for study all the subject. A high quality and comfortable teacher who are very close to student.",
    photo: photo("/testimonials/rohit-singh.jpg", "Rohit Singh", [75, 75]),
  },
  {
    id: "ishita-jain",
    name: "Ishita Jain",
    role: "student",
    text: "Had such an amazing experience in the classes with Anil Sir. He is a best maths teacher who always guides at every step, and help solve doubts easily. Trust the Teacher, trust the Institute. Best go-to institute for better learning.",
    photo: photo("/testimonials/ishita-jain.jpg", "Ishita Jain", [75, 75]),
  },
  {
    id: "utkarsh-sharma",
    name: "Utkarsh Sharma",
    role: "student",
    text: "The best institute in the area, enriching studying experience along with Intrapersonal development. Had a great time while studying at Daksh and it really paid off.",
    photo: photo(
      "/testimonials/utkarsh-sharma.jpg",
      "Utkarsh Sharma",
      [75, 75],
    ),
  },
  // MOCK
  {
    id: "meena-kapoor",
    name: "Meena Kapoor",
    role: "parent",
    context: "Parent of a Class 10 student",
    text: "My son was always afraid of Maths. Anil Sir explains each step slowly and never makes a child feel small for asking again. His fear has reduced, and he now sits down to practise on his own.",
    photo: mockPhoto("mother-red-sari.jpg", "Meena Kapoor"),
  },
  // MOCK
  {
    id: "aarav-mehta",
    name: "Aarav Mehta",
    role: "student",
    context: "Class 12, 2025",
    text: "In Class 12 I could ask Anil Sir the same doubt twice, even thrice, and he would explain it again with a new example. Maths felt less heavy because of that patience.",
    photo: mockPhoto("teen-boy-striped-jacket.jpg", "Aarav Mehta"),
  },
  // MOCK
  {
    id: "sunita-rawat",
    name: "Sunita Rawat",
    role: "parent",
    context: "Parent of a Class 8 student",
    text: "We wanted a place where the teachers know our child by name. At Daksh they notice when she is struggling and tell us honestly. That personal attention is what we were looking for.",
    photo: photo(
      "/mock/people/mother-portrait-crop.jpg",
      "Sunita Rawat",
      [225, 225],
    ),
  },
  // MOCK
  {
    id: "vikram-negi",
    name: "Capt. Vikram Negi (Retd.)",
    role: "parent",
    context: "Parent of a Class 6 student preparing for Sainik School",
    text: "Our son is preparing for the Sainik School entrance. The teachers guide him on the syllabus and also on routine and confidence. We feel he is being prepared calmly, without unnecessary pressure.",
    photo: mockPhoto("father-beard-portrait.jpg", "Capt. Vikram Negi"),
  },
  // MOCK
  {
    id: "neha-bisht",
    name: "Neha Bisht",
    role: "student",
    context: "Class 11, 2025",
    text: "I joined the Spoken English course because I was shy of speaking in class. The daily practice helped me. In the smart classroom, the smartboard makes lessons easier to follow and more interesting.",
    photo: mockPhoto("young-woman-outdoors.jpg", "Neha Bisht"),
  },
]
