"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Github, ExternalLink, Code } from "lucide-react"

// Updated projects based on CV
const projects = [
  {
    title: "CodeForge",
    description:
      "CodeForge is a Full-Stack Coding Platform using MERN, Redis, Socket.io, Judge0 API, Google Gemini AI, and Razorpay, offering real-time code execution, AI-powered assistance, live ELO-rated contests, premium assessments, gamified progress tracking, and a secure admin panel for content, users, and payments.",
    image: "/projects/CodeForge.png?height=400&width=600",
    tags: ["MERN", "Redis", "Socket.io", "Judge0 API", "Google Gemini AI", "Monaco Editor"],
    github: "https://github.com/HardikArora0843/CodeForge",
    demo: "https://code-forge-nine.vercel.app",
    featured: true,
  },
  {
    title: "AI Kids Tutor",
    description:
      "AI Kids Tutor is a gamified learning platform that helps children learn through interactive educational worlds, quizzes, voice activities, and AI-driven recommendations. It features a dedicated parent portal for tracking progress, managing screen time, and creating custom tests. Built with React, Node.js, and MongoDB, the platform adapts learning based on each child's performance. The system combines engaging gameplay with parental controls to create a safe and personalized learning experience.",
    image: "/projects/AIKidsTutor.png?height=400&width=600",
    tags: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "JWT"],
    github: "https://github.com/HardikArora0843/AI-Kids-Tutor",
    demo: "https://ai-kids-tutor-child-interface.vercel.app",
    featured: true,
  },
  {
    title: "EcomProject",
    description:
      "EcomProject is a Full-Stack E-commerce platform using MERN stack with real-time filtering, Razorpay integration, and an admin portal to manage 100+ products and transactions.",
    image: "/projects/EcomProject.png?height=400&width=600",
    tags: ["ReactJS", "MongoDB", "Express.js", "NodeJS", "JavaScript", "REST API"],
    github: "https://github.com/HardikArora0843/EcomProject",
    demo: "https://ecom-project-frontend-seven.vercel.app",
    featured: true,
  },
  {
    title: "Visionary AI",
    description: "Visionary AI is an AI-powered text-to-image platform with fast image generation, secure credit-based payments via Razorpay, and user management for 5,000+ users using the MERN stack.",
    image: "/projects/VisionaryAI.png?height=400&width=600",
    tags: ["ReactJS", "MongoDB", "Express.js", "NodeJS", "JavaScript", "REST API"],
    github: "https://github.com/HardikArora0843/VisionaryAI",
    demo: "https://visionary-ai-nu.vercel.app/",
    featured: true,
  },
  {
    title: "Chess Platform",
    description: "Built a real-time WebSocket-based chess platform with matchmaking, spectator mode, and robust session management for 100+ concurrent players using Express.js and Socket.io.",
    image: "/projects/ChessPlatform.png?height=400&width=600",
    tags: ["Express.js", "Socket.io", "Chess.js", "ejs"],
    github: "https://github.com/HardikArora0843/Chess-Platform",
    demo: "#",
    featured: true,
  },
  {
    title: "Vision Chat",
    description: "Vision Chat is an AI-based image recognition platform with fast processing,scalable user management.",
    image: "/projects/VisionChat.png?height=400&width=600",
    tags: ["ReactJs", "JavaScript","TypeScript","PHP MyAdmin","Tailwind CSS"],
    github: "https://github.com/HardikArora0843/VisionChat",
    demo: "https://vision-chat-seven.vercel.app",
    featured: true,
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  // Filter featured projects first
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)
  const displayProjects = [...featuredProjects, ...otherProjects]

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
              My Projects
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mx-auto mb-6" />
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Explore some of my recent work and personal projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                  boxShadow: "0 15px 30px -10px rgba(123, 31, 162, 0.5)",
                  borderColor: "rgba(123, 31, 162, 0.6)",
                }}
                className={`glass-effect rounded-xl overflow-hidden transition-all duration-300 ${
                  project.featured ? "border-2 border-neon-purple/30" : ""
                }`}
              >
                {project.featured && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-neon-purple to-neon-blue text-white text-xs px-3 py-1 rounded-bl-lg z-10">
                    Featured
                  </div>
                )}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent opacity-70" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-space-accent text-white border border-neon-purple/30"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(123, 31, 162, 0.3)",
                          boxShadow: "0 0 10px rgba(123, 31, 162, 0.5)",
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-neon-blue hover:text-neon-purple transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-neon-blue hover:text-neon-purple transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
            <a
              href="https://github.com/HardikArora0843"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-space-accent text-white border border-neon-purple/30 hover:bg-space-accent/80 transition-colors"
            >
              <Code size={18} className="mr-2 text-neon-purple" />
              View More on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
