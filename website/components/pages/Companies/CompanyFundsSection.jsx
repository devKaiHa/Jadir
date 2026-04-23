import Link from "next/link";
import { useTranslation } from "react-i18next";
import { pickLocalized } from "@/api/serverData";

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

export default function CompanyFundsSection({ company }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  const fundsAssociated = Array.isArray(company.fundsAssociated)
    ? company.fundsAssociated
    : [];

  if (!fundsAssociated.length) return null;

  return (
    <div className="company-content-block">
      <SectionHeading
        eyebrow={
          t("relatedFunds") === "relatedFunds"
            ? "Associated Funds"
            : t("relatedFunds")
        }
        title={
          t("relatedFunds") === "relatedFunds"
            ? "Associated Funds"
            : t("relatedFunds")
        }
        description={
          lang === "ar"
            ? "الصناديق المرتبطة بهذه الشركة ضمن المنظومة الاستثمارية."
            : lang === "tr"
            ? "Bu şirketle ilişkili yatırım fonları."
            : "Investment funds associated with this company."
        }
      />

      <div className="company-funds-grid">
        {fundsAssociated.map((fund, index) => (
          <article
            key={fund?._id || fund?.slug || index}
            className="company-fund-feature-card"
          >
            <span className="company-fund-feature-count">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="company-fund-feature-title">
              {pickLocalized(fund?.title, lang) || "-"}
            </h3>

            {pickLocalized(fund?.subtitle, lang) ? (
              <p className="company-fund-feature-text">
                {pickLocalized(fund?.subtitle, lang)}
              </p>
            ) : null}

            <Link
              href={fund?.slug ? `/fund-details/${fund.slug}` : "/funds"}
              className="company-inline-link"
            >
              {t("learnFunds") === "learnFunds"
                ? "Explore fund"
                : t("learnFunds")}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
