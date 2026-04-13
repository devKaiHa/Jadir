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
export default function TestimonialSlider10() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                <div className="testimonial-content">
                        <div className="testimonial-block-two">
                        <div className="inner-box">
                            <div className="thumb-box">
                            <figure className="thumb">
                                <img
                                src="assets/images/resource/testimonial-2.png"
                                alt=""
                                />
                            </figure>
                            <div className="icon-box">
                                <i className="flaticon-quote" />
                            </div>
                            </div>
                            <ul className="rating clearfix">
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            </ul>
                            <p>
                            I have been financially advised by counsolve investment
                            Planners since 2022 I have had a very good experience. The
                            sound financial advice they gave me helped me to achieve.
                            </p>
                            <h3>Nathan Felix</h3>
                            <h5>Director - Naxly Info tech</h5>
                        </div>
                        </div>
                        <div className="testimonial-block-two">
                        <div className="inner-box">
                            <div className="thumb-box">
                            <figure className="thumb">
                                <img
                                src="assets/images/resource/testimonial-3.png"
                                alt=""
                                />
                            </figure>
                            <div className="icon-box">
                                <i className="flaticon-quote" />
                            </div>
                            </div>
                            <ul className="rating clearfix">
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-half-star" />
                            </li>
                            </ul>
                            <p>
                            Pleasure of the moment, so blinded by desire, that they
                            cannot foresee the pain and trouble that are bound to
                            ensue and equal blame.
                            </p>
                            <h3>Nora Penelope</h3>
                            <h5>Manager - Intexture Interiors</h5>
                        </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="testimonial-content">
                        <div className="testimonial-block-two">
                        <div className="inner-box">
                            <div className="thumb-box">
                            <figure className="thumb">
                                <img
                                src="assets/images/resource/testimonial-2.png"
                                alt=""
                                />
                            </figure>
                            <div className="icon-box">
                                <i className="flaticon-quote" />
                            </div>
                            </div>
                            <ul className="rating clearfix">
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            </ul>
                            <p>
                            I have been financially advised by counsolve investment
                            Planners since 2022 I have had a very good experience. The
                            sound financial advice they gave me helped me to achieve.
                            </p>
                            <h3>Nathan Felix</h3>
                            <h5>Director - Naxly Info tech</h5>
                        </div>
                        </div>
                        <div className="testimonial-block-two">
                        <div className="inner-box">
                            <div className="thumb-box">
                            <figure className="thumb">
                                <img
                                src="assets/images/resource/testimonial-3.png"
                                alt=""
                                />
                            </figure>
                            <div className="icon-box">
                                <i className="flaticon-quote" />
                            </div>
                            </div>
                            <ul className="rating clearfix">
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-half-star" />
                            </li>
                            </ul>
                            <p>
                            Pleasure of the moment, so blinded by desire, that they
                            cannot foresee the pain and trouble that are bound to
                            ensue and equal blame.
                            </p>
                            <h3>Nora Penelope</h3>
                            <h5>Manager - Intexture Interiors</h5>
                        </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="testimonial-content">
                        <div className="testimonial-block-two">
                        <div className="inner-box">
                            <div className="thumb-box">
                            <figure className="thumb">
                                <img
                                src="assets/images/resource/testimonial-2.png"
                                alt=""
                                />
                            </figure>
                            <div className="icon-box">
                                <i className="flaticon-quote" />
                            </div>
                            </div>
                            <ul className="rating clearfix">
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            </ul>
                            <p>
                            I have been financially advised by counsolve investment
                            Planners since 2022 I have had a very good experience. The
                            sound financial advice they gave me helped me to achieve.
                            </p>
                            <h3>Nathan Felix</h3>
                            <h5>Director - Naxly Info tech</h5>
                        </div>
                        </div>
                        <div className="testimonial-block-two">
                        <div className="inner-box">
                            <div className="thumb-box">
                            <figure className="thumb">
                                <img
                                src="assets/images/resource/testimonial-3.png"
                                alt=""
                                />
                            </figure>
                            <div className="icon-box">
                                <i className="flaticon-quote" />
                            </div>
                            </div>
                            <ul className="rating clearfix">
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-star-1" />
                            </li>
                            <li>
                                <i className="flaticon-half-star" />
                            </li>
                            </ul>
                            <p>
                            Pleasure of the moment, so blinded by desire, that they
                            cannot foresee the pain and trouble that are bound to
                            ensue and equal blame.
                            </p>
                            <h3>Nora Penelope</h3>
                            <h5>Manager - Intexture Interiors</h5>
                        </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
