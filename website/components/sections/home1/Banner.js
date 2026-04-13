"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useIsMobile } from "@/lib/helpers";
import { imageURL } from "@/api/GlobalData";

export default function Banner({ HomeSlides }) {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isMobile = useIsMobile();

  return (
    <section className="banner-section p_relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 700000,
          disableOnInteraction: false,
        }}
        dir="ltr"
        loop
        className="banner-carousel"
      >
        {HomeSlides?.map((slide, idx) => (
          <SwiperSlide key={idx} className="slide-item p_relative">
            <div
              className="image-layer"
              style={{
                backgroundImage: `url(${`${imageURL}homeSlider/${slide?.img}`})`,
              }}
            />
            <div className="custom-container">
              <div className="content-box">
                <h2 dir={lang === "ar" ? "rtl" : "ltr"}>
                  {slide?.title?.[lang]}
                </h2>

                <div className="lower-box">
                  <div className="text" dir={lang === "ar" ? "rtl" : "ltr"}>
                    {slide?.description?.[lang]}
                  </div>

                  {slide?.btnLink && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(slide?.btnLink);
                      }}
                      className="jadwa-banner-btn"
                    >
                      {t("see_more")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
