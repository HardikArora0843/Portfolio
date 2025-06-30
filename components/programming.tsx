"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimationControls } from "framer-motion"
import { Code, GitBranch, GitPullRequest, Star, Award, Hash, TrendingUp } from "lucide-react"

const programmingStats = [
  { label: "Repositories", value: "30+", icon: Code },
  { label: "Contributions", value: "500+", icon: GitPullRequest },
  { label: "Stars", value: "100+", icon: Star },
  { label: "Forks", value: "50+", icon: GitBranch },
]

const languages = [
  { name: "C++", percentage: 95 },
  { name: "JavaScript", percentage: 92 },
  { name: "TypeScript", percentage: 90 },
  { name: "HTML/CSS", percentage: 88 },
  { name: "Python", percentage: 80 },
  { name: "Java", percentage: 75 },
  { name: "Other", percentage: 10 },
]

const platforms = [
  {
    name: "LeetCode",
    username: "Hardikarora0843",
    icon: Hash,
    link: "https://leetcode.com/u/Hardikarora0843/",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    name: "GFG",
    username: "hardika8k2i",
    icon: Award,
    link: "https://www.geeksforgeeks.org/user/hardika8k2i/",
    color: "from-brown-400 to-brown-600"
  },
  {
    name: "Codolio",
    username: "HardikArora0843",
    icon: TrendingUp,
    link: "https://codolio.com/profile/HardikArora0843",
    color: "from-red-500 to-red-700"
  },
]

export default function Programming() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [counters, setCounters] = useState(languages.map(() => 0))
  
  useEffect(() => {
    if (isInView) {
      const timers = languages.map((lang, index) => {
        return setTimeout(() => {
          const interval = setInterval(() => {
            setCounters(prev => {
              const newCounters = [...prev]
              if (newCounters[index] < lang.percentage) {
                newCounters[index] += 1
                return newCounters
              } else {
                clearInterval(interval)
                return prev
              }
            })
          }, 15) // Adjust speed as needed
          
          return interval
        }, 500 + index * 100)
      })
      
      return () => {
        timers.forEach(timer => clearTimeout(timer))
      }
    } else {
      setCounters(languages.map(() => 0))
    }
  }, [isInView])

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
    <section id="programming" className="py-20 relative">
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
              Programming
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mx-auto mb-6" />
            <p className="text-gray-300 text-lg">My coding journey and GitHub statistics</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {programmingStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="glass-effect rounded-xl p-6 text-center card-hover-effect"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 25px rgba(123, 31, 162, 0.5)",
                  borderColor: "rgba(123, 31, 162, 0.8)",
                }}
              >
                <motion.div
                  className="flex justify-center mb-3"
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <stat.icon className="text-neon-blue" size={28} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="glass-effect rounded-xl p-6 md:p-8 mb-12 card-hover-effect"
            whileHover={{
              boxShadow: "0 0 25px rgba(123, 31, 162, 0.5)",
              borderColor: "rgba(123, 31, 162, 0.8)",
            }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center">Languages Used</h3>
            <div className="space-y-6">
              {languages.map((lang, index) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">{lang.name}</span>
                    <motion.span
                      className="text-neon-blue"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      {counters[index]}%
                    </motion.span>
                  </div>
                  <div className="h-2 w-full bg-space-accent rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full relative"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${lang.percentage}%` } : { width: 0 }}
                      transition={{
                        duration: 1.5,
                        delay: 0.5 + index * 0.1,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div 
                        className="absolute right-0 top-0 h-full w-2 bg-white rounded-full"
                        animate={{
                          opacity: [0.2, 0.8, 0.2],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Coding Platforms</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {platforms.map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-effect rounded-xl p-6 text-center card-hover-effect flex flex-col items-center"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 25px rgba(123, 31, 162, 0.5)",
                    borderColor: "rgba(123, 31, 162, 0.8)",
                  }}
                >
                  <motion.div
                    className={`flex justify-center mb-3 h-12 w-12 rounded-full items-center bg-gradient-to-r ${platform.color}`}
                    animate={{
                      y: [0, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <platform.icon className="text-white" size={24} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-1">{platform.name}</h3>
                  <p className="text-gray-400 text-sm">@{platform.username}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <motion.a
              href="https://github.com/HardikArora0843"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium transition-transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(123, 31, 162, 0.6)",
              }}
            >
              <Code size={18} className="mr-2" />
              View GitHub Profile
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
