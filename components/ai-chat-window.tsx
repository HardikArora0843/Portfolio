"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, RotateCcw, Trash2, Loader2 } from "lucide-react"
import AiMessage from "@/components/ai-message"
import type { ChatMessage } from "@/types/personal"

const SUGGESTED_QUESTIONS = [
  "What does Hardik do?",
  "Tell me about Hardik's FlyRank AI experience.",
  "What AI projects has Hardik built?",
  "What are Hardik's strongest backend technologies?",
  "Tell me about CodeForge.",
  "What certifications does Hardik have?",
  "What is Hardik's educational background?",
  "How can I contact Hardik?",
]

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Hardik's AI assistant. Ask me about his projects, skills, experience, or technical background.",
}

interface AiChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

export default function AiChatWindow({ isOpen, onClose }: AiChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFailedInput, setLastFailedInput] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading, error])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isLoading) return

      setError(null)
      setLastFailedInput(null)

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      }

      const apiMessages = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }))

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      try {
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        })

        const data = (await response.json()) as {
          message?: string
          sources?: string[]
          error?: string
        }

        if (!response.ok) {
          throw new Error(data.error ?? "Request failed")
        }

        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message ?? "I couldn't generate a response.",
          sources: data.sources,
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch {
        setError(
          "I'm having trouble processing that right now. Please try again."
        )
        setLastFailedInput(trimmed)
        setMessages((prev) => prev.slice(0, -1))
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, messages]
  )

  const handleSubmit = () => {
    sendMessage(input)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleClear = () => {
    setMessages([WELCOME_MESSAGE])
    setError(null)
    setLastFailedInput(null)
    setInput("")
  }

  const handleRetry = () => {
    if (lastFailedInput) {
      sendMessage(lastFailedInput)
    }
  }

  const showSuggestions =
    messages.length === 1 && messages[0].id === "welcome" && !isLoading

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-4 z-[70] flex h-[min(560px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-neon-purple/30 glass-effect shadow-2xl shadow-neon-purple/20"
          role="dialog"
          aria-label="Hardik's AI Assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neon-purple/20 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">
                ✨
              </span>
              <h2 className="text-sm font-semibold text-white">
                Hardik&apos;s AI Assistant
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-space-accent hover:text-white"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-space-accent hover:text-white"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => (
              <AiMessage key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="glass-effect flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-gray-300">
                  <Loader2 size={16} className="animate-spin text-neon-purple" />
                  Thinking...
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-900/20 px-4 py-3 text-sm text-red-200">
                <p>{error}</p>
                {lastFailedInput && (
                  <button
                    onClick={handleRetry}
                    className="mt-2 flex items-center gap-1 text-xs text-neon-blue hover:text-neon-purple"
                  >
                    <RotateCcw size={12} />
                    Retry
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Suggested questions */}
          {showSuggestions && (
            <div className="border-t border-neon-purple/10 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.slice(0, 4).map((question) => (
                  <button
                    key={question}
                    onClick={() => sendMessage(question)}
                    className="rounded-full border border-neon-purple/30 bg-space-accent/50 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-neon-purple/60 hover:text-white"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-neon-purple/20 p-4">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                disabled={isLoading}
                rows={1}
                maxLength={4000}
                className="flex-1 resize-none rounded-xl border border-neon-purple/20 bg-space-accent px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple disabled:opacity-50"
                aria-label="Message input"
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
