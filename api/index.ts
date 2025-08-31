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
    if (process.env.DATABASE_URL) {
      await connectMongo(process.env.DATABASE_URL as string);
      isConnected = true;
    } else {
      console.warn('DATABASE_URL not provided, skipping database connection');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    // Don't throw error for health check - allow it to work without DB
  }
}

// Vercel serverless function handler
export default async function handler(req: any, res: any) {
  try {
    // Only connect to database for non-health routes
    if (!req.url?.includes('/health')) {
      await connectToDatabase();
    }
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
