import Link from "next/link";
import { useTranslation } from "react-i18next";
import { imageURL } from "@/api/GlobalData";
import { formatNumber } from "@/components/utils/helpers";

const FundHero = ({ fund }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const getText = (field) =>
    field?.[lang] || field?.en || field?.ar || field?.tr || "";

  const label = (key, fallback) => {
    const value = t(key);
    return value === key ? fallback : value;
  };

  const heroImage = fund?.image
    ? `${imageURL}investmentFunds/${fund.image}`
    : "/assets/images/funds.jpg";

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

  const metrics = [
    fund?.assetsVolume
      ? {
          label: label("assets_volume", "Assets Volume"),
          value: `${formatNumber(Number(fund.assetsVolume || 0))} $`,
        }
      : null,
    fund?.irr
      ? {
          label: "IRR",
          value: `${fund.irr} %`,
        }
      : null,
    fund?.minInvestAmount
      ? {
          label: label("min_invest_amount", "Minimum Investment"),
          value: `${formatNumber(Number(fund.minInvestAmount || 0))} $`,
        }
      : null,
    fund?.sharePrice
      ? {
          label: label("share_price", "Share Price"),
          value: `${formatNumber(Number(fund.sharePrice || 0))} $`,
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
  ].filter(Boolean);

  const sectors = Array.isArray(fund?.sectors) ? fund.sectors : [];

  return (
    <section
      className={`fund-hero-section ${isRtl ? "rtl" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="fund-hero-card">
        <div className="auto-container">
          <div className="fund-hero-media">
            <img
              src={heroImage}
              alt={getText(fund?.title) || "Fund"}
              className="fund-hero-image"
            />
            <div className="fund-hero-overlay" />
          </div>

          <div className="fund-hero-content">
            <div className="fund-hero-content-inner">
              <div className="fund-hero-top">
                {getText(fund?.type) ? (
                  <div className="jadwa-pill fund-hero-pill fund-hero-pill-dark">
                    <span className="jadwa-pill-dot" />
                    <span>{getText(fund?.type)}</span>
                  </div>
                ) : null}

                {launchDate ? (
                  <div className="fund-hero-launch">
                    <span>{label("launch_date", "Launch Date")}</span>
                    <strong>{launchDate}</strong>
                  </div>
                ) : null}
              </div>

              <div className="fund-hero-main">
                <div className="fund-hero-copy">
                  <h1 className="fund-hero-title">
                    {getText(fund?.title) || "Untitled Fund"}
                  </h1>

                  {getText(fund?.subtitle) || getText(fund?.shortAbout) ? (
                    <p className="fund-hero-subtitle">
                      {getText(fund?.subtitle) || getText(fund?.shortAbout)}
                    </p>
                  ) : null}

                  {sectors.length ? (
                    <div className="fund-hero-tags">
                      {sectors.map((sector, index) => (
                        <span key={index} className="fund-hero-tag">
                          {getText(sector)}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="fund-hero-actions">
                    {fund?.fundLink ? (
                      <a
                        href={fund.fundLink}
                        target="_blank"
                        rel="noreferrer"
                        className="jadwa-invest-btn"
                      >
                        {label("visit our platform", "Learn More")}
                      </a>
                    ) : null}
                  </div>
                </div>

                {!!metrics.length && (
                  <div className="fund-hero-metrics">
                    {metrics.map((item) => (
                      <div className="fund-hero-metric-card" key={item.label}>
                        <span className="fund-hero-metric-label">
                          {item.label}
                        </span>
                        <strong className="fund-hero-metric-value">
                          {item.value}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundHero;
