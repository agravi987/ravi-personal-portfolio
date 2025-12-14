"use client";

import { motion } from "framer-motion";

interface Skill {
  _id: string;
  name: string;
  category: string;
  level?: number;
}

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-20 bg-muted/30 relative">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-glow">
          Skills & Expertise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glow-border-hover bg-background border rounded-lg p-6 shadow-sm group"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary group-hover:text-glow transition-all">
                {category}
              </h3>
              <div className="space-y-3">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, skillIndex) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                      className="space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className="text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        )}
                      </div>
                      {skill.level && (
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.1 + skillIndex * 0.05,
                              ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                          </motion.div>
                        </div>
                      )}
                      {!skill.level && (
                        <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                          {skill.name}
                        </span>
                      )}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
