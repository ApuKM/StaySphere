"use client";

import React from "react";
import Link from "next/link";
import { 
  Button, 
  Card, 
  TextField,
  InputGroup,
  Accordion,
  Label
} from "@heroui/react";
import { 
  FiSearch, 
  FiBookOpen, 
  FiHome, 
  FiCreditCard, 
  FiShield, 
  FiMessageCircle, 
  FiMail,
  FiChevronDown
} from "react-icons/fi";

export default function HelpSupportPage() {
  const categories = [
    { title: "Guest Guide", icon: <FiBookOpen size={24} />, desc: "Booking, check-in, and stays" },
    { title: "Hosting on StaySphere", icon: <FiHome size={24} />, desc: "Listing, payouts, and rules" },
    { title: "Payments & Refunds", icon: <FiCreditCard size={24} />, desc: "Billing, receipts, and pricing" },
    { title: "Trust & Safety", icon: <FiShield size={24} />, desc: "Account security and policies" },
  ];

  const faqs = [
    {
      q: "What is the standard cancellation policy?",
      a: "Guests can receive a full refund if they cancel at least 48 hours before check-in. Cancellations made within 48 hours are subject to a 50% fee. Hosts can also set custom strict policies for specific properties."
    },
    {
      q: "How do I start hosting my space?",
      a: "Simply navigate to the 'Become a Host' page, complete your profile verification, and upload high-quality photos of your space. Our team reviews all new listings within 24 hours to ensure quality standards."
    },
    {
      q: "Are there any hidden booking fees?",
      a: "No! StaySphere prides itself on transparency. The price you see on the checkout page includes the base rate, cleaning fee, and standard taxes. No surprise charges upon arrival."
    },
    {
      q: "Is my payment information secure?",
      a: "Absolutely. We use bank-level AES-256 encryption for all transactions. Your credit card details are never stored directly on our servers; they are tokenized via our secure payment partners (Stripe/PayPal)."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-primary/20 pb-20">
      
      {/* 🌌 Hero Search Section (Using TextField & InputGroup Anatomy) */}
      <section className="relative py-24 bg-brand-bg-soft/50 border-b border-brand-border/50 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Search for articles, guides, or browse the categories below.
          </p>
          
          <div className="max-w-2xl mx-auto relative group text-left">
            <TextField className="w-full">
              <Label className="sr-only">Search help articles</Label>
              <InputGroup className="flex items-center bg-brand-bg border border-brand-border hover:border-brand-primary/50 focus-within:border-brand-primary shadow-xl rounded-2xl px-4 py-2 transition-colors">
                <InputGroup.Prefix className="pr-3">
                  <FiSearch className="size-5 text-slate-400" />
                </InputGroup.Prefix>
                <InputGroup.Input 
                  className="w-full bg-transparent text-brand-text placeholder:text-slate-500 py-3 focus:outline-none" 
                  placeholder="e.g., 'How to cancel a booking' or 'Host payouts'" 
                />
              </InputGroup>
            </TextField>
          </div>
        </div>
      </section>

      {/* 📚 Categories Section (Using Card Anatomy) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="bg-brand-bg border border-brand-border rounded-2xl hover:border-brand-primary/50 transition-colors shadow-sm overflow-hidden group cursor-pointer"
            >
              <Card.Header className="px-6 pt-6 pb-2 flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <Card.Title className="text-lg font-bold text-brand-text">
                  {category.title}
                </Card.Title>
                <Card.Description className="text-slate-400 text-sm">
                  {category.desc}
                </Card.Description>
              </Card.Header>
              <Card.Content className="px-6 pb-6" />
            </Card>
          ))}
        </div>
      </section>

      {/* 💬 FAQ Section (Using Accordion Anatomy) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-slate-400 mt-2">Quick answers to the most common queries.</p>
        </div>

        <Accordion className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <Accordion.Item 
              key={index} 
              className="bg-brand-bg-soft border border-brand-border rounded-xl overflow-hidden data-[expanded=true]:border-brand-primary/50 transition-colors"
            >
              <Accordion.Heading>
                <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-brand-text hover:text-brand-primary focus:outline-none">
                  {faq.q}
                  <Accordion.Indicator className="text-slate-400">
                    <FiChevronDown size={18} />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>
              
              <Accordion.Panel>
                <Accordion.Body className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-brand-border/30 mt-2 pt-4">
                  {faq.a}
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-brand-primary/10 to-brand-bg-soft border border-brand-primary/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
            <p className="text-slate-400">Our support team is available 24/7 to assist you with any issues.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button 
              className="bg-brand-primary text-white font-semibold flex items-center gap-2 px-6 py-3 rounded-xl"
            >
              <FiMessageCircle size={18} /> Live Chat
            </Button>
            <Link href="">
              <Button 
                variant="outline" 
                className="border-brand-border text-brand-text hover:bg-brand-bg flex items-center gap-2 px-6 py-3 rounded-xl w-full sm:w-auto"
              >
                <FiMail size={18} /> Email Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}