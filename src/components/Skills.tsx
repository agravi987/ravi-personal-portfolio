"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
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
import { DetailSheet } from "@/components/DetailSheet";
import { TechIcon } from "@/components/TechIcon";
import { portfolioItemId } from "@/lib/portfolio-links";
import { HorizontalCardRail } from "@/components/HorizontalCardRail";

interface SkillsProps {
  skills: PortfolioSkill[];
  showPageLink?: boolean;
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

export function Skills({ skills, showPageLink = false }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

        <HorizontalCardRail
          itemCount={categories.length}
          ariaLabel="skills"
          viewMoreHref={showPageLink ? "/stack" : undefined}
          viewMoreLabel="View more stack"
          railClassName="md:gap-6"
        >
          {categories.map((category, categoryIndex) => {
            const Icon = iconForCategory(category);
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );

            return (
              <motion.article
                key={category}
                id={portfolioItemId("skill", category)}
                initial={{ opacity: 0, x: 28, rotateY: -4 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{
                  duration: 0.45,
                  delay: categoryIndex * 0.08,
                  ease: "easeOut",
                }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -8, scale: 1.015 }}
                className="spotlight-card group relative w-[76vw] max-w-[19rem] shrink-0 snap-start rounded-lg border bg-card p-5 shadow-sm backdrop-blur transition duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/45 before:to-transparent hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 active:scale-[0.99] sm:w-[19rem]"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedCategory(category)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedCategory(category);
                    }
                  }}
                  className="focus-ring -m-2 rounded-lg p-2"
                  aria-label={`View ${category} skill details`}
                >
                <div className="mb-5 flex items-center gap-3">
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

                <SkillConstellation skills={categorySkills} />

                <div className="flex flex-wrap gap-2">
                  {categorySkills.slice(0, 4).map((skill) => (
                    <span
                      key={skill._id}
                      className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground"
                    >
                      <TechIcon name={skill.name} />
                      {skill.name}
                    </span>
                  ))}
                  {categorySkills.length > 4 && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                      +{categorySkills.length - 4}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  View details
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
                </div>
              </motion.article>
            );
          })}
        </HorizontalCardRail>
      </div>
      {selectedCategory && (
        <SkillDetailSheet
          category={selectedCategory}
          skills={skills.filter((skill) => skill.category === selectedCategory)}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </section>
  );
}

function SkillConstellation({ skills }: { skills: PortfolioSkill[] }) {
  const visibleSkills = skills.slice(0, 5);
  const points = [
    { x: 16, y: 62 },
    { x: 35, y: 24 },
    { x: 55, y: 48 },
    { x: 74, y: 18 },
    { x: 86, y: 58 },
  ];

  if (visibleSkills.length < 2) return null;

  return (
    <div className="mb-5 overflow-hidden rounded-lg border bg-background/45 p-3">
      <svg
        viewBox="0 0 100 72"
        className="h-20 w-full"
        role="img"
        aria-label="Related skill constellation"
      >
        {visibleSkills.slice(1).map((skill, index) => (
          <motion.line
            key={`line-${skill._id}`}
            x1={points[index].x}
            y1={points[index].y}
            x2={points[index + 1].x}
            y2={points[index + 1].y}
            stroke="currentColor"
            strokeWidth="0.7"
            className="text-primary/35"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            viewport={{ once: true }}
          />
        ))}
        {visibleSkills.map((skill, index) => (
          <g key={skill._id}>
            <motion.circle
              cx={points[index].x}
              cy={points[index].y}
              r={skill.featured ? 4.5 : 3.5}
              className="fill-primary"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, delay: index * 0.08 }}
              viewport={{ once: true }}
            />
            <text
              x={points[index].x}
              y={Math.min(points[index].y + 13, 69)}
              textAnchor="middle"
              className="fill-muted-foreground text-[5px] font-bold"
            >
              {skill.name.slice(0, 9)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function SkillDetailSheet({
  category,
  skills,
  onClose,
}: {
  category: string;
  skills: PortfolioSkill[];
  onClose: () => void;
}) {
  return (
    <DetailSheet title={category} eyebrow="Skill Details" onClose={onClose}>
      <div className="grid gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: index * 0.04 }}
            className="rounded-lg border bg-muted/30 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="rounded-md bg-background p-1.5 text-primary">
                  <TechIcon name={skill.name} className="h-4 w-4" />
                </span>
                <span className="font-semibold">{skill.name}</span>
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
                animate={{ width: `${skill.level || 80}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-400"
              />
            </div>
            {skill.note && (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {skill.note}
              </p>
            )}
            {(skill.docsLink || skill.proofLink) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skill.docsLink && (
                  <a
                    href={skill.docsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:border-primary/40 hover:text-primary"
                  >
                    <FileText className="h-3.5 w-3.5" /> Docs
                  </a>
                )}
                {skill.proofLink && (
                  <a
                    href={skill.proofLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:border-primary/40 hover:text-primary"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Proof
                  </a>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </DetailSheet>
  );
}
