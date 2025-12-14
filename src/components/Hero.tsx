"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

/**
 * Hero Component
 * First section of the landing page. Features a typewriter effect,
 * animated background (shooting stars), and call-to-action buttons.
 */
export function Hero() {
  const words = [
    {
      text: "Hi,",
    },
    {
      text: "I'm",
    },
    {
      text: "Ravi",
      className: "text-primary dark:text-primary",
    },
    {
      text: "Agrahari",
      className: "text-primary dark:text-primary",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden bg-background"
    >
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="space-y-4">
            <TypewriterEffect words={words} />
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] mx-auto">
              Full Stack Developer specializing in building exceptional digital
              experiences.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              View Work <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium"
            >
              Resume <Download className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-6 text-muted-foreground">
            <Link
              href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href={`https://linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}`}
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className="hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      <ShootingStars />
      <StarsBackground />
    </section>
  );
}
