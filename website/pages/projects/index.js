import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { getOtherData } from "@/api/getOtherData";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { imageURL } from "@/api/GlobalData";

export default function ProjectsPage({ projects = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <Layout
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
                  className="col-lg-4 col-md-6 col-sm-12 news-block"
                >
                  <div className="news-block-one h-100">
                    <div className="inner-box h-100">
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
  const [expanded, setExpanded] = useState(false);

  const brief = project?.brief?.[lang] || project?.brief?.en || "";

  const shortText = brief.slice(0, 120); // adjust length

  return (
    <div className="lower-box">
      <h3>{project?.title?.[lang] || project?.title?.en}</h3>

      <p>
        {expanded ? brief : shortText}
        {brief.length > 120 && !expanded && "... "}

        {brief.length > 120 && (
          <span
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer text-primary ms-2"
          >
            {expanded
              ? lang === "ar"
                ? "عرض أقل"
                : lang === "tr"
                  ? "Daha az"
                  : "See less"
              : lang === "ar"
                ? "عرض المزيد"
                : lang === "tr"
                  ? "Daha fazla"
                  : "See more"}
          </span>
        )}
      </p>

      {project?.projectLink && (
        <div className="link">
          <Link href={project.projectLink} target="_blank">
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
  const { projects = [] } = await getOtherData();

  return {
    props: { projects },
    revalidate: 300,
  };
}
