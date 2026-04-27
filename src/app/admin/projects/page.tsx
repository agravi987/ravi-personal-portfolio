"use client";

import { useEffect, useState } from "react";
import { Edit, FileText, Loader2, Plus, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { ImageUpload } from "@/components/admin/image-upload";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  documentationLink?: string;
  architectureLink?: string;
  image?: string;
  featured: boolean;
  category?: string;
  status?: string;
  highlights?: string[];
}

type ProjectForm = Omit<Project, "technologies" | "highlights"> & {
  technologies: string | string[];
  highlights: string | string[];
};

const statuses = ["Live", "In Progress", "Lab", "Archived"];

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<ProjectForm>({
    defaultValues: {
      category: "Full Stack",
      status: "Live",
      featured: false,
      technologies: "",
      highlights: "",
    },
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to delete project: ${error.error || "Unknown error"}`);
        return;
      }

      fetchProjects();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  const onSubmit = async (data: ProjectForm) => {
    const technologies =
      typeof data.technologies === "string"
        ? data.technologies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : data.technologies;
    const highlights =
      typeof data.highlights === "string"
        ? data.highlights
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        : data.highlights;

    const payload = { ...data, technologies, highlights };

    const url = editingProject
      ? `/api/projects/${editingProject._id}`
      : "/api/projects";
    const method = editingProject ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Failed to save project: ${error.error || "Unknown error"}`);
      return;
    }

    closeModal();
    fetchProjects();
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("technologies", project.technologies.join(", "));
      setValue("liveLink", project.liveLink);
      setValue("repoLink", project.repoLink);
      setValue("documentationLink", project.documentationLink);
      setValue("architectureLink", project.architectureLink);
      setValue("image", project.image);
      setValue("featured", project.featured);
      setValue("category", project.category || "Full Stack");
      setValue("status", project.status || "Live");
      setValue("highlights", (project.highlights || []).join("\n"));
    } else {
      setEditingProject(null);
      reset({
        category: "Full Stack",
        status: "Live",
        featured: false,
        technologies: "",
        highlights: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    reset({
      category: "Full Stack",
      status: "Live",
      featured: false,
      technologies: "",
      highlights: "",
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add delivery context like category, status, documentation, and
            architecture links so each project reads like real engineering work.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col justify-between gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-start"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  {project.featured && (
                    <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-700">
                      Featured
                    </span>
                  )}
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold">
                    {project.category || "Full Stack"}
                  </span>
                  <span className="rounded-full border px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                    {project.status || "Live"}
                  </span>
                </div>
                <p className="max-w-3xl text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded bg-secondary px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {project.documentationLink && (
                    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1">
                      <FileText className="h-3.5 w-3.5" /> Docs
                    </span>
                  )}
                  {project.architectureLink && (
                    <span className="rounded-full border px-2 py-1">
                      Architecture
                    </span>
                  )}
                  {(project.highlights || []).length > 0 && (
                    <span className="rounded-full border px-2 py-1">
                      {(project.highlights || []).length} highlights
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(project)}
                  className="rounded-md p-2 hover:bg-accent"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(project._id)}
                  className="rounded-md p-2 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-background shadow-lg">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-xl font-bold">
                {editingProject ? "Edit Project" : "Add Project"}
              </h3>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title">
                  <input
                    {...register("title", { required: true })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Category">
                  <input
                    {...register("category")}
                    className={inputClass}
                    placeholder="Cloud Platform"
                  />
                </Field>
              </div>

              <Field label="Description">
                <textarea
                  {...register("description", { required: true })}
                  className={`${inputClass} h-28`}
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Status">
                  <select {...register("status")} className={inputClass}>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Technologies (comma separated)">
                  <input
                    {...register("technologies", { required: true })}
                    className={inputClass}
                    placeholder="Next.js, MongoDB, Docker"
                  />
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Live Link">
                  <input {...register("liveLink")} className={inputClass} />
                </Field>
                <Field label="Repo Link">
                  <input {...register("repoLink")} className={inputClass} />
                </Field>
                <Field label="Documentation Link">
                  <input
                    {...register("documentationLink")}
                    className={inputClass}
                  />
                </Field>
                <Field label="Architecture Link">
                  <input
                    {...register("architectureLink")}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Delivery Highlights (one per line)">
                <textarea
                  {...register("highlights")}
                  className={`${inputClass} h-28`}
                  placeholder={"Containerized service setup\nAdmin-managed content system\nFallback-safe page delivery"}
                />
              </Field>

              <Field label="Project Image">
                <ImageUpload
                  value={editingProject?.image || ""}
                  onChange={(url) => setValue("image", url)}
                />
              </Field>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" {...register("featured")} className="h-4 w-4" />
                Featured Project
              </label>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md px-4 py-2 hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border bg-background px-3 py-2 outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/10";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
