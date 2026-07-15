import { serverFetch } from "../core/server";

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
  return serverFetch(`/api/listings/host/${hostId}`);
};
