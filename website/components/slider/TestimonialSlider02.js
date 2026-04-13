"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 70000,
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

export default function CountriesSlider({ countries }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <Swiper {...swiperOptions} className="theme_carousel owl-theme">
      {countries?.map((item, idx) => (
        <SwiperSlide key={idx} className="slide">
          <div className="service-block-two me-0 px-4">
            <div className="inner-box px-4" style={{ borderRadius: "30px" }}>
              <h3 className="text-center m-0 p-0">{item?.name[lang]}</h3>
              <Link href="" onClick={(e) => e.preventDefault()}>
                <figure className="image-box">
                  <img
                    src={item?.img}
                    alt={item?.name[lang]}
                    className="custom-img-height"
                  />
                </figure>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
