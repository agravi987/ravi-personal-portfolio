import { Navbar } from "@/components/Navbar";
import type { PortfolioProfile } from "@/lib/portfolio-data";

export function PageFrame({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile?: PortfolioProfile;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar profile={profile} />
      <div className="relative z-10">{children}</div>
      <footer className="relative z-10 border-t bg-background/80 py-8 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Ravi Agrahari. Built with Next.js,
          MongoDB, Cloudinary, and a cloud-minded delivery workflow.
        </p>
      </footer>
    </main>
  );
}
