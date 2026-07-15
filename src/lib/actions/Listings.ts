"use server"

import { Payload, UpdateListing } from "@/utils/types/Forms";
import { MutateData } from "../core/server";
import { revalidatePath } from "next/cache";

export const PostAListing = async (payload: Payload) => {
  return MutateData(`/api/listings`, payload);
};

export const DeleteHostListing = async (id: string) => {
  const result = await MutateData(`/api/listings/${id}`, undefined, "DELETE");
  revalidatePath("/items/manage")
  return result;
};

export const EditHostListing = async (id: string, data: UpdateListing) => {
  const result =  await MutateData(`/api/listings/${id}`, data , "PATCH");
  revalidatePath("/items/manage")
  return result;
};
