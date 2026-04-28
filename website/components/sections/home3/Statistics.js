import { useIsMobile } from "@/lib/helpers";
import { useTranslation } from "react-i18next";

const statIcons = [
  "fa-solid fa-chart-line",
  "fa-solid fa-building-columns",
  "fa-solid fa-users",
  "fa-solid fa-briefcase",
  "fa-solid fa-shield-halved",
  "fa-solid fa-arrow-trend-up",
];

export default function Statistics({ statistics = [], isAbout = false }) {
  const isMobile = useIsMobile();
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

  const sectionText =
    lang === "ar"
      ? "أرقام مختصرة تعكس نطاق أعمالنا ونمو خدماتنا وثقة عملائنا."
      : lang === "tr"
      ? "Faaliyet kapsamımızı, hizmet büyümemizi ve müşteri güvenini yansıtan kısa göstergeler."
      : "Key indicators that reflect our business scale, service growth, and client trust.";

  const displayedStats = isAbout ? statistics : statistics.slice(0, 3);

  return (
    <section
      className={`statistics-section ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="statistics-bg-grid" />

      <div className="auto-container statistics-container">
        <div className="statistics-head">
          <span className="statistics-subtitle">{sectionTitle}</span>

          <div className="statistics-head-main">
            <h2 className="statistics-heading">{sectionHeading}</h2>
            <p className="statistics-intro">{sectionText}</p>
          </div>
        </div>

        <div className={`statistics-grid count-${displayedStats.length}`}>
          {displayedStats.map((item, index) => (
            <div key={item?._id || index} className="statistics-card">
              <div className="statistics-card-shine" />

              <div className="statistics-card-top">
                <div className="statistics-icon">
                  <i className={statIcons[index % statIcons.length]} />
                </div>

                <span className="statistics-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className={`statistics-card-content ${
                  isMobile ? "text-center" : ""
                }`}
              >
                <h2
                  className={`statistics-number ${
                    isMobile ? "justify-content-center" : ""
                  }`}
                >
                  <span className="statistics-value">{item?.value}</span>
                  <span className="statistics-suffix">
                    {item?.suffix?.[lang] || item?.suffix?.en}
                  </span>
                </h2>

                <h3 className="statistics-card-title">
                  {item?.title?.[lang] || item?.title?.en}
                </h3>

                {(item?.description?.[lang] || item?.description?.en) && (
                  <div className="statistics-description">
                    {item?.description?.[lang] || item?.description?.en || ""}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
