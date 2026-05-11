"use client";

import { MouseEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Download,
  Github,
  Linkedin,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { PlanetDecor } from "@/components/PlanetDecor";
import type { PortfolioProfile } from "@/lib/portfolio-data";

interface HeroProps {
  usingFallback?: boolean;
  profile: PortfolioProfile;
}

const orbitTech = ["Docker", "CI/CD", "Cloud", "Linux", "Next.js"];

const heroStats = [
  { label: "CGPA", value: "9.01", detail: "CSE 2023-2027" },
  { label: "Internships", value: "2+", detail: "MERN and Next.js" },
  { label: "Build Path", value: "E2E", detail: "UI to deploy" },
];

const deliverySignals = [
  { label: "Production-style UI", icon: Sparkles },
  { label: "API and data workflows", icon: ShieldCheck },
  { label: "Cloud-ready delivery", icon: Rocket },
];

export function Hero({ usingFallback = false, profile }: HeroProps) {
  const [showPhoto, setShowPhoto] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const profileImage = profile.profileImage || "/images/ravi-profile.jpg";

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 768) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 9;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -9;
    setTilt({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-sky-50 px-0 pb-12 pt-20 text-slate-950 dark:bg-slate-950 dark:text-slate-100 md:min-h-screen md:pb-0 md:pt-24"
    >
      <Image
        src="/images/space-cloud-hero-light.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-65 dark:hidden"
      />
      <Image
        src="/images/space-cloud-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover opacity-55 dark:block"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(14,165,233,0.08),transparent_30%),linear-gradient(90deg,rgba(240,249,255,0.88),rgba(236,254,255,0.68),rgba(248,250,252,0.86))] dark:hidden" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_30%),linear-gradient(90deg,rgba(2,6,23,0.92),rgba(2,6,23,0.72),rgba(2,6,23,0.9))] dark:block" />
      <div className="absolute inset-0 space-dust opacity-20 dark:opacity-45" />
      <div
        className="absolute right-[8%] top-[18%] hidden h-28 w-28 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f0f9ff,#38bdf8_36%,#0f766e_64%,#0f172a_76%)] opacity-45 shadow-[0_0_80px_rgba(14,165,233,0.18)] animate-planet-float dark:opacity-80 dark:shadow-[0_0_80px_rgba(34,211,238,0.35)] md:block"
      />
      <PlanetDecor
        name="earth"
        className="-right-20 bottom-8 z-[1] hidden w-44 opacity-20 blur-[0.2px] animate-planet-float dark:opacity-28 md:block md:-right-16 md:w-64"
      />
      <div className="absolute bottom-[12%] left-[8%] hidden h-20 w-20 rounded-full border border-cyan-500/25 opacity-60 animate-orbit-spin dark:border-cyan-200/30 dark:opacity-70 md:block" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-500/20 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-800 shadow-sm backdrop-blur dark:border-cyan-300/20 dark:bg-white/8 dark:text-cyan-100 sm:text-xs md:mb-5 md:tracking-[0.18em]">
              <Cloud className="h-3.5 w-3.5" />
              <span className="truncate">{profile.heroBadge}</span>
            </div>

            <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl">
              {profile.heroHeadline}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-700 sm:text-base md:mt-5 md:text-lg md:leading-7 lg:mx-0 dark:text-slate-300">
              {profile.heroDescription}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center md:mt-8 lg:justify-start">
              <Link
                href="/projects"
                className="focus-ring group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-700/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 sm:px-5"
              >
                View Work{" "}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href={profile.resumeUrl || "/resume.pdf"}
                target="_blank"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-3 text-sm font-bold text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-500/40 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-cyan-300/50 sm:px-5"
              >
                Resume <Download className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-slate-600 md:mt-7 lg:justify-start dark:text-slate-300">
              <Link
                href={`https://github.com/${profile.githubUsername}`}
                target="_blank"
                aria-label="GitHub profile"
                className="focus-ring rounded-full p-2 transition hover:-translate-y-0.5 hover:bg-white/70 hover:text-cyan-600 dark:hover:bg-white/10 dark:hover:text-cyan-300"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={`https://linkedin.com/in/${profile.linkedinUsername}`}
                target="_blank"
                aria-label="LinkedIn profile"
                className="focus-ring rounded-full p-2 transition hover:-translate-y-0.5 hover:bg-white/70 hover:text-cyan-600 dark:hover:bg-white/10 dark:hover:text-cyan-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={`mailto:${profile.email}`}
                aria-label="Email Ravi"
                className="focus-ring rounded-full p-2 transition hover:-translate-y-0.5 hover:bg-white/70 hover:text-cyan-600 dark:hover:bg-white/10 dark:hover:text-cyan-300"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-6 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3 md:mt-8">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-panel rounded-xl px-2.5 py-3 sm:px-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-cyan-800 sm:text-xs sm:tracking-[0.16em] dark:text-cyan-200">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-950 sm:text-2xl dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium leading-4 text-slate-600 sm:text-xs dark:text-slate-300">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 lg:justify-start">
              {deliverySignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <span
                    key={signal.label}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-cyan-900/10 bg-white/70 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/8 dark:text-slate-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-cyan-700 dark:text-cyan-300" />
                    {signal.label}
                  </span>
                );
              })}
            </div>

            {usingFallback && (
              <p className="mt-5 max-w-xl rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-900 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100">
                Showing default portfolio content while live data is unavailable.
              </p>
            )}
          </div>

          <div className="relative order-first mx-auto mt-2 w-full max-w-[11rem] sm:max-w-xs lg:order-last lg:mt-0 lg:max-w-sm">
            <div className="absolute -inset-3 rounded-full border border-cyan-500/20 animate-orbit-spin dark:border-cyan-200/15 sm:-inset-5" />
            <div className="absolute -inset-6 rounded-full border border-teal-500/15 animate-orbit-spin-reverse dark:border-teal-200/10 sm:-inset-10" />
            <div className="pointer-events-none absolute -inset-12 hidden md:block">
              {orbitTech.map((tech, index) => (
                <span
                  key={tech}
                  className="absolute rounded-full border border-cyan-500/20 bg-white/75 px-3 py-1 text-xs font-bold text-cyan-800 shadow-lg shadow-cyan-800/10 backdrop-blur-md dark:border-cyan-200/20 dark:bg-slate-950/70 dark:text-cyan-100"
                  style={{
                    left: `${50 + Math.cos((index / orbitTech.length) * Math.PI * 2) * 47}%`,
                    top: `${50 + Math.sin((index / orbitTech.length) * Math.PI * 2) * 45}%`,
                    transform: "translate(-50%, -50%)",
                    animation: `tech-float ${5 + index * 0.35}s ease-in-out infinite`,
                    animationDelay: `${index * 0.18}s`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div
              className="relative overflow-hidden rounded-full border border-white/70 bg-white/60 p-2 shadow-2xl shadow-cyan-700/15 backdrop-blur-xl transition duration-300 dark:border-white/15 dark:bg-white/10 dark:shadow-cyan-950/50 sm:p-3"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              }}
            >
              <div className="relative aspect-square overflow-hidden rounded-full bg-slate-900">
                {showPhoto ? (
                  <Image
                    src={profileImage}
                    alt="Ravi Agrahari"
                    fill
                    sizes="(min-width: 1024px) 360px, 80vw"
                    className="object-cover"
                    onError={() => setShowPhoto(false)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,#0f766e,#0f172a_60%)] text-6xl font-black text-cyan-100">
                    RA
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShootingStars starColor="#67e8f9" trailColor="#14b8a6" />
      <StarsBackground starDensity={0.00011} />
    </section>
  );
}
