import mongoose from "mongoose";

import { env } from "../config/env.js";

export async function connectMongoDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongodbUri);
}

export async function disconnectMongoDB() {
  await mongoose.disconnect();
}

export async function getMongoHealth() {
  if (mongoose.connection.readyState !== 1) {
    return false;
  }

  await mongoose.connection.db?.admin().ping();
  return true;
}
