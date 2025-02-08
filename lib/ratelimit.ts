import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(30, "24 h"),
});

export async function getLimit() {
  const id = getIdentifier((await headers()).get("x-forwarded-for"));
  return ratelimit.getRemaining(id);
}

function getIdentifier(ip: string | null) {
  return `web-multiverse:${ip}`;
}
