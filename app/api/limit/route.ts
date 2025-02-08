import { getLimit } from "@/lib/ratelimit";

export async function GET() {
  const { remaining, reset } = await getLimit();
  return Response.json({ remaining, reset });
}
