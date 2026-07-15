import { serverFetch } from "../core/server";

export const getListings = async () => {
  return serverFetch("/api/listings");
};

export const getListingById = async (id: string) => {
  return serverFetch(`/api/listings/${id}`);
};
