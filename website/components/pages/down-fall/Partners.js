"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const partners = [
  {
    name: "Jadwa Investment",
    description: {
      en: "Accounting, financial auditing, and economic feasibility studies",
      ar: "محاسبة، تحقيق مالي، ودراسات جدوى اقتصادية",
      tr: "Muhasebe, finansal denetim ve ekonomik fizibilite çalışmaları",
    },
    logo: "/assets/images/logos/1.jpeg",
    url: "#",
  },
  {
    name: "SMARTINB",
    description: {
      en: "Integrated technology solutions and professional website development",
      ar: "حلول تكنولوجية متكاملة وتطوير مواقع إلكترونية احترافية",
      tr: "Entegre teknoloji çözümleri ve profesyonel web sitesi geliştirme",
    },
    logo: "/assets/images/logos/17.png",
    url: "#",
  },
  {
    name: "Logistics Network",
    description: {
      en: "Office setup services, field operations, and logistics services in Syria",
      ar: "خدمات تجهيز المكاتب، العمليات الميدانية، والخدمات اللوجستية داخل سوريا",
      tr: "Suriye'de ofis kurulum hizmetleri, saha operasyonları ve lojistik hizmetler",
    },
    logo: "/assets/images/logos/NoonExpress.png",
    url: "#",
  },
];

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

export default function PartnersSection({ data }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <div className="partners">
      <Swiper {...swiperOptions} className="theme_carousel owl-theme">
        {data?.map((partner, idx) => (
          <SwiperSlide key={idx} className="slide">
            <div className="service-block-two" style={{ overflow: "hidden" }}>
              <div className="inner-box">
                <h3>
                  <Link href={"#"}>{partner?.name?.[lang]}</Link>
                </h3>
                <p className="partner-desc">{partner?.description?.[lang]}</p>
                <figure className="image-box">
                  <img
                    src={partner?.logo}
                    alt={partner?.name?.[lang]}
                    style={{
                      width: "12em",
                      objectFit: "contain",
                      borderRadius: "0",
                    }}
                  />
                </figure>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
