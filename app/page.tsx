import Browser from "@/components/browser/browser";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <Browser />
      <Footer />
    </div>
  );
}
