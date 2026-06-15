"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function getInitials(name = "") {
  const orgName = name?.en ?? name;
  return orgName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsShowcase({ testimonials = [] }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const sortedTestimonials = useMemo(() => {
    return [...testimonials].sort((a, b) => {
      const aDate = new Date(a?.createdAt || 0).getTime();
      const bDate = new Date(b?.createdAt || 0).getTime();
      return bDate - aDate;
    });
  }, [testimonials]);

  if (!sortedTestimonials.length) return null;

  return (
    <section
      className={`pt-5 jadwa-testimonials sec-pad ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="auto-container">
        <div className="jadwa-testimonials-panel">
          <div className="jadwa-testimonials-head">
            <div className="jadwa-pill">
              <span className="jadwa-pill-dot" />
              <span>{t("about.testimonials")}</span>
            </div>

            <h2 className="jadwa-testimonials-title">
              {t("trustedAmbitious")}
            </h2>

            <p className="jadwa-testimonials-subtitle">{t("usedByFounders")}</p>
          </div>

          <div className="jadwa-featured-swiper-wrap">
            <Swiper
              key={isRtl ? "rtl" : "ltr"}
              modules={[Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              dir={isRtl ? "rtl" : "ltr"}
              rtl={isRtl}
              className="jadwa-featured-swiper"
            >
              {sortedTestimonials.map((item, index) => (
                <SwiperSlide key={item?._id || index}>
                  <article className="jadwa-featured-card">
                    <div className="jadwa-quote-light">"</div>

                    <p className="jadwa-featured-text">
                      {item?.content?.[lang] || item?.content?.en || ""}
                    </p>

                    <div className="jadwa-stars">
                      {Array.from({
                        length: Math.max(
                          1,
                          Math.min(Number(item?.rating || 5), 5)
                        ),
                      }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star" />
                      ))}
                    </div>

                    <div className="jadwa-user">
                      <div className="jadwa-avatar jadwa-avatar-dark">
                        {getInitials(
                          item?.name?.[lang] ?? item?.name?.en ?? "Client"
                        )}
                      </div>

                      <div className="jadwa-user-meta">
                        <h4>
                          {item?.name?.[lang] ?? item?.name?.en ?? "Client"}
                        </h4>
                        <p>{item?.role?.[lang] || item?.role?.en || ""}</p>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
