"use client";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

export default function Funfact() {
    const { t } = useTranslation();
  
  return (
    // funfact-style-two
    <section className="funfact-style-two" style={{ marginTop: "200px" }}>
      <div className="auto-container">
        <div className="title-box">
          <h6>{t("funfact.title")}</h6>
          <div className="line"></div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-4 col-md-6 col-sm-12 funfact-block">
            <div className="funfact-block-two">
              <div className="inner-box">
                <div className="icon-box">
                  <img
                    src="/assets/images/icons/icon-21.png"
                    alt="Client Assets Icon"
                  />
                </div>
                <div className="count-outer count-box counted">
                  <CountUp
                    end={840}
                    duration={1.5}
                    separator=","
                    className="count-text"
                  />
                  <span className="text">{t("funfact.Billion")}</span>
                </div>
                <p>{t("funfact.Billion_p")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 funfact-block">
            <div className="funfact-block-two">
              <div className="inner-box">
                <div className="icon-box">
                  <img
                    src="/assets/images/icons/icon-22.png"
                    alt="Locations Icon"
                  />
                </div>
                <div className="count-outer count-box counted">
                  <CountUp end={93} duration={1.5} className="count-text" />
                  <span className="text">{t("funfact.Locations")}</span>
                </div>
                <p>{t("funfact.Locations_p")}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 funfact-block">
            <div className="funfact-block-two">
              <div className="inner-box">
                <div className="icon-box">
                  <img
                    src="/assets/images/icons/icon-23.png"
                    alt="Experience Icon"
                  />
                </div>
                <div className="count-outer count-box counted">
                  <CountUp end={40} duration={1.5} className="count-text" />
                  <span className="text">{t("funfact.Years")}</span>
                </div>
                <p>{t("funfact.Years_p")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // funfact-style-two end
  );
}
