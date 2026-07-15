"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Listing } from "@/utils/types/Listings";
import ListingCard from "./ListingCard";
import { SpaceFilters } from "@/utils/types/Filter";
import SpaceFilterBar from "./ListingFilterBar";
import { PaginationWithSummary } from "./Pagination";

interface ExtendedSpaceFilters extends SpaceFilters {
  page: number;
}

interface ListingsClientWrapperProps {
  listings: Listing[];
  total?: number; // ডেটাবেজ থেকে আসা মোট লিস্টিং সংখ্যা (পেজিনেশনের জন্য)
}

export default function ListingsClientWrapper({
  listings,
  total = 0,
}: ListingsClientWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  // ১. URL প্যারামিটার থেকে ইনিশিয়াল স্টেট তৈরি
  const [filters, setFilters] = useState<ExtendedSpaceFilters>({
    searchQuery: searchParams.get("searchQuery") || "",
    location: searchParams.get("location") || "All",
    propertyType: searchParams.get("propertyType") || "All",
    priceSort: searchParams.get("priceSort") || "default",
    page: parseInt(searchParams.get("page") || "1"),
  });

  // ২. ব্রাউজারের Back/Forward বাটন চাপলে URL থেকে লোকাল স্টেট আপডেট করা
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newSearchQuery = searchParams.get("searchQuery") || "";
    const newLocation = searchParams.get("location") || "All";
    const newPropertyType = searchParams.get("propertyType") || "All";
    const newPriceSort = searchParams.get("priceSort") || "default";
    const newPage = parseInt(searchParams.get("page") || "1");

    setFilters((prev) => {
      if (
        prev.searchQuery === newSearchQuery &&
        prev.location === newLocation &&
        prev.propertyType === newPropertyType &&
        prev.priceSort === newPriceSort &&
        prev.page === newPage
      ) {
        return prev;
      }
      return {
        searchQuery: newSearchQuery,
        location: newLocation,
        propertyType: newPropertyType,
        priceSort: newPriceSort,
        page: newPage,
      };
    });
  }, [searchParams]);

  // ৩. ফিল্টার পরিবর্তন হলে পেজ রিসেট করে 1-এ নিয়ে আসা
  const handleFilterChange = (newFilters: Partial<SpaceFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  // ৪. পেজ পরিবর্তন করার ফাংশন
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // ৫. ফিল্টার স্টেট পরিবর্তন হলে URL আপডেট করা (Debounce-সহ)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();

      if (filters.searchQuery) params.set("searchQuery", filters.searchQuery);
      if (filters.location !== "All") params.set("location", filters.location);
      if (filters.propertyType !== "All")
        params.set("propertyType", filters.propertyType);
      if (filters.priceSort !== "default")
        params.set("priceSort", filters.priceSort);
      if (filters.page > 1) params.set("page", filters.page.toString());

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      const currentUrl = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      // শুধুমাত্র URL ভিন্ন হলেই পুশ/রিপ্লেস করবে
      if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false }); // scroll false থাকলে পেজ লাফিয়ে উপরে উঠবে না
      }
    }, 300); // 300ms Debounce

    return () => clearTimeout(timeoutId);
  }, [filters, pathname, router, searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 mt-8">
      {/* 🔍 StaySphere-এর ফিল্টার ও সার্চ বার */}
      <SpaceFilterBar
        key={`${filters.searchQuery}-${filters.location}-${filters.propertyType}-${filters.priceSort}`}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* 🏡 লিস্টিং গ্রিড ভিউ */}
      {listings?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>

          {total > 0 && (
            <div className="mt-12 flex justify-center">
              <PaginationWithSummary
                totalItems={total}
                currentPage={filters.page}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        /* 📭 ফাঁকা স্টেট (Empty State) */
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-dashed border-slate-200 rounded-3xl shadow-sm px-4">
          <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
            🏡
          </div>
          <p className="text-xl font-bold text-brand-text mb-2">
            No spaces found
          </p>
          <p className="text-sm text-slate-600 max-w-md">
            We could not find any properties matching your criteria. Try
            adjusting your search query, property type, or filters.
          </p>
        </div>
      )}
    </div>
  );
}
