import Layout from "@/components/layout/Layout";
import parse from "html-react-parser";
import { getPolicyBySlug, getWebsiteData, localize } from "@/components/website/websiteUtils";
import { useTranslation } from "react-i18next";

export default function PolicyDetailsPage({ policy }) {
  const { i18n } = useTranslation();
  const lang = i18n?.language || "en";

  if (!policy) return null;

  return (
    <Layout breadcrumbTitle={localize(policy?.title, lang)}>
      <section className="site-band">
        <div className="auto-container">
          <main className="site-detail-main">
            <span className="site-link">{policy?.policyType || "Policy"}</span>
            <h1>{localize(policy?.title, lang)}</h1>
            <p>{localize(policy?.summary, lang)}</p>
            <article className="site-richtext">
              {parse(localize(policy?.content, lang) || "")}
            </article>
          </main>
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
