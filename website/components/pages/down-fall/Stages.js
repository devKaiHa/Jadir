import { useTranslation } from "react-i18next";
import { useState } from "react";
import { landing } from "@/StaticData/landing";

const ServicesStages = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const stages = landing.stages.serviceStages;

  const [selectedStage, setSelectedStage] = useState(data?.[0] || stages[0]);

  return (
    <section className="about-style-two sec-pad">
      <div
        className="pattern-layer"
        style={{ backgroundImage: "url(assets/images/shape/shape-13.png)" }}
      />
      <div className="auto-container">
        <div className="sec-title">
          <span className="sub-title">{landing.stages.title[lang]}</span>
          <h2>{landing.stages.subTitle[lang]}</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-4 col-md-12 col-sm-12 inner-column">
            <div
              className="inner-box inner-before"
              style={{ width: "26em", paddingRight: "1.8em" }}
            >
              <div className="experience-box">
                <h2
                  style={{
                    fontSize: "94px",
                    position: "relative",
                    color: "#daaa81",
                  }}
                >
                  {data?.length}
                </h2>
                <h5 style={{ color: "#b3530054" }}>
                  {lang === "en" && "Service Stages"}
                  {lang === "ar" && "مراحل الخدمة"}
                  {lang === "tr" && "Hizmet Aşamaları"}
                </h5>
              </div>
              <ul className="list-item clearfix">
                {data?.map((stage) => (
                  <li
                    key={stage.title?.[lang]}
                    onClick={() => setSelectedStage(stage)}
                    style={{
                      cursor: "pointer",
                      background:
                        selectedStage?.title?.[lang] === stage.title?.[lang]
                          ? "#f0f0f0"
                          : "transparent",
                      borderRadius: "6px",
                      marginBottom: "10px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <h4 style={{ marginLeft: "0.3em" }}>
                      {stage?.title?.[lang]}
                    </h4>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-8 col-md-12 col-sm-12 content-column">
            <div
              className="content-box stages-content-box"
              style={{ marginLeft: "3em" }}
            >
              <h3>{selectedStage?.title?.[lang]}</h3>
              <div className="text-box">
                {selectedStage?.steps.map((step, index) => (
                  <div key={index} style={{ marginBottom: "30px" }}>
                    <h4
                      style={{
                        color: "#daaa81",
                        marginBottom: "10px",
                        fontSize: "1.2em",
                      }}
                    >
                      {step.title?.[lang]}
                    </h4>
                    <p style={{ lineHeight: "1.8" }}>
                      {step.description?.[lang]}
                    </p>
                    {index < selectedStage?.steps.length - 1 && (
                      <hr style={{ margin: "20px 0", opacity: "0.2" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesStages;
