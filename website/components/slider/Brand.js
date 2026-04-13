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
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        767: {
            slidesPerView: 3,
            // spaceBetween: 30,
        },
        991: {
            slidesPerView: 4,
            // spaceBetween: 30,
        },
        1199: {
            slidesPerView: 5,
            // spaceBetween: 30,
        },
        1350: {
            slidesPerView: 5,
            // spaceBetween: 30,
        },
    }
}
export default function Brand() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                    <figure className="clients-logo">
                    <Link href="/">
                        <img src="assets/images/clients/clients-1.png" alt="" />
                    </Link>
                    </figure>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <figure className="clients-logo">
                  <Link href="/">
                    <img src="assets/images/clients/clients-2.png" alt="" />
                  </Link>
                </figure>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <figure className="clients-logo">
                  <Link href="/">
                    <img src="assets/images/clients/clients-3.png" alt="" />
                  </Link>
                </figure>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <figure className="clients-logo">
                  <Link href="/">
                    <img src="assets/images/clients/clients-4.png" alt="" />
                  </Link>
                </figure>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <figure className="clients-logo">
                  <Link href="/">
                    <img src="assets/images/clients/clients-5.png" alt="" />
                  </Link>
                </figure>
                </SwiperSlide>
                <SwiperSlide className="slide">
                    <figure className="clients-logo">
                    <Link href="/">
                        <img src="assets/images/clients/clients-1.png" alt="" />
                    </Link>
                    </figure>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <figure className="clients-logo">
                  <Link href="/">
                    <img src="assets/images/clients/clients-2.png" alt="" />
                  </Link>
                </figure>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <figure className="clients-logo">
                  <Link href="/">
                    <img src="assets/images/clients/clients-3.png" alt="" />
                  </Link>
                </figure>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <figure className="clients-logo">
                  <Link href="/">
                    <img src="assets/images/clients/clients-4.png" alt="" />
                  </Link>
                </figure>
                </SwiperSlide>
                <SwiperSlide className="slide">
                <figure className="clients-logo">
                  <Link href="/">
                    <img src="assets/images/clients/clients-5.png" alt="" />
                  </Link>
                </figure>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
