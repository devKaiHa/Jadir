import NewsSlider from "@/components/slider/NewsSlider";
import { useTranslation } from "react-i18next";

export default function News({ news }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  return (
    <>
      {/* news-style-two */}
      <section className="news-style-two sec-pad">
        <div className="auto-container">
          <div className="jadwa-testimonials-head jadwa-blog-head">
            <div className="jadwa-pill">
              <span className="jadwa-pill-dot" />
              <span>
                {currentLang === "ar"
                  ? "المدونة"
                  : currentLang === "tr"
                    ? "Blog"
                    : "Insights"}
              </span>
            </div>

            <h2 className="jadwa-testimonials-title">
              {currentLang === "ar"
                ? "أفكار ورؤى من جدير"
                : currentLang === "tr"
                  ? "Jadir’dan içgörüler ve fikirler"
                  : "Insights and perspectives from Jadir"}
            </h2>

            <p className="jadwa-testimonials-subtitle">
              {currentLang === "ar"
                ? "تابع آخر المقالات والتحليلات والتحديثات المرتبطة بالاستثمار والقطاعات والفرص."
                : currentLang === "tr"
                  ? "Yatırım, sektörler ve fırsatlarla ilgili en son yazıları, analizleri ve güncellemeleri keşfedin."
                  : "Explore the latest articles, analysis, and updates around investments, sectors, and opportunities."}
            </p>
          </div>
          <NewsSlider news={news} />
        </div>
      </section>
    </>
  );
}
