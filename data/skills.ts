import type { SkillCategory } from "@/types/personal"

export const skills: SkillCategory[] = [
  {
    category: "Programming",
    items: ["C", "C++", "Python", "JavaScript", "Java", "SQL"],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "LLMs",
      "Prompt Engineering",
      "Semantic Search",
      "AI APIs",
      "AI Content Automation",
      "RAG",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Angular",
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "PHP",
      "Laravel",
      "REST APIs",
      "Socket.io",
    ],
  },
  {
    category: "Databases & Caching",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Figma", "Vercel", "Render"],
  },
]
