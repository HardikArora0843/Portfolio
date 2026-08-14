import { NextRequest, NextResponse } from "next/server"
import { runAgent, type AgentMessage } from "@/lib/agent"
import { checkRateLimit } from "@/lib/rate-limit"

export const runtime = "nodejs"
export const maxDuration = 30

const MAX_MESSAGE_LENGTH = 4000
const MAX_MESSAGES = 20

function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown"
  return ip
}

function validateMessages(body: unknown): AgentMessage[] | null {
  if (!body || typeof body !== "object") return null
  const { messages } = body as { messages?: unknown }
  if (!Array.isArray(messages) || messages.length === 0) return null
  if (messages.length > MAX_MESSAGES) return null

  const validated: AgentMessage[] = []
  for (const msg of messages) {
    if (
      !msg ||
      typeof msg !== "object" ||
      !("role" in msg) ||
      !("content" in msg)
    ) {
      return null
    }
    const { role, content } = msg as { role: unknown; content: unknown }
    if (role !== "user" && role !== "assistant") return null
    if (typeof content !== "string") return null
    const trimmed = content.trim()
    if (trimmed.length === 0 || trimmed.length > MAX_MESSAGE_LENGTH) return null
    validated.push({ role, content: trimmed })
  }

  const last = validated[validated.length - 1]
  if (last.role !== "user") return null

  return validated
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not configured")
      return NextResponse.json(
        {
          error:
            "I'm having trouble processing that right now. Please try again.",
        },
        { status: 503 }
      )
    }

    const clientKey = getClientKey(request)
    const rateLimit = checkRateLimit(clientKey)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait a while before trying again.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.resetAt),
          },
        }
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
    }

    const messages = validateMessages(body)
    if (!messages) {
      return NextResponse.json(
        { error: "Invalid or empty message." },
        { status: 400 }
      )
    }

    const result = await runAgent(messages)

    return NextResponse.json(result, {
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    })
  } catch (error) {
    console.error("AI chat error:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      {
        error:
          "I'm having trouble processing that right now. Please try again.",
      },
      { status: 500 }
    )
  }
}
