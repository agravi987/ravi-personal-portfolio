import mongoose, { Schema, Document } from "mongoose";

/**
 * Skill Model
 * Represents a technical skill with a proficiency level and category (e.g., Frontend, Backend).
 */
export interface ISkill extends Document {
  name: string;
  category: string;
  level?: number; // 1-100
  icon?: string;
  note?: string;
  docsLink?: string;
  proofLink?: string;
  featured?: boolean;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, min: 0, max: 100 },
  icon: { type: String }, // URL or icon name
  note: { type: String },
  docsLink: { type: String },
  proofLink: { type: String },
  featured: { type: Boolean, default: false },
});

const Skill =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;
