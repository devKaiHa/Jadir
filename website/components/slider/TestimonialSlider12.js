'use client'
import Link from "next/link"
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
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1199: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1350: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
    }
}
export default function TestimonialSlider12() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                <div className="project-block-two">
                    <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                        <img src="assets/images/project/project-8.jpg" alt="" />
                        </figure>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-8.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                    <div className="lower-content">
                        <div className="text-box">
                        <h6>Business</h6>
                        <h3>
                            <Link href="/project-details">
                            Investing in Emerging Markets
                            </Link>
                        </h3>
                        <p>
                            Power of choice untrammelled when nothing prevent to do what
                            we like best.
                        </p>
                        </div>
                        <div className="link">
                        <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="project-block-two">
                    <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                        <img src="assets/images/project/project-9.jpg" alt="" />
                        </figure>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-9.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                    <div className="lower-content">
                        <div className="text-box">
                        <h6>strategy</h6>
                        <h3>
                            <Link href="/project-details">
                            Real Time Analysis &amp; Reporting{" "}
                            </Link>
                        </h3>
                        <p>
                            Some advantage from it? But who has any right to find fault
                            with a man who chooses.
                        </p>
                        </div>
                        <div className="link">
                        <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                        </Link>
                        </div>
                    </div>
                    </div>
              </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="project-block-two">
                    <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                        <img src="assets/images/project/project-8.jpg" alt="" />
                        </figure>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-8.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                    <div className="lower-content">
                        <div className="text-box">
                        <h6>Business</h6>
                        <h3>
                            <Link href="/project-details">
                            Investing in Emerging Markets
                            </Link>
                        </h3>
                        <p>
                            Power of choice untrammelled when nothing prevent to do what
                            we like best.
                        </p>
                        </div>
                        <div className="link">
                        <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <div className="project-block-two">
                    <div className="inner-box">
                    <div className="image-box">
                        <figure className="image">
                        <img src="assets/images/project/project-9.jpg" alt="" />
                        </figure>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-9.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                    <div className="lower-content">
                        <div className="text-box">
                        <h6>strategy</h6>
                        <h3>
                            <Link href="/project-details">
                            Real Time Analysis &amp; Reporting{" "}
                            </Link>
                        </h3>
                        <p>
                            Some advantage from it? But who has any right to find fault
                            with a man who chooses.
                        </p>
                        </div>
                        <div className="link">
                        <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                        </Link>
                        </div>
                    </div>
                    </div>
              </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
