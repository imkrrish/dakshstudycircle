import type { Testimonial } from "@/lib/content-schema"

// Real testimonials from the pamphlet and the old site. Photos are optional;
// without one the card shows the person's initials.
function photo(src: string, alt: string, size: [number, number]) {
  return { src, alt, width: size[0], height: size[1] }
}

export const testimonials: Testimonial[] = [
  {
    id: "rohit-singh",
    source: "institute",
    featured: true,
    order: 6,
    name: "Rohit Singh",
    role: "student",
    text: "Good institute for study all the subject. A high quality and comfortable teacher who are very close to student.",
    photo: photo("/testimonials/rohit-singh.jpg", "Rohit Singh", [75, 75]),
  },
  {
    id: "ishita-jain",
    source: "institute",
    featured: true,
    order: 3,
    name: "Ishita Jain",
    role: "student",
    text: "Had such an amazing experience in the classes with Anil Sir. He is a best maths teacher who always guides at every step, and help solve doubts easily. Trust the Teacher, trust the Institute. Best go-to institute for better learning.",
    photo: photo("/testimonials/ishita-jain.jpg", "Ishita Jain", [75, 75]),
  },
  {
    id: "utkarsh-sharma",
    source: "institute",
    featured: true,
    order: 5,
    name: "Utkarsh Sharma",
    role: "student",
    text: "The best institute in the area, enriching studying experience along with Intrapersonal development. Had a great time while studying at Daksh and it really paid off.",
    photo: photo(
      "/testimonials/utkarsh-sharma.jpg",
      "Utkarsh Sharma",
      [75, 75],
    ),
  },
  {
    id: "lt-col-saharan",
    source: "institute",
    featured: true,
    order: 1,
    name: "Lt. Col. Saharan",
    role: "parent",
    context: "Parent, Cariappa Vihar",
    text: "A complete exhaustive study material and regular mock tests have helped my son to gain confidence and to secure 90%+ marks in class. … I thank the entire Daksh faculty for putting their best effort for my son Rishit.",
  },
  {
    id: "vikrant-sharma",
    source: "institute",
    featured: true,
    order: 4,
    name: "Vikrant Sharma",
    role: "student",
    context: "Head Boy, K.V. No. 2",
    text: "I am glad that I was a part of this wonderful institution which really changed my life to a great extent. … Thank you Sir.",
  },
  {
    id: "col-mukesh",
    source: "institute",
    featured: true,
    order: 2,
    name: "Col. Mukesh",
    role: "parent",
    context: "Parent of Sharyat",
    text: "We are completely satisfied with the professional teaching, quality of faculty, positive attitude, helping hand, always cheerful, conducive environment for learning, etc. etc. … I can go on … No doubt in mind … The institute is outstanding and we wish it and you more success.",
  },
]
