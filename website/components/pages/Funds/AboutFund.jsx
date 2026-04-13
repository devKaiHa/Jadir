import { formatNumber } from "@/components/utils/helpers";
import { useTranslation } from "react-i18next";

const AboutFund = ({ fund }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const label = (key, fallback) => {
    const value = t(key);
    return value === key ? fallback : value;
  };
  const launchDate = fund?.launchDate
    ? new Date(fund.launchDate).toLocaleDateString(
        lang === "ar" ? "ar" : "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      )
    : "";
  const metadataItems = [
    fund?.launchDate
      ? {
          label: label("launch_date", "Launch Date"),
          value: launchDate,
        }
      : null,
    fund?.fundDuration
      ? {
          label: label("fund_duration", "Fund Duration"),
          value: `${fund.fundDuration}`,
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

  return (
    <>
      <section className="about-style-two sec-pad">
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(assets/images/shape/shape-13.png)" }}
        />
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">
              {fund?.title?.[lang] || "No title"}
            </span>
            <h2>{fund?.subtitle?.[lang] || fund?.subtitle?.en || " "}</h2>
          </div>
          <div className="row clearfix">
            {/* Sectors + Investment Volume */}
            <div className="col-lg-6 col-md-12 col-sm-12 inner-column">
              <div className="inner-box">
                <div
                  className="experience-box"
                  style={{
                    height: "130px",
                    padding: "0px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "94px",
                      position: "relative",
                      color: "#daaa81",
                    }}
                  >
                    {formatNumber(Number(fund?.investmentVolume || 0))}
                  </h2>
                </div>
                <ul className="list-item clearfix">
                  {fund?.sectors?.map((item, index) => (
                    <li key={index}>{item?.[lang] || item?.en || item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Description */}
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <h3>{t("Company_Overview")}</h3>
                <div className="text-box">
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        fund?.description?.[lang] || fund?.description?.en,
                    }}
                  ></p>
                </div>
                {metadataItems.length ? (
                  <div className="text-box">
                    {metadataItems.map((item) => (
                      <p key={item.label} style={{ marginBottom: "8px" }}>
                        <strong>{item.label}: </strong>
                        {item.value}
                      </p>
                    ))}
                  </div>
                ) : null}
                {fund?.fundLink ? (
                  <div className="btn-box">
                    <a
                      href={fund.fundLink}
                      target="_blank"
                      rel="noreferrer"
                      className="theme-btn btn-one"
                    >
                      {label("see_more", "Learn More")}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutFund;
