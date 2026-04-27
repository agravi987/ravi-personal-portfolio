import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Knowledge } from "@/components/Knowledge";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { PageFrame } from "@/components/PageFrame";
import { getPortfolioData } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data, usingFallback } = await getPortfolioData();

  return (
    <PageFrame profile={data.profile}>
      <Hero usingFallback={usingFallback} profile={data.profile} />
      <About profile={data.profile} />
      <Projects projects={data.projects} showPageLink />
      <Skills skills={data.skills} />
      <Knowledge items={data.knowledge} showPageLink />
      <Experience experience={data.experience} />
      <Contact achievements={data.achievements} profile={data.profile} />
    </PageFrame>
  );
}
