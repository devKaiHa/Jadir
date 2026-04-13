import Layout from "@/components/layout/Layout";
import parse from "html-react-parser";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";
import baseURL, { imageURL } from "@/api/GlobalData";
import { useTranslation } from "react-i18next";

export default function ResearchDetailsPage({ research }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!research) return null;

  return (
    <Layout breadcrumbTitle={research?.title?.[lang] || research?.title?.en}>
      <section className="sidebar-page-container blog-details sec-pad">
        <div className="auto-container">
          <div className="blog-details-content">
            <div className="content-one">
              <h2>{research?.title?.[lang] || research?.title?.en}</h2>
              <img
                src={
                  `${imageURL}research/${research?.image}` ||
                  "/assets/images/news/news-21.jpg"
                }
                className="blog-detail-img"
                style={{ objectFit: "cover" }}
                alt={research?.title?.[lang] || research?.title?.en}
              />
              <div className="text-box">
                {research?.content?.[lang]
                  ? parse(research.content[lang])
                  : parse(research?.content?.en || "")}
              </div>
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
    const payload = await fetchJSON(`${baseURL}research/slug/${params.slug}`);

    return {
      props: {
        research: payload?.data || null,
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
