"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  ExternalLink,
  FileText,
  FolderGit2,
  Github,
  GitBranch,
  Layers,
  Network,
  Server,
  Sparkles,
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
  const [activeRailIndex, setActiveRailIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

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

  const categoryCounts = useMemo(
    () =>
      projects.reduce<Record<string, number>>(
        (counts, project) => {
          const category = inferProjectCategory(project);
          counts.All += 1;
          counts[category] = (counts[category] || 0) + 1;
          return counts;
        },
        { All: 0 }
      ),
    [projects]
  );

  const selectedFilter = categories.includes(activeFilter) ? activeFilter : "All";

  const visibleProjects = useMemo(() => {
    if (selectedFilter === "All") return projects;
    return projects.filter(
      (project) => inferProjectCategory(project) === selectedFilter
    );
  }, [selectedFilter, projects]);

  const scrollRail = (direction: "previous" | "next") => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector<HTMLElement>("[data-project-card]");
    const scrollBy =
      card?.offsetWidth && card.offsetWidth > 0
        ? card.offsetWidth + 20
        : rail.clientWidth * 0.85;

    rail.scrollBy({
      left: direction === "next" ? scrollBy : -scrollBy,
      behavior: "smooth",
    });
  };

  const handleRailScroll = () => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>("[data-project-card]");
    if (!rail || !card) return;

    const cardStep = card.offsetWidth + 20;
    const nextIndex = Math.round(rail.scrollLeft / Math.max(cardStep, 1));
    setActiveRailIndex(Math.min(nextIndex, visibleProjects.length - 1));
  };

  const selectFilter = (category: string) => {
    setActiveFilter(category);
    setActiveRailIndex(0);
    railRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-sky-50 py-16 text-slate-950 dark:bg-slate-950 dark:text-slate-100 md:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(20,184,166,0.14),transparent_32%)] dark:bg-[radial-gradient(circle_at_75%_20%,rgba(20,184,166,0.16),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(56,189,248,0.12),transparent_32%)]" />
      <div className="absolute inset-0 grid-pattern opacity-20 dark:opacity-25" />
      <div className="absolute inset-0 space-dust opacity-15 dark:opacity-25" />
      <PlanetDecor
        name="uranus"
        className="-left-24 top-24 w-40 opacity-10 blur-[0.3px] animate-planet-float dark:opacity-16 md:-left-20 md:w-56"
      />

      <div className="container relative mx-auto px-4">
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end md:gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 md:text-sm md:tracking-[0.2em] dark:text-cyan-300">
              Projects
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Cloud-ready builds, simple and useful.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-slate-700 md:text-base md:leading-7 dark:text-slate-300">
            Work that connects product UI, backend logic, admin control, and
            deployment thinking in one delivery path.
          </p>
        </div>

        <div className="-mx-4 mb-4 flex snap-x items-center gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:gap-3 md:overflow-visible md:px-0 md:pb-0" role="tablist" aria-label="Project categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedFilter === category}
              onClick={() => selectFilter(category)}
              className={`focus-ring inline-flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedFilter === category
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-700/20 dark:bg-cyan-300 dark:text-slate-950"
                  : "border border-cyan-900/10 bg-white/75 text-slate-700 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-300/40 dark:hover:text-cyan-200"
              }`}
            >
              <span>{category}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] ${
                selectedFilter === category
                  ? "bg-white/20"
                  : "bg-cyan-700/10 text-cyan-800 dark:bg-white/10 dark:text-cyan-100"
              }`}>
                {categoryCounts[category] || 0}
              </span>
            </button>
          ))}

          {showPageLink && (
            <Link
              href="/projects"
              className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan-900/15 bg-white/75 px-4 py-2 text-sm font-bold text-cyan-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-600/40 dark:border-white/15 dark:bg-white/10 dark:text-cyan-100"
            >
              More Projects <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="mb-6 flex items-center justify-between gap-4 md:mb-8">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300" aria-live="polite">
            Showing {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}
            {selectedFilter !== "All" ? ` in ${selectedFilter}` : ""}.
          </p>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollRail("previous")}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-900/15 bg-white/80 text-cyan-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-600/40 dark:border-white/15 dark:bg-white/10 dark:text-cyan-100"
              aria-label="Scroll projects left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail("next")}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-900/15 bg-white/80 text-cyan-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-600/40 dark:border-white/15 dark:bg-white/10 dark:text-cyan-100"
              aria-label="Scroll projects right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute bottom-4 right-2 z-10 hidden items-center gap-1 rounded-full border border-cyan-900/10 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-800 shadow-sm backdrop-blur sm:flex lg:hidden dark:border-white/10 dark:bg-slate-950/70 dark:text-cyan-100">
            Swipe
            <ChevronRight className="h-3.5 w-3.5 animate-rail-hint" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-sky-50 to-transparent md:block dark:from-slate-950" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-sky-50 to-transparent md:block dark:from-slate-950" />
          <div
            ref={railRef}
            onScroll={handleRailScroll}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-5 pt-1 scrollbar-none md:gap-5"
          >
            {visibleProjects.map((project, index) => {
              const AccentIcon =
                projectAccentIcons[index % projectAccentIcons.length];
              const category = inferProjectCategory(project);

              return (
                <motion.article
                  key={project._id}
                  data-project-card
                  initial={{ opacity: 0, x: 28, rotateY: -5 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={{ y: -10, scale: 1.015 }}
                  className="group h-auto w-[86vw] max-w-[24rem] shrink-0 snap-start sm:w-[22rem] md:w-[24rem] lg:w-[25rem]"
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
                  aria-label={`Open case study for ${project.title}`}
                  className="relative flex h-full min-h-[33rem] w-full flex-col overflow-hidden rounded-lg border border-cyan-900/10 bg-white/90 text-left shadow-lg shadow-cyan-900/10 backdrop-blur-xl transition duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-400/60 before:to-transparent hover:border-cyan-500/35 hover:shadow-2xl hover:shadow-cyan-900/20 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/[0.07] dark:shadow-cyan-950/20 dark:hover:border-cyan-300/40"
                >
                  <div className="relative h-40 overflow-hidden border-b border-cyan-900/10 bg-[radial-gradient(circle_at_30%_25%,rgba(14,165,233,0.28),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.74),rgba(186,230,253,0.45),rgba(204,251,241,0.58))] sm:h-48 dark:border-white/10 dark:bg-[radial-gradient(circle_at_30%_25%,rgba(103,232,249,0.32),transparent_26%),linear-gradient(135deg,rgba(15,23,42,0.4),rgba(20,184,166,0.22),rgba(2,6,23,0.84))]">
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

                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-cyan-900/10 bg-cyan-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-800 dark:border-white/10 dark:bg-white/10 dark:text-cyan-100">
                        {category}
                      </span>
                      <span className="rounded-full border border-cyan-900/10 bg-white/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        {project.status || "Live"}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-400/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-200">
                          <Sparkles className="h-3 w-3" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">
                      {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-slate-700 sm:line-clamp-3 dark:text-slate-300">
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

                    <div className="mt-5 grid grid-cols-2 items-center gap-2 border-t border-cyan-900/10 pt-4 sm:mt-6 sm:flex sm:flex-wrap sm:gap-3 sm:pt-5 dark:border-white/10">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-500 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
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
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-900/15 px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-cyan-600/50 hover:text-cyan-700 dark:border-white/15 dark:text-slate-100 dark:hover:border-cyan-300/50 dark:hover:text-cyan-300"
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
                      <span className="col-span-2 inline-flex items-center justify-center gap-1 rounded-full bg-cyan-600/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-800 transition sm:ml-auto sm:bg-transparent sm:px-0 sm:py-0 sm:opacity-0 sm:group-hover:opacity-100 dark:text-cyan-200">
                        Details <ArrowHint />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>
          {visibleProjects.length > 1 && (
            <div className="mt-1 flex justify-center gap-1.5">
              {visibleProjects.map((project, index) => (
                <button
                  key={project._id}
                  type="button"
                  onClick={() => {
                    const rail = railRef.current;
                    const card =
                      rail?.querySelector<HTMLElement>("[data-project-card]");
                    if (!rail || !card) return;
                    rail.scrollTo({
                      left: index * (card.offsetWidth + 20),
                      behavior: "smooth",
                    });
                  }}
                  className={`focus-ring h-2 rounded-full transition-all ${
                    activeRailIndex === index
                      ? "w-8 bg-cyan-600 dark:bg-cyan-300"
                      : "w-2 bg-cyan-900/20 hover:bg-cyan-600/50 dark:bg-white/20"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                  aria-current={activeRailIndex === index ? "true" : undefined}
                />
              ))}
            </div>
          )}
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
      className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-md md:items-center md:p-4"
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
        className="mobile-safe-bottom max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-cyan-200/20 bg-white p-4 shadow-2xl shadow-cyan-950/30 sm:p-6 md:max-h-[88vh] md:rounded-lg dark:bg-slate-950 dark:text-slate-100"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300 md:hidden dark:bg-white/20" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Case Study
            </p>
            <h3 className="mt-2 text-xl font-bold sm:text-2xl">{project.title}</h3>
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
          <div className="relative min-h-44 overflow-hidden rounded-xl border bg-[radial-gradient(circle_at_30%_25%,rgba(14,165,233,0.28),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.74),rgba(186,230,253,0.45),rgba(204,251,241,0.58))] sm:min-h-56 dark:border-white/10 dark:bg-[radial-gradient(circle_at_30%_25%,rgba(103,232,249,0.32),transparent_26%),linear-gradient(135deg,rgba(15,23,42,0.4),rgba(20,184,166,0.22),rgba(2,6,23,0.84))]">
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

function ArrowHint() {
  return <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />;
}
