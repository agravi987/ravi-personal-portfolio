import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import ExperienceModel from "@/models/Experience";
import Achievement from "@/models/Achievement";
import Profile from "@/models/Profile";
import {
  fallbackAchievements,
  fallbackExperience,
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  type PortfolioAchievement,
  type PortfolioExperience,
  type PortfolioProfile,
  type PortfolioProject,
  type PortfolioSkill,
} from "@/lib/portfolio-data";

export interface PortfolioData {
  projects: PortfolioProject[];
  skills: PortfolioSkill[];
  experience: PortfolioExperience[];
  achievements: PortfolioAchievement[];
  profile: PortfolioProfile;
}

const fallbackData: PortfolioData = {
  projects: fallbackProjects,
  skills: fallbackSkills,
  experience: fallbackExperience,
  achievements: fallbackAchievements,
  profile: fallbackProfile,
};

function serialize(doc: unknown) {
  const record = doc as Record<string, unknown>;

  return {
    ...record,
    _id:
      typeof record._id === "object" &&
      record._id !== null &&
      "toString" in record._id
        ? record._id.toString()
        : String(record._id),
    createdAt:
      record.createdAt instanceof Date
        ? record.createdAt.toISOString()
        : undefined,
    updatedAt:
      record.updatedAt instanceof Date
        ? record.updatedAt.toISOString()
        : undefined,
    date: record.date instanceof Date ? record.date.toISOString() : undefined,
  };
}

async function getLiveData(): Promise<PortfolioData> {
  await dbConnect();

  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  const skills = await Skill.find({}).lean();
  const experience = await ExperienceModel.find({}).lean();
  const achievements = await Achievement.find({}).lean();
  const profile = await Profile.findOne({}).lean();

  return {
    projects: projects.map(serialize) as unknown as PortfolioProject[],
    skills: skills.map(serialize) as unknown as PortfolioSkill[],
    experience: experience.map(serialize) as unknown as PortfolioExperience[],
    achievements:
      achievements.map(serialize) as unknown as PortfolioAchievement[],
    profile: profile
      ? (serialize(profile) as unknown as PortfolioProfile)
      : fallbackProfile,
  };
}

export async function getPortfolioData() {
  let usingFallback = false;
  let data = fallbackData;

  try {
    const liveData = await getLiveData();
    data = {
      projects: liveData.projects.length ? liveData.projects : fallbackProjects,
      skills: liveData.skills.length ? liveData.skills : fallbackSkills,
      experience: liveData.experience.length
        ? liveData.experience
        : fallbackExperience,
      achievements: liveData.achievements.length
        ? liveData.achievements
        : fallbackAchievements,
      profile: liveData.profile || fallbackProfile,
    };
  } catch (err) {
    console.error("Portfolio data error:", err);
    usingFallback = true;
  }

  return { data, usingFallback };
}
