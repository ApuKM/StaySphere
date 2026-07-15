import FaqAndNewsletter from "@/components/homepage/FaqAndNewsletter";
import Hero from "@/components/homepage/Hero";
import BecomeHost from "@/components/homepage/HostSection";
import HomePageFeaturedSection from "@/components/homepage/LatestSpaces";
import Statistics from "@/components/homepage/Statistics";
import Testimonials from "@/components/homepage/Testmonials";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Statistics />
      <HomePageFeaturedSection />
      <BecomeHost />
      <Testimonials />
      <FaqAndNewsletter />
    </div>
  );
}
