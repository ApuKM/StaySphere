'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Separator } from '@heroui/react';
import { 
  MapPin, 
  PhoneCall, 
  MailIcon, 
} from 'lucide-react';
import { BsFacebook,BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs';

export default function Footer() {
  // Current year for the copyright section
  const currentYear = new Date().getFullYear();

  return (
    // Airbnb Style Light Background with subtle top border
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section: Grid for Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brand Information */}
          <div className="flex flex-col gap-4">
            {/* Reused Logo from Navbar (Rose Red Theme) */}
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary text-white font-black text-lg transition-transform group-hover:scale-105">
                S
              </div>
              <div>
                <h2 className="text-lg font-bold leading-none tracking-tight text-brand-text">StaySphere</h2>
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Escapes</p>
              </div>
            </Link>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Discover unique homes, experiences, and places around the world. Your perfect getaway is just a click away.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brand-text font-semibold text-base tracking-wide">Explore</h3>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-brand-text hover:underline transition-all">Home</Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-brand-text hover:underline transition-all">All Properties</Link>
              </li>
              <li>
                <Link href="/items/add" className="hover:text-brand-text hover:underline transition-all">Host Your Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-text hover:underline transition-all">About Us</Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-brand-text hover:underline transition-all">Help Center</Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Information */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brand-text font-semibold text-base tracking-wide">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-slate-500">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-brand-primary shrink-0 mt-0.5" />
                <span>Level 4, 12 Coastal Avenue,<br />Marine Drive, Coxs Bazar</span>
              </li>
              <li className="flex gap-3 items-center">
                <PhoneCall size={18} className="text-brand-primary shrink-0" />
                <span>+880 (133) 250-2004</span>
              </li>
              <li className="flex gap-3 items-center">
                <MailIcon size={18} className="text-brand-primary shrink-0" />
                <span>support@staysphere.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Social Media Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brand-text font-semibold text-base tracking-wide">Follow Us</h3>
            <p className="text-slate-500 text-sm mb-2">
              Stay connected for exclusive deals and travel inspiration.
            </p>
            <div className="flex gap-2">
              {/* Social buttons using Lucide React without variant props */}
              <Button isIconOnly className="bg-slate-200/50 text-slate-600 hover:text-white hover:bg-blue-600 transition-all rounded-full" aria-label="Facebook">
                <BsFacebook size={18} />
              </Button>
              <Button isIconOnly className="bg-slate-200/50 text-slate-600 hover:text-white hover:bg-black transition-all rounded-full" aria-label="Twitter">
                <BsTwitter size={18} />
              </Button>
              <Button isIconOnly className="bg-slate-200/50 text-slate-600 hover:text-white hover:bg-pink-600 transition-all rounded-full" aria-label="Instagram">
                <BsInstagram size={18} />
              </Button>
            </div>
          </div>
          
        </div>

        {/* Separator */}
        <Separator className="bg-slate-200 my-8" />

        {/* 5. Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© {currentYear} StaySphere Escapes. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-text hover:underline transition-colors">Privacy Policy</Link>
            <span className="text-slate-300">|</span>
            <Link href="/terms" className="hover:text-brand-text hover:underline transition-colors">Terms of Service</Link>
            <span className="text-slate-300">|</span>
            <Link href="/sitemap" className="hover:text-brand-text hover:underline transition-colors">Sitemap</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}