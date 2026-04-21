"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  ShieldCheck,
} from "lucide-react";
import type { PortfolioProfile } from "@/lib/portfolio-data";

const pillars = [
  {
    title: "Full-stack execution",
    description:
      "React and Next.js interfaces backed by Node APIs, MongoDB schemas, auth flows, uploads, and admin dashboards.",
    icon: Layers,
  },
  {
    title: "Cloud-aware delivery",
    description:
      "I think beyond localhost: environment variables, deploy targets, image hosting, routing, and production failure states.",
    icon: Cloud,
  },
  {
    title: "Engineering discipline",
    description:
      "Readable components, reusable data models, Git-based workflows, validation, and clean handoffs for future teammates.",
    icon: GitBranch,
  },
];

const focusAreas = [
  { label: "Frontend", value: "Next.js, React, Tailwind", icon: Code2 },
  { label: "Backend", value: "Node.js, Express, REST APIs", icon: ShieldCheck },
  { label: "Data", value: "MongoDB, MySQL, Mongoose", icon: Database },
];

export function About({ profile }: { profile?: PortfolioProfile }) {
  return (
    <section id="about" className="relative bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">
              About Ravi
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              {profile?.aboutHeading ||
                "A developer who can design the screen, wire the API, and prepare the system to ship."}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {profile?.aboutIntro ||
                "I am a Computer Science Engineering student (2023 - 2027) at Sri Eshwar College of Engineering, Coimbatore, with a CGPA of 9.01. My strongest zone is turning practical product ideas into working full-stack applications."}
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {profile?.aboutDetails ||
                "I enjoy the complete path: polished UI, data models, API routes, upload pipelines, admin workflows, and deployment details. That full journey is what makes a portfolio feel professional instead of decorative."}
            </p>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-xl border bg-background/90 p-6 shadow-sm backdrop-blur transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex gap-4">
                    <div className="h-11 w-11 shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary">
                      <Icon className="h-full w-full" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{pillar.title}</h3>
                      <p className="mt-2 leading-7 text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.label}
                whileHover={{ y: -5 }}
                className="rounded-xl border bg-card/90 p-5 shadow-sm backdrop-blur transition hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-4 flex items-center gap-3 text-primary">
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-[0.18em]">
                    {area.label}
                  </span>
                </div>
                <p className="text-lg font-semibold">{area.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
