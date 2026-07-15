import { Listing } from "@/utils/types/Listings"
import { MutateData } from "../core/server"


export const PostAListing = async(payload ) => {
    return MutateData(`/api/listings`, payload)
}