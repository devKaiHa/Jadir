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

export default function FounderSlider({ founders = [] }) {
  const isMobile = useIsMobile();
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const items = Array.isArray(founders) ? founders : [];

  if (!items.length) return null;

  const getText = (field) =>
    field?.[lang] || field?.en || field?.ar || field?.tr || "";

  return (
    <div className="jadwa-founder-slider-wrap">
      <Swiper
        key={i18n.dir()}
        dir={i18n.dir()}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={items.length > 1 && !isMobile ? 2 : 1}
        spaceBetween={24}
        loop={items.length > 1}
        speed={700}
        observer={true}
        observeParents={true}
        updateOnWindowResize={true}
        autoplay={{
          delay: 55000,
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
                      <div className="jadwa-founder-image-overlay" />
                    </div>
                  </div>
                  <div className="jadwa-founder-content">
                    <div className="jadwa-pill jadwa-pill--dark jadwa-founder-pill">
                      <span className="jadwa-pill-dot" />
                      <span>
                        {lang === "ar"
                          ? "مؤسس"
                          : lang === "tr"
                            ? "Kurucu"
                            : "Founder"}
                      </span>
                    </div>

                    <div className="jadwa-founder-counter">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <h3 className="jadwa-founder-name">{name}</h3>

                    {position && (
                      <div className="jadwa-founder-position">{position}</div>
                    )}

                    <div className="jadwa-founder-bio">
                      <p>{truncateText(bio, 260)}</p>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="jadwa-founder-controls">
        <button className="jadwa-founder-nav jadwa-founder-prev" type="button">
          <i className="fa-solid fa-arrow-left" />
        </button>

        <div className="jadwa-founder-pagination" />

        <button className="jadwa-founder-nav jadwa-founder-next" type="button">
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
}
