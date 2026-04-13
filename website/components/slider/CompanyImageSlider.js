"use client";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
  spaceBetween: 0,
  autoplay: { delay: 400000, disableOnInteraction: false },
  loop: true,
  pagination: { clickable: true },
  breakpoints: {
    320: { slidesPerView: 1 },
    575: { slidesPerView: 1 },
    767: { slidesPerView: 1 },
    991: { slidesPerView: 3 },
    1199: { slidesPerView: 3 },
    1350: { slidesPerView: 4 },
  },
};

export default function CompanyImageSlider({ slidesArray, width = "370px" }) {
  return (
    <Swiper {...swiperOptions} className="theme_carousel owl-theme">
      {slidesArray?.map((item, idx) => (
        <SwiperSlide key={idx} className="slide">
          <div className="project-block-one">
            <div className="inner-box">
              <figure className="image-box" style={{ width: `${width}` }}>
                <img src={item.img} alt="" />
              </figure>
              <div className="content-inner">
                <div className="text-box">
                  <h6>{item.category}</h6>
                  <h3>
                    <Link
                      style={{ cursor: "default" }}
                      onClick={(e) => e.preventDefault()}
                      href={""}
                    >
                      {item.title}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
