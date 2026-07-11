import Hero from "@/components/homepage/Hero";
import BecomeHost from "@/components/homepage/HostSection";
import Statistics from "@/components/homepage/Statistics";
import Testimonials from "@/components/homepage/Testmonials";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Statistics />
      <BecomeHost />
      <Testimonials />
    </div>
  );
}
