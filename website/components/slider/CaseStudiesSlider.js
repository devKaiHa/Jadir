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
export default function CaseStudiesSlider() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                  <div className="project-block-one">
                    <div className="inner-box">
                        <figure className="image-box">
                        <img src="assets/images/project/project-5.jpg" alt="" />
                        </figure>
                        <div className="content-inner">
                        <div className="text-box">
                            <h6>Business</h6>
                            <h3>
                            <Link href="/project-details">
                                Investing in Emerging Markets
                            </Link>
                            </h3>
                        </div>
                        <div className="link">
                            <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                            </Link>
                        </div>
                        </div>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-5.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div className="project-block-one">
                    <div className="inner-box">
                        <figure className="image-box">
                        <img src="assets/images/project/project-6.jpg" alt="" />
                        </figure>
                        <div className="content-inner">
                        <div className="text-box">
                            <h6>Investment</h6>
                            <h3>
                            <Link href="/project-details">
                                Revisiting Your Investment Goals
                            </Link>
                            </h3>
                        </div>
                        <div className="link">
                            <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                            </Link>
                        </div>
                        </div>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-6.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div className="project-block-one">
                    <div className="inner-box">
                        <figure className="image-box">
                        <img src="assets/images/project/project-7.jpg" alt="" />
                        </figure>
                        <div className="content-inner">
                        <div className="text-box">
                            <h6>Business</h6>
                            <h3>
                            <Link href="/project-details">
                                Dimensional Fund Advisors Interview
                            </Link>
                            </h3>
                        </div>
                        <div className="link">
                            <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                            </Link>
                        </div>
                        </div>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-7.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div className="project-block-one">
                    <div className="inner-box">
                        <figure className="image-box">
                        <img src="assets/images/project/project-5.jpg" alt="" />
                        </figure>
                        <div className="content-inner">
                        <div className="text-box">
                            <h6>Business</h6>
                            <h3>
                            <Link href="/project-details">
                                Investing in Emerging Markets
                            </Link>
                            </h3>
                        </div>
                        <div className="link">
                            <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                            </Link>
                        </div>
                        </div>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-5.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div className="project-block-one">
                    <div className="inner-box">
                        <figure className="image-box">
                        <img src="assets/images/project/project-6.jpg" alt="" />
                        </figure>
                        <div className="content-inner">
                        <div className="text-box">
                            <h6>Investment</h6>
                            <h3>
                            <Link href="/project-details">
                                Revisiting Your Investment Goals
                            </Link>
                            </h3>
                        </div>
                        <div className="link">
                            <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                            </Link>
                        </div>
                        </div>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-6.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div className="project-block-one">
                    <div className="inner-box">
                        <figure className="image-box">
                        <img src="assets/images/project/project-7.jpg" alt="" />
                        </figure>
                        <div className="content-inner">
                        <div className="text-box">
                            <h6>Business</h6>
                            <h3>
                            <Link href="/project-details">
                                Dimensional Fund Advisors Interview
                            </Link>
                            </h3>
                        </div>
                        <div className="link">
                            <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                            </Link>
                        </div>
                        </div>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-7.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div className="project-block-one">
                    <div className="inner-box">
                        <figure className="image-box">
                        <img src="assets/images/project/project-5.jpg" alt="" />
                        </figure>
                        <div className="content-inner">
                        <div className="text-box">
                            <h6>Business</h6>
                            <h3>
                            <Link href="/project-details">
                                Investing in Emerging Markets
                            </Link>
                            </h3>
                        </div>
                        <div className="link">
                            <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                            </Link>
                        </div>
                        </div>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-5.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div className="project-block-one">
                    <div className="inner-box">
                        <figure className="image-box">
                        <img src="assets/images/project/project-6.jpg" alt="" />
                        </figure>
                        <div className="content-inner">
                        <div className="text-box">
                            <h6>Investment</h6>
                            <h3>
                            <Link href="/project-details">
                                Revisiting Your Investment Goals
                            </Link>
                            </h3>
                        </div>
                        <div className="link">
                            <Link href="/project-details">
                            <i className="flaticon-diagonal-arrow" />
                            </Link>
                        </div>
                        </div>
                        <div className="view-btn">
                        <Link
                            href="assets/images/project/project-6.jpg"
                            className="lightbox-image"
                            data-fancybox="gallery"
                        >
                            <i className="flaticon-zoom-in" />
                        </Link>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
