"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    location: "Stayed in a Beachfront Villa, Bali",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review:
      "Absolutely breathtaking! The booking process on StaySphere was seamless, and the villa matched the pictures exactly. The host was incredibly welcoming.",
  },
  {
    id: "t2",
    name: "David Chen",
    location: "Stayed in a Treehouse, Kyoto",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review:
      "A truly magical experience. The platform made it so easy to communicate with the host. Waking up to the sounds of the forest was unforgettable.",
  },
  {
    id: "t3",
    name: "Emily & James",
    location: "Stayed in a Penthouse, New York",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    review:
      "The best travel app we have used. The verified listings gave us peace of mind, and the penthouse views were spectacular. Will definitely book again!",
  },
];

export default function Testimonials(): React.JSX.Element {
  // অ্যানিমেশন ভ্যারিয়েন্টস (Stagger Effect)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] as const },
    },
  };

  return (
    <section className="w-full bg-brand-bg-soft py-24 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* সেকশন হেডার */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3">
            Guest Experiences
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text mb-4">
            Dont just take our word for it
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl">
            Millions of travelers find their perfect getaway on StaySphere. Here
            is what they have to say about their experiences.
          </p>
        </div>

        {/* টেস্টিমোনিয়াল গ্রিড */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {TESTIMONIALS.map((item) => (
            <motion.div
              id={item.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full group"
            >
              {/* ব্যাকগ্রাউন্ড কোটেশন আইকন (Watermark Style) */}
              <div className="absolute top-6 right-6 text-brand-primary/10 transition-colors duration-300 group-hover:text-brand-primary/20">
                <Quote size={64} fill="currentColor" />
              </div>

              {/* রেটিং স্টারস */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    id={i}
                    size={18}
                    className="text-brand-accent fill-brand-accent"
                  />
                ))}
              </div>

              {/* রিভিউ টেক্সট */}
              <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-grow relative z-10 text-sm md:text-base">
                {item.review}
              </p>

              {/* ইউজার প্রোফাইল (ফুটার অংশ) */}
              <div className="flex items-center gap-4 mt-auto border-t border-slate-100 pt-6 relative z-10">
                <Image
                  width={48}
                  height={48}
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-50"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-brand-text text-base">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
