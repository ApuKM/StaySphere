import { NextResponse } from "next/server";
import clientPromise from "@/lib/databse/mongodb";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Authenticate the requester
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Only allow the host to fetch their own listings
    if (session.user.id !== id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

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
