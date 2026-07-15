import ListingsSkeleton from "@/components/listings/ListingCardSkeleton";
import ListingsClientWrapper from "@/components/listings/ListingsClientWrapper";
import { getListings } from "@/lib/apis/Listings";
import { Suspense } from "react";

export default async function ExploreSpacesPage() {
  const listingsObj = await getListings();
  const listings = listingsObj.listings;
  // console.log(listings)
  return (
    <div className="min-h-screen bg-brand-bg-soft">
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-18">
        {/* Header Section */}
        <div className="mb-8 text-center pt-8">
          <h2 className="text-2xl font-bold text-brand-text tracking-tight sm:text-3xl">
            Explore Spaces
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Browse beautiful properties from trusted hosts and find your perfect
            stay.
          </p>
        </div>

        {/* Listings Grid with Suspense Fallback */}
        <Suspense fallback={<ListingsSkeleton />}>
          <ListingsClientWrapper listings={listings} />
        </Suspense>
      </main>
    </div>
  );
}
