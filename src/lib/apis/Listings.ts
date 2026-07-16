import { serverFetch } from "../core/server";
import clientPromise from "@/lib/databse/mongodb";
import { Listing } from "@/utils/types/Listings";

// ফিল্টারগুলোর টাইপ ডিফাইন 
interface ListingFilters {
  searchQuery?: string;
  location?: string;
  propertyType?: string;
  priceSort?: string;
  page?: string | number;
}

export const getListings = async (filters?: ListingFilters) => {
  let url = "/api/listings";

  if (filters) {
    const params = new URLSearchParams();
    if (filters.searchQuery) {
      params.append("searchQuery", filters.searchQuery);
    }
    if (filters.location && filters.location !== "All") {
      params.append("location", filters.location);
    }
    if (filters.propertyType && filters.propertyType !== "All") {
      params.append("propertyType", filters.propertyType);
    }
    if (filters.priceSort && filters.priceSort !== "default") {
      params.append("priceSort", filters.priceSort);
    }
    if (filters.page && Number(filters.page) > 1) {
      params.append("page", String(filters.page));
    }

    const queryString = params.toString();

    if (queryString) {
      url += `?${queryString}`;
    }
  }

  console.log("Fetching URL:", url); 
  return serverFetch(url);
};

export const getListingById = async (listId: string) => {
  return serverFetch(`/api/listings/${listId}`);
};

export const getHostListings = async (hostId: string | undefined) => {
  if (!hostId) {
    throw new Error("Host ID is required");
  }
  const res = await serverFetch(`/api/listings/host/${hostId}`);
  if (Array.isArray(res)) {
    return res.map((listing: any) => ({
      ...listing,
      _id: String(listing._id),
      createdAt:
        listing.createdAt instanceof Date
          ? listing.createdAt.toISOString()
          : String(listing.createdAt),
    }));
  }
  if (res && Array.isArray((res as any).listings)) {
    return (res as any).listings.map((listing: any) => ({
      ...listing,
      _id: String(listing._id),
      createdAt:
        listing.createdAt instanceof Date
          ? listing.createdAt.toISOString()
          : String(listing.createdAt),
    }));
  }
  if (res && (res as any).message) {
    throw new Error((res as any).message);
  }
  return [] as any[];
};

// Server-side helper: fetch host listings directly from DB (bypasses HTTP auth)
export const getHostListingsServer = async (hostId: string | undefined): Promise<Listing[]> => {
  if (!hostId) throw new Error("Host ID is required");
  const client = await clientPromise;
  const db = client.db("stay_sphere");
  const listings = await db.collection("listings").find({ "hostInfo.userId": hostId }).toArray();
  return listings.map((listing: any) => ({
    ...listing,
    _id: String(listing._id),
    createdAt:
      listing.createdAt instanceof Date
        ? listing.createdAt.toISOString()
        : String(listing.createdAt),
  })) as Listing[];
};
