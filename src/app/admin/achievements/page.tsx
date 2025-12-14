"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { ImageUpload } from "@/components/admin/image-upload";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  date: string;
  certificateImage?: string;
}

export default function AchievementsAdmin() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Achievement>();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/achievements");
      if (res.ok) setAchievements(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;

    try {
      const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const error = await res.json();
        alert(
          `Failed to delete achievement: ${error.error || "Unknown error"}`
        );
        return;
      }

      fetchItems();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete achievement. Please try again.");
    }
  };

  const onSubmit = async (data: Achievement) => {
    try {
      let res;
      if (editingItem) {
        res = await fetch(`/api/achievements/${editingItem._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch("/api/achievements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to save achievement: ${error.error || "Unknown error"}`);
        return;
      }

      closeModal();
      fetchItems();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save achievement. Please try again.");
    }
  };

  const openModal = (item?: Achievement) => {
    if (item) {
      setEditingItem(item);
      setValue("title", item.title);
      setValue("description", item.description);
      setValue("certificateImage", item.certificateImage);
    } else {
      setEditingItem(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setEditingItem(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
        >
          <Plus size={18} /> Add Achievement
        </button>
      </div>

      {loading ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : (
        <div className="grid gap-4">
          {achievements.map((item) => (
            <div
              key={item._id}
              className="bg-card border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="p-2 hover:bg-accent rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(item._id)}
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
          <div className="bg-background w-full max-w-md rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">
                {editingItem ? "Edit" : "Add"} Achievement
              </h3>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("title", { required: true })}
                placeholder="Title"
                className="w-full border p-2 rounded bg-background"
              />
              <textarea
                {...register("description", { required: true })}
                placeholder="Description"
                className="w-full border p-2 rounded bg-background h-24"
              />
              {/* Hidden input to register certificateImage with form */}
              <input type="hidden" {...register("certificateImage")} />
              <div>
                <label className="block text-sm font-medium mb-2">
                  Certificate Image
                </label>
                <ImageUpload
                  value={editingItem?.certificateImage || ""}
                  onChange={(url) => setValue("certificateImage", url)}
                />
              </div>
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
