import mongoose, { Schema, Document } from "mongoose";

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
  documentationLink?: string;
  architectureLink?: string;
  image?: string;
  featured: boolean;
  category?: string;
  status?: string;
  highlights?: string[];
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    liveLink: { type: String },
    repoLink: { type: String },
    documentationLink: { type: String },
    architectureLink: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
    category: { type: String, default: "Full Stack" },
    status: { type: String, default: "Live" },
    highlights: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Check if model exists to avoid recompilation error in dev
const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
