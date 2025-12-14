import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

console.log(
  "Testing connection to:",
  MONGODB_URI?.replace(/:([^@]+)@/, ":****@")
); // Hide password

async function test() {
  if (!MONGODB_URI) throw new Error("No URI");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("SUCCESS: Connected to MongoDB");
    await mongoose.disconnect();
  } catch (err) {
    console.error("FAILURE:", err);
  }
}

test();
