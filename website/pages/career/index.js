import Layout from "@/components/layout/Layout";
import baseURL, { CareersEndPoint, imageURL } from "@/api/GlobalData";
import { fetchJSON, pickArray } from "@/GlobalHooks/GlobalHooks";
import { useTranslation } from "react-i18next";
import { truncate } from "@/components/website/websiteUtils";
import { useMemo, useState } from "react";
import { getPageBanners, resolvePageBanner } from "@/lib/pageBanners";
import { CareerModal } from "./CareerModal";

const labels = {
  en: {
    breadcrumb: "Career",
    eyebrow: "Open Roles",
    title: "Career Opportunities",
    subtitle:
      "Explore current openings and join a team focused on disciplined growth, investment insight, and long-term value.",
    empty: "There are no open roles right now.",
    apply: "Apply Now",
    endDate: "End Date",
    readMore: "Read more",
    closed: "Application closed",
    active: "Open role",
    expired: "Closed",
    totalRoles: "Total roles",
    openRoles: "Open roles",
    departments: "Departments",
    roleType: "Opportunity",
    location: "Location",
    remote: "Office / Hybrid",
  },
  ar: {
    breadcrumb: "الوظائف",
    eyebrow: "الوظائف المتاحة",
    title: "فرص العمل",
    subtitle:
      "استعرض الفرص الوظيفية الحالية وانضم إلى فريق يعمل برؤية واضحة ونمو منضبط وقيمة طويلة المدى.",
    empty: "لا توجد وظائف متاحة حاليا.",
    apply: "قدم الآن",
    endDate: "تاريخ الانتهاء",
    readMore: "اقرأ المزيد",
    closed: "انتهى التقديم",
    active: "متاحة",
    expired: "مغلقة",
    totalRoles: "إجمالي الوظائف",
    openRoles: "وظائف متاحة",
    departments: "الأقسام",
    roleType: "فرصة وظيفية",
    location: "الموقع",
    remote: "مكتبي / هجين",
  },
  tr: {
    breadcrumb: "Kariyer",
    eyebrow: "Açık Roller",
    title: "Kariyer Fırsatları",
    subtitle:
      "Mevcut açık pozisyonları keşfedin; disiplinli büyüme, yatırım içgörüsü ve uzun vadeli değer odaklı bir ekibe katılın.",
    empty: "Şu anda açık pozisyon bulunmuyor.",
    apply: "Başvur",
    endDate: "Bitiş Tarihi",
    readMore: "Devamını oku",
    closed: "Başvuru kapandı",
    active: "Açık rol",
    expired: "Kapalı",
    totalRoles: "Toplam rol",
    openRoles: "Açık rol",
    departments: "Departmanlar",
    roleType: "Fırsat",
    location: "Konum",
    remote: "Ofis / Hibrit",
  },
};

const localize = (value, lang = "en") => {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  return value[lang] || value.en || value.ar || value.tr || "";
};

const formatDate = (value, lang) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString(lang === "ar" ? "ar" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function CareerPage({ careers = [], pageBanners = {} }) {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";
  const copy = labels[lang] || labels.en;

  const stats = useMemo(() => {
    const open = careers.filter((career) => {
      if (!career?.endDate) return true;
      return new Date(career.endDate).getTime() >= Date.now();
    });

    const departments = new Set(
      careers
        .map((career) =>
          localize(career?.department || career?.category || career?.type, lang)
        )
        .filter(Boolean)
    );

    return {
      total: careers.length,
      open: open.length,
      departments: departments.size || Math.min(careers.length, 1),
    };
  }, [careers, lang]);

  return (
    <Layout
      breadcrumbTitle={copy.breadcrumb}
      image={resolvePageBanner("careers", pageBanners)}
    >
      <section
        className={`career-portal-page sec-pad ${isRtl ? "rtl" : "ltr"}`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="auto-container">
          <div className="career-portal-hero">
            <div className="career-portal-hero-copy">
              <div className="career-portal-eyebrow">
                <span />
                {copy.eyebrow}
              </div>

              <h2>{copy.title}</h2>
              <p>{copy.subtitle}</p>
            </div>

            <div className="career-portal-stats">
              <div className="career-portal-stat">
                <strong>{String(stats.total).padStart(2, "0")}</strong>
                <span>{copy.totalRoles}</span>
              </div>

              <div className="career-portal-stat is-blue">
                <strong>{String(stats.open).padStart(2, "0")}</strong>
                <span>{copy.openRoles}</span>
              </div>

              <div className="career-portal-stat">
                <strong>{String(stats.departments).padStart(2, "0")}</strong>
                <span>{copy.departments}</span>
              </div>
            </div>
          </div>

          {careers.length ? (
            <div className="career-portal-board">
              <div className="career-portal-board-head">
                <div>
                  <span>{copy.eyebrow}</span>
                  <h3>{copy.title}</h3>
                </div>

                <div className="career-portal-board-count">
                  {stats.open} / {stats.total}
                </div>
              </div>

              <div className="career-portal-list">
                {careers.map((career, index) => {
                  const title = localize(career?.title, lang);
                  const rawDescription = localize(career?.description, lang);
                  const description = stripHtml(rawDescription);
                  const imgSrc = career?.image
                    ? `${imageURL}careers/${career.image}`
                    : "/assets/images/news/news-1.jpg";

                  const isExpired =
                    career?.endDate &&
                    new Date(career.endDate).getTime() < Date.now();

                  const department =
                    localize(
                      career?.department || career?.category || career?.type,
                      lang
                    ) || copy.roleType;

                  const location =
                    localize(career?.location, lang) ||
                    career?.location ||
                    copy.remote;

                  return (
                    <article
                      key={career?._id || index}
                      id={`career-${career?._id}`}
                      className={`career-portal-card ${
                        isExpired ? "is-expired" : ""
                      }`}
                    >
                      <div className="career-portal-card-index">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="career-portal-card-image-wrap">
                        <img
                          src={imgSrc}
                          alt={title}
                          className="career-portal-card-image"
                        />
                      </div>

                      <div className="career-portal-card-main">
                        <div className="career-portal-card-top">
                          <span
                            className={`career-portal-status ${
                              isExpired ? "closed" : "open"
                            }`}
                          >
                            {isExpired ? copy.expired : copy.active}
                          </span>

                          {career?.endDate ? (
                            <span className="career-portal-date">
                              <i className="fa-regular fa-calendar" />
                              {copy.endDate}: {formatDate(career.endDate, lang)}
                            </span>
                          ) : null}
                        </div>

                        <h3 className="career-portal-card-title">{title}</h3>

                        <div className="career-portal-meta">
                          <span>
                            <i className="fa-solid fa-briefcase" />
                            {department}
                          </span>

                          <span>
                            <i className="fa-solid fa-location-dot" />
                            {location}
                          </span>
                        </div>

                        <p className="career-portal-description">
                          {description?.length > 150
                            ? truncate(description, 150)
                            : description}
                        </p>
                      </div>

                      <div className="career-portal-card-actions">
                        {description?.length > 150 ? (
                          <button
                            type="button"
                            className="career-portal-secondary-btn"
                            onClick={() => setSelectedCareer(career)}
                          >
                            {copy.readMore}
                          </button>
                        ) : null}

                        {career?.applicationLink ? (
                          !isExpired ? (
                            <a
                              href={career.applicationLink}
                              target="_blank"
                              rel="noreferrer"
                              className="career-portal-apply-btn"
                            >
                              <span>{copy.apply}</span>
                              <i
                                className={`fa-solid ${
                                  isRtl ? "fa-arrow-left" : "fa-arrow-right"
                                }`}
                              />
                            </a>
                          ) : (
                            <span className="career-portal-closed-btn">
                              {copy.closed}
                            </span>
                          )
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="career-portal-empty">
              <div className="career-portal-empty-icon">
                <i className="fa-solid fa-briefcase" />
              </div>
              <h3>{copy.empty}</h3>
              <p>
                {lang === "ar"
                  ? "تابع الصفحة لاحقاً للاطلاع على الفرص الجديدة."
                  : lang === "tr"
                  ? "Yeni fırsatlar için bu sayfayı daha sonra tekrar kontrol edin."
                  : "Please check back later for new opportunities."}
              </p>
            </div>
          )}
        </div>
      </section>

      <CareerModal
        isOpen={selectedCareer}
        setSelectedCareer={setSelectedCareer}
        selectedCareer={selectedCareer}
        lang={lang}
      />
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
