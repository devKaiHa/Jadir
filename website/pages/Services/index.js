import Layout from "@/components/layout/Layout";
import Plans from "@/components/pages/OurServices/Plans";
import AboutServices from "@/components/pages/OurServices/AboutServices";
import Services from "@/components/pages/OurServices/Services";
import Goals from "@/components/pages/OurServices/Goals";
import { useTranslation } from "react-i18next";
import { getOtherData } from "@/api/getOtherData";

export async function getStaticProps() {
  try {
    const data = await getOtherData();
    return { props: { data }, revalidate: 300 };
  } catch (err) {
    console.error("Other data error:", err);
    return { props: { data: {} }, revalidate: 300 };
  }
}

const OurServices = ({ data = {} }) => {
  const { t } = useTranslation();

  // destructure directly from server props
  const { aboutService = {}, servicesList = [], plans: plansData = [] } = data;

  const servicesAbout = aboutService?.items?.[0] ?? null;
  const servicesHighlights = aboutService?.items?.slice(1) ?? [];

  return (
    <div className="Services">
      <Layout
        headerStyle={1}
        footerStyle={1}
        breadcrumbTitle={t("Services")}
        sticky={true}
        image={"/assets/images/background/services.png"}
      >
        <AboutServices data={servicesAbout} />
        <Services data={servicesList} />
        <Goals data={servicesHighlights} />
        <Plans data={plansData} />
      </Layout>
    </div>
  );
};

export default OurServices;
