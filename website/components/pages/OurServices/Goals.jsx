import React from "react";
import { useTranslation } from "react-i18next";

const Goals = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!data?.length) return null;

  return (
    <section className="" style={{ marginTop: "200px", background: "#fff" }}>
      <div className="auto-container">
        <div className="sec-title centred light">
          <span className="sub-title">
            {lang === "ar"
              ? "عناصر إضافية"
              : lang === "tr"
                ? "Ek Basliklar"
                : "Additional Highlights"}
          </span>
          <h2 style={{ color: "#0b6166" }}>
            {lang === "ar"
              ? "ما يميز خدماتنا"
              : lang === "tr"
                ? "Hizmetlerimizi one cikaranlar"
                : "What Shapes Our Services"}
          </h2>
        </div>
        <div className="row clearfix">
          {data.map((item, index) => (
            <div
              key={item?._id || index}
              className="col-lg-4 col-md-6 col-sm-12 service-block"
            >
              <div className="service-block-one h-100">
                <div className="inner-box h-100">
                  <div className="icon-box">
                    <span className="count-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{item?.title?.[lang] || item?.title?.en}</h3>
                  <p>
                    {item?.description?.[lang] ||
                      item?.description?.en ||
                      item?.highlight?.[lang] ||
                      item?.highlight?.en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goals;
