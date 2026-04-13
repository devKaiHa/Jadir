import Layout from "@/components/layout/Layout";
import parse from "html-react-parser";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";
import baseURL from "@/api/GlobalData";
import { useTranslation } from "react-i18next";

export default function CustomPageDetails({ pageData }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!pageData) return null;

  return (
    <Layout breadcrumbTitle={pageData?.title?.[lang] || pageData?.title?.en}>
      <section className="about-style-two sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">
              {pageData?.title?.[lang] || pageData?.title?.en}
            </span>
          </div>
          <div className="content-box">
            <div className="text-box">
              {pageData?.content?.[lang]
                ? parse(pageData.content[lang])
                : parse(pageData?.content?.en || "")}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  try {
    const payload = await fetchJSON(
      `${baseURL}custom-pages/slug/${params.slug}`,
    );

    return {
      props: {
        pageData: payload?.data || null,
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
