import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  fullName: string;
  role: string;
  shortTitle: string;
  heroBadge: string;
  heroHeadline: string;
  heroDescription: string;
  aboutHeading: string;
  aboutIntro: string;
  aboutDetails: string;
  email: string;
  location: string;
  githubUsername: string;
  linkedinUsername: string;
  profileImage?: string;
  resumeUrl: string;
}

const ProfileSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    shortTitle: { type: String, required: true },
    heroBadge: { type: String, required: true },
    heroHeadline: { type: String, required: true },
    heroDescription: { type: String, required: true },
    aboutHeading: { type: String, required: true },
    aboutIntro: { type: String, required: true },
    aboutDetails: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    githubUsername: { type: String, required: true },
    linkedinUsername: { type: String, required: true },
    profileImage: { type: String },
    resumeUrl: { type: String, default: "/resume.pdf" },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;
