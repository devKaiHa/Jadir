"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { strategicDirections } from "@/StaticData/Services";

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

export default function StrategicDirectionsSlider({ data }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <Swiper
      {...swiperOptions}
      className="theme_carousel owl-theme"
      style={{ padding: "50px 0 100px 0px" }}
    >
      {data?.data?.map((item, idx) => (
        <SwiperSlide key={idx} className="slide">
          <div className="service-block-two">
            <div className=" inner-box">
              <h2
                style={{ opacity: 0.8 }}
                lang={lang === "ar" ? "ar" : "en"}
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                {item.title[lang]}
              </h2>
            </div>
            <div className="link-box">
              <Link href="">
                <span
                  style={{
                    fontSize: "33px",
                    fontWeight: "600",
                    color: "#498184",
                  }}
                >
                  {" "}
                  {idx + 1}
                </span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
