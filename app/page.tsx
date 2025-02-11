import Browser from "@/components/browser/browser";
import Footer from "@/components/footer";
import { getLimit } from "@/lib/ratelimit";

export default async function HomePage() {
  const limit = await getLimit();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <Browser initialLimit={limit} />
      <Footer />
    </div>
  );
}
