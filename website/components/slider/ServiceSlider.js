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
export default function ServiceSlider() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                  <div className="content-box">
                    <div className="row clearfix">
                      <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                        <div className="service-block-three">
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src="assets/images/service/service-5.jpg" alt="" />
                              </figure>
                              <div className="icon-box">
                                <i className="flaticon-analytics" />
                              </div>
                            </div>
                            <div className="lower-content">
                              <h3>
                                <Link href="/Services">
                                  Private Client <br />
                                  Investment Management
                                </Link>
                              </h3>
                              <div className="link">
                                <Link href="/Services">
                                  <span>Explore Service</span>
                                </Link>
                              </div>
                              <p>
                                That they cannot foresee the pain trouble that are bound
                                ensue equal blame belongs to duty.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                        <div className="service-block-three">
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src="assets/images/service/service-6.jpg" alt="" />
                              </figure>
                              <div className="icon-box">
                                <i className="flaticon-office-building" />
                              </div>
                            </div>
                            <div className="lower-content">
                              <h3>
                                <Link href="/Services">
                                  Institutional <br />
                                  Investment Consulting
                                </Link>
                              </h3>
                              <div className="link">
                                <Link href="/Services">
                                  <span>Explore Service</span>
                                </Link>
                              </div>
                              <p>
                                Power of choice is untrammelled when nothing prevent our
                                being all to do what we like best.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                        <div className="service-block-three">
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src="assets/images/service/service-7.jpg" alt="" />
                              </figure>
                              <div className="icon-box">
                                <i className="flaticon-retirement" />
                              </div>
                            </div>
                            <div className="lower-content">
                              <h3>
                                <Link href="/Services">
                                  Retirement Plan <br />
                                  Consulting
                                </Link>
                              </h3>
                              <div className="link">
                                <Link href="/Services">
                                  <span>Explore Service</span>
                                </Link>
                              </div>
                              <p>
                                Obligations of business it will occur that pleasures have
                                to repudiaters and annoyances accepted.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div className="content-box">
                    <div className="row clearfix">
                      <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                        <div className="service-block-three">
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src="assets/images/service/service-5.jpg" alt="" />
                              </figure>
                              <div className="icon-box">
                                <i className="flaticon-analytics" />
                              </div>
                            </div>
                            <div className="lower-content">
                              <h3>
                                <Link href="/Services">
                                  Private Client <br />
                                  Investment Management
                                </Link>
                              </h3>
                              <div className="link">
                                <Link href="/Services">
                                  <span>Explore Service</span>
                                </Link>
                              </div>
                              <p>
                                That they cannot foresee the pain trouble that are bound
                                ensue equal blame belongs to duty.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                        <div className="service-block-three">
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src="assets/images/service/service-6.jpg" alt="" />
                              </figure>
                              <div className="icon-box">
                                <i className="flaticon-office-building" />
                              </div>
                            </div>
                            <div className="lower-content">
                              <h3>
                                <Link href="/Services">
                                  Institutional <br />
                                  Investment Consulting
                                </Link>
                              </h3>
                              <div className="link">
                                <Link href="/Services">
                                  <span>Explore Service</span>
                                </Link>
                              </div>
                              <p>
                                Power of choice is untrammelled when nothing prevent our
                                being all to do what we like best.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                        <div className="service-block-three">
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src="assets/images/service/service-7.jpg" alt="" />
                              </figure>
                              <div className="icon-box">
                                <i className="flaticon-retirement" />
                              </div>
                            </div>
                            <div className="lower-content">
                              <h3>
                                <Link href="/Services">
                                  Retirement Plan <br />
                                  Consulting
                                </Link>
                              </h3>
                              <div className="link">
                                <Link href="/Services">
                                  <span>Explore Service</span>
                                </Link>
                              </div>
                              <p>
                                Obligations of business it will occur that pleasures have
                                to repudiaters and annoyances accepted.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide">
                  <div className="content-box">
                    <div className="row clearfix">
                      <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                        <div className="service-block-three">
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src="assets/images/service/service-5.jpg" alt="" />
                              </figure>
                              <div className="icon-box">
                                <i className="flaticon-analytics" />
                              </div>
                            </div>
                            <div className="lower-content">
                              <h3>
                                <Link href="/Services">
                                  Private Client <br />
                                  Investment Management
                                </Link>
                              </h3>
                              <div className="link">
                                <Link href="/Services">
                                  <span>Explore Service</span>
                                </Link>
                              </div>
                              <p>
                                That they cannot foresee the pain trouble that are bound
                                ensue equal blame belongs to duty.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                        <div className="service-block-three">
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src="assets/images/service/service-6.jpg" alt="" />
                              </figure>
                              <div className="icon-box">
                                <i className="flaticon-office-building" />
                              </div>
                            </div>
                            <div className="lower-content">
                              <h3>
                                <Link href="/Services">
                                  Institutional <br />
                                  Investment Consulting
                                </Link>
                              </h3>
                              <div className="link">
                                <Link href="/Services">
                                  <span>Explore Service</span>
                                </Link>
                              </div>
                              <p>
                                Power of choice is untrammelled when nothing prevent our
                                being all to do what we like best.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                        <div className="service-block-three">
                          <div className="inner-box">
                            <div className="image-box">
                              <figure className="image">
                                <img src="assets/images/service/service-7.jpg" alt="" />
                              </figure>
                              <div className="icon-box">
                                <i className="flaticon-retirement" />
                              </div>
                            </div>
                            <div className="lower-content">
                              <h3>
                                <Link href="/Services">
                                  Retirement Plan <br />
                                  Consulting
                                </Link>
                              </h3>
                              <div className="link">
                                <Link href="/Services">
                                  <span>Explore Service</span>
                                </Link>
                              </div>
                              <p>
                                Obligations of business it will occur that pleasures have
                                to repudiaters and annoyances accepted.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
