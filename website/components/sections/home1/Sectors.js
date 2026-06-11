"use client";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Sectors({ values = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const safeValues = Array.isArray(values) ? values : [];

  const items = safeValues
    .filter((item) => item?.isActive !== false)
    .sort((a, b) => (a?.order || 0) - (b?.order || 0));

  const iconRules = [
    {
      keywords: ["transparency", "clear", "trust", "seffaf"],
      icon: "fa-solid fa-chart-line",
    },
    {
      keywords: ["independence", "independent", "bagimsiz"],
      icon: "fa-solid fa-shield-halved",
    },
    {
      keywords: ["impact", "goal", "target", "etki"],
      icon: "fa-solid fa-bullseye",
    },
    {
      keywords: ["innovation", "innovative", "inovasyon"],
      icon: "fa-solid fa-flask",
    },
    {
      keywords: ["commitment", "dedication", "baglilik"],
      icon: "fa-solid fa-handshake",
    },
    {
      keywords: ["collaboration", "team", "partnership", "birligi"],
      icon: "fa-solid fa-users",
    },
  ];

  const getText = (field) =>
    field?.[lang] || field?.en || field?.ar || field?.tr || "";

  const getIconClass = (name, index) => {
    const matchedRule = iconRules.find((rule) =>
      rule.keywords.some((keyword) => name.includes(keyword)),
    );

    return matchedRule?.icon || fallbackIcons[index % fallbackIcons.length];
  };
  if (!items.length) {
    return (
      <section className="jadwa-values-section sec-pad">
        <div className="auto-container">
          <div style={{ padding: "40px", color: "#000" }}>No values found</div>
        </div>
      </section>
    );
  }

  return (
    <section className="jadwa-values-section">
      <div className="jadwa-values-stage">
        <Swiper
          key={i18n.dir()}
          dir={i18n.dir()}
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={3.1}
          centeredSlides
          spaceBetween={40}
          loop={items.length > 1}
          speed={700}
          observer
          observeParents
          updateOnWindowResize
          navigation={{
            nextEl: ".jadwa-values-next",
            prevEl: ".jadwa-values-prev",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 12,
              centeredSlides: false,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 18,
              centeredSlides: true,
            },
            1200: {
              slidesPerView: 1.8,
              spaceBetween: 24,
              centeredSlides: true,
            },
          }}
          className="jadwa-values-swiper"
        >
          {items.map((item, index) => {
            const name = getText(item?.name);
            const content = getText(item?.content);
            const description = getText(item?.description);

            return (
              <SwiperSlide key={item?._id || index}>
                <article className="jadwa-values-slide">
                  <div className="jadwa-values-slide-pattern" />

                  <div className="jadwa-values-slide-top">
                    <div className="jadwa-values-icon">
                      <i className={getIconClass(name, index)} />
                    </div>

                    <div className="jadwa-values-counter">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="jadwa-values-slide-body">
                    <div className="jadwa-pill jadwa-values-inner-pill">
                      <span className="jadwa-pill-dot" />
                      <span>
                        {lang === "ar"
                          ? "قيمة أساسية"
                          : lang === "tr"
                            ? "Temel Değer"
                            : "Core Value"}
                      </span>
                    </div>

                    <h3 className="jadwa-values-title">{name}</h3>
                    <p className="jadwa-values-content">{content}</p>
                    <p className="jadwa-values-description">{description}</p>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button className="jadwa-values-nav jadwa-values-prev" type="button">
          <i className="fa-solid fa-arrow-left" />
        </button>

        <button className="jadwa-values-nav jadwa-values-next" type="button">
          <i className="fa-solid fa-arrow-right" />
        </button>

        <div className="jadwa-values-pagination" />
      </div>
    </section>
  );
}
