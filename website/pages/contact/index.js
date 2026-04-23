import Layout from "@/components/layout/Layout";
import ContactForm from "@/components/pages/Contact-us/ContactForm";
import { useTranslation } from "react-i18next";

export default function ContactUsPage() {
  const { t } = useTranslation();

  return (
    <Layout
      breadcrumbTitle={t("contact_us") || "Contact"}
      image="/assets/images/background/partners.png"
    >
      <ContactForm />
    </Layout>
  );
}
