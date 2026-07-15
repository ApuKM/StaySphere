import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/databse/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("Query ID:", id);
    const client = await clientPromise;
    const db = client.db("stay_sphere");
    const query = { "hostInfo.userId": id };
    console.log("Query object:", query);
    const listing = await db.collection("listings").find(query).toArray();
    console.log("Found listings:", listing);
    if (!listing || listing.length === 0) {
      return NextResponse.json([]);
    }
    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}