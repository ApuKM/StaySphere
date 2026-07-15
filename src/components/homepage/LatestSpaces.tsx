import { Listing } from "@/utils/types/Listings";
import ListingCard from "../listings/ListingCard";


async function getLatestSpaces() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/listings/latest`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured spaces");
  }

  return res.json();
}

export default async function HomePageFeaturedSection() {
  const spaces: Listing[] = await getLatestSpaces();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text">Featured Spaces</h2>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium">Explore some of our latest and most popular destinations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {spaces.map((space) => (
          <ListingCard key={space._id} listing={space} />
        ))}
      </div>
    </section>
  );
}