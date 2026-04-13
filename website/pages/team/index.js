import Layout from "@/components/layout/Layout";
import TeamSlider from "@/components/pages/AboutUs/TeamlSlider";
import { getOtherData } from "@/api/getOtherData";
import { useTranslation } from "react-i18next";

export default function TeamPage({ members = [] }) {
  const { t } = useTranslation();
  const founders = members.filter((item) => item.isFounder);
  const team = members.filter((item) => !item.isFounder);

  return (
    <Layout breadcrumbTitle={t("about.ourTeam")}>
      <section className="team-section about-page sec-pad">
        <div className="auto-container">
          {founders.length ? (
            <>
              <div className="sec-title">
                <span className="sub-title">{t("leadership")}</span>
                <h2>{t("about.theFounders")}</h2>
              </div>
              <TeamSlider team={founders} />
            </>
          ) : null}

          {team.length ? (
            <>
              <div className="sec-title" style={{ marginTop: "80px" }}>
                <span className="sub-title">{t("teamMember")}</span>
                <h2>{t("about.ourTeam")}</h2>
              </div>
              <TeamSlider team={team} />
            </>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { members = [] } = await getOtherData();

  return {
    props: { members },
    revalidate: 300,
  };
}
