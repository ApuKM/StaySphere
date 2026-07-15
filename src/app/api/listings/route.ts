import clientPromise from "@/lib/databse/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, pricePerNight, location, propertyType } = body;
    if (!title || !description || !pricePerNight || !location || !propertyType) {
      return NextResponse.json(
        { error: "Required fields are missing!" },
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db("stay_sphere"); 
    const newListing = {
      title,
      propertyType,
      location,
      pricePerNight: Number(pricePerNight), 
      maxGuests: body.maxGuests ? Number(body.maxGuests) : 1,
      bedrooms: body.bedrooms ? Number(body.bedrooms) : 1,
      shortDescription: body.shortDescription || "",
      description,
      imageUrl: body.imageUrl || null,
      hostInfo: body.hostInfo || null,
      status: "active",
      createdAt: new Date(),
    };
    const result = await db.collection("listings").insertOne(newListing);
    return NextResponse.json(
      { message: "Listing published successfully!", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database connection/write error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}




export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("stay_sphere");

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    // ডিফল্ট কুয়েরি: শুধুমাত্র 'active' লিস্টিংগুলো দেখাবে
    const query: any = { status: "active" };

    // যদি URL-এ location থাকে, তবে কুয়েরিতে যোগ করবে (case-insensitive)
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    
    // যদি URL-এ propertyType থাকে, তবে কুয়েরিতে যোগ করবে
    if (propertyType) {
      query.propertyType = propertyType;
    }

    // ডেটাবেজ থেকে ডেটা নিয়ে আসা এবং নতুনগুলো আগে দেখানো (createdAt: -1)
    const listings = await db
      .collection("listings")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      { listings },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Database read error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}