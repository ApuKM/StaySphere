"use client";

import React, { useState } from "react";
import {
  Button,
  Select,
  Label,
  ListBox,
  TextArea,
  TextField,
  Input,
  toast,
} from "@heroui/react";
import { FiImage, FiFileText, FiMapPin, FiUsers, FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Session } from "@/utils/auth-client";
import { ListingFormData } from "@/utils/types/Forms";
import { PostAListing } from "@/lib/actions/Listings";

const inputBaseStyles =
  "w-full bg-brand-bg border border-brand-border text-sm text-brand-text rounded-xl px-4 py-3 placeholder:text-slate-400 transition-all duration-200 outline-none hover:border-slate-400 focus:outline-none focus:ring-0 focus:border-brand-primary shadow-xs";
const selectTriggerStyles =
  "w-full bg-brand-bg border border-brand-border hover:border-slate-400 rounded-xl px-4 py-3 text-brand-text transition-all duration-200 focus:outline-none focus:ring-0 shadow-xs";

export default function AddListingForm({ user }: { user: Session["user"] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ফাইল ও প্রিভিউ ম্যানেজমেন্টের জন্য লোকাল স্টেট
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { register, handleSubmit, control, reset } = useForm<ListingFormData>({
    defaultValues: {
      title: "",
      propertyType: undefined,
      location: "",
      pricePerNight: 1,
      maxGuests: 1,
      bedrooms: 0,
      shortDescription: "",
      description: "",
    },
  });
  const router = useRouter();

  // ফাইল হ্যান্ডলার (একাধিক ছবি সিলেক্ট করার সুবিধা)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);

      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  // আপলোডের আগেই তালিকা থেকে নির্দিষ্ট ছবি রিমুভ করার ফাংশন
  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]); // মেমোরি লিক রোধ করতে অবজেক্ট ইউআরএল রিলিজ
      return prev.filter((_, i) => i !== index);
    });
  };

  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
    if (selectedFiles.length === 0) {
      toast.danger("Please upload at least one property image.");
      return;
    }

    try {
      setIsSubmitting(true);

      const uploadedImageUrls: string[] = [];
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!apiKey) {
        throw new Error("ImgBB API key is missing in your environment configuration.");
      }

      // প্রতিটি ফাইলকে লুপের মাধ্যমে ImgBB API-তে পাঠানো হচ্ছে
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("image", file);

        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: "POST",
          body: formData,
        });

        if (!imgbbResponse.ok) {
          throw new Error("Failed to upload one or more images.");
        }

        const imgbbData = await imgbbResponse.json();
        uploadedImageUrls.push(imgbbData.data.url); // সরাসরি ছবির ডাইরেক্ট লিঙ্ক যুক্ত হচ্ছে
      }

      // ডেটাবেজে পাঠানোর ফাইনাল পেলোড স্ট্রাকচার
      const payload = {
        ...data,
        images: uploadedImageUrls, // ডিবি-তে স্ট্রিং অ্যারে হিসেবে যাচ্ছে
        hostInfo: {
          userId: user?.id,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
        },
        status: "active",
      };

      console.log("Form Payload with Hosted Images:", payload);
      const response = await PostAListing(payload);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong!");
      }

      toast.success("Property listed successfully!");
      
      // লোকাল স্টেট রিসেট
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls([]);
      setSelectedFiles([]);
      reset();
      
      router.push("/browse");
    } catch (error: any) {
      console.error(error);
      toast.danger(error.message || "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8 font-sans text-brand-text" onSubmit={handleSubmit(onSubmit)}>
      
      {/* ─── Property Details Section ─── */}
      <div className="bg-brand-bg border border-brand-border rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-5 border-b border-brand-border bg-brand-bg-soft">
          <h2 className="text-lg font-bold text-brand-text">
            Property Details
          </h2>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Property Title */}
          <TextField className="flex flex-col gap-2">
            <Label className="text-sm font-semibold text-brand-text">
              Listing Title <span className="text-brand-primary">*</span>
            </Label>
            <Input
              {...register("title", { required: true })}
              className={inputBaseStyles}
              type="text"
              placeholder="e.g. Cozy Cabin with Mountain Views"
            />
          </TextField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property Type */}
            <Controller
              name="propertyType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  placeholder="Select type"
                  className="flex flex-col gap-2"
                  value={field.value}
                  onChange={field.onChange}
                  isRequired
                >
                  <Label className="text-sm font-semibold text-brand-text">
                    Property Type
                  </Label>

                  <Select.Trigger className={selectTriggerStyles}>
                    <Select.Value />
                  </Select.Trigger>

                  <Select.Popover className="bg-brand-bg border border-brand-border rounded-xl shadow-xl">
                    <ListBox className="p-2">
                      {["Entire Apartment", "Entire House", "Cabin", "Villa", "Private Room"].map((type) => (
                        <ListBox.Item
                          key={type.toLowerCase().replace(" ", "-")}
                          id={type.toLowerCase().replace(" ", "-")}
                          textValue={type}
                          className="text-brand-text rounded-lg px-3 py-2 hover:bg-brand-bg-soft cursor-pointer transition-colors"
                        >
                          {type}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />

            {/* Location */}
            <TextField className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-brand-text flex items-center gap-1.5">
                <FiMapPin className="text-slate-400" /> Location{" "}
                <span className="text-brand-primary">*</span>
              </Label>
              <Input
                {...register("location", { required: true })}
                className={inputBaseStyles}
                type="text"
                placeholder="e.g. Bali, Indonesia"
              />
            </TextField>
          </div>

          <div className="border-t border-brand-border my-2"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Price Per Night */}
            <TextField className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-brand-text">
                Price per night ($)
              </Label>
              <Input
                {...register("pricePerNight", {
                  required: true,
                  valueAsNumber: true,
                })}
                className={inputBaseStyles}
                type="number"
                step="1"
                min={1}
                placeholder="0"
              />
            </TextField>

            {/* Max Guests */}
            <TextField className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-brand-text flex items-center gap-1.5">
                <FiUsers className="text-slate-400" /> Max Guests
              </Label>
              <Input
                {...register("maxGuests", {
                  required: true,
                  valueAsNumber: true,
                })}
                className={inputBaseStyles}
                type="number"
                min={1}
                placeholder="e.g. 4"
              />
            </TextField>

            {/* Bedrooms */}
            <TextField className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-brand-text">
                Bedrooms
              </Label>
              <Input
                {...register("bedrooms", {
                  required: true,
                  valueAsNumber: true,
                })}
                className={inputBaseStyles}
                type="number"
                min={0}
                placeholder="e.g. 2"
              />
            </TextField>
          </div>
        </div>
      </div>

      {/* ─── Description Section ─── */}
      <div className="bg-brand-bg border border-brand-border rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-5 border-b border-brand-border bg-brand-bg-soft">
          <h2 className="text-lg font-bold text-brand-text">
            Descriptions
          </h2>
        </div>
        <div className="p-6 flex flex-col gap-6">
          {/* Short Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="short-description" className="text-sm font-semibold text-brand-text mb-1">
              Short Description <span className="text-slate-400 font-normal">(Catchphrase)</span>
            </Label>
            <TextArea
              {...register("shortDescription", { required: true })}
              className={inputBaseStyles}
              id="short-description"
              placeholder="e.g. A stunning beachfront villa perfect for romantic getaways..."
              rows={2}
            />
          </div>

          {/* Full Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="full-description" className="text-sm font-semibold text-brand-text flex items-center gap-2 mb-1">
              <FiFileText className="text-slate-400" /> Full Description
            </Label>
            <TextArea
              {...register("description", { required: true })}
              className={inputBaseStyles}
              id="full-description"
              placeholder="Describe your space's layout, unique amenities, neighborhood details, and what guests will love..."
              rows={6}
            />
          </div>
        </div>
      </div>

      {/* ─── Media Section (Dynamic File Picker & Uploader) ─── */}
      <div className="bg-brand-bg border border-brand-border rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-5 border-b border-brand-border bg-brand-bg-soft">
          <h2 className="text-lg font-bold text-brand-text">
            Property Gallery
          </h2>
        </div>
        <div className="p-6">
          <label className="text-sm font-semibold text-brand-text flex items-center gap-2 mb-3">
            <FiImage className="text-slate-400" /> Upload Images 
            <span className="text-brand-primary font-bold">*</span>
          </label>

          {/* ড্রপজোন / আপলোড ক্লিকেবল বক্স */}
          <div className="relative border-2 border-dashed border-brand-border rounded-2xl bg-brand-bg-soft hover:border-brand-primary/50 transition-colors duration-200 group cursor-pointer mb-6">
            <input
              type="file"
              multiple
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary mb-3 group-hover:scale-110 transition-transform">
                <FiUploadCloud size={24} />
              </div>
              <p className="text-sm font-bold text-brand-text mb-1">
                Click to upload multiple photos
              </p>
              <p className="text-xs text-slate-400">
                Select one or more images of your space
              </p>
            </div>
          </div>

          {/* ইমেজ প্রিভিউ গ্রিড লেআউট */}
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 p-3 bg-brand-bg-soft border border-brand-border rounded-xl">
              {previewUrls.map((url, index) => (
                <div key={url} className="relative aspect-video w-full overflow-hidden rounded-xl border border-brand-border bg-brand-bg group shadow-2xs">
                  <Image
                    src={url}
                    alt={`Selected preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {/* ইন্ডিভিজুয়াল রিমুভ ওভারলে */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-md"
                      title="Remove image"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Upload multiple photos to show off the bedrooms, bathrooms, and common areas. High-quality images significantly boost booking conversion rates.
          </p>
        </div>
      </div>

      {/* ─── Form Actions ─── */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          onClick={() => {
            previewUrls.forEach((url) => URL.revokeObjectURL(url));
            setPreviewUrls([]);
            setSelectedFiles([]);
            reset();
          }}
          className="bg-brand-bg border border-brand-border text-slate-600 hover:bg-brand-bg-soft font-medium px-6 py-2.5 rounded-xl transition-colors"
        >
          Clear Form
        </Button>
        <Button
          type="submit"
          isDisabled={isSubmitting}
          className="bg-brand-primary text-white hover:opacity-95 hover:-translate-y-0.5 font-semibold px-8 py-2.5 rounded-xl shadow-md transition-all duration-200"
        >
          {isSubmitting ?  "Publishing..." : "Publish Listing"}
        </Button>
      </div>
    </form>
  );
}