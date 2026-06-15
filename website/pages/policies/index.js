import Layout from "@/components/layout/Layout";
import { EmptyState, SectionTitle } from "@/components/website/PublicSections";
import {
  getWebsiteData,
  localize,
  truncate,
} from "@/components/website/websiteUtils";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function PoliciesPage({ policies = [] }) {
  const { i18n, t } = useTranslation();
  const lang = i18n?.language || "en";
  const isRtl = lang === "ar";

  return (
    <Layout breadcrumbTitle={t("policies")}>
      <section
        className={`site-band ${isRtl ? "rtl" : "ltr"}`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="auto-container">
          <SectionTitle
            eyebrow={t("policiesPage.subtitle")}
            title={t("policiesPage.title")}
            text={t("policiesPage.description")}
          />

          {policies.length ? (
            <div className="row g-4">
              {policies.map((policy, index) => {
                const href = `/policies/${policy?.slug}`;
                const title = localize(policy?.title, lang);
                const summary = truncate(localize(policy?.summary, lang), 140);

                return (
                  <div
                    key={policy?._id || policy?.slug}
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
                  >
                    <article className="services-redesign-card h-100">
                      <div className="services-redesign-card-top">
                        <div className="services-redesign-number">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="services-redesign-line" />

                        <div className="services-redesign-label">
                          {lang === "ar"
                            ? "سياسة"
                            : lang === "tr"
                            ? "Politika"
                            : "Policy"}
                        </div>
                      </div>

                      <div className="services-redesign-card-body">
                        <h3 className="services-redesign-card-title">
                          <Link href={href}>{title}</Link>
                        </h3>

                        <p className="services-redesign-card-text">{summary}</p>
                      </div>

                      <div className="services-redesign-card-footer">
                        <Link href={href} className="services-redesign-link">
                          <span>{t("learnMore")}</span>
                          <i
                            className={`services-redesign-arrow ${
                              isRtl ? "rtl-arrow" : ""
                            }`}
                          >
                            →
                          </i>
                        </Link>
                      </div>
                    </article>
                  </div>
                );
              })}
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
