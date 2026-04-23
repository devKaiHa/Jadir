"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { imageURL } from "@/api/GlobalData";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 18,
  autoplay: {
    delay: 50000000,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".jadwa-team-next",
    prevEl: ".jadwa-team-prev",
  },
  pagination: {
    el: ".jadwa-team-pagination",
    clickable: true,
  },
  breakpoints: {
    576: { slidesPerView: 2, spaceBetween: 18 },
    992: { slidesPerView: 3, spaceBetween: 20 },
    1200: { slidesPerView: 4, spaceBetween: 22 },
  },
};

export default function TeamSlider({ team = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const getText = (field) =>
    field?.[lang] || field?.en || field?.ar || field?.tr || "";

  return (
    <div className="jadwa-mini-team-slider">
      <Swiper {...swiperOptions} className="jadwa-mini-team-swiper">
        {team?.map((member, index) => {
          const name = getText(member?.name);
          const position = getText(member?.position);
          const bio = getText(member?.bio);

          return (
            <SwiperSlide
              key={member?._id || index}
              className="jadwa-mini-team-slide"
            >
              <article className="jadwa-mini-team-card">
                <div className="jadwa-mini-team-image-wrap">
                  <img
                    className="jadwa-mini-team-image"
                    src={`${imageURL}boardMember/${member.image}`}
                    alt={name}
                  />
                  <div className="jadwa-mini-team-image-overlay" />

                  <div className="jadwa-mini-team-topbar">
                    <span className="jadwa-mini-team-badge">Team</span>
                  </div>
                </div>

                <div className="jadwa-mini-team-content">
                  <h3 className="jadwa-mini-team-name">{name}</h3>

                  <div className="jadwa-mini-team-position">{position}</div>

                  <p className="jadwa-mini-team-bio">{truncateText(bio, 78)}</p>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="jadwa-mini-team-controls">
        <button className="jadwa-mini-team-nav jadwa-team-prev" type="button">
          <i className="fa-solid fa-arrow-left" />
        </button>

        <div className="jadwa-team-pagination" />

        <button className="jadwa-mini-team-nav jadwa-team-next" type="button">
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
}
