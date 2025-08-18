"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-space-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-32 h-32 rounded-full border-t-4 border-b-4 border-neon-purple"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute w-24 h-24 rounded-full border-t-4 border-r-4 border-neon-blue"
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute w-16 h-16 rounded-full border-l-4 border-r-4 border-neon-pink"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.h1
          className="mt-12 text-2xl font-bold text-white text-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Hardik Arora
        </motion.h1>

        <motion.div
          className="mt-4 text-neon-blue"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 0.8, duration: 1.5 }}
        >
          <div className="h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  )
}
