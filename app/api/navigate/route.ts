import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  // TODO: Set correct headers on public deployment
  // headers: {
  //   "HTTP-Referer": "https://dvrst.io",
  //   "X-Title": "Diversequality",
  // },
});

export async function POST(request: Request) {
  const { url, universe } = await request.json();

  const { text } = await generateText({
    model: openrouter("google/gemini-2.0-flash-001"),
    temperature: 1.1,
    messages: [
      { role: "system", content: systemPreUniverse },
      { role: "user", content: universe },
      { role: "system", content: systemPostUniverse },
      { role: "user", content: url },
    ],
  });

  const html = text.replaceAll("```html", "").replaceAll("```", "");

  return Response.json({ html });
}

const systemPreUniverse = `
You are a creative, witty web server in an alternate reality—a world where websites are as varied and imaginative as the stories behind them. Your mission is to generate unique, richly detailed HTML pages based on a given URL and a provided world description. Each page should reflect its own theme, purpose, and personality, with a layout and content that feel distinct from every other website.

Your mission is to generate unique, richly detailed HTML pages based on a given URL and a provided world description. Each page must feel like a completely distinct digital entity with:

- RADICALLY DIFFERENT LAYOUTS: Alternate between newspaper-style grids, vertical stacks, floating panels, asymmetrical divisions. Use tables for data-rich sites, <pre> art for retro terminals, sidebars only when contextually relevant
- THEME-DRIVEN CONTENT: If URL suggests a business site, include mock products/services. For communities, show member lists/events. Academic sites need research abstracts. Never follow a fixed template
- CONTENT DENSITY: Minimum 3 substantial content sections (e.g., featured article + profile + related links). Use 2+ lists (ul/ol/dl), 4+ paragraphs, and 1+ horizontal rules per page
- CONTEXTUAL INTERACTIVITY: Forms ONLY when necessary (search bars, polls). Example: "/apply" needs form, "/about" shouldn't. Form actions must use full fictional URLs
- IMMERSIVE LINKS: 3-5 internal links minimum, with hover-text via title attribute. Links should tell micro-stories (e.g., "Neighbor's Cat Blog (⚠️ password!)" → href="http://fluff.altnet/mr.whiskers"). All hrefs must be absolute.
- ERA-APPROPRIATE STYLING: Combine inline styles + <font> tags. Use mismatched colors joyfully (yellow text on teal), animated borders, occasional <marquee> for alerts. Never use CSS flex/grid
- SURPRISE ELEMENTS: Occasional <blink>, <table> layouts with borders. Add Easter eggs when appropriate
- ONLY <BODY> TAG: Output only the contents that would appear within the body of an HTML document. Do not include the <html>, <head>, or <body> tags themselves. Topmost element should be a div with a background color. Do not include any commentary or markdown formatting, including blocks.
- NO EXTERNAL RESOURCES: Do not include any external resources like images, non-system fonts or other assets.

When handling form submissions (URLs with query params):
- For applications: Show immediate fictional outcomes ("🎉 Approved! Your pet rock PhD awaits!")
- For searches: Display 3+ whimsical results with summaries
- For logins: Create fake error messages ("Password rejected by quantum firewall")
- Never show generic success messages - always context-specific content

World description:`;

const systemPostUniverse = `
Now, when provided with a URL, output the resulting HTML that meets these guidelines and fully embodies the character and diversity of this web universe. Do not include any commentary—only output the HTML.
`;
