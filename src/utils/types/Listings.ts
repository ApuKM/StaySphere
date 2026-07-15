export interface Listing {
  readonly _id: string;
  title: string;
  propertyType: string;
  location: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  shortDescription?: string;
  description: string;
  imageUrl?: string;
  hostInfo?: {
    userId: string;
    name: string;
    email: string;
    phone: string;
  };
  status: string;
}