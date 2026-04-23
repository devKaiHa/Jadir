import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { imageURL } from "@/api/GlobalData";

const FundAssociatedCompanies = ({ fund }) => {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const getText = (field) =>
    field?.[lang] || field?.en || field?.ar || field?.tr || "";

  const companies = Array.isArray(fund?.companiesAssociated)
    ? fund.companiesAssociated
    : Array.isArray(fund?.benefits)
    ? fund.benefits
    : [];

  const title =
    getText(fund?.benefitsTitle) ||
    (t("associated_companies") === "associated_companies"
      ? "Associated Companies"
      : t("associated_companies"));

  if (!companies.length) return null;

  return (
    <section
      className={`fund-associated-section sec-pad ${isRtl ? "rtl" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="auto-container">
        <div className="jadwa-testimonials-head fund-associated-head">
          <div className="jadwa-pill">
            <span className="jadwa-pill-dot" />
            <span>
              {t("partnerships") === "partnerships"
                ? "Partnerships"
                : t("partnerships")}
            </span>
          </div>

          <h2 className="jadwa-testimonials-title">{title}</h2>

          <p className="jadwa-testimonials-subtitle">
            {t("fundAssociatedDescription")}
          </p>
        </div>

        <div className="row clearfix">
          {companies.map((item, index) => {
            const companyName = getText(item?.name);
            const companyLogo = item?.logo
              ? `${imageURL}companies/${item.logo}`
              : null;

            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 mb-4"
                key={item?._id || index}
              >
                <article
                  className="fund-associated-card"
                  onClick={() =>
                    item?.slug && router.push(`/company-details/${item.slug}`)
                  }
                >
                  <span className="fund-associated-count">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="fund-associated-logo-wrap">
                    {companyLogo ? (
                      <img
                        src={companyLogo}
                        alt={companyName}
                        className="fund-associated-logo"
                      />
                    ) : (
                      <div className="fund-associated-fallback">
                        {companyName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  <h3 className="fund-associated-name">{companyName}</h3>

                  <div className="fund-associated-link">
                    <span>
                      {t("see_more") === "see_more"
                        ? "View company"
                        : t("see_more")}
                    </span>
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FundAssociatedCompanies;
