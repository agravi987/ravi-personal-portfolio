"use client";

import { Award, Mail } from "lucide-react";

interface Achievement {
  _id: string;
  title: string;
  description: string;
}

interface ContactProps {
  achievements: Achievement[];
}

export function Contact({ achievements }: ContactProps) {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        {/* Achievements Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {achievements.map((ach) => (
              <div
                key={ach._id}
                className="bg-background border rounded-lg p-6 flex items-start gap-4"
              >
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{ach.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </p>

          <a
            href="mailto:ravi@example.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Mail size={20} />
            Say Hello
          </a>
        </div>
      </div>
    </section>
  );
}
