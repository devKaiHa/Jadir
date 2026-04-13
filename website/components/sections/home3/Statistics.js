import { useTranslation } from "react-i18next";

export default function Statistics({ statistics = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  if (!statistics.length) return null;

  const sectionTitle =
    lang === "ar" ? "إحصاءات" : lang === "tr" ? "İstatistikler" : "Statistics";

  const sectionHeading =
    lang === "ar"
      ? "نظرة سريعة على بيانات الشركة"
      : lang === "tr"
      ? "Şirket verilerine hızlı bakış"
      : "A Quick Look At Company Data";

  return (
    <section
      className={`statistics-section ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="auto-container statistics-container">
        {/* <div className="statistics-title centred">
          <span className="statistics-subtitle">{sectionTitle}</span>
          <h2 className="statistics-heading">{sectionHeading}</h2>
        </div> */}

        <div className="row clearfix">
          {statistics.slice(0, 3).map((item) => (
            <div
              key={item?._id}
              className="col-lg-4 col-md-6 col-sm-12 statistics-col"
            >
              <div className="statistics-card">
                <div className="statistics-card-content">
                  <h2 className="statistics-number">
                    <span className="statistics-value">{item?.value}</span>
                    <span className="statistics-suffix">
                      {item?.suffix?.[lang] || item?.suffix?.en}
                    </span>
                  </h2>

                  <h3 className="statistics-card-title">
                    {item?.title?.[lang] || item?.title?.en}
                  </h3>

                  <div
                    className="statistics-description"
                    dangerouslySetInnerHTML={{
                      __html:
                        item?.description?.[lang] ||
                        item?.description?.en ||
                        "",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
