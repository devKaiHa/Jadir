import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const Services = ({ data }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <section className="service-style-two sec-pad">
      <div className="pattern-layer" />
      <div className="auto-container">
        <div className="sec-title centred light">
          <span className="sub-title">{t("Services")}</span>
          <h2>{t("Jadwa_most_important_services")}</h2>
        </div>
        <div className="inner-container">
          <div className="row clearfix">
            {data?.map((service, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-12 service-block mx-auto"
                >
                  <div className="service-block-one">
                    <div className="inner-box">
                      <div className="icon-box">
                        <span className="count-text">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3>
                        <a
                          href=""
                          onClick={(e) => e.preventDefault()}
                          style={{ cursor: "default" }}
                        >
                          {service?.title?.[lang] || service?.title?.en}
                        </a>
                      </h3>
                      <div className="link">
                        <Link
                          href=""
                          onClick={(e) => e.preventDefault()}
                          className="pe-4"
                          style={{ cursor: "default" }}
                        >
                          {lang === "ar"
                            ? "تفاصيل  الخدمة"
                            : lang === "tr"
                              ? "Hizmeti Detayları"
                              : "Service Details"}
                        </Link>
                      </div>
                      <p>
                        {service?.description?.[lang] ||
                          service?.description?.en ||
                          ""}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
