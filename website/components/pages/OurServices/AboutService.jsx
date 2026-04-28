import Link from "next/link";
import { useTranslation } from "react-i18next";

const AboutService = ({ data = [], length = 3 }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const displayedServices = data.slice(0, length);

  if (!displayedServices.length) return null;

  return (
    <section
      className={`services-redesign-section ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="services-redesign-bg services-redesign-bg-one" />
      <div className="services-redesign-bg services-redesign-bg-two" />

      <div className="auto-container">
        <div className="services-redesign-header text-center">
          <span className="services-redesign-subtitle">{t("Services")}</span>

          <h2 className="services-redesign-title">
            {t("Jadwa_most_important_services")}
          </h2>

          <p className="services-redesign-text">
            {lang === "ar"
              ? "حلول وخدمات مصممة لدعم النمو، ورفع الكفاءة، وتقديم قيمة حقيقية للعملاء."
              : lang === "tr"
              ? "Büyümeyi desteklemek, verimliliği artırmak ve müşterilere gerçek değer sunmak için tasarlanmış hizmetler."
              : "Purpose-built services designed to support growth, improve efficiency, and deliver real value to clients."}
          </p>
        </div>

        <div className="row g-4">
          {displayedServices.map((service, index) => {
            const href = `/Services/${service?.slug || service?._id}`;
            const title = service?.title?.[lang] || service?.title?.en || "";
            const description =
              service?.description?.[lang] || service?.description?.en || "";

            return (
              <div
                key={service?._id || index}
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
              >
                <article className="services-redesign-card h-100">
                  <div className="services-redesign-card-top">
                    <div className="services-redesign-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="services-redesign-line" />

                    <div className="services-redesign-label">
                      {lang === "ar"
                        ? "خدمة"
                        : lang === "tr"
                        ? "Hizmet"
                        : "Service"}
                    </div>
                  </div>

                  <div className="services-redesign-card-body">
                    <h3 className="services-redesign-card-title">
                      <Link href={href}>{title}</Link>
                    </h3>

                    <p className="services-redesign-card-text">{description}</p>
                  </div>

                  <div className="services-redesign-card-footer">
                    <Link href={href} className="services-redesign-link">
                      <span>
                        {lang === "ar"
                          ? "تفاصيل الخدمة"
                          : lang === "tr"
                          ? "Hizmet Detayları"
                          : "Service Details"}
                      </span>
                      <i
                        className={`services-redesign-arrow ${
                          isRtl ? "rtl-arrow" : ""
                        }`}
                      >
                        →
                      </i>
                    </Link>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutService;
