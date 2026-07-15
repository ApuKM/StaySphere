export type ListingFormData = {
  title: string;
  propertyType: "apartment" | "house" | "cabin" | "villa" | "private-room";
  location: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  shortDescription: string;
  description: string;
  imageUrl?: string;
};

export type Payload = {
  hostInfo?: {
    userId: string;
    name: string;
    email: string;
    phone: string;
  };
} & ListingFormData;
