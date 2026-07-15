"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiUsers, FiHeart, FiArrowRight } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { Listing } from "@/utils/types/Listings";
import { Button } from "@heroui/react";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/browse/${listing._id}`} className="group block">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        {/* ইমেজ সেকশন */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          <Image
            src={
              listing?.images[0] ||
              "https://images.unsplash.com/photo-1560347876-aeef00ee58a4"
            }
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* ফেভারিট বাটন - Airbnb স্টাইল */}
          <button
            className="absolute top-3 right-3 p-2 bg-white/70 hover:bg-white backdrop-blur-sm rounded-full text-slate-500 hover:text-brand-primary transition-colors z-10"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Add to wishlist logic
            }}
          >
            <FiHeart className="text-lg" />
          </button>
        </div>

        {/* কন্টেন্ট সেকশন */}
        <div className="p-5 flex flex-col grow">
          {/* লোকেশন এবং প্রপার্টি টাইপ */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-brand-secondary flex items-center gap-1 truncate pr-2">
              <FiMapPin className="text-xs" />
              <span className="truncate">{listing.location}</span>
            </p>
            <span className="text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
              {listing.propertyType}
            </span>
          </div>

          {/* টাইটেল */}
          <h3 className="text-[17px] font-bold text-brand-text mb-2 line-clamp-1 group-hover:text-brand-primary transition-colors">
            {listing.title}
          </h3>

          {/* গেস্ট ও বেডরুম ইনফো */}
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 grow">
            <div className="flex items-center gap-1.5">
              <FiUsers className="text-slate-400" />
              <span>{listing.maxGuests} Guests</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-1.5">
              <IoBedOutline className="text-slate-400 text-lg" />
              <span>
                {listing.bedrooms} Bed{listing.bedrooms > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 mb-4"></div>

          <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-brand-border">
            {/* বাম পাশে দাম */}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-brand-text">
                ${listing.pricePerNight}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                / night
              </span>
            </div>

            {/* ডান পাশে HeroUI বাটন */}
            <Link href={`/spaces/${listing._id}`} className="no-underline">
              <Button
                size="sm"
                className="bg-brand-primary text-white font-semibold rounded-xl px-4 py-2 hover:opacity-90 transition-all duration-200 shadow-sm flex items-center gap-1 group/btn"
              >
                View Details
                {/* মাউস হোভার করলে আইকনটি সামান্য ডান পাশে সরবে */}
                <FiArrowRight
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                  size={14}
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
