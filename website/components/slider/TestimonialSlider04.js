"use client";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllTeamQuery } from "@/RTK/Api/employees/EmployeesApi";
import { useTranslation } from "react-i18next";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
  },
};

export default function TestimonialSlider04() {
  const { data: team, isError, isLoading } = useGetAllTeamQuery();
  const { t } = useTranslation();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !team?.data) return <p>Error loading team data.</p>;

  return (
    <>
      <Swiper {...swiperOptions} className="theme_carousel owl-theme">
        {team.data.map((member) => (
          <SwiperSlide key={member?._id} className="slide">
            <div className="team-block-one">
              <div className="inner-box">
                <figure className="image-box">
                  <img src={member?.photo} alt={member?.name} />
                </figure>
                <div className="lower-content">
                  <div className="share-box">
                    <div className="share-icon">
                      <i className="flaticon-share" />
                    </div>
                    <ul className="social-links clearfix">
                      <li>
                        <Link href="https://facebook.com" target="_blank">
                          <i
                            className="fa-brands fa-facebook"
                            title={t("facebook")}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://twitter.com" target="_blank">
                          <i
                            className="fa-brands fa-square-twitter"
                            title={t("twitter")}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href="https://instagram.com" target="_blank">
                          <i
                            className="fa-brands fa-instagram-square"
                            title={t("instagram")}
                          />
                        </Link>
                      </li>
                      {member?.linkedIn && (
                        <li>
                          <Link href={member?.linkedIn} target="_blank">
                            <i
                              className="fa-brands fa-linkedin"
                              title="LinkedIn"
                            />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                  <h3>{member?.name}</h3>
                  <p>
                    <strong>{member?.position}</strong>
                    <br />
                    {member?.bio}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
