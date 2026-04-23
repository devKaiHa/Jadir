import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { EmptyState, SectionTitle } from "@/components/website/PublicSections";
import { getWebsiteData, localize, truncate } from "@/components/website/websiteUtils";
import { useTranslation } from "react-i18next";

export default function PoliciesPage({ policies = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n?.language || "en";

  return (
    <Layout breadcrumbTitle="Policies">
      <section className="site-band">
        <div className="auto-container">
          <SectionTitle
            eyebrow="Policies"
            title="Privacy, Terms and Conditions"
            text="Review the legal and operational policies that govern the website and services."
          />
          {policies.length ? (
            <div className="site-card-grid">
              {policies.map((policy) => (
                <Link className="site-card" href={`/policies/${policy?.slug}`} key={policy?._id || policy?.slug}>
                  <span>{policy?.policyType || "Policy"}</span>
                  <h3>{localize(policy?.title, lang)}</h3>
                  <p>{truncate(localize(policy?.summary, lang), 140)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="No policies available yet." />
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getWebsiteData();
  return { props: { policies: data.policies || [] }, revalidate: 300 };
}
