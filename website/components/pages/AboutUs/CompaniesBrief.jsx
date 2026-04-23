"use client";

import Link from "next/link";
import { imageURL } from "@/api/GlobalData";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { getCountryNameByCode } from "@/lib/helpers";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function CompaniesBrief({ companies = [] }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const visibleCompanies = [...companies]
    .filter(
      (company) => company?.companyName?.en || company?.companyName?.[lang],
    )
    .sort((a, b) => (a?.order || 0) - (b?.order || 0))
    .slice(0, 3);

  if (!visibleCompanies.length) return null;

  const fallbackLabel = (key, defaultValue) => {
    const value = t(key);
    return value === key ? defaultValue : value;
  };

  const getSafeWebsite = (website) => {
    if (!website) return null;
    return /^https?:\/\//i.test(website) ? website : `https://${website}`;
  };

  const renderCompanyCard = (company, index, mobile = false) => {
    const companyName =
      company?.companyName?.[lang] ||
      company?.companyName?.en ||
      company?.aboutus?.[lang] ||
      company?.aboutus?.en ||
      "";

    const companyAbout = company?.about?.[lang] || company?.about?.en || "";

    const experienceField =
      company?.ExperienceField?.[lang] || company?.ExperienceField?.en || "";

    const companyCountry = company?.country
      ? getCountryNameByCode(company.country, lang)
      : "";

    const companyHref = `/company-details/${company?.slug}`;
    const websiteHref = getSafeWebsite(company?.website);

    return (
      <article
        className={`companies-brief-card ${
          mobile ? "companies-brief-card-mobile" : ""
        }`}
      >
        <div className="companies-brief-top-line" />

        <div className="companies-brief-media">
          <div className="companies-brief-media-overlay" />

          {company?.background ? (
            <img
              src={`${imageURL}companies/${company.background}`}
              alt={companyName}
              className="companies-brief-background-image"
            />
          ) : (
            <div className="companies-brief-media-pattern" />
          )}
        </div>

        <div className="companies-brief-logo-wrap">
          {company?.logo ? (
            <img
              src={`${imageURL}companies/${company.logo}`}
              alt={companyName}
              className="companies-brief-logo"
            />
          ) : (
            <div className="companies-brief-fallback-icon">
              {companyName?.charAt(0)}
            </div>
          )}
        </div>

        <div className="companies-brief-content">
          {(experienceField || companyCountry) && (
            <div
              className={`companies-brief-tags ${
                isRtl ? "companies-brief-tags-rtl" : ""
              }`}
            >
              {experienceField ? (
                <span className="companies-brief-primary-tag">
                  {experienceField}
                </span>
              ) : null}

              {companyCountry ? (
                <span className="companies-brief-secondary-tag">
                  {companyCountry}
                </span>
              ) : null}
            </div>
          )}

          <h3 className="companies-brief-company-title">
            <Link href={companyHref}>{companyName}</Link>
          </h3>

          <div
            className="companies-brief-company-text"
            dangerouslySetInnerHTML={{
              __html: truncateText(companyAbout, mobile ? 85 : 110),
            }}
          />

          <div className="companies-brief-footer">
            <Link href={companyHref} className="companies-brief-read-more">
              <span className="companies-brief-read-more-text">
                {fallbackLabel("read_more", "Read more")}
              </span>

              <span className="companies-brief-arrow">
                <i
                  className={`fas ${
                    isRtl ? "fa-arrow-left" : "fa-arrow-right"
                  }`}
                />
              </span>
            </Link>

            {websiteHref ? (
              <a
                href={websiteHref}
                target="_blank"
                rel="noreferrer"
                className="companies-brief-website"
                aria-label={`${companyName} website`}
              >
                <span className="companies-brief-website-icon">
                  <i className="fas fa-globe-americas" />
                </span>
                <span>{fallbackLabel("website", "Website")}</span>
              </a>
            ) : (
              <div
                className="companies-brief-website companies-brief-website-placeholder"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <section className="companies-brief-section">
      <div className="auto-container">
        <div className="jadwa-testimonials-head companies-brief-head">
          <div className="jadwa-pill">
            <span className="jadwa-pill-dot" />
            <span>{fallbackLabel("companies.title", "Companies")}</span>
          </div>

          <h2 className="jadwa-testimonials-title">
            {fallbackLabel(
              "about.ourCompaniesBrief",
              "A Brief Look At Our Companies",
            )}
          </h2>

          <p className="jadwa-testimonials-subtitle">
            {fallbackLabel(
              "companies.description",
              "A curated view of selected companies within our ecosystem.",
            )}
          </p>
        </div>

        {/* Desktop / Tablet Grid */}
        <div className="row clearfix companies-brief-grid">
          {visibleCompanies.map((company, index) => (
            <div
              key={company?._id || company?.slug || index}
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
            >
              {renderCompanyCard(company, index, false)}
            </div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div
          key={`companies-mobile-slider-${lang}`}
          className="companies-brief-mobile-slider"
        >
          <Swiper
            key={`companies-swiper-${lang}-${isRtl ? "rtl" : "ltr"}`}
            modules={[Pagination]}
            spaceBetween={14}
            slidesPerView={1.08}
            pagination={{ clickable: true }}
            dir={isRtl ? "rtl" : "ltr"}
            className="companies-brief-swiper"
          >
            {visibleCompanies.map((company, index) => (
              <SwiperSlide
                key={`${lang}-${company?._id || company?.slug || index}`}
              >
                {renderCompanyCard(company, index, true)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
