import { Schema, model } from "mongoose";

export interface GameDocument {
  _id: Schema.Types.ObjectId;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  tags: string[];
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
}

const gameSchema = new Schema<GameDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, index: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    tags: { type: [String], default: [] },
    popularity: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

gameSchema.index({ title: "text", description: "text", subtitle: "text", tags: "text" });

export const GameModel = model<GameDocument>("Game", gameSchema);
