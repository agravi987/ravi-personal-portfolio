"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  type: string;
}

export default function ExperienceAdmin() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Experience>();

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/experience");
      if (res.ok) {
        setExperience(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to delete experience: ${error.error || "Unknown error"}`);
        return;
      }

      fetchExperience();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete experience. Please try again.");
    }
  };

  const onSubmit = async (data: Experience) => {
    try {
      let res;
      if (editingExp) {
        res = await fetch(`/api/experience/${editingExp._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/experience", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to save experience: ${error.error || "Unknown error"}`);
        return;
      }

      closeModal();
      fetchExperience();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save experience. Please try again.");
    }
  };

  const openModal = (exp?: Experience) => {
    if (exp) {
      setEditingExp(exp);
      setValue("role", exp.role);
      setValue("company", exp.company);
      setValue("duration", exp.duration);
      setValue("description", exp.description);
      setValue("type", exp.type);
    } else {
      setEditingExp(null);
      reset();
      setValue("type", "Full-time");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setEditingExp(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Experience</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
        >
          <Plus size={18} /> Add Experience
        </button>
      </div>

      {loading ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => (
            <div
              key={exp._id}
              className="bg-card border p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <h3 className="font-bold">
                  {exp.role}{" "}
                  <span className="text-muted-foreground text-sm font-normal">
                    at {exp.company}
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {exp.duration} • {exp.type}
                </p>
                <p className="mt-2 text-sm">{exp.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(exp)}
                  className="p-2 hover:bg-accent rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(exp._id)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background w-full max-w-lg rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">
                {editingExp ? "Edit" : "Add"} Experience
              </h3>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("role", { required: true })}
                placeholder="Role"
                className="w-full border p-2 rounded bg-background"
              />
              <input
                {...register("company", { required: true })}
                placeholder="Company"
                className="w-full border p-2 rounded bg-background"
              />
              <input
                {...register("duration", { required: true })}
                placeholder="Duration (e.g. July 2025)"
                className="w-full border p-2 rounded bg-background"
              />
              <select
                {...register("type")}
                className="w-full border p-2 rounded bg-background"
              >
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="Freelance">Freelance</option>
              </select>
              <textarea
                {...register("description")}
                placeholder="Description"
                className="w-full border p-2 rounded bg-background h-24"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 hover:bg-accent rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded"
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
