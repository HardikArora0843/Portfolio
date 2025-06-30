"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"

const certifications = [
  {
    title: "Server side JavaScript with Node.js",
    issuer: "NIIT | Coursera",
    date: "April 2024",
    description: "Comprehensive course Exploring the Node.js environment , test and debug the basic programs incorporating Node.js techniques like modules, files and asynchronous programming.",
    link: "https://www.coursera.org/account/accomplishments/verify/QTC3EEYGELLR",
  },
  {
    title: "Object-Oriented Programing",
    issuer: "Neocolab - iamneo",
    date: "January 2024",
    description: "A comprehensive Object Oriented Programming course by Neocolab that equips learners with core OOP principles, real-world coding practices, and hands-on project experience using modern programming languages.",
    link: "#",
  },
  {
    title: "Data Structures and Algorithms",
    issuer: "Neocolab - iamneo",
    date: "January 2024",
    description: "A structured Data Structures and Algorithms course by Neocolab that builds strong problem-solving skills through in-depth concepts, optimized techniques, and hands-on coding practice.",
    link: "#",
  },
  {
    title: "SQL for Data Science",
    issuer: "Great Learning",
    date: "Febrauary 2023",
    description: "An industry-aligned SQL course from Great Learning that equips you with foundational to intermediate SQL skills—covering essentials like SELECT, joins, subqueries, aggregations, and practical database querying exercises—to excel in real-world data analysis & database management tasks.",
    link: "https://www.mygreatlearning.com/certificate/ZWRRJEJU/",
  },
  {
    title: "HTML, CSS and JS",
    issuer: "CipherSchools",
    date: "December 2022",
    description: "A hands-on HTML, CSS & JavaScript course from CipherSchools designed to build a solid foundation in web development, covering core syntax, styling techniques, DOM manipulation, and interactive front-end projects.",
    link: "#",
  },
]

export default function Certifications() {
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
    <section id="certifications" className="py-20 relative">
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
              Certifications
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mx-auto mb-6" />
            <p className="text-gray-300 text-lg">Professional certifications and courses I&apos;ve completed</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px -5px rgba(123, 31, 162, 0.5)",
                  borderColor: "rgba(123, 31, 162, 0.6)",
                }}
                className="glass-effect rounded-xl p-6 border border-neon-purple/10 transition-all duration-300"
              >
                <div className="flex items-start">
                  <motion.div
                    className="mr-4 mt-1"
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1, 1.1, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <Award className="text-neon-purple" size={24} />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                    <div className="flex items-center text-sm text-gray-400 mt-1 mb-3">
                      <span>{cert.issuer}</span>
                      <span className="mx-2">•</span>
                      <span>{cert.date}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{cert.description}</p>
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-neon-blue hover:text-neon-purple transition-colors"
                      whileHover={{ scale: 1.05, x: 3 }}
                    >
                      <ExternalLink size={12} className="mr-1" />
                      View Certificate
                    </motion.a>
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
