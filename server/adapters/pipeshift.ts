import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.PIPESHIFT_API_KEY,
})

const MODEL = process.env.PIPESHIFT_MODEL ?? "gpt-4o"

export async function generate<T>(
  systemPrompt: string,
  userPrompt: string,
  imageBase64?: string,
  imageMediaType?: string
): Promise<T> {
  const userContent: OpenAI.Chat.ChatCompletionContentPart[] = imageBase64
    ? [
        {
          type: "image_url",
          image_url: {
            url: `data:${imageMediaType ?? "image/jpeg"};base64,${imageBase64}`,
            detail: "high",
          },
        },
        { type: "text", text: userPrompt },
      ]
    : [{ type: "text", text: userPrompt }]

  const response = await client.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent },
    ],
  })

  const raw = response.choices[0]?.message?.content ?? ""
  const cleaned = raw.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim()

  try {
    return JSON.parse(cleaned) as T
  } catch {
    throw new Error(`Model returned non-JSON: ${raw.slice(0, 200)}`)
  }
}
