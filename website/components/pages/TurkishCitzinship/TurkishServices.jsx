import React from "react";
import { turkishCitizenship } from "@/StaticData/TurkishCitzinShip";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";

const TurkishServices = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const Services = turkishCitizenship?.services;
  return (
    <>
      <section className="working-style-two sec-pad">
        <div className="auto-container">
          <div className="sec-title centred">
            <span className="sub-title">{Services?.section_title[lang]}</span>
            <h2>{Services?.section_subtitle[lang]}</h2>
          </div>
          <div className="inner-container">
            <div
              className="row clearfix"
              style={{ justifyContent: "space-around" }}
            >
              {data?.map((item, idx) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 working-block"
                  key={idx}
                >
                  <div className="working-block-two">
                    <div className="inner-box">
                      <div
                        className="upper-box centred"
                        style={{ borderBottom: "0px", height: "14em" }}
                      >
                        <span className="count-text">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="icon-box">
                          <h1 style={{ paddingTop: "30px", fontSize: "33px" }}>
                            {item?.title?.[lang]}
                          </h1>
                        </div>
                        <p style={{ textAlign: "center" }}>
                          {truncateText(item?.shortDescriptopn?.[lang], 100)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TurkishServices;
