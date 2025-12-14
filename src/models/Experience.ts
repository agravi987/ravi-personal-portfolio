import mongoose, { Schema, Document } from "mongoose";

/**
 * Experience Model
 * Represents work experience or education history.
 */
export interface IExperience extends Document {
  role: string;
  company: string;
  duration: string; // e.g. "July 2025"
  description?: string;
  type: "Internship" | "Full-time" | "Freelance";
}

const ExperienceSchema: Schema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String },
  type: { type: String, default: "Full-time" },
});

const Experience =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;
