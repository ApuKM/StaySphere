"use client";

import React, { useState } from "react";
import { Listing } from "@/utils/types/Listings";
import ListingFilterBar from "./ListingFilterBar";
import ListingCard from "./ListingCard";


interface ListingsClientWrapperProps {
  listings: Listing[];
}

export default function ListingsClientWrapper({ listings }: ListingsClientWrapperProps) {
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
 
  // console.log("Filtered", filteredListings.length,
  // filteredListings)
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* 🔍 StaySphere-এর ফিল্টার ও সার্চ বার */}
      <ListingFilterBar />

      {/* 🏡 লিস্টিং গ্রিড ভিউ */}
      {filteredListings?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        /* 📭 ফাঁকা স্টেট (Empty State) - অরিজিনাল লাইট থিমে */
        <div className="flex flex-col items-center justify-center py-24 mt-8 text-center bg-white border border-dashed border-slate-200 rounded-3xl shadow-sm px-4">
          <div className="w-16 h-16 bg-rose-50 text-brand-primary rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
            🏡
          </div>
          <p className="text-xl font-bold text-brand-text mb-2">
            No spaces found
          </p>
          <p className="text-sm text-slate-600 max-w-md">
            We could not find any properties matching your criteria. Try adjusting your search query, price range, or filters.
          </p>
        </div>
      )}
    </div>
  );
}