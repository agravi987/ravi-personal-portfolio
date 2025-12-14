import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "../src/models/Project";
import Skill from "../src/models/Skill";
import Experience from "../src/models/Experience";
import Achievement from "../src/models/Achievement";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function seed() {
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected to MongoDB");

  // Clear existing data (optional, but good for idempotency)
  await Project.deleteMany({});
  await Skill.deleteMany({});
  await Experience.deleteMany({});
  await Achievement.deleteMany({});

  // Seed Internships (Experience)
  await Experience.create([
    {
      role: "Modern Full Stack (Next.js) Internship",
      company: "TECHVANCH",
      duration: "July 2025",
      type: "Internship",
      description: "Worked on modern full stack development using Next.js.",
    },
    {
      role: "MERN Stack Internship",
      company: "Consensus Academy",
      duration: "Jan 2025",
      type: "Internship",
      description: "Developed applications using MERN stack.",
    },
  ]);

  // Seed Projects
  await Project.create([
    {
      title: "Rising Sun Experiment Book",
      description: "A platform for experiment documentation.",
      technologies: ["Next.js", "MongoDB", "App Router", "SSR", "CRUD"],
      liveLink: "https://vercel.com/example", // Placeholder
      featured: true,
    },
    {
      title: "Rising Sun Blog App",
      description: "Blog application with admin dashboard.",
      technologies: ["MERN", "JWT", "Admin Dashboard", "CRUD"],
      featured: true,
    },
  ]);

  // Seed Skills
  await Skill.insertMany([
    { name: "C", category: "Language", level: 90 },
    { name: "C++", category: "Language", level: 85 },
    { name: "JavaScript", category: "Language", level: 95 },
    { name: "Java", category: "Language", level: 80 },
    { name: "Python", category: "Language", level: 85 },
    { name: "Next.js", category: "Framework", level: 90 },
    { name: "React", category: "Framework", level: 95 },
    { name: "Express", category: "Framework", level: 85 },
    { name: "Node.js", category: "Framework", level: 85 },
    { name: "Tailwind CSS", category: "Framework", level: 90 },
    { name: "MongoDB", category: "Database", level: 85 },
    { name: "MySQL", category: "Database", level: 80 },
  ]);

  // Seed Achievements
  await Achievement.create([
    {
      title: "Hackathon Wins",
      description: "Winner of multiple hackathons.",
      date: new Date(),
    },
    {
      title: "Competitive Coding",
      description: "Active on LeetCode, CodeChef, HackerRank.",
      date: new Date(),
    },
  ]);

  console.log("Seeding completed");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
