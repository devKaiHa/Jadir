import { useTranslation } from "react-i18next";
import { formatNumber } from "@/components/utils/helpers";

const FundOverviewSection = ({ fund }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const getText = (field) =>
    field?.[lang] || field?.en || field?.ar || field?.tr || "";

  const label = (key, fallback) => {
    const value = t(key);
    return value === key ? fallback : value;
  };

  const launchDate = fund?.launchDate
    ? new Date(fund.launchDate).toLocaleDateString(
        lang === "ar" ? "ar" : lang === "tr" ? "tr-TR" : "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )
    : "";

  const infoItems = [
    launchDate
      ? {
          label: label("launch_date", "Launch Date"),
          value: launchDate,
        }
      : null,
    fund?.fundDuration
      ? {
          label: label("fund_duration", "Fund Duration"),
          value: `${fund.fundDuration} ${
            lang === "ar" ? "سنوات" : lang === "tr" ? "Yıl" : "Years"
          }`,
        }
      : null,
    fund?.assetsVolume
      ? {
          label: label("assets_volume", "Assets Volume"),
          value: formatNumber(Number(fund.assetsVolume || 0)),
        }
      : null,
    fund?.sharePrice
      ? {
          label: label("share_price", "Share Price"),
          value: formatNumber(Number(fund.sharePrice || 0)),
        }
      : null,
    fund?.minInvestAmount
      ? {
          label: label("min_invest_amount", "Minimum Investment"),
          value: formatNumber(Number(fund.minInvestAmount || 0)),
        }
      : null,
    fund?.irr
      ? {
          label: "IRR",
          value: `${fund.irr}%`,
        }
      : null,
  ].filter(Boolean);

  const sectors = Array.isArray(fund?.sectors) ? fund.sectors : [];
  const targetingSectors = Array.isArray(fund?.targetingSectors)
    ? fund.targetingSectors
    : [];

  return (
    <section
      className={`fund-overview-section sec-pad ${isRtl ? "rtl" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="auto-container">
        <div className="jadwa-testimonials-head fund-overview-head">
          <div className="jadwa-pill">
            <span className="jadwa-pill-dot" />
            <span>{label("overview", "Overview")}</span>
          </div>

          <h2 className="jadwa-testimonials-title">
            {label("Company_Overview", "Fund Overview")}
          </h2>

          <p className="jadwa-testimonials-subtitle">
            {getText(fund?.shortAbout) || getText(fund?.subtitle)}
          </p>
        </div>

        <div className="row clearfix">
          <div className="col-lg-7 col-md-12 col-sm-12 mb-4">
            <div className="fund-overview-card fund-overview-description-card">
              <h3 className="fund-overview-card-title">
                {label("description", "Description")}
              </h3>

              <div
                className="fund-overview-richtext"
                dangerouslySetInnerHTML={{
                  __html: getText(fund?.description) || getText(fund?.content),
                }}
              />
            </div>
          </div>

          <div className="col-lg-5 col-md-12 col-sm-12 mb-4">
            <div className="fund-overview-card fund-overview-meta-card">
              <h3 className="fund-overview-card-title">
                {label("fund_details", "Fund Details")}
              </h3>

              <div className="fund-overview-meta-list">
                {infoItems.map((item) => (
                  <div className="fund-overview-meta-item" key={item.label}>
                    <span className="fund-overview-meta-label">
                      {item.label}
                    </span>
                    <strong className="fund-overview-meta-value">
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!!sectors.length && (
            <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="fund-overview-card">
                <h3 className="fund-overview-card-title">
                  {label("sectors", "Sectors")}
                </h3>

                <div className="fund-overview-tags">
                  {sectors.map((item, index) => (
                    <span className="fund-overview-tag" key={index}>
                      {getText(item)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!!targetingSectors.length && (
            <div className="col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="fund-overview-card">
                <h3 className="fund-overview-card-title">
                  {label("targeting_sectors", "Targeting Sectors")}
                </h3>

                <div className="fund-overview-tags">
                  {targetingSectors.map((item, index) => (
                    <span className="fund-overview-tag" key={index}>
                      {getText(item)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FundOverviewSection;
