import Layout from "@/components/layout/Layout";
import parse from "html-react-parser";
import {
  getPolicyBySlug,
  getWebsiteData,
  localize,
} from "@/components/website/websiteUtils";
import { useTranslation } from "react-i18next";

export default function PolicyDetailsPage({ policy }) {
  const { i18n } = useTranslation();
  const lang = i18n?.language || "en";

  if (!policy) return null;

  const title = policy?.title?.[lang] || policy?.title?.en || "";
  const summary = policy?.summary?.[lang] || policy?.summary?.en || "";
  const content = policy?.content?.[lang] || policy?.content?.en || "";

  return (
    <Layout breadcrumbTitle={localize(policy?.title, lang)}>
      <section className="policy-details-section sec-pad">
        <div className="auto-container">
          <div className="policy-details-wrapper">
            <div className="policy-details-header centred">
              {/* <span className="policy-details-badge">{type}</span> */}
              <h1 style={{ color: "#00024f" }}>{localize(title, lang)}</h1>
              {summary ? (
                <p className="policy-details-summary">{parse(summary)}</p>
              ) : null}
            </div>

            <div className="policy-details-body">
              <div className="policy-details-content">
                {parse(localize(content, lang) || "")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = await getWebsiteData();
  return {
    paths: (data.policies || [])
      .filter((policy) => policy?.slug)
      .map((policy) => ({ params: { slug: policy.slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const policy = await getPolicyBySlug(params?.slug);
  if (!policy) return { notFound: true, revalidate: 60 };
  return { props: { policy }, revalidate: 300 };
}
