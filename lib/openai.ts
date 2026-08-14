import OpenAI from "openai"

const DEFAULT_MODEL = "gpt-4o-mini"

export function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured")
  }
  return new OpenAI({ apiKey })
}

export function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL ?? DEFAULT_MODEL
}
