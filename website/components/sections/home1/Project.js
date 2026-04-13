"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { imageURL } from "@/api/GlobalData";

export default function Project({ projects = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!projects.length) return null;

  return (
    <section className="project-section sec-pad">
      <div className="auto-container">
        <div className="sec-title">
          <span className="sub-title">
            {lang === "ar"
              ? "المشاريع"
              : lang === "tr"
                ? "Projeler"
                : "Projects"}
          </span>
          <h2>
            {lang === "ar"
              ? "أحدث المشاريع"
              : lang === "tr"
                ? "Guncel projeler"
                : "Latest Projects"}
          </h2>
        </div>
        <div className="row clearfix">
          {projects?.slice(0, 3).map((project, index) => (
            <div
              key={project?._id || index}
              className="col-lg-4 col-md-6 col-sm-12 news-block"
            >
              <div className="news-block-one h-100">
                <div className="inner-box h-100 bg-white shadow-lg">
                  <div className="image-box">
                    <figure className="image">
                      <img
                        src={
                          `${imageURL}projects/${project?.image}` ||
                          "/assets/images/news/news-1.jpg"
                        }
                        alt={project?.title?.[lang] || "Project"}
                        style={{ height: "240px", objectFit: "cover" }}
                      />
                    </figure>
                  </div>
                  <div className="lower-box">
                    <h3>{project?.title?.[lang] || project?.title?.en}</h3>
                    <p>
                      {truncateText(
                        project?.brief?.[lang] || project?.brief?.en,
                        130,
                      )}
                    </p>
                    {project?.projectLink && (
                      <div className="link">
                        <Link href={project.projectLink} target="_blank">
                          <span>
                            {lang === "ar"
                              ? "عرض المشروع"
                              : lang === "tr"
                                ? "Projeyi Gor"
                                : "View Project"}
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
