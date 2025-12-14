"use client";

import { Briefcase } from "lucide-react";

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description?: string;
  type: string;
}

interface ExperienceProps {
  experience: Experience[];
}

/**
 * Experience Component
 * Renders a timeline of work experience and education.
 * Uses a vertical line design with dot indicators.
 */
export function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>

        <div className="max-w-3xl mx-auto space-y-8">
          {experience.map((exp) => (
            <div
              key={exp._id}
              className="relative pl-8 border-l-2 border-primary/30"
            >
              <div className="absolute -left-[9px] top-0 bg-background">
                <div className="w-4 h-4 rounded-full bg-primary" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {exp.duration}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-primary font-medium">
                <Briefcase size={16} />
                <span>{exp.company}</span>
              </div>

              <p className="text-muted-foreground">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
