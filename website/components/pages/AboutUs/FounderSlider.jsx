"use client";

import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { imageURL } from "@/api/GlobalData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useIsMobile } from "@/lib/helpers";

export default function FounderSlider({ founders = [], variant = "founders" }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const items = Array.isArray(founders) ? founders : [];

  if (!items.length) return null;

  const getText = (field) =>
    field?.[lang] || field?.en || field?.ar || field?.tr || "";

  return (
    <div className={`jadwa-founder-slider-wrap ${isRtl ? "rtl" : "ltr"}`}>
      <Swiper
        key={lang}
        dir={isRtl ? "rtl" : "ltr"}
        modules={[Navigation, Pagination, Autoplay]}
        centeredSlides={true}
        loop={items.length > 1}
        speed={700}
        observer
        observeParents
        updateOnWindowResize
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 70000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".jadwa-founder-next",
          prevEl: ".jadwa-founder-prev",
        }}
        pagination={{
          el: ".jadwa-founder-pagination",
          clickable: true,
        }}
        className="jadwa-founder-swiper"
      >
        {items.map((member, index) => {
          const name = getText(member?.name);
          const position = getText(member?.position);
          const bio = getText(member?.bio);

          return (
            <SwiperSlide key={member?._id || index}>
              <article className="jadwa-founder-slide">
                <div className="jadwa-founder-pattern" />

                <div className="jadwa-founder-grid">
                  <div className="jadwa-founder-media">
                    <div className="jadwa-founder-image-box">
                      <img
                        src={`${imageURL}boardMember/${member.image}`}
                        alt={name}
                        className="jadwa-founder-image"
                      />
                    </div>
                  </div>

                  <div className="jadwa-founder-content">
                    <div className="jadwa-founder-top">
                      <div className="jadwa-pill jadwa-founder-pill">
                        <span className="jadwa-pill-dot" />
                        <span>
                          {variant === "founders" ? t("founder") : t("team")}
                        </span>
                      </div>

                      <span className="jadwa-founder-counter">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="jadwa-founder-name">{name}</h3>

                    {position && (
                      <div className="jadwa-founder-position">{position}</div>
                    )}

                    {bio && (
                      <div className="jadwa-founder-bio">
                        <p>{truncateText(bio, 320)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {items.length > 1 && (
        <div className="jadwa-founder-controls">
          <button
            className="jadwa-founder-nav jadwa-founder-prev"
            type="button"
          >
            <i className="fa-solid fa-arrow-left" />
          </button>

          <div className="jadwa-founder-pagination" />

          <button
            className="jadwa-founder-nav jadwa-founder-next"
            type="button"
          >
            <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      )}
    </div>
  );
}
