import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import { getOtherData } from "@/api/getOtherData";
import AboutService from "@/components/pages/OurServices/AboutService";
import { resolvePageBanner } from "@/lib/pageBanners";

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
  const { servicesList = [] } = data;

  return (
    <div className="Services">
      <Layout
        headerStyle={1}
        footerStyle={1}
        breadcrumbTitle={t("Services")}
        sticky={true}
        image={resolvePageBanner("services", data?.pageBanners)}
      >
        <AboutService data={servicesList} length={servicesList?.length} />
      </Layout>
    </div>
  );
};

export default OurServices;
