import NewsSlider from "@/components/slider/NewsSlider";
import { useTranslation } from "react-i18next";

export default function News({ news }) {
  const { i18n, t } = useTranslation();

  return (
    <>
      {/* news-style-two */}
      <section className="news-style-two sec-pad">
        <div className="auto-container">
          <div className="jadwa-testimonials-head jadwa-blog-head">
            <div className="jadwa-pill">
              <span className="jadwa-pill-dot" />
              <span>{t("blog.Blogs")}</span>
            </div>

            <h2 className="jadwa-testimonials-title">{t("jadirInsights")}</h2>

            <p className="jadwa-testimonials-subtitle">
              {t("exploreLatestArticles")}
            </p>
          </div>
          <NewsSlider news={news} />
        </div>
      </section>
    </>
  );
}
