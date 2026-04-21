import { Experience } from "@/components/Experience";
import { PageFrame } from "@/components/PageFrame";
import { getPortfolioData } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const { data } = await getPortfolioData();

  return (
    <PageFrame profile={data.profile}>
      <Experience experience={data.experience} />
    </PageFrame>
  );
}
