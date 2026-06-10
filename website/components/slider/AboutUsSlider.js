"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";

export default function AboutUsSlider({ slides = [] }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const pick = (obj) =>
    obj && typeof obj === "object"
      ? (obj[lang] ?? obj.en ?? obj.ar ?? obj.tr ?? "")
      : "";

  if (!slides.length) return null;

  return (
    <div className={`jadwa-about-slider-wrap ${isRtl ? "is-rtl" : "is-ltr"}`}>
      <Swiper
        key={lang}
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={slides.length > 1}
        pagination={false}
        dir={isRtl ? "rtl" : "ltr"}
        className="jadwa-about-slider no-about-pagination"
      >
        {slides.map((slide, idx) => {
          const isVision = slide?.type === "vision";

          return (
            <SwiperSlide className="slide" key={`${lang}-${idx}`}>
              <div className="jadwa-about-slide-card">
                <div className="jadwa-about-slide-bg-icon">
                  <i
                    className={
                      isVision ? "fa-solid fa-eye" : "fa-solid fa-bullseye"
                    }
                  />
                </div>

                <div className="jadwa-about-slide-top">
                  <div className="d-flex align-items-center">
                    <div className="jadwa-about-slide-icon">
                      <i
                        className={
                          isVision
                            ? "fa-solid fa-binoculars"
                            : "fa-solid fa-chart-line"
                        }
                      />
                    </div>
                    <h3 className="h-auto mx-2 mb-0">
                      {t(`our_${slide?.type}`)}
                    </h3>
                  </div>
                  <span className="jadwa-about-slide-count">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3>{pick(slide?.title)}</h3>

                <div className="jadwa-about-slide-text">
                  {pick(slide?.content)}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
