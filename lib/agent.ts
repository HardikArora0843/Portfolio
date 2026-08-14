import type {
  ChatCompletionMessageParam,
  ChatCompletionToolMessageParam,
} from "openai/resources/chat/completions"
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai"
import {
  executeTool,
  toolDefinitions,
  TOOL_SOURCE_LABELS,
} from "@/lib/agent/tools"
import { SYSTEM_PROMPT } from "@/lib/agent/system-prompt"
import type { AgentResponse } from "@/types/personal"

export const MAX_TOOL_ITERATIONS = 5

export interface AgentMessage {
  role: "user" | "assistant"
  content: string
}

export async function runAgent(
  messages: AgentMessage[]
): Promise<AgentResponse> {
  const client = getOpenAIClient()
  const model = getOpenAIModel()
  const sourcesUsed = new Set<string>()

  const conversationMessages: ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map(
      (m): ChatCompletionMessageParam => ({
        role: m.role,
        content: m.content,
      })
    ),
  ]

  for (let iteration = 0; iteration < MAX_TOOL_ITERATIONS; iteration++) {
    const response = await client.chat.completions.create({
      model,
      messages: conversationMessages,
      tools: toolDefinitions,
      tool_choice: "auto",
      temperature: 0.3,
      max_tokens: 800,
    })

    const choice = response.choices[0]
    if (!choice?.message) {
      throw new Error("No response from OpenAI")
    }

    const assistantMessage = choice.message
    conversationMessages.push(assistantMessage)

    const toolCalls = assistantMessage.tool_calls
    if (!toolCalls || toolCalls.length === 0) {
      const content = assistantMessage.content?.trim()
      if (!content) {
        throw new Error("Empty assistant response")
      }
      return {
        message: content,
        sources: sourcesUsed.size > 0 ? Array.from(sourcesUsed) : undefined,
      }
    }

    for (const toolCall of toolCalls) {
      if (toolCall.type !== "function") continue

      const toolName = toolCall.function.name
      let toolArgs: Record<string, unknown> = {}

      try {
        toolArgs = toolCall.function.arguments
          ? (JSON.parse(toolCall.function.arguments) as Record<string, unknown>)
          : {}
      } catch {
        toolArgs = {}
      }

      let toolResult: Record<string, unknown>
      try {
        toolResult = executeTool(toolName, toolArgs)
        const label = TOOL_SOURCE_LABELS[toolName]
        if (label) sourcesUsed.add(label)
      } catch (error) {
        toolResult = {
          error: "Tool execution failed",
          message: error instanceof Error ? error.message : "Unknown error",
        }
      }

      const toolMessage: ChatCompletionToolMessageParam = {
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolResult),
      }
      conversationMessages.push(toolMessage)
    }
  }

  return {
    message:
      "I have the relevant information but need to summarize it more concisely. Could you rephrase your question?",
    sources: sourcesUsed.size > 0 ? Array.from(sourcesUsed) : undefined,
  }
}
