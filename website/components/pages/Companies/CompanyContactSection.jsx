import { useTranslation } from "react-i18next";
import { pickLocalized } from "@/api/serverData";

function normalizeHref(url = "") {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="jadwa-testimonials-head company-section-head">
      <div className="jadwa-pill">
        <span className="jadwa-pill-dot" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="jadwa-testimonials-title">{title}</h2>
      {description ? (
        <p className="jadwa-testimonials-subtitle">{description}</p>
      ) : null}
    </div>
  );
}

export default function CompanyContactSection({ company }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  const addresses = Array.isArray(company.addresses) ? company.addresses : [];
  const websiteHref = normalizeHref(company.website);

  const contactItems = [
    company.phone
      ? {
          label: t("phone") === "phone" ? "Phone" : t("phone"),
          value: company.phone,
          href: `tel:${company.phone}`,
        }
      : null,
    company.email
      ? {
          label: t("email") === "email" ? "Email" : t("email"),
          value: company.email,
          href: `mailto:${company.email}`,
        }
      : null,
    websiteHref
      ? {
          label: t("website") === "website" ? "Website" : t("website"),
          value: company.website,
          href: websiteHref,
        }
      : null,
  ].filter(Boolean);

  if (!contactItems.length && !addresses.length) return null;

  return (
    <div className="company-content-block company-contact-bottom-block">
      <SectionHeading
        eyebrow={t("contactUs")}
        title={t("contactOffices")}
        description={t("contactOfficesDescription")}
      />

      <div className="row clearfix">
        {!!contactItems.length && (
          <div className="col-lg-5 col-md-12 col-sm-12 mb-4">
            <div className="company-contact-panel">
              <h3 className="company-contact-panel-title">{t("contactUs")}</h3>

              <ul className="company-contact-list">
                {contactItems.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!!addresses.length && (
          <div className="col-lg-7 col-md-12 col-sm-12 mb-4">
            <div className="company-contact-panel">
              <h3 className="company-contact-panel-title">{t("offices")}</h3>

              <div className="company-offices-grid">
                {addresses.map((address, index) => (
                  <div
                    key={`${pickLocalized(address, lang)}-${index}`}
                    className="company-office-card"
                  >
                    <span className="company-office-count">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{pickLocalized(address, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
