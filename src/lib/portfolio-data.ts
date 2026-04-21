export interface PortfolioProject {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  image?: string;
  featured?: boolean;
}

export interface PortfolioSkill {
  _id: string;
  name: string;
  category: string;
  level?: number;
}

export interface PortfolioExperience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description?: string;
  type: string;
}

export interface PortfolioAchievement {
  _id: string;
  title: string;
  description: string;
  certificateImage?: string;
}

export interface PortfolioProfile {
  _id?: string;
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

export const fallbackProjects: PortfolioProject[] = [
  {
    _id: "fallback-platform",
    title: "Rising Sun Experiment Platform",
    description:
      "A full-stack documentation system with admin workflows, SSR pages, MongoDB persistence, and production-ready CRUD operations.",
    technologies: ["Next.js", "MongoDB", "App Router", "Cloudinary", "CRUD"],
    featured: true,
  },
  {
    _id: "fallback-blog",
    title: "Rising Sun Blog App",
    description:
      "A MERN publishing dashboard focused on role-based content management, clean APIs, and fast editorial updates.",
    technologies: ["React", "Node.js", "Express", "JWT", "Admin"],
    featured: true,
  },
  {
    _id: "fallback-portfolio",
    title: "Cloud Portfolio Command Center",
    description:
      "This portfolio doubles as a live proof of skill: server-rendered data, admin controls, contact automation, and deploy-friendly architecture.",
    technologies: ["Next.js", "DevOps", "Email", "MongoDB", "Vercel"],
    featured: true,
  },
];

export const fallbackSkills: PortfolioSkill[] = [
  { _id: "skill-js", name: "JavaScript", category: "Languages", level: 95 },
  { _id: "skill-ts", name: "TypeScript", category: "Languages", level: 88 },
  { _id: "skill-python", name: "Python", category: "Languages", level: 85 },
  { _id: "skill-react", name: "React", category: "Frontend", level: 94 },
  { _id: "skill-next", name: "Next.js", category: "Frontend", level: 92 },
  { _id: "skill-tailwind", name: "Tailwind CSS", category: "Frontend", level: 90 },
  { _id: "skill-node", name: "Node.js", category: "Backend", level: 86 },
  { _id: "skill-express", name: "Express", category: "Backend", level: 84 },
  { _id: "skill-api", name: "REST APIs", category: "Backend", level: 88 },
  { _id: "skill-mongo", name: "MongoDB", category: "Data", level: 86 },
  { _id: "skill-mysql", name: "MySQL", category: "Data", level: 80 },
  { _id: "skill-cloudinary", name: "Cloudinary", category: "Cloud & DevOps", level: 82 },
  { _id: "skill-git", name: "Git/GitHub", category: "Cloud & DevOps", level: 90 },
  { _id: "skill-vercel", name: "Vercel Deployments", category: "Cloud & DevOps", level: 86 },
];

export const fallbackExperience: PortfolioExperience[] = [
  {
    _id: "exp-techvanch",
    role: "Modern Full Stack (Next.js) Intern",
    company: "TECHVANCH",
    duration: "July 2025",
    type: "Internship",
    description:
      "Built production-style Next.js features with reusable UI, API routes, database integration, and deployment-aware thinking.",
  },
  {
    _id: "exp-consensus",
    role: "MERN Stack Intern",
    company: "Consensus Academy",
    duration: "Jan 2025",
    type: "Internship",
    description:
      "Developed MERN applications with authentication, dashboard workflows, data models, and clean backend routes.",
  },
  {
    _id: "exp-degree",
    role: "Computer Science Engineering",
    company: "Sri Eshwar College of Engineering",
    duration: "2023 - 2027",
    type: "Education",
    description:
      "Maintaining a 9.01 CGPA while building full-stack systems, hackathon projects, and competitive programming foundations.",
  },
];

export const fallbackAchievements: PortfolioAchievement[] = [
  {
    _id: "ach-hackathons",
    title: "Hackathon Wins",
    description:
      "Winner across multiple build sprints, turning problem statements into working, demo-ready products.",
  },
  {
    _id: "ach-coding",
    title: "Competitive Coding",
    description:
      "Active problem solver across LeetCode, CodeChef, and HackerRank with strong algorithmic fundamentals.",
  },
  {
    _id: "ach-delivery",
    title: "Production Mindset",
    description:
      "Comfortable moving from UI polish to APIs, database models, auth flows, uploads, and deployment details.",
  },
];

export const fallbackProfile: PortfolioProfile = {
  fullName: "Ravi Agrahari",
  role: "Full-stack cloud developer",
  shortTitle: "Full Stack Developer",
  heroBadge: "Full Stack Developer",
  heroHeadline: "Building clean web apps with cloud-ready architecture.",
  heroDescription:
    "I work with Next.js, MERN, APIs, databases, admin dashboards, uploads, and deployment-focused product builds.",
  aboutHeading:
    "A developer who can design the screen, wire the API, and prepare the system to ship.",
  aboutIntro:
    "I am a Computer Science Engineering student (2023 - 2027) at Sri Eshwar College of Engineering, Coimbatore, with a CGPA of 9.01. My strongest zone is turning practical product ideas into working full-stack applications.",
  aboutDetails:
    "I enjoy the complete path: polished UI, data models, API routes, upload pipelines, admin workflows, and deployment details. That full journey is what makes a portfolio feel professional instead of decorative.",
  email: "hello@ravi.dev",
  location: "India, available for remote-first teams",
  githubUsername: "raviagrahari",
  linkedinUsername: "ravi-agrahari",
  profileImage: "/images/ravi-profile.jpg",
  resumeUrl: "/resume.pdf",
};
