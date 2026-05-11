"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Boxes,
  Cloud,
  FileText,
  FolderGit2,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { PortfolioKnowledge } from "@/lib/portfolio-data";
import { DetailSheet } from "@/components/DetailSheet";
import { portfolioItemId } from "@/lib/portfolio-links";
import { HorizontalCardRail } from "@/components/HorizontalCardRail";

interface KnowledgeProps {
  items: PortfolioKnowledge[];
  showPageLink?: boolean;
}

const iconForCategory = (category: string) => {
  const normalized = category.toLowerCase();
  if (normalized.includes("cloud")) return Cloud;
  if (normalized.includes("container")) return Boxes;
  if (normalized.includes("monitor")) return Activity;
  if (normalized.includes("security")) return ShieldCheck;
  return Workflow;
};

export function Knowledge({ items, showPageLink = false }: KnowledgeProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category)))],
    [items]
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioKnowledge | null>(
    null
  );

  const visibleItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const topicHighlights = useMemo(
    () => Array.from(new Set(items.flatMap((item) => item.topics))).slice(0, 8),
    [items]
  );

  return (
    <section
      id="knowledge"
      className="relative overflow-hidden bg-white py-24 text-slate-950 dark:bg-slate-900 dark:text-slate-100"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(14,165,233,0.08),transparent_30%),radial-gradient(circle_at_80%_82%,rgba(20,184,166,0.1),transparent_26%)] dark:bg-[radial-gradient(circle_at_20%_18%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_82%,rgba(56,189,248,0.08),transparent_26%)]" />
      <div className="container relative mx-auto px-4">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Knowledge Base
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Topics, practices, and references behind the work.
            </h2>
          </div>
          <p className="max-w-lg leading-7 text-slate-600 dark:text-slate-300">
            This is where the portfolio starts showing more than visuals: what I
            study, what I can explain, and the technical areas I am shaping
            into reliable project work.
          </p>
        </div>

        <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          {topicHighlights.map((topic) => (
            <span
              key={topic}
              className="shrink-0 rounded-full border border-cyan-900/10 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800 dark:border-white/10 dark:bg-white/10 dark:text-cyan-100"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="-mx-4 mb-8 flex snap-x items-center gap-2 overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:flex-wrap md:gap-3 md:overflow-visible md:px-0 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`focus-ring shrink-0 snap-start rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-700/20 dark:bg-cyan-300 dark:text-slate-950"
                  : "border border-cyan-900/10 bg-white text-slate-700 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-300/40 dark:hover:text-cyan-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <HorizontalCardRail
          key={activeCategory}
          itemCount={visibleItems.length}
          ariaLabel="knowledge"
          viewMoreHref={showPageLink ? "/knowledge" : undefined}
          viewMoreLabel="View more knowledge"
        >
          {visibleItems.map((item, index) => {
            const Icon = iconForCategory(item.category);

            return (
              <motion.article
                key={item._id}
                id={portfolioItemId("knowledge", item._id || item.title)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group relative w-[76vw] max-w-[20rem] shrink-0 snap-start rounded-lg border border-cyan-900/10 bg-slate-50/90 p-5 shadow-sm transition duration-300 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-400/55 before:to-transparent hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-900/10 sm:w-[20rem] dark:border-white/10 dark:bg-white/[0.05] dark:hover:border-cyan-300/30"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedItem(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedItem(item);
                    }
                  }}
                  className="focus-ring -m-2 rounded-lg p-2"
                  aria-label={`View details for ${item.title}`}
                >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                        {item.category}
                      </p>
                      <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                    </div>
                  </div>
                  {item.featured && (
                    <span className="rounded-full bg-cyan-600/10 px-3 py-1 text-xs font-bold text-cyan-800 dark:bg-cyan-300/10 dark:text-cyan-100">
                      Focus
                    </span>
                  )}
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-cyan-900/10 bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                    >
                      {topic}
                    </span>
                  ))}
                  {item.topics.length > 3 && (
                    <span className="rounded-full bg-cyan-600/10 px-2.5 py-1 text-xs font-bold text-cyan-800 dark:text-cyan-100">
                      +{item.topics.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-cyan-900/10 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-cyan-800 dark:border-white/10 dark:text-cyan-100">
                  View notes
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
                </div>
              </motion.article>
            );
          })}
        </HorizontalCardRail>
      </div>
      {selectedItem && (
        <KnowledgeDetailSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}

function KnowledgeDetailSheet({
  item,
  onClose,
}: {
  item: PortfolioKnowledge;
  onClose: () => void;
}) {
  return (
    <DetailSheet title={item.title} eyebrow={item.category} onClose={onClose}>
      <p className="leading-7 text-muted-foreground">{item.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
        {item.documentationLink && (
          <a
            href={item.documentationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
          >
            <FileText className="h-4 w-4" /> Docs
          </a>
        )}
        {item.proofLink && (
          <a
            href={item.proofLink}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <FolderGit2 className="h-4 w-4" /> Proof
          </a>
        )}
      </div>
    </DetailSheet>
  );
}
