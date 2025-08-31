import { config } from "dotenv";
import path from "path";
import fs from "fs";

function loadEnv() {
  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "../.env"),
    path.resolve(process.cwd(), "../env"),
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
import app from "./modules/app";
import { connectMongo } from "./modules/db";

const port = Number(process.env.PORT || 5000);

async function main() {
  try {
    await connectMongo(process.env.DATABASE_URL as string);
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Startup error:", err);
    process.exit(1);
  }
}

main();
