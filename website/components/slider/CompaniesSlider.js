"use client";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { useRouter } from "next/router";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 500000,
  },
  dir: "ltr",
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    575: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    767: {
      slidesPerView: 2,
      // spaceBetween: 30,
    },

    1199: {
      slidesPerView: 3,
      // spaceBetween: 30,
    },
  },
};

export default function CompaniesSlider({ CompanyData, setActiveCompany }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  const GoToCompany = (slug) => {
    router.push(`/company-details/${slug}`);
  };

  return (
    <div>
      <Swiper
        {...swiperOptions}
        className="theme_carousel owl-theme"
        style={{
          height: "36rem",
        }}
      >
        {CompanyData?.map((company, index) => (
          <SwiperSlide key={index} className="slide">
            <div
              key={index}
              className="company-card"
              onClick={() => {
                setActiveCompany(company);
              }}
            >
              <div className="team-block-one" style={{ cursor: "pointer" }}>
                <div className="inner-box">
                  <h3 className="text-center text-muted">
                    {company?.companyName[lang]}
                  </h3>
                  <figure className={lang === "ar" ? "" : "image-box"}>
                    <img
                      src={company?.company_background}
                      alt={company?.companyName[lang]}
                      style={{ borderRadius: "30px 30px 0 0" }}
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="share-box">
                      <div className="share-icon">
                        <i className="flaticon-share" />
                      </div>
                      <ul className="social-links clearfix">
                        {company?.social_links?.facebook && (
                          <li>
                            <Link
                              href={company?.social_links?.facebook}
                              target="_blank"
                            >
                              <i
                                className="fa-brands fa-facebook"
                                title={t("facebook")}
                              />
                            </Link>
                          </li>
                        )}
                        {company?.social_links?.x && (
                          <li>
                            <Link
                              href={company?.social_links?.x}
                              target="_blank"
                            >
                              <i
                                className="fa-brands fa-square-twitter"
                                title={t("twitter")}
                              />
                            </Link>
                          </li>
                        )}
                        {company?.social_links?.instagram && (
                          <li>
                            <Link
                              href={company?.social_links?.instagram}
                              target="_blank"
                            >
                              <i
                                className="fa-brands fa-instagram-square"
                                title={t("instagram")}
                              />
                            </Link>
                          </li>
                        )}
                        {company?.social_links?.linkedin && (
                          <li>
                            <Link
                              href={company?.social_links?.linkedin}
                              target="_blank"
                            >
                              <i
                                className="fa-brands fa-linkedin"
                                title="LinkedIn"
                              />
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="d-flex items-center">
                      <img
                        className="p-0 mt-4"
                        style={{ objectFit: "contain" }}
                        src={company?.company_logo}
                      />
                    </div>

                    <span style={{ padding: "0px" }}>
                      {truncateText(company?.about[lang], 100)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
