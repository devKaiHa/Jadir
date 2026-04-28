"use client";

import AboutUsSlider from "@/components/slider/AboutUsSlider";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function About({ aboutUs = [], ishomePage = false }) {
  const { i18n } = useTranslation();
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
      title: item?.message || {
        en: "Our Mission",
        ar: "رسالتنا",
        tr: "Misyonumuz",
      },
      content: item?.messageDescription || { en: "", ar: "", tr: "" },
      type: "mission",
    },
    {
      title: item?.vision || {
        en: "Our Vision",
        ar: "رؤيتنا",
        tr: "Vizyonumuz",
      },
      content: item?.visionDescription || { en: "", ar: "", tr: "" },
      type: "vision",
    },
  ];

  const hasAny =
    content || sliderItems.some((s) => pick(s.title) || pick(s.content));

  if (!hasAny) return null;

  return (
    <section className="jadwa-about-section sec-pad">
      <div className="jadwa-about-bg" />

      <div className="auto-container">
        <div className={`jadwa-about-shell ${isRtl ? "rtl-row" : ""}`}>
          <div className="jadwa-about-content">
            <span className="jadwa-about-kicker">
              {lang === "ar"
                ? "من نحن"
                : lang === "tr"
                ? "Hakkımızda"
                : "Who we are"}
            </span>

            <h2 className="jadwa-section-title">
              {lang === "ar"
                ? "نبذة عن الشركة"
                : lang === "tr"
                ? "Şirket Hakkında"
                : "About us"}
            </h2>

            <div className="jadwa-section-line" />

            <div className="jadwa-about-text">
              <p>{content}</p>
            </div>

            {ishomePage && (
              <div className="jadwa-about-actions">
                <Link href="/about" className="jadwa-invest-btn">
                  {lang === "ar"
                    ? "اعرف المزيد"
                    : lang === "tr"
                    ? "Daha Fazla"
                    : "Learn More"}
                </Link>
              </div>
            )}
          </div>

          <div className="jadwa-about-slider-column">
            <AboutUsSlider slides={sliderItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
