
'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
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
}

export default function Banner() {
    return (
        <>

            <section className="banner-style-two">
                <Swiper {...swiperOptions} className="banner-carousel">                    
                    <SwiperSlide className="slide-item style-one p_relative">
                        <div
                            className="image-layer"
                            style={{ backgroundImage: "url(assets/images/banner/banner-4.jpg)" }}
                        />
                        <div className="auto-container">
                            <div className="content-box">
                            <h6>Invest under our expertise</h6>
                            <h2>Professional Financial Advisers for Your Needs</h2>
                            <p>
                                The moment, so blinded by desire, that they cannot foresee the pain{" "}
                                <br />
                                and trouble that are bound to ensue.
                            </p>
                            <div className="btn-box">
                                <Link href="/Services" className="theme-btn btn-two">
                                Services &amp; Plan
                                </Link>
                            </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-item p_relative">
                        <div
                            className="image-layer"
                            style={{ backgroundImage: "url(assets/images/banner/banner-5.jpg)" }}
                        />
                        <div className="auto-container">
                            <div className="content-box">
                            <h6>Plans that never fails</h6>
                            <h2>Thinking &amp; Planning for our Clients Future</h2>
                            <p>
                                Cases are perfectly simple and easy to distinguish. In a free hour,{" "}
                                <br /> when our power of choice when nothing prevents.
                            </p>
                            <div className="btn-box">
                                <Link href="/Services" className="theme-btn btn-two">
                                Services &amp; Plan
                                </Link>
                            </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-item p_relative">
                        <div
                            className="image-layer"
                            style={{ backgroundImage: "url(assets/images/banner/banner-6.jpg)" }}
                        />
                        <div className="auto-container">
                            <div className="content-box">
                            <h6>Be a smart investor</h6>
                            <h2>Giving Good Directions to your Investment</h2>
                            <p>
                                The moment, so blinded by desire, that they cannot foresee the pain{" "}
                                <br />
                                and trouble that are bound to ensue.
                            </p>
                            <div className="btn-box">
                                <Link href="/Services" className="theme-btn btn-two">
                                Services &amp; Plan
                                </Link>
                            </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

            </section>
        </>
    )
}
