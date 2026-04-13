import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { fetchJSON, pickArray } from "@/GlobalHooks/GlobalHooks";
import baseURL from "@/api/GlobalData";

export default function PoliciesPage({ policies = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <Layout breadcrumbTitle={lang === "ar" ? "السياسات" : "Policies"}>
      <section className="news-style-two sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">
              {lang === "ar" ? "السياسات القانونية" : "Legal Pages"}
            </span>
            <h2>{lang === "ar" ? "سياسات الموقع" : "Site Policies"}</h2>
          </div>
          <div className="row clearfix">
            {policies.map((policy) => (
              <div
                key={policy?._id}
                className="col-lg-4 col-md-6 col-sm-12 news-block"
              >
                <div className="news-block-one h-100">
                  <div className="inner-box h-100">
                    <div className="lower-box">
                      <span className="category">
                        {policy?.policyType || "policy"}
                      </span>
                      <h3>{policy?.title?.[lang] || policy?.title?.en}</h3>
                      <p>{policy?.summary?.[lang] || policy?.summary?.en}</p>
                      <div className="link">
                        <Link href={`/policies/${policy?.slug}`}>
                          <span>
                            {lang === "ar" ? "اقرأ المزيد" : "Read More"}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const payload = await fetchJSON(`${baseURL}policies/public`);

    return {
      props: {
        policies: pickArray(payload),
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      props: {
        policies: [],
      },
      revalidate: 60,
    };
  }
}
