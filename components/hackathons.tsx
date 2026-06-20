"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Trophy, Calendar, MapPin, Users } from "lucide-react"

const hackathons = [
  {
    title: "Patent Published (SMART WATER BOTTLE SYSTEM) By IPO",
    position: "Available on IPR Search with Application Number - 202611002178",
    date: "February 2026",
    location: "LPU",
    team: "4 Authors",
    description: "Smart Water Bottle System is an AI and IoT-enabled intelligent hydration and health monitoring solution designed to promote safe water consumption and healthy lifestyle habits. The system integrates personalized hydration reminders, water quality analysis (pH and TDS monitoring), UV-C sterilization, medication reminders, emergency SOS alerts, temperature control, and mobile app-based health tracking. Powered through solar and USB charging, the invention transforms a conventional water bottle into a smart health companion that helps users maintain hydration, ensure water safety, and manage wellness effectively.",
    image: "/hackathon/Patent.png?height=300&width=900",
  },
  {
    title: "CODE-A-HAUNT",
    position: "Gold medal",
    date: "February 2024",
    location: "LPU",
    team: "Team Binary 5",
    description: "Built a smart E - Learning platform for students to learn coding and programming languages.",
    image: "/hackathon/codeAhaunt.png?height=300&width=500",
  },
  {
    title: "Smart India Hackathon",
    position: "Top 50",
    date: "Sept 2024",
    location: "LPU",
    team: "Team Binary five",
    description: "Created a Faculty connect for Rajasthan government",
    image: "/hackathon/sih.png?height=300&width=500",
  },
]

export default function Hackathons() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

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

  return (
    <section id="hackathons" className="py-20 relative">
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
              Achievemnts & Hackathons
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mx-auto mb-6" />
            <p className="text-gray-300 text-lg">My hackathon experiences and achievements</p>
          </motion.div>

          <div className="space-y-8">
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={hackathon.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px -5px rgba(123, 31, 162, 0.5)",
                  borderColor: "rgba(123, 31, 162, 0.6)",
                }}
                className="glass-effect rounded-xl overflow-hidden transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                    <Image
                      src={hackathon.image || "/placeholder.svg"}
                      alt={hackathon.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center mb-2">
                      <motion.div
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                          scale: [1, 1.1, 1, 1.1, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                        className="mr-2"
                      >
                        <Trophy className="text-neon-purple" size={20} />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white">{hackathon.title}</h3>
                    </div>
                    <div className="flex items-center text-neon-blue mb-4">
                      <span>{hackathon.position}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{hackathon.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{hackathon.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>{hackathon.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        <span>{hackathon.team}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
