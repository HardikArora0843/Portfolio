"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

const AiChatWindow = dynamic(() => import("@/components/ai-chat-window"), {
  ssr: false,
})

interface AiAgentContextValue {
  openChat: () => void
  closeChat: () => void
  isOpen: boolean
}

const AiAgentContext = createContext<AiAgentContextValue | null>(null)

export function useAiAgent(): AiAgentContextValue {
  const context = useContext(AiAgentContext)
  if (!context) {
    throw new Error("useAiAgent must be used within AiAgentProvider")
  }
  return context
}

export function AiAgentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openChat = useCallback(() => setIsOpen(true), [])
  const closeChat = useCallback(() => setIsOpen(false), [])

  return (
    <AiAgentContext.Provider value={{ openChat, closeChat, isOpen }}>
      {children}
      <AiAgentFloatingButton isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />
      {isOpen && <AiChatWindow isOpen={isOpen} onClose={closeChat} />}
    </AiAgentContext.Provider>
  )
}

function AiAgentFloatingButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean
  onToggle: () => void
}) {
  if (isOpen) return null

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-lg shadow-neon-purple/30 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-space-dark"
      aria-label="Open AI assistant"
    >
      <Sparkles size={24} />
    </motion.button>
  )
}
