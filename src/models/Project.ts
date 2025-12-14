import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Project Model
 * Represents a portfolio project with details like title, description, tech stack, and links.
 */
export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  image?: string;
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    liveLink: { type: String },
    repoLink: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Check if model exists to avoid recompilation error in dev
const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
