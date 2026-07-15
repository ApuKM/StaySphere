import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/databse/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("stay_sphere");

    const listing = await db.collection("listings").findOne({
      _id: new ObjectId(id),
    });
    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

// ─── ১. UPDATE (PATCH) API ───
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json(); // ফ্রন্টএন্ড থেকে পাঠানো আপডেট ডেটা

    // MongoDB ObjectId ভ্যালিডেশন
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Listing ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("stay_sphere");
    
    const query = { _id: new ObjectId(id) };

    const updateData = {
      ...body,
      updatedAt: new Date()
    }

    const result = await db.collection("listings").updateOne(
      query,
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Listing updated successfully",
      modifiedCount: result.modifiedCount 
    });

  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}

// ─── ২. DELETE API ───
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Listing ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("stay_sphere");
    
    // নির্দিষ্ট লিস্টিং ডিলিট করতে _id ব্যবহার করা হলো
    const query = { _id: new ObjectId(id) };
    
    const result = await db.collection("listings").deleteOne(query);

    // deleteOne সফল হলে deletedCount ১ (বা তার বেশি) হবে
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Listing not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Listing deleted successfully",
      deletedCount: result.deletedCount 
    });

  } catch (error: any) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
