'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    // spaceBetween: 30,
    autoplay: {
        delay: 2500,
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
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
    }
}

export default function MapSlider1() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="inner-box">
                    <div className="feature-block-two">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-7"></i></div>
                            <h3><Link href="/Services">Low Processing Fee</Link></h3>
                            <p>Tortor neque sed tellus estianian eget dui id ante tristique morever tristique dolor.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="inner-box">
                    <div className="feature-block-two">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-8"></i></div>
                            <h3><Link href="/Services">Fast Loans Approval</Link></h3>
                            <p>Tortor neque sed tellus estianian eget dui id ante tristique morever tristique dolor.</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="inner-box">
                    <div className="feature-block-two">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-8"></i></div>
                            <h3><Link href="/Services">Fast Loans Approval</Link></h3>
                            <p>Tortor neque sed tellus estianian eget dui id ante tristique morever tristique dolor.</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
