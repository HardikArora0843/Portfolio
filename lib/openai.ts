import OpenAI from "openai"

const DEFAULT_MODEL = "openrouter/free"
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

export function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured")
  }
  return new OpenAI({
    apiKey,
    baseURL: OPENROUTER_BASE_URL,
  })
}

export function getOpenAIModel(): string {
  return process.env.OPENROUTER_MODEL ?? DEFAULT_MODEL
}
