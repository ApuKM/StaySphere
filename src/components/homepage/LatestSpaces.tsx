import clientPromise from "@/lib/databse/mongodb";
import { Listing } from "@/utils/types/Listings";
import ListingCard from "../listings/ListingCard";


async function getLatestSpaces(): Promise<Listing[]> {
  const client = await clientPromise;
  const db = client.db("stay_sphere");
  const latestListings = await db
    .collection("listings")
    .find({ status: "active" })
    .sort({ _id: -1 })
    .limit(6)
    .toArray();

  return latestListings.map((listing) => ({
    ...listing,
    _id: listing._id?.toString?.() ?? String(listing._id),
    createdAt:
      listing.createdAt instanceof Date
        ? listing.createdAt.toISOString()
        : String(listing.createdAt),
  })) as Listing[];
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