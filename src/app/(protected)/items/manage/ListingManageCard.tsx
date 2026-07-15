"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Chip,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  toast,
  useOverlayState,
  AlertDialog,
} from "@heroui/react";
import { TextArea } from "@heroui/react";
import { FiMapPin, FiHome, FiDollarSign, FiEdit3, FiTrash2, FiEye } from "react-icons/fi";
// import { deleteListing, updateListing } from "@/lib/actions/Listings";
import { Listing } from "@/utils/types/Listings";

const inputBaseStyles =
  "w-full bg-brand-bg border border-brand-border text-sm text-brand-text rounded-xl px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:border-brand-primary shadow-xs";

export default function ListingManageCard({ listing }: { listing: Listing }) {
  const modalState = useOverlayState({ defaultOpen: false });

  // ফিজিক্যাল ফর্ম স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    title: listing.title,
    pricePerNight: listing.pricePerNight,
    location: listing.location,
    description: listing.description,
  });

  // আপডেট অ্যাকশন হ্যান্ডলার
  const handleSave = async () => {
    try {
      const res = await updateListing(listing._id, formData);
      if (res && res.modifiedCount > 0) {
        toast.success("Space updated successfully!");
      }
      modalState.close();
    } catch (error) {
      toast.danger("Failed to update space.");
    }
  };

  // ডিলিট অ্যাকশন হ্যান্ডলার
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteListing(id);
      if (res && res.deletedCount > 0) {
        toast.success("Space removed successfully!");
      }
    } catch (error) {
      toast.danger("Failed to delete space.");
    }
  };

  return (
    <div className="group flex flex-col gap-5 rounded-3xl border border-brand-border bg-brand-bg p-5 transition-all duration-300 hover:border-brand-primary/40 hover:shadow-lg md:flex-row">
      
      {/* 📸 ইমেজ সেকশন */}
      <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-brand-bg-soft md:h-40 md:w-44 md:flex-shrink-0">
        <Image
          src={listing.images && listing.images.length > 0 ? listing.images[0] : "/placeholder-property.jpg"}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 📄 কনটেন্ট সেকশন */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-brand-text group-hover:text-brand-primary transition-colors">
                {listing.title}
              </h2>
              <p className="text-xs font-medium capitalize text-slate-400 flex items-center gap-1 mt-1">
                <FiHome /> {listing.propertyType}
              </p>
              <p className="text-sm text-slate-400 flex items-center gap-1 mt-0.5">
                <FiMapPin className="text-brand-primary/70" /> {listing.location}
              </p>
            </div>

            <Chip variant={listing.status === "active" ? "primary" : "secondary"}>
              {listing.status === "active" ? "Available" : "Paused"}
            </Chip>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">
            {listing.description}
          </p>
        </div>

        {/* 🛠️ নিচের অ্যাকশন বাটনসমূহ */}
        <div className="mt-4 flex flex-col gap-4 border-t border-brand-border pt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1.5">
            <p className="text-xs uppercase tracking-wider text-slate-400">Price:</p>
            <h3 className="text-xl font-black text-brand-primary flex items-center">
              ${listing.pricePerNight}
              <span className="text-xs font-normal text-slate-400 lowercase">/night</span>
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* View Details */}
            <Link href={`/spaces/${listing._id}`}>
              <Button className="bg-brand-primary font-semibold text-white hover:opacity-90 flex items-center gap-1.5" size="sm">
                <FiEye size={14} /> View
              </Button>
            </Link>

            {/* Edit Modal Button */}
            <Modal>
              <Button
                variant="secondary"
                size="sm"
                className="border border-brand-border text-brand-text bg-brand-bg-soft hover:bg-brand-border/30 flex items-center gap-1.5"
                onPress={() => modalState.open()}
              >
                <FiEdit3 size={14} /> Edit
              </Button>
              <Modal.Backdrop isOpen={modalState.isOpen} onOpenChange={modalState.setOpen}>
                <Modal.Container placement="auto">
                  <Modal.Dialog className="sm:max-w-lg bg-brand-bg border border-brand-border rounded-2xl">
                    <Modal.CloseTrigger className="text-brand-text" onPress={() => modalState.close()} />

                    <Modal.Header>
                      <Modal.Heading className="text-xl font-bold text-brand-text">
                        Edit Space details
                      </Modal.Heading>
                      <p className="mt-1 text-xs text-slate-400">
                        Update your space specifications below. Hit save when you are finished.
                      </p>
                    </Modal.Header>

                    <Modal.Body className="p-6 bg-brand-bg">
                      <Surface variant="default" className="bg-brand-bg space-y-4">
                        <TextField className="flex flex-col gap-1.5">
                          <Label className="text-sm font-semibold text-brand-text">Title</Label>
                          <Input
                            className={inputBaseStyles}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          />
                        </TextField>

                        <div className="grid grid-cols-2 gap-4">
                          <TextField className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-brand-text">Price ($/Night)</Label>
                            <Input
                              type="number"
                              className={inputBaseStyles}
                              value={formData.pricePerNight}
                              onChange={(e) => setFormData({ ...formData, pricePerNight: Number(e.target.value) })}
                            />
                          </TextField>
                          
                          <TextField className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-brand-text">Location</Label>
                            <Input
                              className={inputBaseStyles}
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                          </TextField>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <Label className="text-sm font-semibold text-brand-text">Description</Label>
                          <TextArea
                            rows={4}
                            className={inputBaseStyles}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                        </div>
                      </Surface>
                    </Modal.Body>

                    <Modal.Footer className="border-t border-brand-border">
                      <Button variant="ghost" className="bg-brand-bg-soft text-brand-text" size="sm" onPress={() => modalState.close()}>
                        Cancel
                      </Button>
                      <Button className="bg-brand-primary text-white" size="sm" onPress={handleSave}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>

            {/* Delete Confirmation Alert */}
            <AlertDialog>
              <Button variant="danger-soft" size="sm" className="flex items-center gap-1.5">
                <FiTrash2 size={14} /> Delete
              </Button>

              <AlertDialog.Backdrop className="bg-black/60 backdrop-blur-xs">
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-bg text-brand-text shadow-2xl">
                    <AlertDialog.CloseTrigger className="text-slate-400 hover:text-brand-text" />

                    <AlertDialog.Header className="items-center text-center">
                      <AlertDialog.Icon status="danger" className="bg-rose-500/10 text-rose-500" />
                      <AlertDialog.Heading className="mt-4 text-xl font-bold">
                        Remove this Space?
                      </AlertDialog.Heading>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                        Are you sure you want to delete this listing? This action is permanent and cannot be undone.
                      </p>
                    </AlertDialog.Header>

                    <AlertDialog.Footer className="mt-6 flex justify-end gap-3 border-t border-brand-border pt-4">
                      <Button slot="close" className="border-brand-border text-brand-text hover:bg-brand-bg-soft">
                        Cancel
                      </Button>
                      <Button slot="close" variant="danger" onPress={() => handleDelete(listing._id)}>
                        Delete Listing
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}