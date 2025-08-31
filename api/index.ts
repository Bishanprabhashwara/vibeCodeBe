import { config } from "dotenv";
import path from "path";
import fs from "fs";

function loadEnv() {
  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "../.env"),
    path.resolve(process.cwd(), "../../.env"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      config({ path: p });
      return;
    }
  }
  config();
}

loadEnv();

import app from '../src/modules/app';
import { connectMongo } from '../src/modules/db';

// Initialize database connection for serverless
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }
  
  try {
    await connectMongo(process.env.DATABASE_URL as string);
    isConnected = true;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
