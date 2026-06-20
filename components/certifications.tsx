"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"

const certifications = [
  {
    title: "Google UX Design",
    issuer: "Google",
    date: "Apr 2026",
    description: "Comprehensive course exploring User Experience (UX) Design, including user research, wireframing, prototyping, usability testing, and high-fidelity design using Figma. Learn industry-relevant UX/UI design techniques and build a professional portfolio through hands-on projects.",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/1SXJS9PEOXAL",
  },
  {
    title: "Introduction to Large Language Models",
    issuer: "Google Cloud",
    date: "Jan 2024",
    description: "Comprehensive course exploring Large Language Models (LLMs), Generative AI concepts, prompt engineering, prompt tuning, and AI application development. Learn LLM use cases and Google Cloud tools for building intelligent AI-powered solutions.",
    link: "https://www.coursera.org/account/accomplishments/verify/ZNSZ2R7W2BN7",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    date: "Jan 2024",
    description: "Comprehensive course exploring Generative AI concepts, model architectures, machine learning foundations, and real-world applications. Learn how generative AI works, understand different AI model types, and gain practical knowledge of prompt engineering and AI application development.",
    link: "https://www.coursera.org/account/accomplishments/verify/EGB8Q5Z8RXQG",
  },
  {
    title: "Generative AI with Large Language Models",
    issuer: "AWS & DeepLearning.AI",
    date: "Apr 2024",
    description: "Comprehensive course exploring Generative AI and Large Language Models (LLMs), including transformer architectures, model training, fine-tuning, evaluation, and deployment. Learn practical techniques for building, optimizing, and deploying AI-powered applications using modern LLM technologies and Python.",
    link: "https://www.coursera.org/account/accomplishments/verify/Q42GF6JAZB7N",
  },
  {
    title: "Project Management: Foundations and Initiation",
    issuer: "University Of Colorado Boulder",
    date: "Sep 2025",
    description: "Comprehensive course exploring Project Management fundamentals, including project initiation, stakeholder management, team leadership, resource planning, and communication strategies. Learn to create project charters, analyze stakeholders, build effective teams, and apply project management methodologies to successfully manage projects.",
    link: "https://www.coursera.org/account/accomplishments/verify/VQFR3AKAPLQQ",
  },
  {
    title: "Project Planning and Execution",
    issuer: "University Of Colorado Boulder",
    date: "Nov 2025",
    description: "Comprehensive course exploring Project Planning and Execution, including project scheduling, budgeting, risk management, quality assurance, and project control. Learn practical techniques for planning, executing, monitoring, and evaluating projects while ensuring successful outcomes through effective resource and risk management.",
    link: "https://www.coursera.org/account/accomplishments/verify/IVEJUGYL6EGK",
  },
  {
    title: "Agile Project Management",
    issuer: "University Of Colorado Boulder",
    date: "Nov 2025",
    description: "Comprehensive course exploring Agile Project Management, including Scrum frameworks, sprint planning, user stories, Agile leadership, and team collaboration. Learn to apply Agile methodologies, manage iterative project delivery, and implement Agile tools and practices to improve project outcomes and organizational effectiveness.",
    link: "https://www.coursera.org/account/accomplishments/verify/QA3ISVETFXO4",
  },
  {
    title: "Server side JavaScript with Node.js",
    issuer: "NIIT",
    date: "Apr 2024",
    description: "Comprehensive course Exploring the Node.js environment , test and debug the basic programs incorporating Node.js techniques like modules, files and asynchronous programming.",
    link: "https://www.coursera.org/account/accomplishments/verify/QTC3EEYGELLR",
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
