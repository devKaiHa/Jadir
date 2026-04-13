import Layout from "@/components/layout/Layout";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";
import baseURL from "@/api/GlobalData";

export default function PolicyDetailsPage({ policy }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!policy) return null;

  return (
    <Layout breadcrumbTitle={policy?.title?.[lang] || policy?.title?.en}>
      <section className="about-style-two sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">
              {policy?.policyType || "policy"}
            </span>
            <h2>{policy?.title?.[lang] || policy?.title?.en}</h2>
          </div>
          {policy?.summary?.[lang] || policy?.summary?.en ? (
            <div className="text-box mb-4">
              <p>{policy?.summary?.[lang] || policy?.summary?.en}</p>
            </div>
          ) : null}
          <div className="content-box">
            <div className="text-box">
              {policy?.content?.[lang]
                ? parse(policy.content[lang])
                : parse(policy?.content?.en || "")}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const payload = await fetchJSON(`${baseURL}policies/public`);
    const policies = Array.isArray(payload?.data) ? payload.data : [];

    return {
      paths: policies
        .filter((policy) => policy?.slug)
        .map((policy) => ({
          params: { slug: policy.slug },
        })),
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const payload = await fetchJSON(
      `${baseURL}policies/public/slug/${params.slug}`,
    );

    return {
      props: {
        policy: payload?.data || null,
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }
}
