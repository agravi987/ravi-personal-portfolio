"use client";

import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  GraduationCap,
  Milestone,
} from "lucide-react";
import { motion } from "framer-motion";
import type { PortfolioExperience } from "@/lib/portfolio-data";
import { DetailSheet } from "@/components/DetailSheet";
import { portfolioItemId } from "@/lib/portfolio-links";

interface ExperienceProps {
  experience: PortfolioExperience[];
}

export function Experience({ experience }: ExperienceProps) {
  const [selectedExperience, setSelectedExperience] =
    useState<PortfolioExperience | null>(null);

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">
            Track record
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
            Experience shaped around building and shipping.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Internships, education, and project delivery all point in one
            direction: becoming a full-stack engineer who understands both
            product quality and operational readiness.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.35fr_0.65fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="relative rounded-lg border bg-card p-6 shadow-sm transition duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/45 before:to-transparent hover:border-primary/35 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="flex items-center gap-3 text-primary">
              <Milestone className="h-5 w-5" />
              <h3 className="font-bold">Delivery profile</h3>
            </div>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-3xl font-bold">2+</p>
                <p className="text-sm text-muted-foreground">
                  internship environments
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">2027</p>
                <p className="text-sm text-muted-foreground">
                  graduation path
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">End-to-end</p>
                <p className="text-sm text-muted-foreground">
                  UI, API, database, deployment
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative min-w-0">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-5 pt-1 scrollbar-none lg:mx-0 lg:px-0">
              {experience.map((exp, index) => {
                const Icon =
                  exp.type.toLowerCase() === "education"
                    ? GraduationCap
                    : Briefcase;

                return (
                  <motion.article
                    key={exp._id}
                    id={portfolioItemId("experience", exp._id || exp.role)}
                    initial={{ opacity: 0, x: 26 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.38, delay: index * 0.08 }}
                    viewport={{ once: true, margin: "-80px" }}
                    whileHover={{ y: -8, scale: 1.015 }}
                    className="group relative w-[78vw] max-w-[21rem] shrink-0 snap-start rounded-lg border bg-background p-5 shadow-sm transition duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/45 before:to-transparent hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 sm:w-[21rem]"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedExperience(exp)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedExperience(exp);
                        }
                      }}
                      className="focus-ring -m-2 rounded-lg p-2"
                      aria-label={`View details for ${exp.role}`}
                    >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border bg-background text-primary shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                          {exp.type}
                        </div>
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <div className="mt-2 flex items-center gap-2 font-semibold text-muted-foreground">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-semibold text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        {exp.duration}
                      </div>
                    </div>

                    <p className="mt-5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {exp.description ||
                        "Tap to view role context, duration, and delivery notes."}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      View details
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {selectedExperience && (
        <ExperienceDetailSheet
          exp={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </section>
  );
}

function ExperienceDetailSheet({
  exp,
  onClose,
}: {
  exp: PortfolioExperience;
  onClose: () => void;
}) {
  const Icon =
    exp.type.toLowerCase() === "education" ? GraduationCap : Briefcase;

  return (
    <DetailSheet title={exp.role} eyebrow={exp.type} onClose={onClose}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Icon className="h-4 w-4 text-primary" />
            Organization
          </div>
          <p className="mt-2 font-bold">{exp.company}</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-primary" />
            Duration
          </div>
          <p className="mt-2 font-bold">{exp.duration}</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border bg-background p-4">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Notes
        </p>
        <p className="mt-3 leading-7 text-muted-foreground">
          {exp.description ||
            "This entry is part of Ravi's build and learning track."}
        </p>
      </div>
    </DetailSheet>
  );
}
