"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
  spaceBetween: 30,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

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
    991: {
      slidesPerView: 2,
      // spaceBetween: 30,
    },
    1199: {
      slidesPerView: 3,
      // spaceBetween: 30,
    },
    1350: {
      slidesPerView: 3,
      // spaceBetween: 30,
    },
  },
};
export default function TestimonialSlider05() {
  return (
    <>
      <Swiper {...swiperOptions} className="theme_carousel owl-theme">
        <SwiperSlide className="slide">
          <div className="service-block-one block-one">
            <div className="inner-box">
              <div className="icon-box">
                <div className="icon">
                  <img src="../../public/assets/images/smart.webp" />
                </div>
                <span className="count-text">01</span>
              </div>
              <h3>
                <Link href="/companies">SMART IN BUSINESS</Link>
              </h3>
              <div className="link">
                <Link href="/companies">
                  <span>Explore Company</span>
                </Link>
              </div>
              <p>
                That they cannot foresee the pain trouble that are bound ensue
                equal blame belongs to duty.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <div className="service-block-one block-two">
            <div className="inner-box">
              <div className="icon-box">
                <div className="icon">
                  <i className="flaticon-office-building" />
                </div>
                <span className="count-text">02</span>
              </div>
              <h3>
                <Link href="/companies">noonmar</Link>
              </h3>
              <div className="link">
                <Link href="/companies">
                  <span>Explore Company</span>
                </Link>
              </div>
              <p>
                Power of choice is untrammelled when nothing prevent our being
                all to do what we like best.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <div className="service-block-one block-three">
            <div className="inner-box">
              <div className="icon-box">
                <div className="icon">
                  <i className="flaticon-retirement" />
                </div>
                <span className="count-text">03</span>
              </div>
              <h3>
                <Link href="/companies">NOONTEK</Link>
              </h3>
              <div className="link">
                <Link href="/companies">
                  <span>Explore Company</span>
                </Link>
              </div>
              <p>
                Obligations of business it will occur that pleasures have to
                repudiaters and annoyances accepted.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <div className="service-block-one block-one">
            <div className="inner-box">
              <div className="icon-box">
                <div className="icon">
                  <i className="flaticon-analytics" />
                </div>
                <span className="count-text">04</span>
              </div>
              <h3>
                <Link href="/companies">Game Flakes</Link>
              </h3>
              <div className="link">
                <Link href="/companies">
                  <span>Explore Company</span>
                </Link>
              </div>
              <p>
                That they cannot foresee the pain trouble that are bound ensue
                equal blame belongs to duty.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <div className="service-block-one block-two">
            <div className="inner-box">
              <div className="icon-box">
                <div className="icon">
                  <i className="flaticon-office-building" />
                </div>
                <span className="count-text">05</span>
              </div>
              <h3>
                <Link href="/companies">NOONCAR</Link>
              </h3>
              <div className="link">
                <Link href="/companies">
                  <span>Explore Company</span>
                </Link>
              </div>
              <p>
                Power of choice is untrammelled when nothing prevent our being
                all to do what we like best.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <div className="service-block-one block-three">
            <div className="inner-box">
              <div className="icon-box">
                <div className="icon">
                  <i className="flaticon-retirement" />
                </div>
                <span className="count-text">06</span>
              </div>
              <h3>
                <Link href="/companies">Soon Kitchen</Link>
              </h3>
              <div className="link">
                <Link href="/companies">
                  <span>Explore Company</span>
                </Link>
              </div>
              <p>
                Obligations of business it will occur that pleasures have to
                repudiaters and annoyances accepted.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
