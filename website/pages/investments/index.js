import Link from "next/link";
import { useTranslation } from "react-i18next";

import { imageURL } from "@/api/GlobalData";
import { getOtherData } from "@/api/getOtherData";
import { pickLocalized } from "@/api/serverData";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";

const PAGE_COPY = {
  en: {
    title: "Investments",
    subtitle: "Investment opportunities",
    description:
      "Explore our investment ecosystem through funds, companies, and featured projects.",
    sections: {
      funds: {
        label: "Investment funds",
        title: "Funds built for structured growth",
        description:
          "Review our available funds, their sector focus, and the investment profile behind each opportunity.",
        cta: "View all funds",
        empty: "No funds are available right now.",
      },
      companies: {
        label: "Companies",
        title: "Companies within our portfolio",
        description:
          "Discover the companies we support and the industries they operate in.",
        cta: "View all companies",
        empty: "No companies are available right now.",
      },
      projects: {
        label: "Projects",
        title: "Projects with real market presence",
        description:
          "Browse selected projects and open the published project links when available.",
        cta: "View all projects",
        empty: "No projects are available right now.",
      },
    },
  },
  tr: {
    title: "Yatirimlar",
    subtitle: "Yatirim firsatlari",
    description:
      "Fonlar, sirketler ve one cikan projeler araciligiyla yatirim ekosistemimizi kesfedin.",
    sections: {
      funds: {
        label: "Yatirim fonlari",
        title: "Yapilandirilmis buyume icin fonlar",
        description:
          "Mevcut fonlari, sektor odaklarini ve her firsatin yatirim profilini inceleyin.",
        cta: "Tum fonlari gor",
        empty: "Su anda kullanilabilir fon bulunmuyor.",
      },
      companies: {
        label: "Sirketler",
        title: "Portfoyumuzdeki sirketler",
        description:
          "Destekledigimiz sirketleri ve faaliyet gosterdikleri sektorleri kesfedin.",
        cta: "Tum sirketleri gor",
        empty: "Su anda kullanilabilir sirket bulunmuyor.",
      },
      projects: {
        label: "Projeler",
        title: "Piyasada yer alan projeler",
        description:
          "Secili projeleri inceleyin ve varsa yayinlanmis proje baglantilarini acin.",
        cta: "Tum projeleri gor",
        empty: "Su anda kullanilabilir proje bulunmuyor.",
      },
    },
  },
  ar: {
    title: "الاستثمارات",
    subtitle: "فرص استثمارية",
    description:
      "استكشف منظومة الاستثمار لدينا من خلال الصناديق والشركات والمشاريع المميزة.",
    sections: {
      funds: {
        label: "الصناديق الاستثمارية",
        title: "صناديق مصممة للنمو المنظم",
        description:
          "اطلع على الصناديق المتاحة وتركيزها القطاعي وملف كل فرصة استثمارية.",
        cta: "عرض كل الصناديق",
        empty: "لا توجد صناديق متاحة حالياً.",
      },
      companies: {
        label: "الشركات",
        title: "شركات ضمن محفظتنا",
        description: "تعرّف على الشركات التي ندعمها والقطاعات التي تعمل فيها.",
        cta: "عرض كل الشركات",
        empty: "لا توجد شركات متاحة حالياً.",
      },
      projects: {
        label: "المشاريع",
        title: "مشاريع ذات حضور في السوق",
        description:
          "تصفح المشاريع المختارة وافتح روابط المشاريع المنشورة عند توفرها.",
        cta: "عرض كل المشاريع",
        empty: "لا توجد مشاريع متاحة حالياً.",
      },
    },
  },
};

const SECTION_CONFIG = [
  {
    key: "funds",
    href: "/funds",
    limit: 3,
    getTitle: (item, lang) =>
      pickLocalized(item?.title, lang) || "Untitled fund",
    getText: (item, lang) =>
      stripHtml(
        pickLocalized(item?.description, lang) ||
          pickLocalized(item?.subtitle, lang),
      ),
    getImage: (item) =>
      item?.image
        ? `${imageURL}investmentFunds/${item.image}`
        : "/assets/images/funds.jpg",
  },
  {
    key: "companies",
    href: "/companies",
    limit: 3,
    getTitle: (item, lang) =>
      pickLocalized(item?.companyName, lang) || "Untitled company",
    getText: (item, lang) =>
      stripHtml(
        pickLocalized(item?.about, lang) ||
          pickLocalized(item?.ExperienceField, lang) ||
          pickLocalized(item?.content, lang),
      ),
    getImage: (item) =>
      item?.background
        ? `${imageURL}companies/${item.background}`
        : "/assets/images/companies.jpg",
  },
  {
    key: "projects",
    href: "/projects",
    limit: 3,
    getTitle: (item, lang) =>
      pickLocalized(item?.title, lang) || "Untitled project",
    getText: (item, lang) => stripHtml(pickLocalized(item?.brief, lang)),
    getImage: (item) =>
      item?.image
        ? `${imageURL}projects/${item.image}`
        : "/assets/images/about-banner.jpg",
  },
];

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value = "", maxLength = 140) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

function PreviewCard({ item, title, text, image, href, actionLabel, label }) {
  const router = useRouter();

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="news-block-one h-100">
        <div className="inner-box h-100">
          <div className="image-box">
            <figure className="image">
              <img
                src={image}
                alt={title}
                style={{ height: "240px", objectFit: "cover", width: "100%" }}
              />
            </figure>
          </div>
          <div
            className="lower-box d-flex flex-column"
            style={{ minHeight: "220px" }}
          >
            <h3
              className="cursor-pointer"
              onClick={() => {
                if (label?.toLowerCase() === "companies") {
                  router.push(`/company-details/${item?.slug}`);
                } else if (label?.toLowerCase() === "projects") {
                  window.open(item?.projectLink, "_blank");
                } else if (label?.toLowerCase() === "investment funds") {
                  router.push("/funds");
                }
              }}
            >
              {title} <i className="fa-solid fa-arrow-up-right-from-square" />
            </h3>
            <p className="flex-grow-1">{text}</p>
            <div className="link">
              <Link href={href}>
                <span>{actionLabel}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InvestmentsPage({
  funds = [],
  companies = [],
  projects = [],
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const copy = PAGE_COPY[lang] || PAGE_COPY.en;
  const isArabic = lang === "ar";
  const dataMap = { funds, companies, projects };

  return (
    <Layout
      breadcrumbTitle={copy.title}
      image="/assets/images/about-page-title.jpg"
      sticky
    >
      <section
        className={`about-style-two sec-pad ${isArabic ? "rtl" : ""}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="auto-container">
          <div className="sec-title centred">
            <span className="sub-title">{copy.subtitle}</span>
            <h2>{copy.description}</h2>
          </div>
        </div>
      </section>

      {SECTION_CONFIG.map((section) => {
        const items = (dataMap[section.key] || []).slice(0, section.limit);
        const sectionCopy = copy.sections[section.key];

        return (
          <section
            key={section.key}
            className={`news-style-two sec-pad ${isArabic ? "rtl" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
            style={{
              backgroundColor:
                section.key === "companies" ? "#f7f3ee" : "transparent",
            }}
          >
            <div className="auto-container">
              <div
                className="sec-title"
                style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "space-between",
                  alignItems: "end",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ maxWidth: "760px" }}>
                  <span className="sub-title">{sectionCopy.label}</span>
                  <h2>{sectionCopy.title}</h2>
                  <p style={{ marginTop: "16px", color: "#5f5f5f" }}>
                    {sectionCopy.description}
                  </p>
                </div>
                <div className="btn-box">
                  <Link href={section.href} className="theme-btn btn-one">
                    {sectionCopy.cta}
                  </Link>
                </div>
              </div>

              {items.length ? (
                <div className="row clearfix">
                  {items.map((item, index) => (
                    <PreviewCard
                      item={item}
                      key={item?._id || item?.slug || `${section.key}-${index}`}
                      title={section.getTitle(item, lang)}
                      text={truncate(
                        section.getText(item, lang) || sectionCopy.description,
                      )}
                      image={section.getImage(item)}
                      href={section.href}
                      actionLabel={sectionCopy.cta}
                      label={sectionCopy.label}
                    />
                  ))}
                </div>
              ) : (
                <p style={{ color: "#5f5f5f" }}>{sectionCopy.empty}</p>
              )}
            </div>
          </section>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { funds = [], companies = [], projects = [] } = await getOtherData();

    return {
      props: {
        funds,
        companies,
        projects,
      },
      revalidate: 300,
    };
  } catch (error) {
    console.error("Investments page data error:", error);

    return {
      props: {
        funds: [],
        companies: [],
        projects: [],
      },
      revalidate: 300,
    };
  }
}
