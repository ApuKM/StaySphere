import { Skeleton } from "@heroui/react";

export default function ListingsSkeleton() {
  // গ্রিডে দেখানোর জন্য ৬টি কার্ডের একটি ডামি অ্যারে তৈরি করা হলো
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full"
        >
          {/* ১. প্রপার্টি ইমেজ এর জন্য স্কেলিটন (aspect-[4/3] রেশিও) */}
          <Skeleton
            animationType="shimmer"
            className="aspect-4/3 w-full bg-slate-200"
          />

          <div className="p-5 flex flex-col grow">
            {/* ২. লোকেশন এবং প্রপার্টি টাইপ এর জন্য স্কেলিটন */}
            <div className="flex items-center justify-between mb-4">
              <Skeleton
                animationType="shimmer"
                className="h-4 w-1/3 rounded-md bg-slate-200"
              />
              <Skeleton
                animationType="shimmer"
                className="h-6 w-16 rounded-md bg-slate-200"
              />
            </div>

            {/* ৩. টাইটেল এর জন্য স্কেলিটন */}
            <Skeleton
              animationType="shimmer"
              className="h-5 w-10/12 rounded-lg bg-slate-200 mb-4"
            />

            {/* ৪. গেস্ট ও বেডরুম ইনফো এর জন্য স্কেলিটন */}
            <div className="flex items-center gap-4 mb-4 grow">
              <Skeleton
                animationType="shimmer"
                className="h-4 w-20 rounded-md bg-slate-200"
              />
              <Skeleton
                animationType="shimmer"
                className="h-4 w-20 rounded-md bg-slate-200"
              />
            </div>

            <div className="border-t border-slate-100 mb-4"></div>

            {/* ৫. দাম (Price per night) এর জন্য স্কেলিটন */}
            <div className="mt-auto">
              <Skeleton
                animationType="shimmer"
                className="h-7 w-1/3 rounded-lg bg-slate-200"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}