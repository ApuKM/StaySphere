import { serverFetch } from "../core/server";

export const getListings = async () => {
  return serverFetch("/api/listings");
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
