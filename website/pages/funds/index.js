import Layout from "@/components/layout/Layout";
import AboutFund from "@/components/pages/Funds/AboutFund";
import { useTranslation } from "react-i18next";
import FundAdvantages from "@/components/pages/Funds/FundAdvantages";
import LoadingCard from "@/components/utils/LoadingCard";
import { getOtherData } from "@/api/getOtherData";

export default function FundsPage({ initialFunds }) {
  const { t } = useTranslation();

  const fundsData = initialFunds;

  if (!fundsData) return <LoadingCard />;

  return (
    <Layout
      breadcrumbTitle={t("InvestmentFunds")}
      image={"/assets/images/funds.jpg"}
    >
      {[...fundsData]?.map((fund) => {
        return (
          <div key={fund?._id}>
            <AboutFund fund={fund} />
            <FundAdvantages fund={fund} />
          </div>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const { funds } = await getOtherData();

  return {
    props: {
      initialFunds: funds,
    },
    revalidate: 300,
  };
}
