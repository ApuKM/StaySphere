import { Payload } from "@/utils/types/Forms";
import { MutateData } from "../core/server";

export const PostAListing = async (payload: Payload) => {
  return MutateData(`/api/listings`, payload);
};

export const DeleteHostListing = async (hostId: string) => {
  return MutateData(`/api/listings/host/${hostId}`, undefined, "DELETE");
};
