"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";

export default function AboutUsSlider({ slides = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  if (!slides.length) return null;

  return (
    <div className={`jadwa-about-slider-wrap ${isRtl ? "is-rtl" : "is-ltr"}`}>
      <Swiper
        key={lang}
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={slides.length > 1}
        pagination={{ clickable: true }}
        dir={isRtl ? "rtl" : "ltr"}
        className="jadwa-about-slider"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide className="slide" key={`${lang}-${idx}`}>
            <div className="jadwa-about-slide-card">
              <div className="jadwa-about-slide-top">
                <div className="jadwa-about-slide-icon">
                  <i
                    className={
                      slide?.type === "vision"
                        ? "flaticon-target"
                        : "flaticon-pie-chart"
                    }
                  />
                </div>

                <span className="jadwa-about-slide-count">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <h3>{slide?.title?.[lang] || ""}</h3>

              <div
                className="jadwa-about-slide-text"
                dangerouslySetInnerHTML={{
                  __html: slide?.content?.[lang] || "",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
