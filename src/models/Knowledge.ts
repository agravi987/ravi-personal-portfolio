import mongoose, { Document, Schema } from "mongoose";

export interface IKnowledge extends Document {
  title: string;
  category: string;
  summary: string;
  topics: string[];
  documentationLink?: string;
  proofLink?: string;
  featured: boolean;
  createdAt: Date;
}

const KnowledgeSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    summary: { type: String, required: true },
    topics: { type: [String], required: true },
    documentationLink: { type: String },
    proofLink: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Knowledge =
  mongoose.models.Knowledge ||
  mongoose.model<IKnowledge>("Knowledge", KnowledgeSchema);

export default Knowledge;
