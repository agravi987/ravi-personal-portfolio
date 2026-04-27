"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { PortfolioSkill } from "@/lib/portfolio-data";
import { PlanetDecor } from "@/components/PlanetDecor";

interface SkillsProps {
  skills: PortfolioSkill[];
}

const iconForCategory = (category: string) => {
  const normalized = category.toLowerCase();
  if (normalized.includes("program")) return Code2;
  if (normalized.includes("front") || normalized.includes("framework")) {
    return Sparkles;
  }
  if (normalized.includes("back")) return Server;
  if (normalized.includes("data") || normalized.includes("database")) {
    return Database;
  }
  if (normalized.includes("cloud") || normalized.includes("devops")) {
    return Cloud;
  }
  return Wrench;
};

export function Skills({ skills }: SkillsProps) {
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));
  const average =
    Math.round(
      skills.reduce((total, skill) => total + (skill.level || 80), 0) /
        Math.max(skills.length, 1)
    ) || 0;
  const featuredSkills = skills.filter((skill) => skill.featured).length;

  return (
    <section id="skills" className="relative overflow-hidden bg-muted/30 py-24">
      <PlanetDecor
        name="uranus"
        className="-right-28 bottom-10 w-44 opacity-10 blur-[0.3px] animate-planet-float dark:opacity-14 md:-right-20 md:w-60"
      />
      <div className="container mx-auto px-4">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">
              Capability matrix
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              The toolchain behind the portfolio.
            </h2>
          </div>
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-muted-foreground">
                  Current operating profile
                </div>
                <div className="mt-2 flex items-end gap-3">
                  <span className="text-3xl font-bold">{average}%</span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    average proficiency
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-muted-foreground">
                  Focus tools
                </div>
                <div className="mt-2 flex items-end gap-3">
                  <span className="text-3xl font-bold">{featuredSkills}</span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    marked as current priority
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, categoryIndex) => {
            const Icon = iconForCategory(category);
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: categoryIndex * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="rounded-xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{category}</h3>
                    <p className="text-sm text-muted-foreground">
                      {categorySkills.length} tools and practices
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.06 + skillIndex * 0.04,
                      }}
                      viewport={{ once: true }}
                      className="rounded-lg border border-border/60 bg-background/50 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            {skill.name}
                          </span>
                          {skill.featured && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                              Focus
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-muted-foreground">
                          {skill.level || 80}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level || 80}%` }}
                          transition={{
                            duration: 0.9,
                            delay: categoryIndex * 0.05 + skillIndex * 0.03,
                            ease: "easeOut",
                          }}
                          viewport={{ once: true }}
                          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-400"
                        />
                      </div>

                      {skill.note && (
                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                          {skill.note}
                        </p>
                      )}

                      {(skill.docsLink || skill.proofLink) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {skill.docsLink && (
                            <a
                              href={skill.docsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition hover:border-primary/40 hover:text-primary"
                            >
                              <FileText className="h-3.5 w-3.5" /> Docs
                            </a>
                          )}
                          {skill.proofLink && (
                            <a
                              href={skill.proofLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition hover:border-primary/40 hover:text-primary"
                            >
                              <ExternalLink className="h-3.5 w-3.5" /> Proof
                            </a>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
