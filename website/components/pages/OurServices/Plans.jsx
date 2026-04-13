"use client";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";

const Plans = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!data?.length) return null;

  return (
    <section className="working-style-two sec-pad">
      <div className="auto-container">
        <div className="sec-title centred">
          <span className="sub-title" style={{ color: "#e9b083" }}>
            {lang === "ar" ? "الخطط" : lang === "tr" ? "Planlar" : "Plans"}
          </span>
          <h2>
            {lang === "ar"
              ? "خطط الشركة الحالية"
              : lang === "tr"
                ? "Sirketin guncel planlari"
                : "Current Company Plans"}
          </h2>
        </div>
        <div className="inner-container">
          <div className="row clearfix">
            {data?.map((item, idx) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 working-block"
                key={idx}
              >
                <div className="working-block-two">
                  <div className="inner-box">
                    <div className="upper-box centred">
                      <span className="count-text">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="icon-box">
                        <h1>{item.title[lang]}</h1>
                      </div>
                      <p style={{ textAlign: "center" }}>
                        {truncateText(
                          item?.description?.[lang] || item?.description?.en,
                          100,
                        )}
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
  );
};

export default Plans;
