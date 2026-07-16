
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { 
  FiMapPin, 
  FiShield, 
  FiCompass, 
  FiUsers, 
  FiTrendingUp, 
  FiAward, 
  FiArrowRight 
} from "react-icons/fi";

export const metadata = {
  title: "About Us | StaySphere",
  description: "Learn about StaySphere - Redefining modern hospitality and seamless stays globally.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-primary/20">
      
      {/* 🌌 Section 1: Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-20 border-b border-brand-border/50">
        {/* Background Grid Pattern (Sleek Tech Touch) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20 mb-6">
            <FiCompass className="animate-spin-slow" /> Redefining Hospitality
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] mb-6">
            Your Gateway to <br />
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Extraordinary Stays
            </span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            StaySphere is a decentralized-inspired hospitality ecosystem connecting global travelers with exceptional, curated living spaces. We bridge the gap between comfort, community, and technology.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/spaces">
              <Button className="bg-brand-primary text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center gap-2">
                Explore Spaces <FiArrowRight />
              </Button>
            </Link>
            <Link href="/items/manage">
              <Button variant="outline" className="border-brand-border text-brand-text hover:bg-brand-bg-soft font-semibold px-6 py-3 rounded-xl">
                Become a Host
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 📊 Section 2: Trust & Numbers (Stats) */}
      <section className="py-16 bg-brand-bg-soft/40 border-b border-brand-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl lg:text-5xl font-black text-brand-secondary">12K+</h3>
              <p className="text-xs lg:text-sm text-slate-400 uppercase tracking-widest mt-2 font-medium">Premium Spaces</p>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-black text-brand-secondary">85K+</h3>
              <p className="text-xs lg:text-sm text-slate-400 uppercase tracking-widest mt-2 font-medium">Happy Travelers</p>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-black text-brand-secondary">4.9★</h3>
              <p className="text-xs lg:text-sm text-slate-400 uppercase tracking-widest mt-2 font-medium">Average Rating</p>
            </div>
            <div>
              <h3 className="text-4xl lg:text-5xl font-black text-brand-secondary">150+</h3>
              <p className="text-xs lg:text-sm text-slate-400 uppercase tracking-widest mt-2 font-medium">Global Cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 Section 3: Our Philosophy & Mission */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mission Copy */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Empowering Everyone to Belong, <span className="text-brand-primary">Anywhere.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                At StaySphere, we believe traveling shouldn&apos;t feel like staying in a sterile, temporary box. It should feel like stepping into a curated chapter of local culture. Whether you are a digital nomad seeking high-speed fiber or a family craving a scenic escape, we customize every pixel of the experience.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <span className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary mt-1"><FiShield size={16} /></span>
                  <div>
                    <h4 className="font-bold text-brand-text">Verified Secure Ecosystem</h4>
                    <p className="text-sm text-slate-400">Strict guest/host verifications and smart pricing logs ensure peace of mind.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary mt-1"><FiMapPin size={16} /></span>
                  <div>
                    <h4 className="font-bold text-brand-text">Local Heart, Global Reach</h4>
                    <p className="text-sm text-slate-400">Seamless integration with localized activities and guides.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-emerald-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000" />
              <div className="relative bg-brand-bg-soft border border-brand-border p-8 rounded-3xl flex flex-col justify-between h-80">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <FiAward size={24} />
                  </div>
                  <h3 className="text-xl font-bold pt-4 text-brand-text">The Quality Standard</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Every property is pre-vetted against our 80-point quality matrix covering hygiene, backup utilities, aesthetics, and localized connectivity.
                  </p>
                </div>
                <div className="text-xs text-brand-primary font-mono tracking-wider uppercase border-t border-brand-border/40 pt-4">
                  StaySphere Certified®
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💎 Section 4: Our Core Pillars (3 Cards) */}
      <section className="py-20 bg-brand-bg-soft/20 border-t border-brand-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight">Built On Trust, Driven By Tech</h2>
            <p className="text-slate-400 text-sm mt-3">The values that define how we construct our experiences and maintain operations globally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <Card className="bg-brand-bg border border-brand-border p-6 rounded-2xl flex flex-col gap-4 hover:border-brand-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <FiShield size={20} />
              </div>
              <h3 className="text-lg font-bold">Absolute Safety</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                With encrypted multi-factor payments and reliable insurance coverage for hosts, your stays and earnings are protected with bank-grade safety protocols.
              </p>
            </Card>

            {/* Pillar 2 */}
            <Card className="bg-brand-bg border border-brand-border p-6 rounded-2xl flex flex-col gap-4 hover:border-brand-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <FiUsers size={20} />
              </div>
              <h3 className="text-lg font-bold">Community-First</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We organize local host meetups and traveler communities. Because travel is not just about the beautiful place; it’s about the people you share it with.
              </p>
            </Card>

            {/* Pillar 3 */}
            <Card className="bg-brand-bg border border-brand-border p-6 rounded-2xl flex flex-col gap-4 hover:border-brand-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <FiTrendingUp size={20} />
              </div>
              <h3 className="text-lg font-bold">Zero-Friction Host Earnings</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our dynamic pricing algorithms and real-time dashboard analytics maximize properties&apos; yield and revenue with zero manual overhead.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 🚀 Section 5: Call to Action */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black mb-6 tracking-tight">Ready to step into the Sphere?</h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Join thousands of travelers who have already shifted to a more personalized and friction-free booking style. Or, monetize your extra space now!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/browse">
              <Button size="lg" className="bg-brand-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg">
                Find Your Perfect Stay
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}