import Layout from "@/components/layout/Layout";
import baseURL from "@/api/GlobalData";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { localize, stripHtml } from "@/components/website/websiteUtils";
import { getPageBanners, resolvePageBanner } from "@/lib/pageBanners";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const labels = {
  en: {
    breadcrumb: "Career Details",
    back: "Back to careers",
    overview: "Role Overview",
    requirements: "Requirements",
    responsibilities: "Responsibilities",
    benefits: "Benefits",
    endDate: "End Date",
    department: "Department",
    location: "Location",
    type: "Type",
    openRole: "Open role",
    closed: "Application closed",
    notSpecified: "Not specified",
    externalApply: "Apply on external site",
  },
  ar: {
    breadcrumb: "تفاصيل الوظيفة",
    back: "العودة إلى الوظائف",
    overview: "نظرة عامة",
    requirements: "المتطلبات",
    responsibilities: "المسؤوليات",
    benefits: "المزايا",
    endDate: "تاريخ الانتهاء",
    department: "القسم",
    location: "الموقع",
    type: "النوع",
    openRole: "متاحة",
    closed: "انتهى التقديم",
    notSpecified: "غير محدد",
    externalApply: "التقديم عبر موقع خارجي",
  },
  tr: {
    breadcrumb: "Kariyer Detayı",
    back: "Kariyerlere dön",
    overview: "Rol Özeti",
    requirements: "Gereksinimler",
    responsibilities: "Sorumluluklar",
    benefits: "Avantajlar",
    endDate: "Bitiş Tarihi",
    department: "Departman",
    location: "Konum",
    type: "Tür",
    openRole: "Açık pozisyon",
    closed: "Başvuru kapandı",
    notSpecified: "Belirtilmedi",
    externalApply: "Harici sitede başvur",
  },
};

const formatDate = (value, lang) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString(lang === "ar" ? "ar" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const normalizeList = (value, lang) => {
  const localized = localize(value, lang);

  if (Array.isArray(localized)) return localized.filter(Boolean);
  if (Array.isArray(value)) return value.filter(Boolean);

  if (typeof localized === "string" && localized.trim()) {
    return localized
      .split(/\n|â€¢|-/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

// const InfoItem = ({ icon, label, value }) => {
//   if (!value) return null;

//   return (
//     <div className="career-modal-info-item">
//       <span className="career-modal-info-icon">
//         <i className={icon} />
//       </span>

//       <div>
//         <small>{label}</small>
//         <strong>{value}</strong>
//       </div>
//     </div>
//   );
// };

const ListSection = ({ title, items = [] }) => {
  if (!items.length) return null;

  return (
    <div className="career-modal-section">
      <h4>{title}</h4>

      <ul className="career-modal-list">
        {items.map((item, index) => (
          <li key={`${title}-${index}`}>{stripHtml(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default function CareerDetailsPage({ career, pageBanners = {} }) {
  const [toastMessage, setToastMessage] = useState("");
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";
  const copy = labels[lang] || labels.en;

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timer = setTimeout(() => setToastMessage(""), 4500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const title = localize(career?.title, lang);
  // const position = localize(career?.position, lang) || title;
  const description = localize(career?.description, lang);
  // const department =
  //   localize(career?.department || career?.category || career?.type, lang) ||
  //   copy.notSpecified;
  // const location =
  //   localize(career?.location, lang) || career?.location || copy.notSpecified;
  // const type =
  //   localize(career?.jobType || career?.workType, lang) || copy.notSpecified;
  const requirements = normalizeList(
    career?.requirements || career?.qualifications,
    lang,
  );
  const responsibilities = normalizeList(
    career?.responsibilities || career?.tasks,
    lang,
  );
  const benefits = normalizeList(career?.benefits, lang);
  const isExpired =
    career?.endDate && new Date(career.endDate).getTime() < Date.now();

  return (
    <Layout
      breadcrumbTitle={title || copy.breadcrumb}
      image={resolvePageBanner("careers", pageBanners)}
    >
      <section
        className={`career-portal-page career-details-page sec-pad ${
          isRtl ? "rtl" : "ltr"
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="auto-container">
          <Link href="/career" className="career-details-back">
            <i
              className={`fas ${isRtl ? "fa-arrow-right" : "fa-arrow-left"}`}
            />
            {copy.back}
          </Link>

          <article className="career-details-shell">
            <div className="career-modal-head career-details-head">
              <div className="career-modal-status-row">
                <span
                  className={`career-modal-status ${
                    isExpired ? "closed" : "open"
                  }`}
                >
                  {isExpired ? copy.closed : copy.openRole}
                </span>

                {career?.endDate ? (
                  <span className="career-modal-date">
                    <i className="fa-regular fa-calendar" />
                    {copy.endDate}: {formatDate(career.endDate, lang)}
                  </span>
                ) : null}
              </div>

              <h2>{title}</h2>

              {/* {description ? (
                <p className="career-modal-summary">{stripHtml(description)}</p>
              ) : null} */}
            </div>

            {/* <div className="career-modal-info-grid career-details-info-grid">
              <InfoItem
                icon="fa-solid fa-briefcase"
                label={copy.department}
                value={department}
              />
              <InfoItem
                icon="fa-solid fa-location-dot"
                label={copy.location}
                value={location}
              />
              <InfoItem
                icon="fa-solid fa-layer-group"
                label={copy.type}
                value={type}
              />
            </div> */}

            <div className="career-details-body">
              {description ? (
                <div className="career-modal-section">
                  <h4>{copy.overview}</h4>
                  <div
                    className="career-modal-rich-text"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              ) : null}

              <ListSection
                title={copy.responsibilities}
                items={responsibilities}
              />
              <ListSection title={copy.requirements} items={requirements} />
              <ListSection title={copy.benefits} items={benefits} />
            </div>
          </article>

          {!isExpired && career?.applicationForm?.fields?.length ? (
            <CareerApplicationForm
              career={career}
              lang={lang}
              onSuccess={setToastMessage}
            />
          ) : null}

          {!isExpired && career?.applicationLink ? (
            <div className="career-application-panel">
              <a
                href={career.applicationLink}
                target="_blank"
                rel="noreferrer"
                className="career-modal-apply"
              >
                {copy.externalApply}
              </a>
            </div>
          ) : null}
        </div>
      </section>

      {toastMessage ? (
        <div
          className={`career-application-toast ${isRtl ? "rtl" : "ltr"}`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <i className="fa-solid fa-check" />
          <span>{toastMessage}</span>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setToastMessage("")}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      ) : null}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const [payload, pageBanners] = await Promise.all([
      fetchJSON(`${baseURL}careers/${params.slug}`),
      getPageBanners(),
    ]);

    const career = payload?.data || null;

    if (!career) {
      return { notFound: true };
    }

    return {
      props: {
        career,
        pageBanners,
      },
    };
  } catch (error) {
    console.error("Failed to fetch career details", error);
    return { notFound: true };
  }
}
