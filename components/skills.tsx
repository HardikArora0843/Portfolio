"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const skills = [
  {
    category: "Programming",
    items: ["C", "C++", "Python", "JavaScript", "Java", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Angular.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Socket.io", "REST APIs", "PHP" ,"Laravel"],
  },
  {
    category: "Databases & Caching",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis"],
  },
  {
    category: "Developer Tools & Others",
    items: ["Git", "GitHub", "VS Code", "Figma", "Vercel","Render","Postman"],
  },
  {
    category: "Soft skills",
    items: ["Problem-Solving", "Team Player", "Time Management", "Adaptability", "Attention to Detail"],
  },
]

// Skill proficiency data with fixed percentages
const proficiencyData = [
  { skill: "C & C++", percentage: 96 },
  { skill: "JavaScript & TypeScript", percentage: 92 },
  { skill: "React & Next.js", percentage: 91 },
  { skill: "Node.js & Express", percentage: 90 },
  { skill: "HTML & CSS", percentage: 85 },
  { skill: "Database Management", percentage: 80 },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" className="py-20 relative">
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
              Skills & Technologies
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mx-auto mb-6" />
            <p className="text-gray-300 text-lg">The tools and technologies I work with</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                variants={itemVariants}
                className="glass-effect rounded-xl p-6 card-hover-effect"
                whileHover={{
                  boxShadow: "0 0 25px rgba(123, 31, 162, 0.5)",
                  borderColor: "rgba(123, 31, 162, 0.8)",
                }}
              >
                <h3 className="text-xl font-semibold mb-4 text-center text-neon-blue">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm bg-space-accent text-white border border-neon-purple/30"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(123, 31, 162, 0.3)",
                        boxShadow: "0 0 10px rgba(123, 31, 162, 0.5)",
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 glass-effect rounded-xl p-6 md:p-8 card-hover-effect"
            whileHover={{
              boxShadow: "0 0 25px rgba(123, 31, 162, 0.5)",
              borderColor: "rgba(123, 31, 162, 0.8)",
            }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center">Skill Proficiency</h3>
            <div className="space-y-6">
              {proficiencyData.map((item) => (
                <div key={item.skill} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">{item.skill}</span>
                    <motion.span
                      className="text-neon-blue"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      {item.percentage}%
                    </motion.span>
                  </div>
                  <div className="h-2 w-full bg-space-accent rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.percentage}%` } : { width: 0 }}
                      transition={{
                        duration: 1.5,
                        delay: 0.5,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
