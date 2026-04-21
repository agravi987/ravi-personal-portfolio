import { About } from "@/components/About";
import { PageFrame } from "@/components/PageFrame";
import { getPortfolioData } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { data } = await getPortfolioData();

  return (
    <PageFrame profile={data.profile}>
      <About profile={data.profile} />
    </PageFrame>
  );
}
