"use client";

import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TestimonialSlider03({ testimonials = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: testimonials.length > 3,
    speed: 900,
    autoplay:
      testimonials.length > 1
        ? {
            delay: 4500,
            disableOnInteraction: false,
          }
        : false,
    navigation: {
      nextEl: ".testimonial-next",
      prevEl: ".testimonial-prev",
    },
    pagination: {
      el: ".testimonial-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 18,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 22,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  };

  if (!testimonials?.length) return null;

  return (
    <div
      className={`testimonial-slider-premium ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="auto-container">
        <div className="testimonial-slider-head">
          <div className="testimonial-slider-nav">
            <button
              type="button"
              className="testimonial-nav-btn testimonial-prev"
              aria-label={isRtl ? "السابق" : "Previous"}
            >
              <i className="fa-solid fa-arrow-left" />
            </button>

            <button
              type="button"
              className="testimonial-nav-btn testimonial-next"
              aria-label={isRtl ? "التالي" : "Next"}
            >
              <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </div>

        <Swiper {...swiperOptions} className="testimonial-swiper">
          {testimonials.map((item, index) => {
            const name = item?.name || "Client";
            const role = item?.role?.[lang] || item?.role?.en || "";
            const content = item?.content?.[lang] || item?.content?.en || "";
            const rating = Math.max(1, Math.min(Number(item?.rating || 5), 5));
            const initials = name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase();

            return (
              <SwiperSlide
                key={item?._id || index}
                className="testimonial-slide"
              >
                <article className="testimonial-card">
                  <div className="testimonial-quote-mark">“</div>

                  <div className="testimonial-card-top">
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">
                        {initials || "C"}
                      </div>

                      <div className="testimonial-author-meta">
                        <h4 className="testimonial-name">{name}</h4>
                        <p className="testimonial-role">{role}</p>
                      </div>
                    </div>

                    <div
                      className="testimonial-stars"
                      aria-label={`${rating} stars`}
                    >
                      {Array.from({ length: rating }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star" />
                      ))}
                    </div>
                  </div>

                  <div className="testimonial-card-body">
                    <p className="testimonial-text">{content}</p>
                  </div>

                  <div className="testimonial-card-footer">
                    <span className="testimonial-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="testimonial-pagination" />
      </div>
    </div>
  );
}
