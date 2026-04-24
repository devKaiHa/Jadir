import Layout from "@/components/layout/Layout";
import baseURL, { CustomPagesEndPoint } from "@/api/GlobalData";
import { useTranslation } from "react-i18next";

const localize = (value, lang = "en") => {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  return value[lang] || value.en || value.ar || "";
};

export default function CustomPage({ page }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const title = localize(page?.title, lang);
  const content = localize(page?.content, lang);

  return (
    <Layout breadcrumbTitle={title || "Page"}>
      <section className="custom-page-section sec-pad">
        <div className="auto-container">
          <div className="custom-page-body">
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </section>

      <style jsx>{`
        .custom-page-section {
          background: #f8faf9;
        }

        .custom-page-body {
          padding: 36px;
          background: #fff;
          border: 1px solid #edf0f2;
          border-radius: 8px;
          box-shadow: 0 18px 42px rgba(6, 24, 21, 0.08);
        }

        .custom-page-body h1 {
          margin-bottom: 22px;
          color: #06211d;
        }

        .custom-page-body :global(p) {
          line-height: 1.8;
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(
      `${baseURL}${CustomPagesEndPoint}/slug/${params.slug}`,
    );

    if (!res.ok) {
      return { notFound: true };
    }

    const payload = await res.json();

    return {
      props: {
        page: payload?.data || null,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
