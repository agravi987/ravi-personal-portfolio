import { Knowledge } from "@/components/Knowledge";
import { PageFrame } from "@/components/PageFrame";
import { getPortfolioData } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export default async function KnowledgePage() {
  const { data } = await getPortfolioData();

  return (
    <PageFrame profile={data.profile}>
      <Knowledge items={data.knowledge} />
    </PageFrame>
  );
}
