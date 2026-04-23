"use client";

import { truncate } from "@/components/website/websiteUtils";
import { useTranslation } from "react-i18next";

export default function Services({ services }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  if (!services?.length) return null;

  return (
    <>
      <section className="chooseus-style-three">
        <div className="auto-container">
          <div className="sec-title centred">
            <span className="sub-title">{t("services.title")}</span>
            <h2>{t("services.subtitle")}</h2>
          </div>

          <div className="row clearfix">
            {services?.map((service, index) => {
              return (
                <div
                  key={service?._id}
                  className="col-lg-4 col-md-6 col-sm-12 chooseus-block"
                >
                  <div
                    className={`chooseus-block-three wow fadeIn animated`}
                    data-wow-delay={`${index * 100}ms`}
                    data-wow-duration="1500ms"
                  >
                    <div className="inner-box">
                      <span className="count-text">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{service?.title?.[lang] || service?.title?.en}</h3>
                      <p>
                        {truncate(
                          service?.description?.[lang] ||
                            service?.description?.en,
                          100,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
