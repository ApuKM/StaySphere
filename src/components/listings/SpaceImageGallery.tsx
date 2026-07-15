"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface SpaceImageGalleryProps {
  images?: string[];
  title?: string;
}

export default function SpaceImageGallery({ 
  images = [], 
  title = "Space" 
}: SpaceImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // লিস্টিং-এ কোনো ছবি না থাকলে ফলব্যাক লেআউট
  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center rounded-3xl border border-brand-border bg-brand-bg-soft text-slate-400 font-medium">
        No images available for this space
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* ─── 1. Main Large Image ─── */}
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-brand-border bg-brand-bg-soft shadow-xs">
        <Image
          src={images[currentIndex]}
          alt={`${title} - View ${currentIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover transition-all duration-500"
          priority
        />
        
        {/* Navigation Arrows (একাধিক ছবি থাকলেই দেখাবে) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2.5 text-white opacity-0 backdrop-blur-md transition-all hover:border-brand-primary hover:bg-brand-primary group-hover:opacity-100"
              aria-label="Previous image"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2.5 text-white opacity-0 backdrop-blur-md transition-all hover:border-brand-primary hover:bg-brand-primary group-hover:opacity-100"
              aria-label="Next image"
            >
              <FiChevronRight size={24} />
            </button>

            {/* Image Counter Badge */}
            <div className="absolute bottom-4 right-4 rounded-xl border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-bold tracking-widest text-white backdrop-blur-md">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* ─── 2. Thumbnails Row ─── */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                currentIndex === idx
                  ? "border-brand-primary shadow-sm"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`View thumbnail ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
              {/* অ্যাকটিভ ছবির উপরে একটি হালকা ওভারলে লেয়ার যা এটিকে আরও ফুটিয়ে তুলবে */}
              {currentIndex !== idx && (
                <div className="absolute inset-0 bg-black/10 transition-colors hover:bg-transparent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}