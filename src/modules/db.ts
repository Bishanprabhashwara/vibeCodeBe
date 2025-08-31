import mongoose from "mongoose";

export async function connectMongo(uri: string) {
  if (!uri) throw new Error("DATABASE_URL is required");
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  } as any);
}
