import { serverFetch } from "../core/server"


export const getListings = async() => {
    return serverFetch("/api/listings")
}