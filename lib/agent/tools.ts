import type { ChatCompletionTool } from "openai/resources/chat/completions"
import {
  profile,
  experience,
  education,
  skills,
  projects,
  certifications,
  achievements,
  research,
  patent,
  codingProfiles,
  programmingStats,
  contact,
} from "@/data"

export const TOOL_SOURCE_LABELS: Record<string, string> = {
  getProfile: "Profile",
  getExperience: "Experience",
  getSkills: "Skills",
  getProjects: "Projects",
  getEducation: "Education",
  getCertifications: "Certifications",
  getAchievements: "Achievements",
  getResearch: "Research",
  getPatent: "Patent",
  getCodingProfiles: "Coding Profiles",
  getContact: "Contact",
}

export const toolDefinitions: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "getProfile",
      description:
        "Returns Hardik Arora's high-level professional profile including name, title, bio, and location.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "getExperience",
      description:
        "Returns Hardik Arora's verified professional work experience, including his current Backend AI Engineer internship at FlyRank AI.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "getSkills",
      description:
        "Returns Hardik Arora's technical skills organized by category such as programming, AI/ML, frontend, backend, databases, and tools.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description:
              "Optional category filter, e.g. 'Programming', 'AI & Machine Learning', 'Frontend', 'Backend', 'Databases & Caching', 'Tools'.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getProjects",
      description:
        "Returns Hardik Arora's verified project portfolio including descriptions, technologies, features, and links.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "Optional filter such as 'AI', 'Full Stack', or 'Backend'.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getEducation",
      description: "Returns Hardik Arora's verified educational background and academic achievements.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "getCertifications",
      description:
        "Returns Hardik Arora's professional certifications including AI, UX, project management, and development courses.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "getAchievements",
      description:
        "Returns Hardik Arora's hackathon wins, competition results, and other verified achievements.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "getResearch",
      description:
        "Returns Hardik Arora's research publications including his IEEE review paper on vision-based assistive navigation.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "getPatent",
      description:
        "Returns information about Hardik Arora's published patent for the Smart Water Bottle System.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "getCodingProfiles",
      description:
        "Returns Hardik Arora's public coding platform profiles such as GitHub, LeetCode, GeeksforGeeks, and Codolio.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "getContact",
      description:
        "Returns Hardik Arora's public professional contact information including email, phone, location, and profile links.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
]

function getProfileData() {
  return { category: "profile", profile }
}

function getExperienceData() {
  return { category: "experience", experience }
}

function getSkillsData(args: { category?: string }) {
  const filtered = args.category
    ? skills.filter(
        (s) => s.category.toLowerCase() === args.category!.toLowerCase()
      )
    : skills
  return { category: "skills", skills: filtered }
}

function getProjectsData(args: { category?: string }) {
  const filtered = args.category
    ? projects.filter(
        (p) => p.category?.toLowerCase() === args.category!.toLowerCase()
      )
    : projects
  return { category: "projects", projects: filtered }
}

function getEducationData() {
  return { category: "education", education }
}

function getCertificationsData() {
  return { category: "certifications", certifications }
}

function getAchievementsData() {
  return { category: "achievements", achievements }
}

function getResearchData() {
  return { category: "research", research }
}

function getPatentData() {
  return { category: "patent", patent }
}

function getCodingProfilesData() {
  return {
    category: "coding-profiles",
    profiles: codingProfiles,
    stats: programmingStats,
  }
}

function getContactData() {
  return { category: "contact", contact }
}

const executors: Record<
  string,
  (args: Record<string, unknown>) => Record<string, unknown>
> = {
  getProfile: () => getProfileData(),
  getExperience: () => getExperienceData(),
  getSkills: (args) =>
    getSkillsData({ category: args.category as string | undefined }),
  getProjects: (args) =>
    getProjectsData({ category: args.category as string | undefined }),
  getEducation: () => getEducationData(),
  getCertifications: () => getCertificationsData(),
  getAchievements: () => getAchievementsData(),
  getResearch: () => getResearchData(),
  getPatent: () => getPatentData(),
  getCodingProfiles: () => getCodingProfilesData(),
  getContact: () => getContactData(),
}

export function executeTool(
  name: string,
  args: Record<string, unknown> = {}
): Record<string, unknown> {
  const executor = executors[name]
  if (!executor) {
    throw new Error(`Unknown tool: ${name}`)
  }
  return executor(args)
}
