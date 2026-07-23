import { Schema, model } from "mongoose";

const cafeAmenities = [
  "High-refresh PCs",
  "Console pods",
  "Private rooms",
  "Food service",
  "Tournament nights",
  "Streaming booths",
  "Board games",
  "Coaching desk",
] as const;

const cafeCrowdLevels = ["Quiet", "Balanced", "Busy"] as const;

export interface CafeDocument {
  _id: Schema.Types.ObjectId;
  slug: string;
  name: string;
  neighborhood: string;
  city: string;
  address: string;
  description: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  openUntil: string;
  seatsAvailable: number;
  totalSeats: number;
  featuredGames: string[];
  amenities: (typeof cafeAmenities)[number][];
  crowdLevel: (typeof cafeCrowdLevels)[number];
  heroTone: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const cafeSchema = new Schema<CafeDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true, index: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviewCount: { type: Number, required: true, default: 0 },
    pricePerHour: { type: Number, required: true },
    openUntil: { type: String, required: true },
    seatsAvailable: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    featuredGames: { type: [String], default: [] },
    amenities: { type: [String], enum: cafeAmenities, default: [] },
    crowdLevel: { type: String, enum: cafeCrowdLevels, required: true },
    heroTone: { type: String, required: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

cafeSchema.index({ name: "text", description: "text", neighborhood: "text", city: "text" });

export const CafeModel = model<CafeDocument>("Cafe", cafeSchema);
