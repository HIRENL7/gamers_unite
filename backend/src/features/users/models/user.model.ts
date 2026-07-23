import { Schema, model } from "mongoose";

export type UserRole = "user" | "creator" | "admin";

export interface UserDocument {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "creator", "admin"],
      default: "user",
    },
    avatarUrl: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = model<UserDocument>("User", userSchema);
