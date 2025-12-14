"use client";

import Link from "next/link";
import {
  ArrowRight,
  FolderKanban,
  Wrench,
  Briefcase,
  Award,
} from "lucide-react";

const stats = [
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    count: "Manage",
  },
  { name: "Skills", href: "/admin/skills", icon: Wrench, count: "Manage" },
  {
    name: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
    count: "Manage",
  },
  {
    name: "Achievements",
    href: "/admin/achievements",
    icon: Award,
    count: "Manage",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Welcome back, Admin</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon size={24} />
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
              <h3 className="text-lg font-semibold">{stat.name}</h3>
              <p className="text-sm text-muted-foreground">{stat.count}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
