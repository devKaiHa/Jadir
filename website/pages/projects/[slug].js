import Layout from "@/components/layout/Layout";
import Link from "next/link";
import {
  asset,
  getProjectBySlug,
  getWebsiteData,
  localize,
} from "@/components/website/websiteUtils";
import { useTranslation } from "react-i18next";

function ProjectBlock({ title, text }) {
  if (!text) return null;
  return (
    <div className="jadwa-detail-card">
      <h3>{title}</h3>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

export default function ProjectDetailsPage({ project }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!project) return null;

  return (
    <Layout
      breadcrumbTitle={localize(project?.title, lang)}
      image={asset(
        "projects",
        project?.image,
        "/assets/images/project/project-5.jpg",
      )}
    >
      <section className="jadwa-detail-page sec-pad">
        <div className="auto-container">
          <div className="jadwa-detail-hero">
            <div className="jadwa-detail-image-wrap">
              <img
                className="jadwa-detail-image"
                src={asset(
                  "projects",
                  project?.image,
                  "/assets/images/project/project-5.jpg",
                )}
                alt={localize(project?.title, lang)}
              />
            </div>
            <div className="jadwa-detail-hero-content">
              <div className="jadwa-pill">
                <span className="jadwa-pill-dot" />
                <span>Projects</span>
              </div>
              <h1>{localize(project?.title, lang)}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: localize(project?.brief, lang),
                }}
              />
              <Link href="/projects" className="jadwa-detail-link">
                <span>Back to projects</span>
                <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <ProjectBlock
              title="Challenge"
              text={localize(project?.challenge, lang)}
            />
            <ProjectBlock
              title="Solution"
              text={localize(project?.solution, lang)}
            />
            <ProjectBlock
              title="Result"
              text={localize(project?.result, lang)}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = await getWebsiteData();
  return {
    paths: (data.projects || [])
      .filter((project) => project?.slug)
      .map((project) => ({ params: { slug: project.slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const project = await getProjectBySlug(params?.slug);
  if (!project) return { notFound: true, revalidate: 60 };
  return { props: { project }, revalidate: 300 };
}
