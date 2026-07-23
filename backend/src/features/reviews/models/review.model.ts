import { Schema, model, type Types } from "mongoose";

const reviewCategories = ["setup", "staff", "food", "crowd"] as const;

export interface ReviewDocument {
  _id: Schema.Types.ObjectId;
  slug: string;
  cafeName: string;
  gameTitle: string;
  authorName: string;
  authorInitials: string;
  authorId?: Types.ObjectId;
  rating: number;
  category: (typeof reviewCategories)[number];
  title: string;
  comment: string;
  visitedAt: string;
  helpfulCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    cafeName: { type: String, required: true, index: true },
    gameTitle: { type: String, required: true },
    authorName: { type: String, required: true },
    authorInitials: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    category: { type: String, enum: reviewCategories, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    visitedAt: { type: String, required: true },
    helpfulCount: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

reviewSchema.index({ title: "text", comment: "text", cafeName: "text", gameTitle: "text" });

export const ReviewModel = model<ReviewDocument>("Review", reviewSchema);
