"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import StarBackground from "@/components/star-background"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Certifications from "@/components/certifications"
import Programming from "@/components/programming"
import Hackathons from "@/components/hackathons"
import Contact from "@/components/contact"
import Resume from "@/components/resume"
import LoadingScreen from "@/components/loading-screen"
import Navbar from "@/components/navbar"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030014]">
      <StarBackground />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Programming />
            <Hackathons />
            <Contact />
            <Resume />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
