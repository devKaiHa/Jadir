"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { useIsMobile } from "@/lib/helpers";
import { imageURL } from "@/api/GlobalData";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
  spaceBetween: 30,
  autoplay: {
    delay: 50000000,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: { slidesPerView: 1 },
    991: { slidesPerView: 2 },
    1199: { slidesPerView: 3 },
  },
};

export default function TeamSlider({ team }) {
  const router = useRouter();
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isMobile = useIsMobile();

  return (
    <Swiper
      {...swiperOptions}
      className="theme_carousel owl-theme"
      style={{ padding: "30px 10px" }}
    >
      {team?.map((member, index) => {
        return (
          <SwiperSlide key={index} className="slide">
            <div className="team-block-one">
              <div className="inner-box" style={{ height: "465px" }}>
                <figure
                  className="image-box p-0 m-0"
                  onClick={() => {
                    if (member?.slug) router.push(`/member/${member?.slug}`);
                  }}
                >
                  <img
                    className="d-block"
                    src={`${imageURL}boardMember/${member.image}`}
                    alt={member?.name?.[lang]}
                  />
                </figure>
                <div className="lower-content">
                  <h3
                    style={{
                      cursor: "pointer",
                      fontSize: isMobile ? "16px" : "24px",
                    }}
                    onClick={() =>
                      member?.slug && router.push(`/member/${member?.slug}`)
                    }
                  >
                    {member?.name?.[lang]}
                  </h3>
                  <h6>{member?.position?.[lang]}</h6>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: truncateText(member?.bio?.[lang], 50),
                    }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
