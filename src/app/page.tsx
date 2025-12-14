import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import ExperienceModel from "@/models/Experience";
import Achievement from "@/models/Achievement";

export const dynamic = "force-dynamic"; // For demo purposes, ensure fresh data

async function getData() {
  await dbConnect();

  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  const skills = await Skill.find({}).lean();
  const experience = await ExperienceModel.find({}).lean(); // Sort by date if needed
  const achievements = await Achievement.find({}).lean();

  // Helper to serialize Mongoose docs
  const serialize = (doc: any) => ({
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    date: doc.date?.toISOString(),
  });

  return {
    projects: projects.map(serialize),
    skills: skills.map(serialize),
    experience: experience.map(serialize),
    achievements: achievements.map(serialize),
  };
}

/**
 * Home Page
 * Server Component that fetches data (Projects, Skills, Experience, Achievements)
 * directly from the database and passes it to client components.
 * This ensures good SEO and fast initial load.
 */
export default async function Home() {
  let data;
  try {
    data = await getData();
  } catch (err: any) {
    console.error("Home Page API Error:", err);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg max-w-lg">
          <h1 className="text-xl font-bold mb-2">Error Loading Portfolio</h1>
          <p className="font-mono text-sm whitespace-pre-wrap">{err.message}</p>
          <pre className="mt-4 text-xs overflow-auto max-h-48 bg-black/10 p-2">
            {err.stack}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects projects={data.projects} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Contact achievements={data.achievements} />

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>
          © {new Date().getFullYear()} Ravi Agrahari. Built with Next.js &
          MongoDB.
        </p>
      </footer>
    </main>
  );
}
