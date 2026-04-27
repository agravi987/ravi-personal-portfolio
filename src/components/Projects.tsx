"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Cloud,
  ExternalLink,
  FileText,
  FolderGit2,
  Github,
  GitBranch,
  Layers,
  Network,
  Server,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { PlanetDecor } from "@/components/PlanetDecor";

interface ProjectsProps {
  projects: PortfolioProject[];
  showPageLink?: boolean;
}

const projectAccentIcons = [Cloud, Server, GitBranch, Layers, Network];

const inferProjectCategory = (project: PortfolioProject) => {
  if (project.category) return project.category;

  const tech = project.technologies.join(" ").toLowerCase();
  if (tech.includes("docker") || tech.includes("github actions")) {
    return "DevOps";
  }
  if (tech.includes("mongo") || tech.includes("database")) {
    return "Data Platform";
  }
  if (tech.includes("next") || tech.includes("react")) {
    return "Full Stack";
  }

  return "Build";
};

export function Projects({ projects, showPageLink = false }: ProjectsProps) {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map(inferProjectCategory)))],
    [projects]
  );

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(
      (project) => inferProjectCategory(project) === activeFilter
    );
  }, [activeFilter, projects]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-sky-50 py-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(20,184,166,0.14),transparent_32%)] dark:bg-[radial-gradient(circle_at_75%_20%,rgba(20,184,166,0.16),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(56,189,248,0.12),transparent_32%)]" />
      <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-25" />
      <div className="absolute inset-0 space-dust opacity-15 dark:opacity-25" />
      <PlanetDecor
        name="uranus"
        className="-left-24 top-24 w-40 opacity-10 blur-[0.3px] animate-planet-float dark:opacity-16 md:-left-20 md:w-56"
      />

      <div className="container relative mx-auto px-4">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Projects
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Cloud-ready builds, simple and useful.
            </h2>
          </div>
          <p className="max-w-lg leading-7 text-slate-700 dark:text-slate-300">
            Work that connects product UI, backend logic, admin control, and
            deployment thinking in one delivery path.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === category
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-700/20 dark:bg-cyan-300 dark:text-slate-950"
                  : "border border-cyan-900/10 bg-white/75 text-slate-700 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-300/40 dark:hover:text-cyan-200"
              }`}
            >
              {category}
            </button>
          ))}

          {showPageLink && (
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-900/15 bg-white/75 px-4 py-2 text-sm font-bold text-cyan-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-600/40 dark:border-white/15 dark:bg-white/10 dark:text-cyan-100"
            >
              More Projects <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project, index) => {
            const AccentIcon =
              projectAccentIcons[index % projectAccentIcons.length];
            const category = inferProjectCategory(project);

            return (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-cyan-900/10 bg-white/85 text-left shadow-lg shadow-cyan-900/10 backdrop-blur-xl transition hover:border-cyan-500/35 hover:shadow-xl hover:shadow-cyan-900/15 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/[0.07] dark:shadow-cyan-950/20 dark:hover:border-cyan-300/40"
                >
                  <div className="relative h-48 overflow-hidden border-b border-cyan-900/10 bg-[radial-gradient(circle_at_30%_25%,rgba(14,165,233,0.28),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.74),rgba(186,230,253,0.45),rgba(204,251,241,0.58))] dark:border-white/10 dark:bg-[radial-gradient(circle_at_30%_25%,rgba(103,232,249,0.32),transparent_26%),linear-gradient(135deg,rgba(15,23,42,0.4),rgba(20,184,166,0.22),rgba(2,6,23,0.84))]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full flex-col justify-between p-5">
                        <div className="flex items-center justify-between">
                          <div className="rounded-xl bg-white/80 p-3 text-cyan-700 shadow-sm backdrop-blur dark:bg-slate-950/70 dark:text-cyan-300">
                            <AccentIcon className="h-6 w-6" />
                          </div>
                          <span className="rounded-full bg-cyan-700/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-800 backdrop-blur dark:bg-cyan-300/10 dark:text-cyan-100">
                            {category}
                          </span>
                        </div>
                        <div className="grid gap-2">
                          <div className="h-2 w-2/3 rounded-full bg-cyan-500/30 dark:bg-cyan-100/50" />
                          <div className="h-2 w-full rounded-full bg-white/70 dark:bg-white/25" />
                          <div className="h-2 w-1/2 rounded-full bg-teal-400/30 dark:bg-teal-100/35" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-cyan-900/10 bg-cyan-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-800 dark:border-white/10 dark:bg-white/10 dark:text-cyan-100">
                        {category}
                      </span>
                      <span className="rounded-full border border-cyan-900/10 bg-white/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        {project.status || "Live"}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">
                      {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-cyan-900/10 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 border-t border-cyan-900/10 pt-5 dark:border-white/10">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-500 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
                        >
                          <ExternalLink className="h-4 w-4" /> Live
                        </a>
                      )}
                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-full border border-cyan-900/15 px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-cyan-600/50 hover:text-cyan-700 dark:border-white/15 dark:text-slate-100 dark:hover:border-cyan-300/50 dark:hover:text-cyan-300"
                        >
                          <Github className="h-4 w-4" /> Code
                        </a>
                      )}
                      {!project.liveLink && !project.repoLink && (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                          <GitBranch className="h-4 w-4" />
                          Case study
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function ProjectCaseStudyModal({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  const architecture = useMemo(() => {
    const tech = project.technologies.map((item) => item.toLowerCase());
    const hasNext = tech.some((item) => item.includes("next"));
    const hasMongo = tech.some((item) => item.includes("mongo"));
    const hasNode = tech.some(
      (item) => item.includes("node") || item.includes("express")
    );
    const category = inferProjectCategory(project);

    return [
      category,
      hasNext ? "Server-rendered UI" : "Responsive frontend",
      hasNode ? "API layer" : "Reusable app logic",
      hasMongo ? "Database models" : "Structured data flow",
      "Deployment-ready workflow",
    ];
  }, [project]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      onMouseDown={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        onMouseDown={(event) => event.stopPropagation()}
        className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-cyan-200/20 bg-white p-6 shadow-2xl shadow-cyan-950/30 dark:bg-slate-950 dark:text-slate-100"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Case Study
            </p>
            <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-900/10 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-800 dark:border-white/10 dark:bg-white/10 dark:text-cyan-100">
                {inferProjectCategory(project)}
              </span>
              <span className="rounded-full border border-cyan-900/10 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                {project.status || "Live"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border p-2 text-muted-foreground transition hover:-translate-y-0.5 hover:border-cyan-500/40 hover:text-primary"
            aria-label="Close project case study"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-56 overflow-hidden rounded-xl border bg-[radial-gradient(circle_at_30%_25%,rgba(14,165,233,0.28),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.74),rgba(186,230,253,0.45),rgba(204,251,241,0.58))] dark:border-white/10 dark:bg-[radial-gradient(circle_at_30%_25%,rgba(103,232,249,0.32),transparent_26%),linear-gradient(135deg,rgba(15,23,42,0.4),rgba(20,184,166,0.22),rgba(2,6,23,0.84))]">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-56 items-center justify-center">
                <Cloud className="h-16 w-16 text-cyan-700 dark:text-cyan-300" />
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Overview
            </h4>
            <p className="mt-3 leading-7 text-muted-foreground">
              {project.description}
            </p>

            <h4 className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Architecture
            </h4>
            <div className="mt-3 grid gap-2">
              {architecture.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border bg-background/80 px-3 py-2 text-sm font-semibold"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Delivery Notes
            </h4>
            <div className="mt-3 grid gap-2">
              {project.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-lg border bg-background/80 px-3 py-2 text-sm text-muted-foreground"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-800 dark:text-cyan-100"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-500 dark:bg-cyan-300 dark:text-slate-950"
            >
              <ExternalLink className="h-4 w-4" /> Live Project
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition hover:border-cyan-500/50 hover:text-primary"
            >
              <Github className="h-4 w-4" /> Source Code
            </a>
          )}
          {project.documentationLink && (
            <a
              href={project.documentationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition hover:border-cyan-500/50 hover:text-primary"
            >
              <FileText className="h-4 w-4" /> Documentation
            </a>
          )}
          {project.architectureLink && (
            <a
              href={project.architectureLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition hover:border-cyan-500/50 hover:text-primary"
            >
              <FolderGit2 className="h-4 w-4" /> Architecture
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
