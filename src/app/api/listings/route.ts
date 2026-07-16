import clientPromise from "@/lib/databse/mongodb";
import { NextResponse } from "next/server";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Verify session/token
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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
      images: body.images || null,
      // ensure host info comes from authenticated session
      hostInfo: {
        userId: session.user.id,
        name: session.user.name,
        email: session.user.email,
        phone: session.user.phone,
      },
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




// ১. Query-এর জন্য একটি নির্দিষ্ট টাইপ ডিফাইন করা হলো
interface ListingQuery {
  status: string;
  location?: { $regex: string; $options: string };
  propertyType?: { $regex: string; $options: string };
  $or?: Array<Record<string, { $regex: string; $options: string }>>;
}

const PAGE_SIZE = 12;

const normalizeSearchValue = (value: string) =>
  decodeURIComponent(value)
    .replace(/\+/g, " ")
    .replace(/-/g, " ")
    .trim();

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("stay_sphere");

    const { searchParams } = new URL(request.url);
    const rawLocation = searchParams.get("location");
    const rawPropertyType = searchParams.get("propertyType");
    const searchQuery = searchParams.get("searchQuery");
    const priceSort = searchParams.get("priceSort") || "default";
    const page = Math.max(Number(searchParams.get("page") || "1"), 1);

    const query: ListingQuery = { status: "active" };

    if (rawLocation) {
      const location = normalizeSearchValue(rawLocation);
      query.location = { $regex: escapeRegExp(location), $options: "i" };
    }

    if (rawPropertyType) {
      const propertyType = normalizeSearchValue(rawPropertyType);
      query.propertyType = {
        $regex: `^${escapeRegExp(propertyType)}$`,
        $options: "i",
      };
    }

    if (searchQuery) {
      const searchRegex = { $regex: escapeRegExp(searchQuery), $options: "i" };
      query.$or = [
        { title: searchRegex },
        { location: searchRegex },
        { shortDescription: searchRegex },
      ];
    }

    const sort: Record<string, 1 | -1> =
      priceSort === "low-to-high"
        ? { pricePerNight: 1 }
        : priceSort === "high-to-low"
        ? { pricePerNight: -1 }
        : { createdAt: -1 };

    const total = await db.collection("listings").countDocuments(query);
    const listings = await db
      .collection("listings")
      .find(query)
      .sort(sort)
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .toArray();

    return NextResponse.json(
      { listings, total },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Database read error:", errorMessage);
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}

