"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Enhanced typewriter effect with multiple phrases
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(100)

  const phrases = ["Software Developer", "Tech Enthusiast", "Full Stack Web Developer"]
  const period = 1500 // pause time after text is fully typed

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length
      const fullText = phrases[i]

      if (isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length - 1))
      } else {
        setDisplayText(fullText.substring(0, displayText.length + 1))
      }

      // Set typing speed - faster when deleting
      setTypingSpeed(isDeleting ? 50 : 100)

      // If completed typing the current phrase
      if (!isDeleting && displayText === fullText) {
        // Pause at the end
        setTimeout(() => setIsDeleting(true), period)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        // Pause before typing next phrase
        setTypingSpeed(500)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopNum, typingSpeed, phrases])

  return (
    <motion.section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
      style={{ opacity, scale, y }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="text-5xl text-neon-blue mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Hello, I&apos;m
          </motion.h2>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 text-glow bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue name-3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Hardik Arora
          </motion.h1>

          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mb-6 mx-auto lg:mx-0"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />

          <motion.div
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <span className="inline-block">{displayText}</span>
            <span className="inline-block w-1 h-6 ml-1 bg-neon-purple animate-pulse"></span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <a
              href="#about"
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium transition-transform hover:scale-105 hover:shadow-lg hover:shadow-neon-purple/20"
            >
              Explore My Work
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Profile Image with Glow Effect - With proper cropping for tall portrait */}
            <motion.div
              className="absolute inset-0 rounded-full glow-effect overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 15px 2px rgba(123, 31, 162, 0.5), 0 0 30px 4px rgba(32, 84, 243, 0.4)",
                  "0 0 20px 5px rgba(123, 31, 162, 0.7), 0 0 40px 7px rgba(32, 84, 243, 0.6)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <div className="w-full h-full relative">
                {/* Using objectPosition to focus on the face area of the tall portrait */}
                <Image
                  src="/myphoto2_4.png?height=400&width=400"
                  alt="Hardik Arora"
                  fill
                  className="object-cover object-[center_top]"
                  priority
                />
              </div>
            </motion.div>

            {/* Rotating Dashed Ring - Slower rotation */}
            <motion.div
              className="absolute inset-0 w-full h-full rounded-full border-4 border-dashed border-neon-blue"
              style={{ borderRadius: "50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Second Rotating Ring (opposite direction) - Slower rotation */}
            <motion.div
              className="absolute inset-0 w-[calc(100%+20px)] h-[calc(100%+20px)] -ml-[10px] -mt-[10px] rounded-full border-2 border-dashed border-neon-purple"
              style={{ borderRadius: "50%" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <ArrowDown className="text-neon-blue" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
