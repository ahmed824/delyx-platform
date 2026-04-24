import WebsiteLayout from "@/components/WebsiteLayout";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServedLocations from "@/components/ServedLocations";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <WebsiteLayout>
      <main>
        <Hero />
        <Stats />
        <ServedLocations />
        <Reviews />
      </main>
    </WebsiteLayout>
  );
}
