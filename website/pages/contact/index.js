import Layout from "@/components/layout/Layout";
import ContactForm from "@/components/pages/Contact-us/ContactForm";
import { useTranslation } from "react-i18next";
import { getPageBanners, resolvePageBanner } from "@/lib/pageBanners";

export default function ContactUsPage({ pageBanners = {} }) {
  const { t } = useTranslation();

  return (
    <Layout
      breadcrumbTitle={t("contact.formTitle")}
      image={resolvePageBanner("contact", pageBanners)}
    >
      <ContactForm />
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      pageBanners: await getPageBanners(),
    },
    revalidate: 300,
  };
}
