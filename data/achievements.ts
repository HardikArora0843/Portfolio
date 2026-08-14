import type { Achievement } from "@/types/personal"

export const achievements: Achievement[] = [
  {
    id: "code-a-haunt",
    title: "CODE-A-HAUNT",
    type: "hackathon",
    rank: "1st Rank",
    date: "February 2024",
    location: "Lovely Professional University",
    team: "Team Binary Five",
    description:
      "Built a smart E-Learning platform for students to learn coding and programming languages.",
    stats: {
      teams: "300+",
      participants: "1000+",
    },
  },
  {
    id: "smart-india-hackathon",
    title: "Smart India Hackathon",
    type: "hackathon",
    rank: "Top 50",
    date: "September 2024",
    location: "Lovely Professional University",
    team: "Team Binary Five",
    description: "Created a Faculty connect solution for Rajasthan government.",
  },
]
