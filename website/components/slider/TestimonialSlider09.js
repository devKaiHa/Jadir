'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

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
export default function TestimonialSlider09() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                    <div className="testimonial-content">
                        <div className="author-box">
                        <div className="thumb-box">
                            <figure className="thumb">
                            <img src="assets/images/resource/testimonial-1.jpg" alt="" />
                            </figure>
                            <div className="icon-box">
                            <img src="assets/images/icons/icon-16.png" alt="" />
                            </div>
                        </div>
                        <h3>Nathan Felix</h3>
                        <h5>Director - Naxly Info tech</h5>
                        </div>
                        <div className="quote-box">
                        <i className="flaticon-quote" />
                        </div>
                        <p>
                        I have been financially advised by Innovest counsolve Plann ers
                        since 2022 I have had a very good experience. The sound financial
                        advice they gave me helped me to achieve my finan- cial goals. The
                        advisor from Innovest considerable time understanding my goals
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                    <div className="testimonial-content">
                        <div className="author-box">
                        <div className="thumb-box">
                            <figure className="thumb">
                            <img src="assets/images/resource/testimonial-1.jpg" alt="" />
                            </figure>
                            <div className="icon-box">
                            <img src="assets/images/icons/icon-16.png" alt="" />
                            </div>
                        </div>
                        <h3>Nathan Felix</h3>
                        <h5>Director - Naxly Info tech</h5>
                        </div>
                        <div className="quote-box">
                        <i className="flaticon-quote" />
                        </div>
                        <p>
                        I have been financially advised by Innovest counsolve Plann ers
                        since 2022 I have had a very good experience. The sound financial
                        advice they gave me helped me to achieve my finan- cial goals. The
                        advisor from Innovest considerable time understanding my goals
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                    <div className="testimonial-content">
                        <div className="author-box">
                        <div className="thumb-box">
                            <figure className="thumb">
                            <img src="assets/images/resource/testimonial-1.jpg" alt="" />
                            </figure>
                            <div className="icon-box">
                            <img src="assets/images/icons/icon-16.png" alt="" />
                            </div>
                        </div>
                        <h3>Nathan Felix</h3>
                        <h5>Director - Naxly Info tech</h5>
                        </div>
                        <div className="quote-box">
                        <i className="flaticon-quote" />
                        </div>
                        <p>
                        I have been financially advised by Innovest counsolve Plann ers
                        since 2022 I have had a very good experience. The sound financial
                        advice they gave me helped me to achieve my finan- cial goals. The
                        advisor from Innovest considerable time understanding my goals
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
