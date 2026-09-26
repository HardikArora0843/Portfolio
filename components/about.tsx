"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { User, Code, Briefcase, Award } from "lucide-react"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
              About Me
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mx-auto mb-6" />
            <p className="text-gray-300 text-lg">Get to know more about me and my journey</p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-effect rounded-xl p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8">
                  <div className="relative z-10">
                    <motion.div
                      className="absolute -inset-1 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue opacity-70 blur-xl"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [0.98, 1.01, 0.98],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative z-10 rounded-xl overflow-hidden border-2 border-cyan-500">
                      <Image
                        src="/myphoto2_2.png?height=300&width=300"
                        alt="About Me"
                        width={300}
                        height={300}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <User className="text-neon-purple mr-3" size={24} />
                      <h3 className="text-xl font-semibold">Who I Am</h3>
                    </div>
                    <p className="text-gray-300 mb-4">
                      I'm Hardik Arora, a versatile Developer with experience building full-stack web applications, backend systems, and AI-powered solutions. I enjoy turning ideas into practical, user-focused products by combining strong software fundamentals with modern technologies.
                    </p>
                    <p className="text-gray-300">
                      With a foundation in computer science and hands-on experience across frontend, backend, databases, real-time systems, and AI, I continuously explore new technologies and build solutions that are scalable, reliable, and useful in real-world applications.
                    </p>
                <br />
                    <div className="flex items-center mb-4">
                  <Code className="text-neon-blue mr-3" size={24} />
                  <h3 className="text-xl font-semibold">What I Do</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  I build full-stack applications using technologies like React, Angular, Node.js, and Express, along with databases such as MongoDB, PostgreSQL, MySQL, and Redis. I also integrate AI capabilities using LLMs, AI APIs, semantic search, RAG, and automation workflows.
                  
                  My work includes developing REST APIs, authentication systems, real-time applications, database-driven platforms, AI-powered features, and complete products from frontend to backend.
                </p>
                    
                  </div>
              {/* <div className="flex-1">
                <div className="flex items-center mb-4">
                  <Code className="text-neon-blue mr-3" size={24} />
                  <h3 className="text-xl font-semibold">What I Do</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  I develop full-stack web applications using modern JavaScript frameworks like React and Next.js for
                  frontend, and Node.js with Express for backend services. My expertise includes building RESTful APIs,
                  implementing authentication systems, and working with various databases.
                </p>
                <p className="text-gray-300">
                  I&apos;m passionate about creating clean, maintainable code and optimizing application performance. I
                  focus on delivering solutions that are not only technically sound but also provide intuitive user
                  experiences.
                </p>
              </div> */}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="glass-effect rounded-xl p-6 card-hover-effect"
              whileHover={{
                boxShadow: "0 0 25px rgba(123, 31, 162, 0.5)",
                borderColor: "rgba(123, 31, 162, 0.8)",
              }}
            >
              <div className="flex items-center mb-4">
                <Briefcase className="text-neon-purple mr-3" size={24} />
                <h3 className="text-xl font-semibold">Experience</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex flex-col">
                  <span className="font-medium">FlyRank AI</span>
                  <span className="text-sm text-gray-400">Backend AI Engineer Intern | July 2026</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-light text-gray-300">• Engineered a multi-tenant usage and billing service supporting 2 subscription plans, tracking API/AI usage, enforcing quotas, calculating token costs, and managing Stripe subscriptions with reliable payment processing.</span>
                  <span className="text-sm font-light text-gray-300">• Developed an embeddable lead-capture platform with 44 automated tests, enabling businesses to collect leads from external websites, validate submissions, prevent spam, enrich visitor data, and process notifications reliably in the background.</span>
                  <span className="text-sm font-light text-gray-300">• Implemented a social media automation service supporting 3 platforms, converting blog posts into platform-specific content, validating publishing rules, enabling human approval, scheduling posts, and preventing duplicate publishing.</span>
                  <span className="text-sm font-light text-gray-300">• Designed an AI image-matching service with 90 automated tests, analysing images with Gemini, matching them to blog posts using semantic similarity, rejecting incorrect matches, supporting human review, and processing images asynchronously.</span>
                  {/* <span className="text-sm text-gray-400">Backend AI Engineer Intern | July 2026</span> */}
                </li>
                
              </ul>
            </motion.div>
            
            <motion.div
              className="glass-effect rounded-xl p-6 card-hover-effect"
              whileHover={{
                boxShadow: "0 0 25px rgba(123, 31, 162, 0.5)",
                borderColor: "rgba(123, 31, 162, 0.8)",
              }}
            >
              <div className="flex items-center mb-4">
                <Briefcase className="text-neon-purple mr-3" size={24} />
                <h3 className="text-xl font-semibold">Achievements</h3>
              </div>
              <ul className="space-y-3 text-gray-300">

                <li className="flex flex-col">
                  <span className="font-medium">Review Paper Accepted & Presented at an IEEE Conference</span>
                  <span className="text-sm text-gray-400">July 2026</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Patent Published By Indian Patent Office(IPO)</span>
                  <span className="text-sm text-gray-400">February 2026</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Secured 1st Rank out of 300+ teams (1000+ participants) at CODE-A-HAUNT Hackathon</span>
                  <span className="text-sm text-gray-400">February 2024</span>
                </li>
                
              </ul>
            </motion.div>

            <motion.div
              className="glass-effect rounded-xl p-6 card-hover-effect"
              whileHover={{
                boxShadow: "0 0 25px rgba(32, 84, 243, 0.5)",
                borderColor: "rgba(32, 84, 243, 0.8)",
              }}
            >
              <div className="flex items-center mb-4">
                <Award className="text-neon-blue mr-3" size={24} />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex flex-col">
                  <span className="font-medium">B.Tech in Computer Science</span>
                  <span className="text-sm text-gray-400">Lovely Professional University • 2022 - 2026</span>
                  <span className="text-sm text-gray-400">Phagwara , Punjab  | CGPA : 8.04</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Aravali International School - Class XII</span>
                  <span className="text-sm text-gray-400">Faridabad , Haryana | 2020 - 2021 | Percentage:- 85%</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Aravali International School - Class X
                  </span>
                  <span className="text-sm text-gray-400">Faridabad , Haryana | 2018 - 2019 | Percentage:- 90% </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
