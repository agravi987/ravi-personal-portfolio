"use client";

import { Briefcase, CalendarDays, GraduationCap, Milestone } from "lucide-react";
import type { PortfolioExperience } from "@/lib/portfolio-data";

interface ExperienceProps {
  experience: PortfolioExperience[];
}

export function Experience({ experience }: ExperienceProps) {
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
          <div className="rounded-xl border bg-card p-6 shadow-sm">
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
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-border md:block" />
            <div className="space-y-5">
              {experience.map((exp) => {
                const Icon =
                  exp.type.toLowerCase() === "education"
                    ? GraduationCap
                    : Briefcase;

                return (
                  <article
                    key={exp._id}
                    className="relative rounded-xl border bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 md:ml-12"
                  >
                    <div className="absolute -left-[3.25rem] top-6 hidden h-10 w-10 items-center justify-center rounded-full border bg-background text-primary shadow-sm md:flex">
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

                    {exp.description && (
                      <p className="mt-5 leading-7 text-muted-foreground">
                        {exp.description}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
