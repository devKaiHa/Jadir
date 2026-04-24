import Layout from "@/components/layout/Layout";
import baseURL, { CareersEndPoint, imageURL } from "@/api/GlobalData";
import { fetchJSON, pickArray } from "@/GlobalHooks/GlobalHooks";
import { useTranslation } from "react-i18next";
import { truncate } from "@/components/website/websiteUtils";
import { useState } from "react";
import { getPageBanners, resolvePageBanner } from "@/lib/pageBanners";

const labels = {
  en: {
    breadcrumb: "Career",
    eyebrow: "Open Roles",
    title: "Career Opportunities",
    empty: "There are no open roles right now.",
    apply: "Apply Now",
    endDate: "End Date",
  },
  ar: {
    breadcrumb: "الوظائف",
    eyebrow: "الوظائف المتاحة",
    title: "فرص العمل",
    empty: "لا توجد وظائف متاحة حاليا.",
    apply: "قدم الآن",
    endDate: "تاريخ الانتهاء",
  },
  tr: {
    breadcrumb: "Kariyer",
    eyebrow: "Acik Roller",
    title: "Kariyer Firsatlari",
    empty: "Su anda acik pozisyon bulunmuyor.",
    apply: "Basvur",
    endDate: "Bitis Tarihi",
  },
};

const localize = (value, lang = "en") => {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  return value[lang] || value.en || value.ar || "";
};

const formatDate = (value, lang) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString(lang === "ar" ? "ar" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function CareerPage({ careers = [], pageBanners = {} }) {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const copy = labels[lang] || labels.en;

  return (
    <Layout
      breadcrumbTitle={copy.breadcrumb}
      image={resolvePageBanner("careers", pageBanners)}
    >
      <section className="news-style-two sec-pad career-page">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
          </div>

          <div className="row clearfix">
            {careers.map((career) => {
              const title = localize(career?.title, lang);
              const description = localize(career?.description, lang);
              const imgSrc = career?.image
                ? `${imageURL}careers/${career.image}`
                : "/assets/images/news/news-1.jpg";
              const isExpired =
                career?.endDate &&
                new Date(career.endDate).getTime() < Date.now();

              return (
                <div
                  key={career?._id}
                  id={`career-${career?._id}`}
                  className="col-lg-4 col-md-6 col-sm-12 news-block my-2"
                >
                  <div className="news-block-one h-100 career-card">
                    <div className="inner-box h-100">
                      <div className="image-box">
                        <figure className="image">
                          <img src={imgSrc} alt={title} />
                        </figure>
                      </div>

                      <div className="lower-box">
                        {career?.endDate && (
                          <div className="career-date">
                            {copy.endDate}: {formatDate(career.endDate, lang)}
                          </div>
                        )}
                        <h3>{title}</h3>

                        <p>
                          {description?.length > 100
                            ? truncate(description, 100)
                            : description}
                        </p>

                        {description?.length > 100 && (
                          <button
                            type="button"
                            className="career-read-more"
                            onClick={() => setSelectedCareer(career)}
                          >
                            {lang === "ar" ? "اقرأ المزيد" : "Read more"}
                          </button>
                        )}

                        {career?.applicationLink && (
                          <div className="link">
                            {!isExpired ? (
                              <a
                                href={career.applicationLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <span>{copy.apply}</span>
                              </a>
                            ) : (
                              <span className="career-expired">
                                {lang === "ar"
                                  ? "انتهى التقديم"
                                  : "Application closed"}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!careers.length && (
            <div className="career-empty">
              <p>{copy.empty}</p>
            </div>
          )}
        </div>
      </section>

      {selectedCareer && (
        <div
          onClick={() => setSelectedCareer(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "80vh",
              overflowY: "auto",
              background: "#fff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 style={{ margin: 0 }}>
                {localize(selectedCareer?.title, lang)}
              </h3>

              <button
                type="button"
                onClick={() => setSelectedCareer(null)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "24px",
                  lineHeight: 1,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <p style={{ margin: 0 }}>
              {localize(selectedCareer?.description, lang)}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const [payload, pageBanners] = await Promise.all([
      fetchJSON(`${baseURL}${CareersEndPoint}`),
      getPageBanners(),
    ]);

    return {
      props: {
        careers: pickArray(payload),
        pageBanners,
      },
      revalidate: 300,
    };
  } catch (error) {
    console.error("Failed to fetch careers", error);

    return {
      props: {
        careers: [],
        pageBanners: {},
      },
      revalidate: 60,
    };
  }
}
