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
import { FiImage, FiFileText, FiMapPin, FiUsers } from "react-icons/fi";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Session } from "@/utils/auth-client";
import { ListingFormData } from "@/utils/types/Forms";

const inputBaseStyles =
  "w-full bg-white border border-slate-300 text-sm text-brand-text rounded-xl px-4 py-3 placeholder:text-slate-400 transition-all duration-200 outline-none hover:border-slate-400 focus:outline-none focus:ring-0 focus:border-brand-primary shadow-sm";
const selectTriggerStyles =
  "w-full bg-white border border-slate-300 hover:border-slate-400 rounded-xl px-4 py-3 text-slate-900 transition-all duration-200 focus:outline-none focus:ring-0 shadow-sm";

export default function AddListingForm({ user }: { user: Session["user"] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      imageUrl: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
    try {
      setIsSubmitting(true);

      const payload = {
        ...data,
        hostInfo: {
          userId: user?.id,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
        },
        status: "active",
      };

      console.log("Form Payload:", payload);
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong!");
      }

      toast.success("Property listed successfully!");
      reset();
      router.push("/explore");

    } catch (error) {
      console.error(error);
      toast.danger("Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      {/* Property Details Section */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-semibold text-brand-text">
            Property Details
          </h2>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Property Title */}
          <TextField className="flex flex-col gap-2">
            <Label className="text-sm font-semibold text-slate-700">
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
                  <Label className="text-sm font-semibold text-slate-700">
                    Property Type
                  </Label>

                  <Select.Trigger className={selectTriggerStyles}>
                    <Select.Value />
                  </Select.Trigger>

                  <Select.Popover className="bg-white border border-slate-200 rounded-xl shadow-xl">
                    <ListBox className="p-2">
                      <ListBox.Item
                        id="apartment"
                        textValue="Entire Apartment"
                        className="text-slate-700 rounded-lg px-3 py-2 hover:bg-slate-100"
                      >
                        Entire Apartment
                      </ListBox.Item>
                      <ListBox.Item
                        id="house"
                        textValue="Entire House"
                        className="text-slate-700 rounded-lg px-3 py-2 hover:bg-slate-100"
                      >
                        Entire House
                      </ListBox.Item>
                      <ListBox.Item
                        id="cabin"
                        textValue="Cabin"
                        className="text-slate-700 rounded-lg px-3 py-2 hover:bg-slate-100"
                      >
                        Cabin
                      </ListBox.Item>
                      <ListBox.Item
                        id="villa"
                        textValue="Villa"
                        className="text-slate-700 rounded-lg px-3 py-2 hover:bg-slate-100"
                      >
                        Villa
                      </ListBox.Item>
                      <ListBox.Item
                        id="private-room"
                        textValue="Private Room"
                        className="text-slate-700 rounded-lg px-3 py-2 hover:bg-slate-100"
                      >
                        Private Room
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              )}
            />

            {/* Location (Relevant Field) */}
            <TextField className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
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

          <div className="border-t border-slate-100 my-2"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Price Per Night */}
            <TextField className="flex flex-col gap-2">
              <Label className="text-sm font-semibold text-slate-700">
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
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
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
              <Label className="text-sm font-semibold text-slate-700">
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

      {/* Description Section */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-semibold text-brand-text">
            Descriptions
          </h2>
        </div>
        <div className="p-6 flex flex-col gap-6">
          {/* Short Description */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="short-description"
              className="text-sm font-semibold text-slate-700 mb-1"
            >
              Short Description{" "}
              <span className="text-slate-400 font-normal">(Catchphrase)</span>
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
            <Label
              htmlFor="full-description"
              className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-1"
            >
              <FiFileText className="text-slate-400" />
              Full Description
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

      {/* Media Section */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-semibold text-brand-text">
            Property Image
          </h2>
        </div>
        <div className="p-6">
          <TextField className="flex flex-col gap-2">
            <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FiImage className="text-slate-400" /> Image URL{" "}
              <span className="text-slate-400 font-normal">(Optional)</span>
            </Label>
            <Input
              {...register("imageUrl")}
              className={inputBaseStyles}
              type="url"
              placeholder="https://example.com/my-property-image.jpg"
            />
          </TextField>
          <p className="text-xs text-slate-500 mt-2">
            Provide a direct link to an image of your property. Guests love
            high-quality, well-lit photos.
          </p>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          onClick={() => reset()}
          className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium px-6 py-2.5 rounded-xl transition-colors"
        >
          Clear Form
        </Button>
        <Button
          type="submit"
          isDisabled={isSubmitting}
          className="bg-brand-primary text-white hover:bg-brand-primary/90 font-semibold px-8 py-2.5 rounded-xl shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.23)] hover:-translate-y-0.5 transition-all duration-200"
        >
          {isSubmitting ? "Publishing..." : "Publish Listing"}
        </Button>
      </div>
    </form>
  );
}
