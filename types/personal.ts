export interface PersonalProfile {
  name: string
  title: string
  tagline: string
  bio: string
  location: string
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  isCurrent: boolean
  location?: string
  responsibilities: string[]
  technologies?: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field?: string
  startDate: string
  endDate: string
  location: string
  grade?: string
  gradeType?: "cgpa" | "percentage"
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  features?: string[]
  github?: string
  liveDemo?: string
  featured?: boolean
  category?: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  link?: string
}

export interface Achievement {
  id: string
  title: string
  type: "hackathon" | "award" | "competition" | "other"
  rank?: string
  date: string
  location?: string
  team?: string
  description: string
  stats?: {
    teams?: string
    participants?: string
  }
}

export interface Research {
  id: string
  title: string
  type: "review-paper" | "paper" | "publication"
  conference: string
  date: string
  location?: string
  authors?: string
  description: string
  additionalPresentations?: string[]
}

export interface Patent {
  id: string
  title: string
  applicationNumber: string
  office: string
  date: string
  location?: string
  team?: string
  description: string
}

export interface CodingProfile {
  platform: string
  username: string
  url: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
  profiles: {
    github: string
    linkedin: string
  }
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: string[]
  timestamp?: number
}

export interface ToolResult {
  category: string
  data: unknown
}

export interface AgentResponse {
  message: string
  sources?: string[]
}
