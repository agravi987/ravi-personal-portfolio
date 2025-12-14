"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
}

const CATEGORIES = ["Language", "Framework", "Database", "Tool", "Other"];

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Skill>();

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/skills");
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to delete skill: ${error.error || "Unknown error"}`);
        return;
      }

      fetchSkills();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete skill. Please try again.");
    }
  };

  const onSubmit = async (data: Skill) => {
    try {
      let res;
      if (editingSkill) {
        res = await fetch(`/api/skills/${editingSkill._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/skills", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to save skill: ${error.error || "Unknown error"}`);
        return;
      }

      closeModal();
      fetchSkills();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save skill. Please try again.");
    }
  };

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setValue("name", skill.name);
      setValue("category", skill.category);
      setValue("level", skill.level);
    } else {
      setEditingSkill(null);
      reset();
      setValue("category", "Language");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
    reset();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Skills</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Plus size={18} /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="bg-card border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{skill.name}</h3>
                <span className="text-sm text-muted-foreground bg-secondary px-2 py-0.5 rounded mr-2">
                  {skill.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  Level: {skill.level}%
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(skill)}
                  className="p-2 hover:bg-accent rounded-md"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(skill._id)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-md"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background w-full max-w-md rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">
                {editingSkill ? "Edit Skill" : "Add Skill"}
              </h3>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full border rounded-md px-3 py-2 bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  {...register("category", { required: true })}
                  className="w-full border rounded-md px-3 py-2 bg-background"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Level (0-100)
                </label>
                <input
                  type="number"
                  {...register("level", { min: 0, max: 100 })}
                  className="w-full border rounded-md px-3 py-2 bg-background"
                  defaultValue={80}
                />
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
