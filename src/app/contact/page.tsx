import { Contact } from "@/components/Contact";
import { PageFrame } from "@/components/PageFrame";
import { getPortfolioData } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { data } = await getPortfolioData();

  return (
    <PageFrame profile={data.profile}>
      <Contact
        achievements={data.achievements}
        showAchievements={false}
        profile={data.profile}
      />
    </PageFrame>
  );
}
