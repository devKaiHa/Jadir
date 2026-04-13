'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"

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
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
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
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        991: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        1199: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        1350: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
    }
}
export default function TestimonialSlider06() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                    <div className="slider-content">
                    <div className="testimonial-block-one">
                        <figure className="thumb-box">
                        <img
                            src="assets/images/resource/testimonial-1.png"
                            alt=""
                        />
                        </figure>
                        <div className="inner-box">
                        <div className="icon-box">
                            <i className="flaticon-quote" />
                        </div>
                        <h4>Great Experience!</h4>
                        <p>
                            I have been financially advised by counsolve investment
                            Planners since 2022 I have had a very good experience.
                            The sound financial advice they gave me helped me to
                            achieve.
                        </p>
                        <h3>Nathan Felix</h3>
                        <span className="designation">
                            Director - Naxly Info tech
                        </span>
                        </div>
                    </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="slider-content">
                  <div className="testimonial-block-one">
                    <figure className="thumb-box">
                      <img
                        src="assets/images/resource/testimonial-1.png"
                        alt=""
                      />
                    </figure>
                    <div className="inner-box">
                      <div className="icon-box">
                        <i className="flaticon-quote" />
                      </div>
                      <h4>Great Experience!</h4>
                      <p>
                        I have been financially advised by counsolve investment
                        Planners since 2022 I have had a very good experience.
                        The sound financial advice they gave me helped me to
                        achieve.
                      </p>
                      <h3>Nathan Felix</h3>
                      <span className="designation">
                        Director - Naxly Info tech
                      </span>
                    </div>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="slider-content">
                  <div className="testimonial-block-one">
                    <figure className="thumb-box">
                      <img
                        src="assets/images/resource/testimonial-1.png"
                        alt=""
                      />
                    </figure>
                    <div className="inner-box">
                      <div className="icon-box">
                        <i className="flaticon-quote" />
                      </div>
                      <h4>Great Experience!</h4>
                      <p>
                        I have been financially advised by counsolve investment
                        Planners since 2022 I have had a very good experience.
                        The sound financial advice they gave me helped me to
                        achieve.
                      </p>
                      <h3>Nathan Felix</h3>
                      <span className="designation">
                        Director - Naxly Info tech
                      </span>
                    </div>
                  </div>
                </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
