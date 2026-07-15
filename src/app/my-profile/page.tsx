import React from "react";
import { Button, Chip, Card, Separator } from "@heroui/react";
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit3 } from "react-icons/fi";
import { getUserSession } from "@/lib/core/session";
import Image from "next/image";

export default async function MyProfilePage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <h2 className="text-3xl text-brand-text text-center my-20">
        Something is wrong getting user!
      </h2>
    );
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(user.createdAt));

  return (
    <div className="min-h-screen bg-brand-bg-soft py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-text">My Profile</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your personal information and security settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 👤 Left Column: Avatar & Quick Actions */}
          <div className="md:col-span-1">
            {/* h-full যুক্ত করা হয়েছে যাতে ডান দিকের কার্ডের সমান হয় */}
            <Card className="bg-brand-bg border border-brand-border shadow-sm rounded-2xl h-full flex flex-col">
              <Card.Content className="flex flex-col items-center text-center py-8 px-4 flex-grow">
                {/* বড় প্রোফাইল ছবির জন্য কাস্টম ইমেজ কন্টেইনার */}
                <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-brand-primary/20 shadow-sm shrink-0">
                  {user.image ? (
                    <Image
                      width={160}
                      height={160}
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-primary/10 flex items-center justify-center text-5xl text-brand-primary font-bold uppercase">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-brand-text mb-3">
                  {user.name}
                </h2>

                {/* Verification Badge */}
                <div>
                  {user.emailVerified ? (
                    <Chip color="success" variant="soft" size="sm">
                      Verified Member
                    </Chip>
                  ) : (
                    <Chip color="warning" variant="soft" size="sm">
                      Unverified Account
                    </Chip>
                  )}
                </div>

                {/* mt-auto বাটনটিকে একদম নিচে ঠেলে দেবে, ফলে কার্ডটি সমান দেখাবে */}
                <Button
                  className="w-full mt-auto bg-brand-bg-soft text-brand-text border border-brand-border hover:border-brand-primary transition-colors"
                  variant="outline"
                >
                  Edit Profile
                </Button>
              </Card.Content>
            </Card>
          </div>

          {/* 📄 Right Column: Detailed Information */}
          <div className="md:col-span-2">
            <Card className="bg-brand-bg border border-brand-border shadow-sm rounded-2xl h-full">
              <Card.Content className="p-0">
                <div className="p-6 border-b border-brand-border/50">
                  <h3 className="text-lg font-semibold text-brand-text">
                    Personal Information
                  </h3>
                </div>

                <div className="flex flex-col">
                  {/* Email Field */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-brand-bg-soft/50 transition-colors">
                    <div className="flex items-center gap-4 text-brand-text">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <FiMail size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Email Address</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    {!user.emailVerified && (
                      <Button
                        size="sm"
                        className="mt-2 bg-brand-secondary text-white sm:mt-0"
                      >
                        Verify Now
                      </Button>
                    )}
                  </div>
                  <Separator className="bg-brand-border/30" />

                  {/* Phone Field */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-brand-bg-soft/50 transition-colors">
                    <div className="flex items-center gap-4 text-brand-text">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <FiPhone size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Phone Number</p>
                        <p className="font-medium">
                          {user.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-brand-border/30" />

                  {/* Location Field */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-brand-bg-soft/50 transition-colors">
                    <div className="flex items-center gap-4 text-brand-text">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <FiMapPin size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Location</p>
                        <p className="font-medium">
                          {user.location || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-brand-border/30" />

                  {/* Member Since Field */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-brand-bg-soft/50 transition-colors">
                    <div className="flex items-center gap-4 text-brand-text">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <FiCalendar size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Member Since</p>
                        <p className="font-medium">{formattedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
