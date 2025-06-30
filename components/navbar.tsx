"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Programming", href: "#programming" },
  { name: "Hackathons", href: "#hackathons" },
  { name: "Contact", href: "#contact" },
  { name: "Resume", href: "#resume" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveItem(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
          isScrolled ? "glass-effect" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div className="text-xl font-bold text-white text-glow" whileHover={{ scale: 1.05 }}>
            <Link href="#home">Hardik Arora</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    activeItem === item.href.substring(1) ? "text-neon-purple" : "text-white hover:text-neon-purple"
                  }`}
                >
                  {item.name}
                </Link>
                <motion.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-neon-purple to-neon-blue rounded-full"
                  initial={{ width: activeItem === item.href.substring(1) ? "100%" : "0%" }}
                  animate={{ width: activeItem === item.href.substring(1) ? "100%" : "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 glass-effect md:hidden pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center space-y-6 p-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className={`text-lg font-medium ${
                    activeItem === item.href.substring(1) ? "text-neon-purple" : "text-white hover:text-neon-purple"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                <motion.div
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-neon-purple to-neon-blue rounded-full"
                  initial={{ width: activeItem === item.href.substring(1) ? "100%" : "0%" }}
                  animate={{ width: activeItem === item.href.substring(1) ? "100%" : "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}
