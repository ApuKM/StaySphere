import Hero from "@/components/homepage/Hero";
import BecomeHost from "@/components/homepage/HostSection";
import Statistics from "@/components/homepage/Statistics";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Statistics />
      <BecomeHost />
    </div>
  );
}
