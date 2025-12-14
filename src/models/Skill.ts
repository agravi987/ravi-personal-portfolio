import mongoose, { Schema, Document } from "mongoose";

/**
 * Skill Model
 * Represents a technical skill with a proficiency level and category (e.g., Frontend, Backend).
 */
export interface ISkill extends Document {
  name: string;
  category: "Language" | "Framework" | "Database" | "Tool" | "Other";
  level?: number; // 1-100
  icon?: string;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Language", "Framework", "Database", "Tool", "Other"],
  },
  level: { type: Number, min: 0, max: 100 },
  icon: { type: String }, // URL or icon name
});

const Skill =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;
