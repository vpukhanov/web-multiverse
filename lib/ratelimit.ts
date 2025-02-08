import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

import { MAX_LIMIT } from "./constants";

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(MAX_LIMIT, "24 h"),
});

export async function getLimit() {
  return ratelimit.getRemaining(await getIdentifier());
}

export async function limitCall() {
  return ratelimit.limit(await getIdentifier());
}

async function getIdentifier() {
  const ip = (await headers()).get("x-forwarded-for");
  return `web-multiverse:${ip}`;
}
