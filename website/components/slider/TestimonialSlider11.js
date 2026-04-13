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
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1199: {
            slidesPerView: 3,
            // spaceBetween: 30,
        },
        1350: {
            slidesPerView: 4,
            // spaceBetween: 30,
        },
    }
}
export default function TestimonialSlider11() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                <div className="testimonial-block-three">
                  <div className="inner-box">
                    <div className="upper-box">
                      <div className="light-icon">
                        <i className="flaticon-speech-balloon" />
                      </div>
                      <figure className="thumb-box">
                        <img src="assets/images/resource/testimonial-4.png" alt="" />
                      </figure>
                      <ul className="rating clearfix">
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                      </ul>
                      <h3>Nathan Felix</h3>
                      <span className="designation">Director - Naxly Info tech</span>
                    </div>
                    <div className="text-box">
                      <p>
                        Pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble that are bound to ensue and equal
                        blame.
                      </p>
                    </div>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="testimonial-block-three">
                  <div className="inner-box">
                    <div className="upper-box">
                      <div className="light-icon">
                        <i className="flaticon-speech-balloon" />
                      </div>
                      <figure className="thumb-box">
                        <img src="assets/images/resource/testimonial-5.png" alt="" />
                      </figure>
                      <ul className="rating clearfix">
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                      </ul>
                      <h3>Nora Penelope</h3>
                      <span className="designation">Manager - Intexture Interiors</span>
                    </div>
                    <div className="text-box">
                      <p>
                        I have been financially advised by counsolve investment Planners
                        I have had a very good experience. The sound financial advice
                        they gave me helped me to achieve.
                      </p>
                    </div>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="testimonial-block-three">
                  <div className="inner-box">
                    <div className="upper-box">
                      <div className="light-icon">
                        <i className="flaticon-speech-balloon" />
                      </div>
                      <figure className="thumb-box">
                        <img src="assets/images/resource/testimonial-6.png" alt="" />
                      </figure>
                      <ul className="rating clearfix">
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-29.png" alt="" />
                        </li>
                      </ul>
                      <h3>Rhys Damian</h3>
                      <span className="designation">President - Shelder Roofing</span>
                    </div>
                    <div className="text-box">
                      <p>
                        These cases are perfectly simple and easy to distinguish. In a
                        free too hour, when our power of choice is all untrammelled when
                        nothing.
                      </p>
                    </div>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="testimonial-block-three">
                  <div className="inner-box">
                    <div className="upper-box">
                      <div className="light-icon">
                        <i className="flaticon-speech-balloon" />
                      </div>
                      <figure className="thumb-box">
                        <img src="assets/images/resource/testimonial-7.png" alt="" />
                      </figure>
                      <ul className="rating clearfix">
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                      </ul>
                      <h3>Kyle George</h3>
                      <span className="designation">Director - Naxly Info tech</span>
                    </div>
                    <div className="text-box">
                      <p>
                        Duty or the obligations of business it will frequently occur
                        that pleasures have to be repudiated and annoyances accepted.
                        The wise man therefore always in these matters to this principle
                        of selection.
                      </p>
                    </div>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="testimonial-block-three">
                  <div className="inner-box">
                    <div className="upper-box">
                      <div className="light-icon">
                        <i className="flaticon-speech-balloon" />
                      </div>
                      <figure className="thumb-box">
                        <img src="assets/images/resource/testimonial-8.png" alt="" />
                      </figure>
                      <ul className="rating clearfix">
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                        <li>
                          <img src="assets/images/icons/icon-28.png" alt="" />
                        </li>
                      </ul>
                      <h3>Tracy Margaret</h3>
                      <span className="designation">Team Leader - Eazy Recruitz</span>
                    </div>
                    <div className="text-box">
                      <p>
                        I have been financially advised by counsolve investment Planners
                        I have had a very good experience. The sound financial advice
                        they gave me helped me to achieve.
                      </p>
                    </div>
                  </div>
                </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
