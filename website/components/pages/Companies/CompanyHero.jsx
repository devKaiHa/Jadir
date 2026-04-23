import { useTranslation } from "react-i18next";
import { imageURL } from "@/api/GlobalData";
import { pickLocalized } from "@/api/serverData";
import countries from "@/lib/countries.json";

function getCountryName(code, lang) {
  if (!code) return "";
  const country = countries.find((item) => item.code === code);
  if (!country) return code;
  return lang === "ar" ? country.name_ar : country.name_en;
}

function normalizeHref(url = "") {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default function CompanyHero({ company }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const companyName =
    pickLocalized(company.companyName, lang) ||
    pickLocalized(company.name, lang) ||
    "Company";

  const overview =
    pickLocalized(company.about, lang) ||
    pickLocalized(company.content, lang) ||
    "";

  const experienceField = pickLocalized(company.ExperienceField, lang);
  const websiteHref = normalizeHref(company.website);
  const countryName = getCountryName(company.country, lang);

  const statistics = Array.isArray(company.statistics)
    ? company.statistics
    : [];

  return (
    <section
      className={`company-hero-section ${isRtl ? "rtl" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="company-hero-card">
        <div className="company-hero-media">
          <img
            src={
              company.background
                ? `${imageURL}companies/${company.background}`
                : "/assets/images/companies.jpg"
            }
            alt={companyName}
            className="company-hero-image"
          />
          <div className="company-hero-overlay" />
        </div>

        <div className="auto-container">
          <div className="company-hero-content">
            <div className="company-hero-main-grid">
              <div className="company-hero-info-box">
                <div className="company-hero-top">
                  <div className="company-hero-brand">
                    {company.logo ? (
                      <div className="company-hero-logo-shell">
                        <img
                          src={`${imageURL}companies/${company.logo}`}
                          alt={companyName}
                        />
                      </div>
                    ) : null}

                    <div className="company-hero-copy">
                      <h1 className="company-hero-title">{companyName}</h1>

                      {experienceField ? (
                        <p className="company-hero-subtitle">
                          {experienceField}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="company-hero-actions-wrap">
                    <div className="company-hero-action-split">
                      <div className="company-hero-action-group company-hero-action-group-main">
                        {websiteHref ? (
                          <a
                            href={websiteHref}
                            target="_blank"
                            rel="noreferrer"
                            className="company-hero-action-btn company-hero-action-btn-primary"
                          >
                            <i className="fa-solid fa-globe" />
                            <span>
                              {t("openWebsite") === "openWebsite"
                                ? "Visit website"
                                : t("openWebsite")}
                            </span>
                          </a>
                        ) : null}

                        {company.email ? (
                          <a
                            href={`mailto:${company.email}`}
                            className="company-hero-action-btn company-hero-action-btn-secondary"
                          >
                            <i className="fa-regular fa-envelope" />
                            <span>
                              {t("emailCompany") === "emailCompany"
                                ? "Email company"
                                : t("emailCompany")}
                            </span>
                          </a>
                        ) : null}
                      </div>

                      <div className="company-hero-action-group company-hero-action-group-side">
                        {countryName ? (
                          <div className="company-hero-action-meta">
                            <span className="company-hero-action-meta-label">
                              {t("country") === "country"
                                ? "Country"
                                : t("country")}
                            </span>
                            <strong className="company-hero-action-meta-value">
                              {countryName}
                            </strong>
                          </div>
                        ) : null}

                        {!!Object.entries(company.social_links || {}).filter(
                          ([, value]) => Boolean(value)
                        ).length && (
                          <div className="company-hero-socials">
                            {Object.entries(company.social_links || {})
                              .filter(([, value]) => Boolean(value))
                              .map(([key, value]) => {
                                const iconMap = {
                                  facebook: "fa-brands fa-facebook-f",
                                  instagram: "fa-brands fa-instagram",
                                  linkedin: "fa-brands fa-linkedin-in",
                                  xTwitter: "fa-brands fa-x-twitter",
                                };

                                return (
                                  <a
                                    key={key}
                                    href={value}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="company-hero-social-link"
                                    aria-label={key}
                                  >
                                    <i
                                      className={
                                        iconMap[key] ||
                                        "fa-solid fa-share-nodes"
                                      }
                                    />
                                  </a>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {overview ? (
                  <div
                    className="company-hero-overview"
                    dangerouslySetInnerHTML={{ __html: overview }}
                  />
                ) : null}
              </div>

              {!!statistics.length && (
                <div className="company-hero-stats-box">
                  <div className="company-hero-stats-grid">
                    {statistics.map((stat, index) => (
                      <div
                        key={stat?._id || `${stat?.value}-${index}`}
                        className="company-hero-stat-card"
                      >
                        <strong className="company-hero-stat-value">
                          {stat?.value || "-"}
                        </strong>

                        <h4 className="company-hero-stat-title">
                          {pickLocalized(stat?.title, lang) || "-"}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
