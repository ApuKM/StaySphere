import SpaceImageGallery from "@/components/listings/SpaceImageGallery";
import { getListingById } from "@/lib/apis/Listings";
import { Listing } from "@/utils/types/Listings";
import Image from "next/image";
import Link from "next/link";
import {
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiStar,
  FiShare2,
  FiHeart,
  FiHome,
} from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";

interface PageProps {
  params: Promise<{ id: string }>;
}

const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default async function SpaceDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const listing: Listing = await getListingById(id);

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-bg text-brand-text">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Space not found</h2>
          <Link
            href="/explore"
            className="text-brand-primary hover:underline font-semibold"
          >
            Back to Explore Spaces
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = listing.status === "active";

  return (
    <div className="min-h-screen bg-brand-bg py-12 px-4 font-sans text-brand-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ─── 1. Header Section ─── */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-brand-text sm:text-3xl lg:text-4xl">
                {listing.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1">
                  <FiStar className="fill-brand-accent text-brand-accent" />
                  <span className="text-brand-text font-bold">4.95</span>
                  <span className="text-slate-400">(48 reviews)</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1 text-brand-secondary">
                  <FiMapPin className="text-lg" />
                  <span className="hover:underline cursor-pointer">
                    {listing.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-bg px-4 py-2 text-sm font-semibold text-brand-text hover:bg-brand-bg-soft transition-colors">
                <FiShare2 /> Share
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-bg px-4 py-2 text-sm font-semibold text-brand-text hover:bg-brand-bg-soft transition-colors">
                <FiHeart className="text-brand-primary" /> Save
              </button>
            </div>
          </div>
        </div>

        {/* ─── 2. Image Banner ─── */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-brand-border bg-brand-bg-soft shadow-xs mb-8">
          <SpaceImageGallery images={listing.images} title={listing.title}/>
          <span className="absolute bottom-4 right-4 bg-brand-bg/95 backdrop-blur-md border border-brand-border px-4 py-2 rounded-xl text-xs font-bold shadow-xs uppercase tracking-wider">
            Property: {listing.propertyType}
          </span>
        </div>

        {/* ─── 3. Main Split Content ─── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Side: Details & Highlights */}
          <div className="flex flex-col space-y-8 lg:col-span-2">
            {/* Quick Property Highlights using Soft BG */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border border-brand-border bg-brand-bg-soft p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <FiUsers className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    Capacity
                  </p>
                  <p className="text-sm font-bold text-brand-text">
                    {listing.maxGuests} Guests
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-brand-border bg-brand-bg-soft p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary">
                  <IoBedOutline className="text-2xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    Bedrooms
                  </p>
                  <p className="text-sm font-bold text-brand-text">
                    {listing.bedrooms} Room{listing.bedrooms > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-brand-border bg-brand-bg-soft p-4 col-span-2 sm:col-span-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                  <FiCalendar className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">
                    Listed Since
                  </p>
                  <p className="text-sm font-bold text-brand-text">
                    {new Date(listing.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-brand-border" />

            {/* Description Box */}
            <section>
              <h2 className="text-xl font-bold text-brand-text flex items-center gap-2 mb-4">
                <span className="h-5 w-1 rounded-full bg-brand-primary" />
                Experience This Space
              </h2>
              <div className="rounded-2xl border border-brand-border bg-brand-bg-soft p-6 shadow-2xs">
                <p className="text-base font-semibold text-brand-text mb-4 border-l-2 border-brand-secondary pl-3 italic">
                  {listing.shortDescription}
                </p>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>
            </section>
          </div>

          {/* Right Side: Sticky Booking Panel & Host Info */}
          <div className="space-y-6 lg:sticky lg:top-6 h-fit">
            {/* Reservation Card */}
            <div className="rounded-3xl border border-brand-border bg-brand-bg p-6 shadow-md">
              <div className="flex items-baseline justify-between border-b border-brand-border pb-4 mb-5">
                <div>
                  <span className="text-3xl font-black text-brand-text">
                    ${listing.pricePerNight}
                  </span>
                  <span className="text-sm font-medium text-slate-500 ml-1">
                    / night
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-brand-bg-soft border border-brand-border px-2.5 py-1 rounded-lg">
                  <FiClock className="text-brand-secondary" /> Instant Book
                </div>
              </div>

              {isAvailable ? (
                <Link
                  href={`/spaces/${listing._id}/checkout`}
                  className="block w-full"
                >
                  <button className="w-full rounded-2xl bg-brand-primary py-4 px-4 font-bold text-white shadow-md hover:opacity-95 transition-all active:scale-[0.99]">
                    Reserve Space
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full cursor-not-allowed rounded-2xl bg-brand-bg-soft border border-brand-border py-4 px-4 font-bold text-slate-400"
                >
                  Currently Fully Booked
                </button>
              )}

              <p className="mt-4 text-center text-xs text-slate-400 font-medium">
                No immediate charges apply. Secure booking process.
              </p>
            </div>

            {/* Host Profile Box */}
            <div className="rounded-3xl border border-brand-border bg-brand-bg-soft p-6 shadow-2xs">
              <h3 className="text-md font-bold mb-4 uppercase tracking-wider text-xs text-slate-400">
                Your StaySphere Host
              </h3>

              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xl font-black text-brand-primary">
                  {listing.hostInfo?.name?.charAt(0).toUpperCase() || "H"}
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-text">
                    {listing.hostInfo?.name || "StaySphere Host"}
                  </h4>
                  <div className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <FiCheckCircle /> Verified StaySphere Identity
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${listing.hostInfo?.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-bg py-3 px-4 text-sm font-bold text-brand-text transition-colors hover:bg-brand-bg-soft"
                >
                  <FiPhone className="text-brand-secondary" /> Call Host
                </a>
                <a
                  href={`mailto:${listing.hostInfo?.email}?subject=StaySphere Inquiry: ${listing.title}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-bg py-3 px-4 text-sm font-bold text-brand-text transition-colors hover:bg-brand-bg-soft"
                >
                  <FiMail className="text-slate-500" /> Message via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
