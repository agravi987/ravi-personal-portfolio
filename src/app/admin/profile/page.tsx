"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";
import type { PortfolioProfile } from "@/lib/portfolio-data";

const blankProfile: PortfolioProfile = {
  fullName: "",
  role: "",
  shortTitle: "",
  heroBadge: "",
  heroHeadline: "",
  heroDescription: "",
  aboutHeading: "",
  aboutIntro: "",
  aboutDetails: "",
  email: "",
  location: "",
  githubUsername: "",
  linkedinUsername: "",
  profileImage: "",
  resumeUrl: "/resume.pdf",
};

const inputClass =
  "w-full rounded-md border bg-background px-3 py-2 outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/10";

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<PortfolioProfile>(blankProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile({ ...blankProfile, ...data });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateField = (field: keyof PortfolioProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to save profile: ${error.error || "Unknown error"}`);
        return;
      }

      const updated = await res.json();
      setProfile({ ...blankProfile, ...updated });
      alert("Profile saved successfully.");
    } catch (error) {
      console.error("Profile save error:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Manage public identity, hero text, contact details, social links, and
          profile image from one place.
        </p>
      </div>

      <section className="rounded-lg border bg-card p-5">
        <h3 className="mb-4 text-lg font-bold">Profile Photo</h3>
        <div className="grid gap-5 md:grid-cols-[280px_1fr] md:items-start">
          <ImageUpload
            value={profile.profileImage || ""}
            onChange={(url) => updateField("profileImage", url)}
            disabled={saving}
          />
          <div className="rounded-lg border bg-background p-4 text-sm text-muted-foreground">
            Upload a square or portrait image. The public website displays it as
            a circular profile photo.
          </div>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-5">
        <h3 className="mb-4 text-lg font-bold">Identity</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name" value={profile.fullName} onChange={(value) => updateField("fullName", value)} />
          <Field label="Navbar role" value={profile.role} onChange={(value) => updateField("role", value)} />
          <Field label="Short title" value={profile.shortTitle} onChange={(value) => updateField("shortTitle", value)} />
          <Field label="Hero badge" value={profile.heroBadge} onChange={(value) => updateField("heroBadge", value)} />
          <Field label="Email" value={profile.email} onChange={(value) => updateField("email", value)} />
          <Field label="Location" value={profile.location} onChange={(value) => updateField("location", value)} />
          <Field label="GitHub username" value={profile.githubUsername} onChange={(value) => updateField("githubUsername", value)} />
          <Field label="LinkedIn username" value={profile.linkedinUsername} onChange={(value) => updateField("linkedinUsername", value)} />
          <Field label="Resume URL" value={profile.resumeUrl} onChange={(value) => updateField("resumeUrl", value)} />
        </div>
      </section>

      <section className="rounded-lg border bg-card p-5">
        <h3 className="mb-4 text-lg font-bold">Hero Content</h3>
        <div className="space-y-4">
          <Field label="Hero headline" value={profile.heroHeadline} onChange={(value) => updateField("heroHeadline", value)} />
          <TextArea label="Hero description" value={profile.heroDescription} onChange={(value) => updateField("heroDescription", value)} />
        </div>
      </section>

      <section className="rounded-lg border bg-card p-5">
        <h3 className="mb-4 text-lg font-bold">About Content</h3>
        <div className="space-y-4">
          <Field label="About heading" value={profile.aboutHeading} onChange={(value) => updateField("aboutHeading", value)} />
          <TextArea label="About intro" value={profile.aboutIntro} onChange={(value) => updateField("aboutIntro", value)} />
          <TextArea label="About details" value={profile.aboutDetails} onChange={(value) => updateField("aboutDetails", value)} />
        </div>
      </section>

      <div className="sticky bottom-4 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          Save Profile
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <textarea
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className={`${inputClass} resize-y`}
      />
    </label>
  );
}
