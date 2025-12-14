"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ImageUpload } from "@/components/admin/image-upload";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  image?: string;
  featured: boolean;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Project>();

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

  const onSubmit = async (data: Project) => {
    // Handle technologies array from string (comma separated)
    const techArray =
      typeof data.technologies === "string"
        ? (data.technologies as string).split(",").map((t: string) => t.trim())
        : data.technologies;

    const payload = { ...data, technologies: techArray };

    if (editingProject) {
      await fetch(`/api/projects/${editingProject._id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    closeModal();
    fetchProjects();
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("technologies", project.technologies.join(", ") as any); // Display as comma string
      setValue("liveLink", project.liveLink);
      setValue("repoLink", project.repoLink);
      setValue("image", project.image);
      setValue("featured", project.featured);
    } else {
      setEditingProject(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    reset();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
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
              className="bg-card border rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {project.title}
                  {project.featured && (
                    <span className="bg-yellow-500/20 text-yellow-600 text-xs px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap text-xs">
                  {project.technologies.map((t) => (
                    <span key={t} className="bg-secondary px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(project)}
                  className="p-2 hover:bg-accent rounded-md"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDelete(project._id)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-md"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background w-full max-w-lg rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">
                {editingProject ? "Edit Project" : "Add Project"}
              </h3>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  {...register("title", { required: true })}
                  className="w-full border rounded-md px-3 py-2 bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full border rounded-md px-3 py-2 bg-background h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  {...register("technologies", { required: true })}
                  className="w-full border rounded-md px-3 py-2 bg-background"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Live Link
                  </label>
                  <input
                    {...register("liveLink")}
                    className="w-full border rounded-md px-3 py-2 bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Repo Link
                  </label>
                  <input
                    {...register("repoLink")}
                    className="w-full border rounded-md px-3 py-2 bg-background"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Image
                </label>
                <ImageUpload
                  value={editingProject?.image || ""}
                  onChange={(url) => setValue("image", url)}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("featured")}
                  className="h-4 w-4"
                />
                <label className="text-sm font-medium">Featured Project</label>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 hover:bg-accent rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
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
