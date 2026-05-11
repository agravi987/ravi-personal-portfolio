"use client";

import {
  Award,
  Check,
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { PortfolioAchievement } from "@/lib/portfolio-data";
import type { PortfolioProfile } from "@/lib/portfolio-data";

interface ContactProps {
  achievements: PortfolioAchievement[];
  showAchievements?: boolean;
  profile?: PortfolioProfile;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

const inputClass =
  "focus-ring w-full rounded-lg border bg-background px-4 py-3 outline-none transition focus:border-primary/60";

const quickSubjects = [
  "Internship opportunity",
  "Freelance full-stack build",
  "Dashboard or admin panel",
  "Cloud deployment help",
];

const collaborationFit = [
  "Clear product scope and fast prototype",
  "Next.js, MERN, APIs, dashboards",
  "Deployment, docs, and handoff thinking",
];

export function Contact({
  achievements,
  showAchievements = true,
  profile,
}: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = profile?.email || "hello@ravi.dev";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {showAchievements && (
          <div className="mb-14 md:mb-20">
            <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary md:text-sm md:tracking-[0.24em]">
                Proof points
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
                Achievements that back the build quality.
              </h2>
            </div>

            <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-auto md:grid md:max-w-6xl md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <article
                  key={achievement._id}
                  className="group w-[82vw] shrink-0 snap-start overflow-hidden rounded-lg border bg-background shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 md:w-auto"
                >
                  <div className="relative h-36 border-b bg-[linear-gradient(135deg,rgba(245,158,11,0.18),rgba(14,165,233,0.14),rgba(16,185,129,0.14))] sm:h-44">
                    {achievement.certificateImage ? (
                      <Image
                        src={achievement.certificateImage}
                        alt={achievement.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="rounded-full bg-background/80 p-5 text-primary shadow-sm backdrop-blur">
                          <Award className="h-10 w-10" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg font-bold group-hover:text-primary">
                      {achievement.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary md:text-sm md:tracking-[0.24em]">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Let us build something production-ready.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground md:mt-5 md:text-base md:leading-7">
              I am open to internships, freelance builds, collaboration, and
              full-stack product work where clean UI, reliable APIs, and cloud
              deployment matter.
            </p>

            <div className="mt-6 space-y-3 md:mt-8 md:space-y-4">
              <div className="flex flex-col gap-3 rounded-lg border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={`mailto:${email}`}
                  className="focus-ring inline-flex min-w-0 items-center gap-3 rounded-md font-semibold transition hover:text-primary"
                >
                  <Mail className="h-5 w-5 shrink-0" />
                  <span className="truncate">{email}</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-background p-4 text-sm text-muted-foreground md:text-base">
                <MapPin className="h-5 w-5 text-primary" />
                {profile?.location || "India, available for remote-first teams"}
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-background p-4 text-sm text-muted-foreground md:text-base">
                <Clock className="h-5 w-5 text-primary" />
                Best fit: product builds, dashboards, APIs, cloud deploys
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-background p-4 text-sm text-muted-foreground md:text-base">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Contact form stores requests and sends email alerts
              </div>
            </div>

            <div className="mt-6 rounded-lg border bg-background p-5">
              <p className="text-sm font-bold text-foreground">
                Best collaboration fit
              </p>
              <div className="mt-4 grid gap-3">
                {collaborationFit.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm font-medium text-muted-foreground"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-background p-6 shadow-sm">
            {submitStatus === "success" && (
              <div className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300">
                <CheckCircle className="h-5 w-5" />
                <p className="text-sm font-semibold">
                  Thank you. Your message has been sent successfully.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-600">
                <XCircle className="h-5 w-5" />
                <p className="text-sm font-semibold">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
              <input
                {...register("company")}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className={inputClass}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    type="email"
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Subject
                </label>
                <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {quickSubjects.map((subject) => (
                    <button
                      key={subject}
                      type="button"
                      onClick={() =>
                        setValue("subject", subject, {
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                      }
                      className="focus-ring shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                      {subject}
                    </button>
                  ))}
                </div>
                <input
                  {...register("subject")}
                  type="text"
                  className={inputClass}
                  placeholder="Internship, freelance build, or collaboration"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about the product, stack, deadline, or problem statement..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
