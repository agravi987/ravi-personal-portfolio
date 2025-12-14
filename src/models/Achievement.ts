import mongoose, { Schema, Document } from "mongoose";

/**
 * Achievement Model
 * Represents awards, certifications, or other notable accomplishments.
 */
export interface IAchievement extends Document {
  title: string;
  description: string;
  date: Date; // or string
  organization?: string;
  credentialLink?: string;
  certificateImage?: string;
}

const AchievementSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date },
  organization: { type: String },
  credentialLink: { type: String },
  certificateImage: { type: String },
});

const Achievement =
  mongoose.models.Achievement ||
  mongoose.model<IAchievement>("Achievement", AchievementSchema);

export default Achievement;
