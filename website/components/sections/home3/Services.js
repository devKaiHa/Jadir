"use client";

import { truncate } from "@/components/website/websiteUtils";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Services({ services }) {
  const { t, i18n } = useTranslation();

  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  if (!services?.length) return null;

  return (
    <section
      className={`jadwa-services-section ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="auto-container">
        <div className="statistics-head">
          <span className="statistics-subtitle">{t("services.title")}</span>
          <h2 className="jadwa-services-title">{t("services.subtitle")}</h2>
        </div>

        <div className="jadwa-services-list">
          {services.map((service, index) => {
            const href = `/Services/${service?.slug || service?._id}`;
            const title = service?.title?.[lang] || service?.title?.en || "";
            const description =
              service?.description?.[lang] || service?.description?.en || "";

            return (
              <article
                key={service?._id || index}
                className="jadwa-service-row"
              >
                <span className="jadwa-service-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="jadwa-service-content">
                  <h3>{title}</h3>
                  <p>{truncate(description, 150)}</p>
                </div>

                <span className="jadwa-service-arrow">
                  <Link
                    href={href}
                    className="jadwa-service-arrow"
                    aria-label={`Open ${title}`}
                  >
                    <i
                      className={`fa-solid ${
                        isRtl ? "fa-arrow-left" : "fa-arrow-right"
                      }`}
                    />
                  </Link>
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
