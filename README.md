# Hardik Arora — Portfolio

Personal portfolio website built with Next.js, featuring projects, skills, experience, and a **Personal AI Agent** powered by OpenRouter tool calling (via the OpenAI-compatible SDK).

## Personal AI Agent

This portfolio includes an AI assistant that answers questions about Hardik's professional background — projects, skills, experience, education, certifications, and contact information.

The assistant uses **verified structured data** and **OpenAI-compatible function/tool calling** through OpenRouter. It does not use RAG, embeddings, or vector databases.

## Architecture

```text
User (Browser)
   ↓
POST /api/ai/chat
   ↓
Next.js Server (Agent Service)
   ↓
OpenRouter API
   ↓
Tool / Function Calling
   ↓
Structured Personal Data (data/)
   ↓
OpenRouter (final response)
   ↓
Chat UI
```

### How the Personal Agent Works

1. User asks a question in the chat UI.
2. The browser sends the conversation to `POST /api/ai/chat`.
3. The server sends the message, system prompt, and available tools to OpenRouter.
4. OpenRouter decides which personal-data tools are relevant.
5. The server executes the requested tools locally.
6. Tools return verified structured data from `data/`.
7. Tool results are sent back to OpenRouter.
8. OpenRouter generates the final natural-language response.
9. The response is returned to the browser.

```mermaid
sequenceDiagram
    participant U as User
    participant C as Chat UI
    participant A as /api/ai/chat
    participant O as OpenRouter
    participant T as Tools
    participant D as data/

    U->>C: Ask question
    C->>A: POST messages
    A->>O: System prompt + tools
    O->>A: tool_call(s)
    A->>T: executeTool()
    T->>D: Read verified data
    D-->>T: Structured JSON
    T-->>A: Tool results
    A->>O: Tool results
    O-->>A: Final answer
    A-->>C: message + sources
    C-->>U: Display response
```

## Tool Architecture

Deterministic tools expose specific categories of verified information:

| Tool | Returns |
|---|---|
| `getProfile` | Name, title, bio, location |
| `getExperience` | Work experience (FlyRank AI) |
| `getSkills` | Skills by category |
| `getProjects` | Project portfolio |
| `getEducation` | Academic background |
| `getCertifications` | Professional certifications |
| `getAchievements` | Hackathons and awards |
| `getResearch` | IEEE review paper |
| `getPatent` | Smart Water Bottle patent |
| `getCodingProfiles` | GitHub, LeetCode, GFG, Codolio |
| `getContact` | Email, phone, location, links |

Tools are defined in `lib/agent/tools.ts` and read from typed data in `data/`.

## Security

- OpenRouter API key is **server-side only** (`OPENROUTER_API_KEY`).
- Never expose the key with `NEXT_PUBLIC_` prefix.
- Input validation: empty messages rejected, 4000 character limit.
- Tool loop capped at 5 iterations.
- Generic error messages returned to users; technical details logged server-side only.
- Lightweight in-memory rate limiting (30 requests/hour per IP). On Vercel serverless, limits are per-instance — see `lib/rate-limit.ts`.

## Environment Variables

Copy `.env.example` to `.env.local`:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free

# Existing contact form (EmailJS)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

## Local Development

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
# Add your OPENROUTER_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click the sparkle button or **Ask My AI** in the hero.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure (AI Agent)

```text
app/api/ai/chat/route.ts    # API endpoint
components/ai-agent.tsx     # Floating button + provider
components/ai-chat-window.tsx
components/ai-message.tsx
lib/openai.ts               # OpenAI client
lib/agent.ts                # Agent orchestration
lib/agent/tools.ts          # Tool registry
lib/agent/system-prompt.ts
lib/rate-limit.ts
data/                       # Verified personal data
types/personal.ts           # TypeScript interfaces
```

## Tech Stack

- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenRouter API via OpenAI-compatible SDK (tool calling)
- shadcn/ui components

## License

Private portfolio project.
