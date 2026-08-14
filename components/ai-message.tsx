"use client"

import type { ChatMessage } from "@/types/personal"

interface AiMessageProps {
  message: ChatMessage
}

export default function AiMessage({ message }: AiMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-r from-neon-purple to-neon-blue text-white"
            : "glass-effect text-gray-200"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {!isUser && message.sources && message.sources.length > 0 && (
          <p className="mt-2 text-xs text-gray-400">
            Source: {message.sources.join(", ")}
          </p>
        )}
      </div>
    </div>
  )
}
