import { PageFrame } from "@/components/PageFrame";
import { Skills } from "@/components/Skills";
import { getPortfolioData } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export default async function StackPage() {
  const { data } = await getPortfolioData();

  return (
    <PageFrame profile={data.profile}>
      <Skills skills={data.skills} />
    </PageFrame>
  );
}
