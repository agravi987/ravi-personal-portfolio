"use client";

import { useEffect, useState } from "react";
import { Edit, Loader2, Plus, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";

interface KnowledgeItem {
  _id: string;
  title: string;
  category: string;
  summary: string;
  topics: string[];
  documentationLink?: string;
  proofLink?: string;
  featured?: boolean;
}

type KnowledgeForm = Omit<KnowledgeItem, "topics"> & {
  topics: string | string[];
};

const CATEGORIES = [
  "Cloud",
  "Containers",
  "Delivery",
  "Monitoring",
  "Security",
  "Automation",
  "Documentation",
  "Other",
];

const inputClass =
  "w-full rounded-md border bg-background px-3 py-2 outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/10";

export default function KnowledgeAdminPage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<KnowledgeForm>({
    defaultValues: {
      category: "Cloud",
      featured: false,
      topics: "",
    },
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/knowledge");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this knowledge entry?")) {
      return;
    }

    try {
      const res = await fetch(`/api/knowledge/${id}`, { method: "DELETE" });

      if (!res.ok) {
        const error = await res.json();
        alert(
          `Failed to delete knowledge entry: ${error.error || "Unknown error"}`
        );
        return;
      }

      fetchItems();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete knowledge entry. Please try again.");
    }
  };

  const onSubmit = async (data: KnowledgeForm) => {
    const topics =
      typeof data.topics === "string"
        ? data.topics
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : data.topics;

    const payload = { ...data, topics };
    const url = editingItem
      ? `/api/knowledge/${editingItem._id}`
      : "/api/knowledge";
    const method = editingItem ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(
        `Failed to save knowledge entry: ${error.error || "Unknown error"}`
      );
      return;
    }

    closeModal();
    fetchItems();
  };

  const openModal = (item?: KnowledgeItem) => {
    if (item) {
      setEditingItem(item);
      setValue("title", item.title);
      setValue("category", item.category);
      setValue("summary", item.summary);
      setValue("topics", item.topics.join(", "));
      setValue("documentationLink", item.documentationLink);
      setValue("proofLink", item.proofLink);
      setValue("featured", Boolean(item.featured));
    } else {
      setEditingItem(null);
      reset({
        category: "Cloud",
        featured: false,
        topics: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    reset({
      category: "Cloud",
      featured: false,
      topics: "",
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Knowledge</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Capture the topics you know, the docs you use, and the proof that
            backs your cloud and DevOps direction.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus size={18} /> Add Knowledge
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-start"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      Focus
                    </span>
                  )}
                </div>
                <p className="max-w-3xl text-sm text-muted-foreground">
                  {item.summary}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {item.topics.map((topic) => (
                    <span key={topic} className="rounded bg-secondary px-2 py-1">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="rounded-md p-2 hover:bg-accent"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="rounded-md p-2 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-lg bg-background shadow-lg">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-xl font-bold">
                {editingItem ? "Edit Knowledge" : "Add Knowledge"}
              </h3>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title">
                  <input
                    {...register("title", { required: true })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Category">
                  <select
                    {...register("category", { required: true })}
                    className={inputClass}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Summary">
                <textarea
                  {...register("summary", { required: true })}
                  className={`${inputClass} h-28`}
                />
              </Field>

              <Field label="Topics (comma separated)">
                <input
                  {...register("topics", { required: true })}
                  className={inputClass}
                  placeholder="Docker images, service boundaries, runtime dependencies"
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Documentation Link">
                  <input
                    {...register("documentationLink")}
                    className={inputClass}
                  />
                </Field>
                <Field label="Proof Link">
                  <input {...register("proofLink")} className={inputClass} />
                </Field>
              </div>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" {...register("featured")} className="h-4 w-4" />
                Mark as focus area
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
