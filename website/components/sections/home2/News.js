import NewsSlider from "@/components/slider/NewsSlider";
import { useTranslation } from "react-i18next";

export default function News({ news }) {
  const { t } = useTranslation();
  return (
    <>
      {/* news-style-two */}
      <section className="news-style-two sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">{t("newsRoom.title")}</span>
            <h2>{t("newsRoom.subtitle")}</h2>
          </div>
          <NewsSlider news={news} />
        </div>
      </section>
    </>
  );
}
