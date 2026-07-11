'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { Accordion, Card, Button } from '@heroui/react';
import { FaqItem } from '@/utils/types/Homepage';



const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I cancel my booking?',
    answer: 'You can cancel any booking up to 48 hours before check-in for a full refund. Simply go to your "Trips" dashboard, select the booking, and click "Cancel Reservation".',
  },
  {
    id: 'faq-2',
    question: 'Are the properties on StaySphere verified?',
    answer: 'Yes! Every host and property goes through a strict verification process. We check government IDs, property ownership, and read previous guest reviews to ensure your safety.',
  },
  {
    id: 'faq-3',
    question: 'When will I be charged for my reservation?',
    answer: 'You will be charged once the host confirms your booking request. If you book an "Instant Book" property, your payment method is charged immediately.',
  },
  {
    id: 'faq-4',
    question: 'Can I host my own property here?',
    answer: 'Absolutely. We are always looking for great hosts. Click on "Become a Host" at the top of the page to start setting up your listing in minutes.',
  },
];

export default function FaqAndNewsletter(): React.JSX.Element {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] as const } 
    }
  };

  return (
    <section className="w-full bg-white py-20 px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 block">
              Support & Guide
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text mb-8">
              Frequently asked questions
            </h2>
            
            <Accordion>
              {FAQS.map((faq) => (
                <Accordion.Item key={faq.id} className="border-b border-slate-200">
                  <Accordion.Heading>
                    <Accordion.Trigger className="w-full flex items-center justify-between py-5 text-left group">
                      <span className="font-bold text-base text-slate-800 group-hover:text-brand-primary transition-colors">
                        {faq.question}
                      </span>
                      <Accordion.Indicator className="text-slate-400 group-hover:text-brand-primary transition-colors" />
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="text-slate-500 font-medium pb-6 pr-8 text-sm leading-relaxed">
                      {faq.answer}
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="w-full"
          >
            <Card className="bg-slate-50 rounded-3xl border border-slate-100 shadow-lg shadow-brand-primary/5 relative overflow-hidden h-full">
              
              {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড শেইপ */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
              
              <Card.Header className="relative z-10 pt-8 px-8 md:pt-10 md:px-10 pb-0 flex flex-col items-start text-left">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-primary mb-6 border border-slate-100">
                  <Mail size={24} />
                </div>
                <Card.Title className="text-2xl font-extrabold text-brand-text mb-3">
                  Get 10% off your first escape
                </Card.Title>
                <Card.Description className="text-slate-500 font-medium text-sm leading-relaxed">
                  Join our newsletter for exclusive deals, hidden gem recommendations, and travel inspiration delivered straight to your inbox. No spam, ever.
                </Card.Description>
              </Card.Header>

              <Card.Content className="relative z-10 px-8 md:px-10 py-8">
                <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative grow">
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all shadow-sm"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-brand-primary text-white font-semibold text-sm px-6 py-4 rounded-xl shadow-md hover:bg-brand-primary/90 transition-all flex items-center gap-2 h-auto shrink-0"
                  >
                    Subscribe <Send size={16} />
                  </Button>
                </form>
              </Card.Content>

              <Card.Footer className="relative z-10 px-8 md:px-10 pb-8 md:pb-10 pt-0">
                <p className="text-xs text-slate-400 font-medium">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </Card.Footer>
              
            </Card>
          </motion.div>

        </div>

      </div>
    </section>
  );
}