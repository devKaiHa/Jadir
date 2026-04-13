"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { landing } from "@/StaticData/landing";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  loop: true,
  dir: "ltr",
  breakpoints: {
    320: { slidesPerView: 1 },
    575: { slidesPerView: 1 },
    767: { slidesPerView: 2 },
    991: { slidesPerView: 3 },
  },
};

export default function CompleteServiceSlider({ data }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <Swiper
      {...swiperOptions}
      className="theme_carousel owl-theme"
      style={{ padding: "50px 0 100px 0px" }}
    >
      {data?.map((service, index) => (
        <SwiperSlide key={index} className="slide">
          <div className="chooseus-block-three">
            <div className="inner-box" style={{ height: "26em" }}>
              <span className="count-text">{`0${index + 1}`}</span>
              <h3>{service?.title?.[lang]}</h3>
              <p
                style={{
                  direction: lang === "ar" ? "rtl" : "ltr",
                  unicodeBidi: lang === "ar" ? "plaintext" : "normal",
                }}
              >
                {lang === "ar"
                  ? service?.description?.[lang].endsWith(".")
                    ? service?.description?.[lang]
                    : service?.description?.[lang] + "."
                  : service?.description?.[lang]}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
