import clientPromise from "@/lib/databse/mongodb";
import { NextResponse } from "next/server";

export const revalidate = 60; // প্রতি ৬০ সেকেন্ড পর পর ডাটা ব্যাকগ্রাউন্ডে রিভ্যালিডেট হবে (ISR)

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("stay_sphere");

    const latestListings = await db
      .collection("listings")
      .find({ status: "active" })
      .sort({ _id: -1 }) 
      .limit(6)
      .toArray();

    return NextResponse.json(latestListings, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error: any) {
    console.error("Error fetching latest listings:", error);
    return NextResponse.json(
      { message: "Failed to fetch latest listings", error: error.message },
      { status: 500 }
    );
  }
}