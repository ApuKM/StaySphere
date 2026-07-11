'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Card } from '@heroui/react';
import { Users, Home, Globe2, Star } from 'lucide-react';
import { StatItem } from '@/utils/types/Homepage';


const STATS: StatItem[] = [
  {
    id: 1,
    value: '15K+',
    label: 'Happy Travelers',
    subtext: '+12% this month',
    icon: Users,
  },
  {
    id: 2,
    value: '2,500+',
    label: 'Verified Homes',
    subtext: 'Carefully vetted spaces',
    icon: Home,
  },
  {
    id: 3,
    value: '45+',
    label: 'Countries Covered',
    subtext: 'Expanding every day',
    icon: Globe2,
  },
  {
    id: 4,
    value: '4.8★',
    label: 'Average Rating',
    subtext: 'From 10k+ reviews',
    icon: Star,
  },
];

export default function Statistics(): React.JSX.Element {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] as const } 
    },
  };

  return (
    <section className="w-full bg-white py-20 px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 block">
            By The Numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text">
            The StaySphere Global Impact
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium">
            Join thousands of hosts and travelers who trust us to deliver authentic, secure, and unforgettable experiences.
          </p>
        </div>

        {/* Statistics Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            
            return (
              <motion.div key={stat.id} variants={cardVariants}>
                <Card className="h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl bg-brand-bg-soft">
                  
                  {/* Icon & Title Area */}
                  <Card.Header className="flex flex-col items-center pt-8 pb-2 text-center">
                    <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                      <Icon size={28} />
                    </div>
                    <Card.Title className="text-4xl font-extrabold text-brand-text">
                      {stat.value}
                    </Card.Title>
                  </Card.Header>
                  
                  {/* Description Area */}
                  <Card.Content className="text-center pb-4">
                    <Card.Description className="text-base font-semibold text-slate-700">
                      {stat.label}
                    </Card.Description>
                  </Card.Content>

                  {/* Subtext/Footer Area */}
                  <Card.Footer className="justify-center pb-6 pt-0">
                    <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                      {stat.subtext}
                    </span>
                  </Card.Footer>

                </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}