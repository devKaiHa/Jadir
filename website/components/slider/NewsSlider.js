"use client";
import Link from "next/link";
import BlogImg from "../../public/assets/images/news/news-1.jpg";
import BlogImgSmall from "../../public/assets/images/news/post-3.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatDate } from "@/GlobalHooks/GlobalHooks";
import { useTranslation } from "react-i18next";
import { imageURL } from "@/api/GlobalData";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
  spaceBetween: 30,
  autoplay: {
    delay: 700000,
    disableOnInteraction: false,
  },
  loop: true,
  dir: "ltr",
  // Navigation
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
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
  },
};

export default function NewsSlider({ news }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const slideChunks = [news?.slice?.(0, 5) || [], news?.slice?.(5, 10) || []];

  return (
    <Swiper {...swiperOptions} className="theme_carousel owl-theme">
      {slideChunks
        ?.filter((chunk) => chunk?.length > 0)
        ?.map((chunk, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="row clearfix">
              {/* First 2 posts - large cards */}
              {chunk?.slice(0, 2).map((blog, i) => {
                return (
                  <div
                    key={blog?._id}
                    className="col-lg-4 col-md-6 col-sm-12 news-block"
                  >
                    <div
                      className="news-block-one wow fadeInUp animated"
                      data-wow-delay={`${i * 300}ms`}
                      data-wow-duration="1500ms"
                    >
                      <div className="inner-box" style={{ height: "33em" }}>
                        <div className="upper-box">
                          <span className="category">
                            {blog?.category?.name?.[currentLang] ??
                              `${t("General")}`}
                          </span>
                          <ul className="post-info clearfix">
                            <li>
                              <span>{t("On")}</span>{" "}
                              {formatDate(blog?.createdAt)}
                            </li>
                            <li>
                              <span>{t("By")}</span> <Link href="#">Admin</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="image-box">
                          <figure className="image">
                            <Link href={`/blog-details/${blog?.slug || blog?._id}`}>
                              <img
                                src={`${imageURL}blogs/${
                                  blog.photo ||
                                  blog?.thumbnailImage?.[0] ||
                                  blog?.thumbnailImage ||
                                  BlogImg.src
                                }`}
                                alt={
                                  blog?.title?.[currentLang].slice(0, 15) ??
                                  "Blog"
                                }
                              />
                            </Link>
                          </figure>
                          <div className="view-btn">
                            <Link
                              href={`/blog-details/${blog?.slug || blog?._id}`}
                              className="lightbox-image"
                              data-fancybox="gallery"
                            >
                              <i className="flaticon-zoom-in" />
                            </Link>
                          </div>
                        </div>
                        <div className="lower-box">
                          <h3 style={{ height: "4em" }}>
                            <Link href={`/blog-details/${blog?.slug || blog?._id}`}>
                              {blog?.title?.[currentLang]
                                ? blog.title[currentLang].split(" ").length > 6
                                  ? blog.title[currentLang]
                                      .split(" ")
                                      .slice(0, 6)
                                      .join(" ") + "..."
                                  : blog.title[currentLang]
                                : "there is no title"}
                            </Link>
                          </h3>
                          <div className="link">
                            <Link href={`/blog-details/${blog?.slug || blog?._id}`}>
                              <span>{t("ExploreMore")}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Sidebar posts */}
              <div className="col-lg-4 col-md-6 col-sm-12 post-column">
                {chunk?.slice(2, 5).map((blog) => (
                  <div key={blog?._id} className="post-block-one">
                    <div className="inner-box" style={{ height: "8em" }}>
                      <figure className="post-thumb">
                        <Link href={`/blog-details/${blog?.slug || blog?._id}`}>
                          <img
                            src={
                              blog?.thumbnailImage?.[0] ||
                              blog?.thumbnailImage ||
                              BlogImgSmall.src
                            }
                            alt={
                              blog?.title?.[currentLang].slice(0, 15) ?? "Blog"
                            }
                          />
                        </Link>
                      </figure>
                      <span className="category">
                        {blog?.category?.name?.[currentLang] ??
                          `${t("General")}`}
                      </span>
                      <h4>
                        <Link href={`/blog-details/${blog?.slug || blog?._id}`}>
                          {blog?.title?.[currentLang]
                            ? blog.title[currentLang].split(" ").length > 5
                              ? blog.title[currentLang]
                                  .split(" ")
                                  .slice(0, 5)
                                  .join(" ") + "..."
                              : blog.title[currentLang]
                            : "there is no title"}
                        </Link>
                      </h4>
                    </div>
                  </div>
                ))}
                <div className="btn-box">
                  <Link href="/blog-2" className="theme-btn btn-two">
                    {t("Read All Posts")}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
