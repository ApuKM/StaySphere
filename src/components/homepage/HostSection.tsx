"use client";

import React from "react";
import { motion, Variants } from "framer-motion"; 
import { Button } from "@heroui/react";
import { Home, Sparkles, Coins, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { BenefitItem } from "@/utils/types/Homepage";

const BENEFITS: BenefitItem[] = [
  {
    icon: Coins,
    title: "Earn extra income",
    description:
      "Pay for your next vacation or pay off your mortgage by renting your extra space.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & protected",
    description:
      "Rest easy with our complete top-tier property protection insurance on every booking.",
  },
  {
    icon: Sparkles,
    title: "You are in control",
    description:
      "Choose your own schedule, prices, and customized guest requirements easily.",
  },
];

export default function BecomeHost(): React.JSX.Element {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] as const },
    },
  };

  return (
    <section className="w-full bg-slate-50 py-20 px-6 lg:px-8 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            className="lg:col-span-5 relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute -inset-4 rounded-3xl bg-brand-primary/5 blur-xl transition-all group-hover:bg-brand-primary/10" />

            <div
              className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-cover bg-center shadow-xl shadow-slate-200"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80')`,
              }}
            >
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                    <Home size={20} />
                  </div>
                  <h4 className="font-bold text-slate-800">Ready to Host?</h4>
                </div>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Hosts in Coxs Bazar average around{" "}
                  <span className="text-brand-text font-bold">
                    ৳45,000/month
                  </span>{" "}
                  sharing just one private room.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 block"
            >
              Host Your Space
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight mb-4 max-w-xl"
            >
              Earn reliable income. Share your world.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-500 font-medium text-sm md:text-base mb-10 max-w-xl leading-relaxed"
            >
              Open your doors to travelers looking for authentic experiences. We
              guide you every step of the way—from setup to your very first
              payout.
            </motion.p>

            <div className="flex flex-col gap-6 mb-10">
              {BENEFITS.map((benefit: BenefitItem, index: number) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title ?? index}
                    variants={itemVariants}
                    className="flex gap-4 items-start"
                  >
                    <div className="p-3 bg-white border border-slate-200 rounded-xl text-brand-primary shadow-sm shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-500 text-sm max-w-lg leading-normal">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-fit"
            >
              <Link href="/items/add">
                <Button className="bg-brand-primary text-white font-semibold text-sm px-8 py-6 rounded-full shadow-lg shadow-brand-primary/10 hover:bg-brand-primary/90 transition-all">
                  Lets Get Started
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
