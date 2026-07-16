import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FiPlus, FiGrid } from "react-icons/fi";
import { Listing } from "@/utils/types/Listings";
import ListingManageCard from "./ListingManageCard";
import { getUserSession } from "@/lib/core/session";
import { getHostListingsServer } from "@/lib/apis/Listings";

export const metadata = {
  title: "Manage Spaces | Project Name",
  description: "Manage your hosted properties and rental items",
};

export default async function ManageItemsPage() {
  const user = await getUserSession();
  // console.log("User ID:", user?.id);
  const listings: Listing[] = await getHostListingsServer(user?.id);
  console.log("Listings response:", listings);
  // console.log("Listings length:", listings?.length || 0);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* ─── Top Header & Title ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-border pb-6">
          <div>
            <h1 className="text-3xl font-bold text-brand-text flex items-center gap-2">
              <FiGrid className="text-brand-primary" size={28} /> Manage Your Spaces
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              View, edit details, or remove your listed items and accommodation spaces.
            </p>
          </div>
          
          <Link href="/items/add">
            <Button className="bg-brand-primary text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:opacity-95 flex items-center gap-2 self-start sm:self-auto">
              <FiPlus size={18} /> Add New Space
            </Button>
          </Link>
        </div>

        {/* ─── Listings Display Grid ─── */}
        {listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-brand-border rounded-3xl p-16 text-center bg-brand-bg-soft">
            <div className="text-slate-400 text-lg font-medium mb-2">
              No spaces listed yet!
            </div>
            <p className="text-sm text-slate-400 max-w-xs mb-6">
              Start earning by hosting your apartment, room, or equipment right away.
            </p>
            <Link href="/items/create">
              <Button className="bg-brand-primary text-white font-semibold rounded-xl" size="sm">
                Create First Listing
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {listings.map((item) => (
              <ListingManageCard key={item._id} listing={item} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}