import { useState, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";

const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const StatsSection = lazy(() => import("@/components/sections/StatsSection"));
const ExperienceSection = lazy(() => import("@/components/sections/ExperienceSection"));
const SignatureSection = lazy(() => import("@/components/sections/SignatureSection"));
const JourneySection = lazy(() => import("@/components/sections/JourneySection"));
const TeamSection = lazy(() => import("@/components/sections/TeamSection"));
const LocationsSection = lazy(() => import("@/components/sections/LocationsSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const FooterSection = lazy(() => import("@/components/sections/FooterSection"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Just Waffles | Enjoy More — Bengaluru's Premium Waffle Experience" },
      { name: "description", content: "Bengaluru's most loved premium eggless waffle destination. Belgian Waffles, Bubble Waffles, Waffy Wich & more. Crafted fresh, served warm, enjoyed more." },
      { property: "og:title", content: "Just Waffles | Enjoy More" },
      { property: "og:description", content: "Bengaluru's most loved premium eggless waffle destination." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && (
        <div className="relative min-h-screen bg-[#FCFBF8] noise-overlay text-[#241914]">
          <Navigation />

          <Suspense fallback={<div className="min-h-screen bg-[#FCFBF8]" />}>
            <main>
              <HeroSection />
              <StatsSection />
              <ExperienceSection />
              <SignatureSection />
              <JourneySection />
              <TeamSection />
              <LocationsSection />
              <TestimonialsSection />
              <GallerySection />
              <FooterSection />
            </main>
          </Suspense>
        </div>
      )}
    </>
  );
}
