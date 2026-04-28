"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function getInitials(name = "") {
  return name
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

  // left featured swiper
  const featuredSlides = sortedTestimonials.slice(0, 3);

  // right static cards
  const sideCards = sortedTestimonials.slice(0, 2);

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

          <div className="jadwa-layout">
            <div className="jadwa-left">
              {!!featuredSlides.length && (
                <div className="jadwa-featured-swiper-wrap">
                  <Swiper
                    key={isRtl ? "rtl" : "ltr"}
                    modules={[Pagination, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{
                      delay: 4500,
                      disableOnInteraction: false,
                    }}
                    dir={isRtl ? "rtl" : "ltr"}
                    rtl={isRtl}
                    className="jadwa-featured-swiper"
                  >
                    {featuredSlides.map((item, index) => (
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
                                Math.min(Number(item?.rating || 5), 5),
                              ),
                            }).map((_, i) => (
                              <i key={i} className="fa-solid fa-star" />
                            ))}
                          </div>

                          <div className="jadwa-user">
                            <div className="jadwa-avatar jadwa-avatar-dark">
                              {getInitials(item?.name || "Client")}
                            </div>

                            <div className="jadwa-user-meta">
                              <h4>{item?.name || "Client"}</h4>
                              <p>
                                {item?.role?.[lang] || item?.role?.en || ""}
                              </p>
                            </div>
                          </div>
                        </article>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>

            <div className="jadwa-right">
              {!!sideCards.length && (
                <div className="jadwa-top-cards">
                  {sideCards.map((item, index) => (
                    <article
                      className="jadwa-small-card"
                      key={item?._id || index}
                    >
                      <div className="jadwa-quote-dark">"</div>

                      <p className="jadwa-small-text">
                        {item?.content?.[lang] || item?.content?.en || ""}
                      </p>

                      <div className="jadwa-user jadwa-user-small">
                        <div className="jadwa-avatar jadwa-avatar-light">
                          {getInitials(item?.name || "Client")}
                        </div>

                        <div className="jadwa-user-meta">
                          <h4>{item?.name || "Client"}</h4>
                          <p>{item?.role?.[lang] || item?.role?.en || ""}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className="jadwa-stats-card">
                <div className="jadwa-stat">
                  <h3>120+</h3>
                  <p>{t("trustedPartner")}</p>
                </div>

                <div className="jadwa-stat">
                  <h3>18M+</h3>
                  <p>{t("targetedValue")}</p>
                </div>

                <div className="jadwa-stat">
                  <h3>95%</h3>
                  <p>{t("higherEfficiency")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
