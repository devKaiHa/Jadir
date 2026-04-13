import Link from "next/link";
import { useTranslation } from "react-i18next";

import baseURL, { imageURL } from "@/api/GlobalData";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";
import { normalizeCompany, pickLocalized } from "@/api/serverData";
import Layout from "@/components/layout/Layout";
import countries from "@/lib/countries.json";

const SOCIAL_LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  xTwitter: "X",
};

const FALLBACK_COPY = {
  en: {
    overview: "Overview",
    companyProfile: "Company profile",
    contact: "Contact",
    services: "Services",
    values: "Values",
    mission: "Mission",
    vision: "Vision",
    strategicGoals: "Strategic goals",
    relatedFunds: "Associated funds",
    keyMetrics: "Key metrics",
    offices: "Offices",
    country: "Country",
    phone: "Phone",
    email: "Email",
    website: "Website",
    experience: "Experience",
    expertise: "Expertise",
    socialMedia: "Social media",
    openWebsite: "Visit website",
    emailCompany: "Email company",
    learnFunds: "Explore funds",
    lastUpdated: "Last updated",
    noData: "No additional details are available yet.",
  },
  ar: {
    overview: "نظرة عامة",
    companyProfile: "ملف الشركة",
    contact: "التواصل",
    services: "الخدمات",
    values: "القيم",
    mission: "الرسالة",
    vision: "الرؤية",
    strategicGoals: "الأهداف الاستراتيجية",
    relatedFunds: "الصناديق المرتبطة",
    keyMetrics: "المؤشرات الرئيسية",
    offices: "المكاتب",
    country: "الدولة",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    website: "الموقع الإلكتروني",
    experience: "الخبرة",
    expertise: "مجال الخبرة",
    socialMedia: "وسائل التواصل",
    openWebsite: "زيارة الموقع",
    emailCompany: "مراسلة الشركة",
    learnFunds: "استكشاف الصناديق",
    lastUpdated: "آخر تحديث",
    noData: "لا توجد تفاصيل إضافية متاحة حالياً.",
  },
  tr: {
    overview: "Genel bakis",
    companyProfile: "Sirket profili",
    contact: "Iletisim",
    services: "Hizmetler",
    values: "Degerler",
    mission: "Misyon",
    vision: "Vizyon",
    strategicGoals: "Stratejik hedefler",
    relatedFunds: "Iliskili fonlar",
    keyMetrics: "Temel gostergeler",
    offices: "Ofisler",
    country: "Ulke",
    phone: "Telefon",
    email: "E-posta",
    website: "Web sitesi",
    experience: "Deneyim",
    expertise: "Uzmanlik alani",
    socialMedia: "Sosyal medya",
    openWebsite: "Siteyi ziyaret et",
    emailCompany: "Sirketle iletisime gec",
    learnFunds: "Fonlari incele",
    lastUpdated: "Son guncelleme",
    noData: "Henuz ek ayrinti bulunmuyor.",
  },
};

function getCountryName(code, lang) {
  if (!code) return "";

  const country = countries.find((item) => item.code === code);
  if (!country) return code;

  return lang === "ar" ? country.name_ar : country.name_en;
}

function getLabel(t, key, fallback) {
  const value = t(key);
  return value === key ? fallback : value;
}

function normalizeHref(url = "") {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatUpdatedAt(value, lang) {
  if (!value) return "";

  try {
    return new Date(value).toLocaleDateString(
      lang === "ar" ? "ar" : lang === "tr" ? "tr-TR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  } catch (error) {
    return value;
  }
}

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`sec-title ${centered ? "centred" : ""}`}>
      {eyebrow ? <span className="sub-title">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {description ? (
        <p className="company-detail-section-text">{description}</p>
      ) : null}
    </div>
  );
}

export default function CompanyDetailsPage({ companyData }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const copy = FALLBACK_COPY[lang] || FALLBACK_COPY.en;

  if (!companyData) return null;

  const companyName =
    pickLocalized(companyData.companyName, lang) ||
    pickLocalized(companyData.name, lang) ||
    "Company";
  const overviewHtml =
    pickLocalized(companyData.about, lang) ||
    pickLocalized(companyData.content, lang) ||
    "";
  const profileHtml =
    pickLocalized(companyData.content, lang) ||
    pickLocalized(companyData.introduction?.title, lang) ||
    "";
  const mission = pickLocalized(companyData.mission, lang);
  const vision = pickLocalized(companyData.vision, lang);
  const experienceField = pickLocalized(companyData.ExperienceField, lang);
  const countryName = getCountryName(companyData.country, lang);
  const websiteHref = normalizeHref(companyData.website);
  const updatedAt = formatUpdatedAt(companyData.updatedAt, lang);
  const addresses = Array.isArray(companyData.addresses)
    ? companyData.addresses
    : [];
  const services = Array.isArray(companyData.services)
    ? companyData.services
    : [];
  const values = Array.isArray(companyData.values) ? companyData.values : [];
  const goals = Array.isArray(companyData.goals) ? companyData.goals : [];
  const statistics = Array.isArray(companyData.statistics)
    ? companyData.statistics
    : [];
  const fundsAssociated = Array.isArray(companyData.fundsAssociated)
    ? companyData.fundsAssociated
    : [];
  const socialEntries = Object.entries(companyData.social_links || {}).filter(
    ([, value]) => Boolean(value),
  );

  const infoCards = [
    companyData.Experience
      ? {
          label: copy.experience,
          value: `${companyData.Experience} ${getLabel(t, "years", "Years")}`,
        }
      : null,
    experienceField
      ? {
          label: copy.expertise,
          value: experienceField,
        }
      : null,
    countryName
      ? {
          label: copy.country,
          value: countryName,
        }
      : null,
    updatedAt
      ? {
          label: copy.lastUpdated,
          value: updatedAt,
        }
      : null,
  ].filter(Boolean);

  const contactItems = [
    companyData.phone
      ? {
          label: copy.phone,
          value: companyData.phone,
          href: `tel:${companyData.phone}`,
        }
      : null,
    companyData.email
      ? {
          label: copy.email,
          value: companyData.email,
          href: `mailto:${companyData.email}`,
        }
      : null,
    websiteHref
      ? {
          label: copy.website,
          value: companyData.website,
          href: websiteHref,
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="company-details-page">
      <Layout
        breadcrumbTitle={companyName}
        image={
          companyData.background
            ? `${imageURL}companies/${companyData.background}`
            : "/assets/images/companies.jpg"
        }
        sticky
      >
        <section
          className={`company-profile-hero ${lang === "ar" ? "rtl" : ""}`}
        >
          <div className="auto-container">
            <div className="company-profile-card">
              <div className="company-profile-top">
                <div className="company-brand">
                  {companyData.logo ? (
                    <div className="company-logo-shell">
                      <img
                        src={`${imageURL}companies/${companyData.logo}`}
                        alt={companyName}
                      />
                    </div>
                  ) : null}
                  <div>
                    <span className="company-kicker">
                      {copy.companyProfile}
                    </span>
                    <h1>{companyName}</h1>
                    {experienceField ? (
                      <p className="company-lead">{experienceField}</p>
                    ) : null}
                  </div>
                </div>

                <div className="company-actions">
                  {websiteHref ? (
                    <a
                      href={websiteHref}
                      target="_blank"
                      rel="noreferrer"
                      className="theme-btn btn-one"
                    >
                      {copy.openWebsite}
                    </a>
                  ) : null}
                  {companyData.email ? (
                    <a
                      href={`mailto:${companyData.email}`}
                      className="theme-btn btn-one btn-light-outline"
                    >
                      {copy.emailCompany}
                    </a>
                  ) : null}
                </div>
              </div>

              {overviewHtml ? (
                <div
                  className="company-html company-hero-copy"
                  dangerouslySetInnerHTML={{ __html: overviewHtml }}
                />
              ) : null}

              {infoCards.length ? (
                <div className="company-facts-grid">
                  {infoCards.map((item) => (
                    <div key={item.label} className="company-fact-card">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section
          className={`company-content-section sec-pad ${lang === "ar" ? "rtl" : ""}`}
        >
          <div className="auto-container">
            <div className="row clearfix">
              <div className="col-lg-8 col-md-12 col-sm-12">
                <SectionHeading
                  eyebrow={copy.overview}
                  title={copy.companyProfile}
                  description={stripHtml(overviewHtml || profileHtml)}
                />

                {profileHtml ? (
                  <div
                    className="company-html company-panel"
                    dangerouslySetInnerHTML={{ __html: profileHtml }}
                  />
                ) : (
                  <div className="company-panel">
                    <p>{copy.noData}</p>
                  </div>
                )}

                {statistics.length ? (
                  <div className="company-block">
                    <SectionHeading
                      eyebrow={copy.keyMetrics}
                      title={copy.keyMetrics}
                    />
                    <div className="company-stat-grid">
                      {statistics.map((stat, index) => (
                        <div
                          key={stat?._id || `${stat?.value}-${index}`}
                          className="company-stat-card"
                        >
                          <strong>{stat?.value || "-"}</strong>
                          <h4>{pickLocalized(stat?.title, lang) || "-"}</h4>
                          <p>{pickLocalized(stat?.description, lang)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {services.length ? (
                  <div className="company-block">
                    <SectionHeading
                      eyebrow={copy.services}
                      title={copy.services}
                    />
                    <div className="company-chip-grid">
                      {services.map((service, index) => (
                        <span
                          key={`${pickLocalized(service, lang)}-${index}`}
                          className="company-chip"
                        >
                          {pickLocalized(service, lang)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {values.length ? (
                  <div className="company-block">
                    <SectionHeading eyebrow={copy.values} title={copy.values} />
                    <div className="company-chip-grid">
                      {values.map((value, index) => (
                        <span
                          key={`${pickLocalized(value, lang)}-${index}`}
                          className="company-chip company-chip-soft"
                        >
                          {pickLocalized(value, lang)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {mission || vision ? (
                  <div className="company-block">
                    <div className="row clearfix">
                      {mission ? (
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="company-quote-card">
                            <span className="sub-title">{copy.mission}</span>
                            <p>{mission}</p>
                          </div>
                        </div>
                      ) : null}
                      {vision ? (
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="company-quote-card company-quote-card-accent">
                            <span className="sub-title">{copy.vision}</span>
                            <p>{vision}</p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {goals.length ? (
                  <div className="company-block">
                    <SectionHeading
                      eyebrow={copy.strategicGoals}
                      title={copy.strategicGoals}
                    />
                    <div className="company-goals-list">
                      {goals.map((goal, index) => (
                        <div
                          key={`${pickLocalized(goal, lang)}-${index}`}
                          className="company-goal-item"
                        >
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <p>{pickLocalized(goal, lang)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {fundsAssociated.length ? (
                  <div className="company-block">
                    <SectionHeading
                      eyebrow={copy.relatedFunds}
                      title={copy.relatedFunds}
                    />
                    <div className="company-fund-grid">
                      {fundsAssociated.map((fund, index) => (
                        <div
                          key={fund?._id || fund?.slug || index}
                          className="company-fund-card"
                        >
                          <h4>{pickLocalized(fund?.title, lang) || "-"}</h4>
                          <Link href="/funds" className="company-inline-link">
                            {copy.learnFunds}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="company-sidebar-stack">
                  {contactItems.length ? (
                    <div className="company-panel">
                      <h3>{copy.contact}</h3>
                      <ul className="company-contact-list">
                        {contactItems.map((item) => (
                          <li key={item.label}>
                            <span>{item.label}</span>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.value}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {addresses.length ? (
                    <div className="company-panel">
                      <h3>{copy.offices}</h3>
                      <ul className="company-address-list">
                        {addresses.map((address, index) => (
                          <li key={`${pickLocalized(address, lang)}-${index}`}>
                            {pickLocalized(address, lang)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {socialEntries.length ? (
                    <div className="company-panel">
                      <h3>{copy.socialMedia}</h3>
                      <div className="company-social-list">
                        {socialEntries.map(([key, value]) => (
                          <a
                            key={key}
                            href={value}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {SOCIAL_LABELS[key] || key}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <style jsx global>{`
          .company-profile-hero {
            position: relative;
            padding: 90px 0 0;
          }

          .company-profile-backdrop {
            position: absolute;
            inset: 0 0 auto;
            height: 420px;
            overflow: hidden;
          }

          .company-profile-backdrop::after {
            content: "";
            position: absolute;
            inset: 0;
            background:
              linear-gradient(
                135deg,
                rgba(14, 24, 37, 0.78),
                rgba(180, 137, 90, 0.44)
              ),
              linear-gradient(
                180deg,
                rgba(14, 24, 37, 0.15),
                rgba(14, 24, 37, 0.72)
              );
          }

          .company-profile-backdrop img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .company-profile-card {
            position: relative;
            z-index: 1;
            background: linear-gradient(180deg, #ffffff 0%, #fbf8f4 100%);
            border-radius: 32px;
            padding: 42px;
            box-shadow: 0 24px 60px rgba(18, 26, 36, 0.12);
            border: 1px solid rgba(197, 161, 122, 0.2);
          }

          .company-profile-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 28px;
            flex-wrap: wrap;
          }

          .company-brand {
            display: flex;
            align-items: center;
            gap: 22px;
          }

          .company-logo-shell {
            width: 108px;
            height: 108px;
            border-radius: 26px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 18px 40px rgba(18, 26, 36, 0.1);
            padding: 18px;
            flex-shrink: 0;
          }

          .company-logo-shell img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }

          .company-kicker {
            display: inline-block;
            font-size: 12px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #b4895a;
            margin-bottom: 10px;
          }

          .company-profile-card h1 {
            font-size: 42px;
            line-height: 1.1;
            margin-bottom: 10px;
            color: #16202c;
          }

          .company-lead {
            margin: 0;
            font-size: 18px;
            color: #4e5d6c;
          }

          .company-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }

          .btn-light-outline {
            background: transparent !important;
            color: #16202c !important;
            border: 1px solid rgba(22, 32, 44, 0.16);
          }

          .company-hero-copy {
            font-size: 17px;
            line-height: 1.9;
            color: #314354;
          }

          .company-html p:last-child {
            margin-bottom: 0;
          }

          .company-facts-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 16px;
            margin-top: 30px;
          }

          .company-fact-card {
            background: #fff;
            border: 1px solid rgba(180, 137, 90, 0.18);
            border-radius: 20px;
            padding: 18px 20px;
          }

          .company-fact-card span {
            display: block;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #7f8a95;
            margin-bottom: 8px;
          }

          .company-fact-card strong {
            color: #16202c;
            font-size: 17px;
            line-height: 1.5;
          }

          .company-content-section {
            background:
              radial-gradient(
                circle at top right,
                rgba(208, 181, 145, 0.12),
                transparent 28%
              ),
              #f7f4ef;
          }

          .company-detail-section-text {
            margin-top: 16px;
            color: #596775;
            max-width: 780px;
          }

          .company-panel {
            background: #fff;
            border-radius: 26px;
            padding: 28px;
            box-shadow: 0 16px 40px rgba(19, 29, 40, 0.08);
            border: 1px solid rgba(180, 137, 90, 0.12);
          }

          .company-panel h3 {
            font-size: 24px;
            margin-bottom: 22px;
          }

          .company-block {
            margin-top: 42px;
          }

          .company-stat-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .company-stat-card {
            background: linear-gradient(180deg, #fff 0%, #f8f2ea 100%);
            border-radius: 24px;
            padding: 24px;
            border: 1px solid rgba(180, 137, 90, 0.14);
          }

          .company-stat-card strong {
            display: block;
            font-size: 34px;
            line-height: 1;
            color: #b4895a;
            margin-bottom: 14px;
          }

          .company-stat-card h4 {
            margin-bottom: 10px;
            font-size: 20px;
          }

          .company-stat-card p {
            margin: 0;
            color: #5f6d7a;
          }

          .company-chip-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .company-chip {
            display: inline-flex;
            align-items: center;
            min-height: 46px;
            padding: 10px 16px;
            border-radius: 999px;
            background: #16202c;
            color: #fff;
            font-weight: 500;
          }

          .company-chip-soft {
            background: rgba(180, 137, 90, 0.12);
            color: #6d4d28;
          }

          .company-quote-card {
            height: 100%;
            background: #fff;
            border-radius: 24px;
            padding: 28px;
            border: 1px solid rgba(22, 32, 44, 0.08);
            box-shadow: 0 16px 40px rgba(19, 29, 40, 0.08);
          }

          .company-quote-card-accent {
            background: linear-gradient(180deg, #1d2835 0%, #2a3948 100%);
            color: #fff;
          }

          .company-quote-card .sub-title {
            display: inline-block;
            margin-bottom: 18px;
          }

          .company-quote-card p {
            margin: 0;
            font-size: 18px;
            line-height: 1.85;
          }

          .company-goals-list {
            display: grid;
            gap: 14px;
          }

          .company-goal-item {
            display: grid;
            grid-template-columns: 68px 1fr;
            gap: 18px;
            align-items: start;
            background: #fff;
            border-radius: 22px;
            padding: 20px 22px;
            border: 1px solid rgba(180, 137, 90, 0.12);
          }

          .company-goal-item span {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: #16202c;
            color: #fff;
            font-weight: 700;
          }

          .company-goal-item p {
            margin: 0;
            padding-top: 8px;
            color: #394959;
          }

          .company-fund-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .company-fund-card {
            background: #fff;
            border-radius: 22px;
            padding: 22px;
            border: 1px solid rgba(180, 137, 90, 0.12);
          }

          .company-fund-card h4 {
            margin-bottom: 14px;
            font-size: 20px;
          }

          .company-inline-link {
            color: #b4895a;
            font-weight: 600;
          }

          .company-sidebar-stack {
            display: grid;
            gap: 22px;
          }

          .company-contact-list,
          .company-address-list {
            display: grid;
            gap: 16px;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .company-contact-list li {
            display: grid;
            gap: 4px;
          }

          .company-contact-list span {
            color: #7f8a95;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .company-contact-list a,
          .company-address-list li {
            color: #233140;
            overflow-wrap: anywhere;
          }

          .company-social-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .company-social-list a {
            display: inline-flex;
            align-items: center;
            padding: 10px 14px;
            border-radius: 999px;
            background: rgba(22, 32, 44, 0.06);
            color: #16202c;
            font-weight: 500;
          }

          .company-details-page .rtl,
          .company-details-page .rtl * {
            direction: rtl;
          }

          @media (max-width: 991px) {
            .company-profile-card {
              padding: 28px;
            }

            .company-facts-grid,
            .company-stat-grid,
            .company-fund-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 767px) {
            .company-profile-hero {
              padding-top: 70px;
            }

            .company-profile-backdrop {
              height: 360px;
            }

            .company-brand {
              flex-direction: column;
              align-items: flex-start;
            }

            .company-profile-card h1 {
              font-size: 32px;
            }

            .company-goal-item {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Layout>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const payload = await fetchJSON(`${baseURL}companies/public`);
    const companies = Array.isArray(payload?.data) ? payload.data : [];

    return {
      paths: companies
        .filter((company) => company?.slug)
        .map((company) => ({
          params: { slug: company.slug },
        })),
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const payload = await fetchJSON(
      `${baseURL}companies/public/slug/${params.slug}`,
    );

    return {
      props: {
        companyData: normalizeCompany(payload?.data || null),
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
