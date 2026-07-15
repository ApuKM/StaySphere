import ListingsSkeleton from "@/components/listings/ListingCardSkeleton";
import ListingsClientWrapper from "@/components/listings/ListingsClientWrapper";
import { getListings } from "@/lib/apis/Listings";
import { Suspense } from "react";

interface ExplorePageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ExploreSpacesPage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  
  const queryParams = {
    searchQuery: params.searchQuery || "",
    location: params.location || "All",
    propertyType: params.propertyType || "All",
    priceSort: params.priceSort || "default",
    page: params.page || "1",
  };

  const listingsObj = await getListings(queryParams);
  const listings = listingsObj.listings || [];
  const total = listingsObj.total || 0; 

  return (
    <div className="min-h-screen bg-brand-bg-soft">
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8 text-center pt-8">
          <h2 className="text-2xl font-bold text-brand-text tracking-tight sm:text-3xl">
            Explore Spaces
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Browse beautiful properties from trusted hosts and find your perfect stay.
          </p>
        </div>

        <Suspense 
          key={JSON.stringify(queryParams)} 
          fallback={<ListingsSkeleton />}
        >
          <ListingsClientWrapper listings={listings} total={total} />
        </Suspense>
      </main>
    </div>
  );
}