import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { getOtherData } from "@/api/getOtherData";
import { useTranslation } from "react-i18next";
import { imageURL } from "@/api/GlobalData";
import { getPageBanners, resolvePageBanner } from "@/lib/pageBanners";
import { stripHtml } from "@/components/utils/helpers";

export default function ProjectsPage({ projects = [], pageBanners = {} }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <Layout
      image={resolvePageBanner("projects", pageBanners)}
      breadcrumbTitle={
        lang === "ar" ? "المشاريع" : lang === "tr" ? "Projeler" : "Projects"
      }
    >
      <section className="news-style-two sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">
              {lang === "ar"
                ? "مشاريعنا"
                : lang === "tr"
                  ? "Projelerimiz"
                  : "Our Projects"}
            </span>
            <h2>
              {lang === "ar"
                ? "المشاريع المنشورة"
                : lang === "tr"
                  ? "Yayinlanan projeler"
                  : "Published projects"}
            </h2>
          </div>
          <div className="row clearfix">
            {projects.map((project) => {
              return (
                <div
                  key={project?._id}
                  className="col-lg-4 col-md-6 col-sm-12 news-block my-2"
                >
                  <div className="news-block-one h-100 project-grid-card">
                    <div className="inner-box h-100 project-grid-card-inner">
                      <div className="image-box">
                        <figure className="image">
                          <img
                            src={
                              `${imageURL}projects/${project?.image}` ||
                              "/assets/images/news/news-1.jpg"
                            }
                            alt={project?.title?.[lang] || project?.title?.en}
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                        </figure>
                      </div>
                      <ProjectBrief project={project} lang={lang} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

const ProjectBrief = ({ project, lang }) => {
  const briefHtml = project?.brief?.[lang] || project?.brief?.en || "";
  const plainText = stripHtml(briefHtml);

  return (
    <div className="lower-box project-grid-card-body">
      <h3 className="project-grid-card-title">
        {project?.title?.[lang] || project?.title?.en}
      </h3>

      <p className="project-grid-card-brief">{plainText}</p>

      {(project?.slug || project?._id) && (
        <div className="link project-grid-card-link">
          <Link href={`/projects/${project?.slug || project?._id}`}>
            <span>
              {lang === "ar"
                ? "فتح المشروع"
                : lang === "tr"
                  ? "Projeyi Aç"
                  : "Open Project"}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const [{ projects = [] }, pageBanners] = await Promise.all([
    getOtherData(),
    getPageBanners(),
  ]);

  return {
    props: { projects, pageBanners },
    revalidate: 300,
  };
}
