import { useTranslation } from "react-i18next";
import { pickLocalized } from "@/api/serverData";

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="jadwa-testimonials-head company-section-head">
      <div className="jadwa-pill">
        <span className="jadwa-pill-dot" />
        <span>{eyebrow}</span>
      </div>
    </div>
  );
}

export default function CompanyOverviewSection({ company }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  const profileHtml =
    pickLocalized(company.content, lang) ||
    pickLocalized(company.introduction?.title, lang) ||
    "";

  const overviewHtml =
    pickLocalized(company.about, lang) ||
    pickLocalized(company.content, lang) ||
    "";

  const services = Array.isArray(company.services) ? company.services : [];
  const values = Array.isArray(company.values) ? company.values : [];

  return (
    <div className="company-overview-wrap">
      <SectionHeading
        eyebrow={t("overview") === "overview" ? "Overview" : t("overview")}
        title={
          t("companyProfile") === "companyProfile"
            ? "Company Profile"
            : t("companyProfile")
        }
        description={stripHtml(overviewHtml || profileHtml)}
      />

      <div className="company-content-panel company-content-panel-lg">
        {profileHtml ? (
          <div
            className="company-richtext"
            dangerouslySetInnerHTML={{ __html: profileHtml }}
          />
        ) : (
          <p>
            {t("noData") === "noData"
              ? "No additional details are available yet."
              : t("noData")}
          </p>
        )}
      </div>

      {(services.length > 0 || values.length > 0) && (
        <div className="company-content-block">
          <div className="row clearfix">
            {!!services.length && (
              <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
                <div className="company-feature-card company-feature-card-dark">
                  <div className="company-feature-card-head">
                    <div className="jadwa-pill company-feature-pill company-feature-pill-dark">
                      <span className="jadwa-pill-dot" />
                      <span>{t("Services")}</span>
                    </div>
                  </div>

                  <div className="company-feature-list">
                    {services.map((service, index) => (
                      <div
                        key={`${pickLocalized(service, lang)}-${index}`}
                        className="company-feature-item"
                      >
                        <span className="company-feature-item-dot" />
                        <span>{pickLocalized(service, lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!!values.length && (
              <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
                <div className="company-feature-card company-feature-card-light">
                  <div className="company-feature-card-head">
                    <div className="jadwa-pill company-feature-pill company-feature-pill-light">
                      <span className="jadwa-pill-dot" />
                      <span>{t("values.title")}</span>
                    </div>
                  </div>

                  <div className="company-feature-list">
                    {values.map((value, index) => (
                      <div
                        key={`${pickLocalized(value, lang)}-${index}`}
                        className="company-feature-item"
                      >
                        <span className="company-feature-item-dot" />
                        <span>{pickLocalized(value, lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
