"use client";

import AboutUsSlider from "@/components/slider/AboutUsSlider";
import { useTranslation } from "react-i18next";

export default function About({ aboutUs = [] }) {
  const { i18n, t } = useTranslation();
  const lang = i18n?.language || "en";
  const isRtl = lang === "ar";

  const item = Array.isArray(aboutUs) ? aboutUs[0] || {} : aboutUs || {};

  const pick = (obj) =>
    obj && typeof obj === "object"
      ? obj[lang] ?? obj.en ?? obj.ar ?? obj.tr ?? ""
      : "";

  const content = pick(item?.content);

  const sliderItems = [
    {
      title: item?.message || { en: "Our Mission", ar: "رسالتنا" },
      content: item?.messageDescription || { en: "", ar: "" },
      type: "mission",
    },
    {
      title: item?.vision || { en: "Our Vision", ar: "رؤيتنا" },
      content: item?.visionDescription || { en: "", ar: "" },
      type: "vision",
    },
  ];

  const hasAny =
    content || sliderItems.some((s) => pick(s.title) || pick(s.content));

  if (!hasAny) return null;

  return (
    <section className="jadwa-about-section sec-pad">
      <div className="auto-container">
        <div className={`row clearfix ${isRtl ? "rtl-row" : ""}`}>
          <div className="col-lg-7 col-md-12 col-sm-12 image-column">
            <div className="jadwa-about-media">
              <div className="jadwa-about-glow" />
              <div className="jadwa-about-grid">
                <figure className="jadwa-about-image jadwa-about-image-main">
                  <img src="/assets/images/about-2.jpg" alt="about" />
                </figure>

                <figure className="jadwa-about-image jadwa-about-image-float">
                  <img src="/assets/images/about-1.jpg" alt="about" />
                </figure>

                <div className="jadwa-about-stat-card">
                  <span className="jadwa-about-stat-year">Since 2013</span>
                  <h3>
                    1000<span>+</span>
                  </h3>
                  <p>{t("about.investor")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-12 col-sm-12 content-column">
            <div className="jadwa-about-content">
              <div className="jadwa-section-head">
                <span className="jadwa-section-kicker">
                  {lang === "ar" ? "جدوى اليقين" : "Jadwa Al Yaqeen"}
                </span>

                <h2 className="jadwa-section-title">
                  {lang === "ar" ? "نبذة عن الشركة" : "About the Company"}
                </h2>
                <div className="jadwa-section-line" />
              </div>

              <div className="jadwa-about-text">
                <p dangerouslySetInnerHTML={{ __html: content }} />
              </div>

              <AboutUsSlider slides={sliderItems} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
