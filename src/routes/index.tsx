import { useState, useEffect, lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Lenis from "lenis";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";

const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const ScrollStorySection = lazy(() => import("@/components/sections/ScrollStorySection"));
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const WhySection = lazy(() => import("@/components/sections/WhySection"));
const SignatureSection = lazy(() => import("@/components/sections/SignatureSection"));
const ExperienceSection = lazy(() => import("@/components/sections/ExperienceSection"));
const JourneySection = lazy(() => import("@/components/sections/JourneySection"));
const LocationsSection = lazy(() => import("@/components/sections/LocationsSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const SocialSection = lazy(() => import("@/components/sections/SocialSection"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));
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

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && (
        <div className="relative min-h-screen bg-luxury-black noise-overlay">
          <ParticleBackground />
          <Navigation />

          <Suspense fallback={<div className="min-h-screen bg-luxury-black" />}>
            <main>
              <HeroSection />
              <ScrollStorySection />
              <AboutSection />
              <WhySection />
              <SignatureSection />
              <ExperienceSection />
              <JourneySection />
              <LocationsSection />
              <GallerySection />
              <TestimonialsSection />
              <SocialSection />
              <ContactSection />
              <FooterSection />
            </main>
          </Suspense>
        </div>
      )}
    </>
  );
}
