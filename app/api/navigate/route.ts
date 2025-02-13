import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { track } from "@vercel/analytics/server";
import { generateText } from "ai";

import navigatePostUniverse from "@/lib/prompts/navigate-post-universe.md";
import navigatePreUniverse from "@/lib/prompts/navigate-pre-universe.md";
import { limitCall } from "@/lib/ratelimit";
import { navigationSchema } from "@/lib/schemas";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "https://multiverse.pukhanov.ru",
    "X-Title": "Web Multiverse",
  },
});

export async function POST(request: Request) {
  const validatedFields = navigationSchema.safeParse(await request.json());
  if (!validatedFields.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { success, remaining, reset } = await limitCall();
  if (!success) {
    return Response.json(
      { error: "Rate limit exceeded", limit: { remaining, reset } },
      { status: 429 },
    );
  }

  if (remaining === 0) {
    track("Rate Limit Hit");
  }

  const { url, universe } = validatedFields.data;
  const { text, usage } = await generateText({
    model: openrouter("google/gemini-2.0-flash-001"),
    temperature: 1.1,
    messages: [
      { role: "system", content: navigatePreUniverse },
      { role: "user", content: universe },
      { role: "system", content: navigatePostUniverse },
      { role: "user", content: url },
    ],
  });

  track("LLM Generation", {
    promptTokens: usage.promptTokens,
    completionTokens: usage.completionTokens,
  });

  const html = text.replaceAll("```html", "").replaceAll("```", "");

  return Response.json({ html, limit: { remaining, reset } });
}
