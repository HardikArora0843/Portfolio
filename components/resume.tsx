"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileText, Download, Video } from "lucide-react"

export default function Resume() {
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
    <section id="resume" className="py-20 relative">
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
              Resume
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mx-auto mb-6" />
            <p className="text-gray-300 text-lg">Download my resume or watch my video CV</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px -10px rgba(123, 31, 162, 0.6)",
                borderColor: "rgba(123, 31, 162, 0.8)",
              }}
              className="glass-effect rounded-xl p-8 text-center transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="p-4 rounded-full bg-space-accent mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 rgba(123, 31, 162, 0.4)",
                      "0 0 20px rgba(123, 31, 162, 0.6)",
                      "0 0 0 rgba(123, 31, 162, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <FileText className="text-neon-purple" size={32} />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">Generalised Resume</h3>
                <p className="text-gray-300 mb-6">
                  Download my detailed resume in PDF format with complete information about my skills, experience, and
                  education.
                </p>
                <motion.a
                  href="https://drive.google.com/file/d/1PlhoymSUC67gWrGblag6rjy1AOqrALYF/view?usp=sharing"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(123, 31, 162, 0.7)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={18} className="mr-2" />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px -10px rgba(123, 31, 162, 0.6)",
                borderColor: "rgba(123, 31, 162, 0.8)",
              }}
              className="glass-effect rounded-xl p-8 text-center transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="p-4 rounded-full bg-space-accent mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 rgba(123, 31, 162, 0.4)",
                      "0 0 20px rgba(123, 31, 162, 0.6)",
                      "0 0 0 rgba(123, 31, 162, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <FileText className="text-neon-purple" size={32} />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">Specialised Resume</h3>
                <p className="text-gray-300 mb-6">
                  Download my detailed resume in PDF format with complete information about my skills, experience, and
                  education.
                </p>
                <motion.a
                  href="https://drive.google.com/file/d/1APUrD6b_EGE9qQ6y3QvR9HspptpBGhat/view?usp=sharing"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(123, 31, 162, 0.7)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={18} className="mr-2" />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>

            {/* <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px -10px rgba(32, 84, 243, 0.6)",
                borderColor: "rgba(32, 84, 243, 0.8)",
              }}
              className="glass-effect rounded-xl p-8 text-center transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="p-4 rounded-full bg-space-accent mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 rgba(32, 84, 243, 0.4)",
                      "0 0 20px rgba(32, 84, 243, 0.6)",
                      "0 0 0 rgba(32, 84, 243, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: 1.5,
                  }}
                >
                  <Video className="text-neon-blue" size={32} />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">Video CV</h3>
                <p className="text-gray-300 mb-6">
                  Watch my video CV to get a more personal introduction to my skills, personality, and career
                  aspirations.
                </p>
                <motion.a
                  href="https://drive.google.com/file/d/18VK2RaiKKcHhF5xkcwKV4PR3OzABsK6T/view"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(32, 84, 243, 0.7)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Video size={18} className="mr-2" />
                  Watch Video CV
                </motion.a>
        
              </div>
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
