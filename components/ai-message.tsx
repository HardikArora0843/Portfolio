"use client"

import type { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import type { ChatMessage } from "@/types/personal"

interface AiMessageProps {
  message: ChatMessage
}

const markdownComponents = {
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-2 ml-4 list-disc space-y-1.5">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-2 ml-4 list-decimal space-y-1.5">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="text-gray-200">{children}</li>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="text-gray-300 not-italic">{children}</em>
  ),
  h1: ({ children }: { children?: ReactNode }) => (
    <p className="mb-2 font-semibold text-white">{children}</p>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <p className="mb-2 font-semibold text-white">{children}</p>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <p className="mb-1.5 font-medium text-white">{children}</p>
  ),
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
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="ai-markdown">
            <ReactMarkdown components={markdownComponents}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        {!isUser && message.sources && message.sources.length > 0 && (
          <p className="mt-2 border-t border-neon-purple/10 pt-2 text-xs text-gray-400">
            Source: {message.sources.join(", ")}
          </p>
        )}
      </div>
    </div>
  )
}
