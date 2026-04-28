"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/GlobalHooks/GlobalHooks";
import { imageURL } from "@/api/GlobalData";
import {
  getAllBlogs,
  getBlogBySlug,
  getRelatedBlogs,
} from "@/api/getOtherData";
import ShareArticle from "@/components/elements/ShareArticle";

const getCategoryLabel = (category, lang) =>
  category?.name?.[lang] ||
  category?.name?.en ||
  category?.title?.[lang] ||
  category?.title?.en ||
  "";

const getBlogImage = (blog) =>
  blog?.photo
    ? `${imageURL}blogs/${blog.photo}`
    : "/assets/images/news/news-5.jpg";

export default function BlogDetailsPage({ blog, relatedBlogs = [] }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  if (!blog) return null;

  const blogTitle = blog?.title?.[lang] || blog?.title?.en || "";
  const blogContent = blog?.content?.[lang] || blog?.content?.en || "";
  const blogExcerpt = blog?.excerpt?.[lang] || blog?.excerpt?.en || "";

  return (
    <Layout breadcrumbTitle={t("blog.BlogDetails")}>
      <section className="jadwa-blog-details-page sec-pad">
        <div className="auto-container">
          <div className="jadwa-blog-details-hero">
            <div className="jadwa-blog-details-hero-inner">
              {blog?.category ? (
                <Link
                  href={`/blogs?category=${blog.category._id}`}
                  className="jadwa-blog-details-category"
                >
                  {getCategoryLabel(blog.category, lang)}
                </Link>
              ) : null}

              <h1 className="jadwa-blog-details-title">{blogTitle}</h1>

              <div className="jadwa-blog-details-meta">
                <span>{formatDate(blog?.createdAt)}</span>

                {(blog?.author?.name || blog?.author?.role?.[lang]) && (
                  <>
                    <span className="jadwa-blog-details-meta-dot" />
                    <span>
                      {blog?.author?.name || "Jadir Investment"}
                      {blog?.author?.role?.[lang] ? (
                        <em className="jadwa-blog-details-author-role">
                          {" "}
                          · {blog?.author?.role?.[lang]}
                        </em>
                      ) : null}
                    </span>
                  </>
                )}
              </div>

              {blogExcerpt ? (
                <p
                  className="jadwa-blog-details-excerpt"
                  dangerouslySetInnerHTML={{ __html: blogExcerpt }}
                />
              ) : null}
            </div>

            <div className="jadwa-blog-details-image-wrap">
              <img
                src={getBlogImage(blog)}
                className="jadwa-blog-details-image"
                alt={blogTitle || "Blog"}
              />
            </div>
          </div>

          <div className="jadwa-blog-details-layout">
            <div className="jadwa-blog-details-main">
              <article className="jadwa-blog-details-article">
                <div className="jadwa-blog-details-content">
                  {parse(blogContent)}
                </div>
              </article>
            </div>

            <aside className="jadwa-blog-details-side">
              <div className="jadwa-blog-details-side-inner">
                {blog?.category ? (
                  <div className="jadwa-blog-side-card">
                    <div className="jadwa-blog-side-card-title">
                      {t("category")}
                    </div>

                    <div className="jadwa-blog-side-tags">
                      <Link href={`/blogs?category=${blog.category._id}`}>
                        {getCategoryLabel(blog.category, lang)}
                      </Link>
                    </div>
                  </div>
                ) : null}

                <div className="jadwa-blog-side-card">
                  <div className="jadwa-blog-side-card-title">
                    {lang === "ar"
                      ? "شارك المقال"
                      : lang === "tr"
                        ? "Yazıyı paylaş"
                        : "Share Article"}
                  </div>

                  <ShareArticle title={blogTitle} description={blogExcerpt} />
                </div>

                {relatedBlogs.length ? (
                  <div className="jadwa-blog-side-card">
                    <div className="jadwa-blog-side-card-title">
                      {t("relatedBlogs")}
                    </div>

                    <div className="jadwa-blog-side-list">
                      {relatedBlogs.map((item) => (
                        <Link
                          key={item?._id || item?.slug}
                          href={`/blogs/${item?.slug || item?._id}`}
                          className="jadwa-blog-side-post"
                        >
                          <div className="jadwa-blog-side-post-image-wrap">
                            <img
                              src={getBlogImage(item)}
                              alt={
                                item?.title?.[lang] || item?.title?.en || "Blog"
                              }
                              className="jadwa-blog-side-post-image"
                            />
                          </div>

                          <div className="jadwa-blog-side-post-content">
                            <h5>{item?.title?.[lang] || item?.title?.en}</h5>
                            <span>{formatDate(item?.createdAt)}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>

          {relatedBlogs.length ? (
            <div className="jadwa-blog-details-related">
              <div className="jadwa-testimonials-head jadwa-blog-related-head">
                <div className="jadwa-pill">
                  <span className="jadwa-pill-dot" />
                  <span>
                    {t("blog.RelatedBlogs") === "blog.RelatedBlogs"
                      ? "More From The Blog"
                      : t("blog.RelatedBlogs")}
                  </span>
                </div>

                <h2 className="jadwa-testimonials-title">
                  {t("blog.RelatedArticles") === "blog.RelatedArticles"
                    ? "Related Articles"
                    : t("blog.RelatedArticles")}
                </h2>
              </div>

              <div className="row clearfix">
                {relatedBlogs.map((item) => (
                  <div
                    key={item?._id || item?.slug}
                    className="col-lg-4 col-md-6 col-sm-12 mb-4"
                  >
                    <article className="jadwa-blog-card-v2">
                      <Link
                        href={`/blogs/${item?.slug || item?._id}`}
                        className="jadwa-blog-card-v2-image-link"
                      >
                        <img
                          src={getBlogImage(item)}
                          alt={item?.title?.[lang] || item?.title?.en || "Blog"}
                          className="jadwa-blog-card-v2-image"
                        />
                      </Link>

                      <div className="jadwa-blog-card-v2-content">
                        <div className="jadwa-blog-card-v2-top">
                          {item?.category ? (
                            <span className="jadwa-blog-card-v2-category">
                              {getCategoryLabel(item.category, lang)}
                            </span>
                          ) : null}

                          <span className="jadwa-blog-card-v2-date">
                            {formatDate(item?.createdAt)}
                          </span>
                        </div>

                        <h3 className="jadwa-blog-card-v2-title">
                          <Link href={`/blogs/${item?.slug || item?._id}`}>
                            {item?.title?.[lang] || item?.title?.en}
                          </Link>
                        </h3>

                        <div className="jadwa-blog-card-v2-footer">
                          <span className="jadwa-blog-card-v2-author">
                            {item?.author?.name || "Jadir Investment"}
                          </span>

                          <Link
                            href={`/blogs/${item?.slug || item?._id}`}
                            className="jadwa-blog-card-v2-link"
                          >
                            <span>{t("ExploreMore")}</span>
                            <i
                              className={`fa-solid ${
                                isRtl ? "fa-arrow-left" : "fa-arrow-right"
                              }`}
                            />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const payload = await getAllBlogs({ page: 1, limit: 100 });
    const blogs = Array.isArray(payload?.data) ? payload.data : [];

    return {
      paths: blogs
        .filter((blog) => blog?.slug)
        .map((blog) => ({
          params: { slug: blog.slug },
        })),
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params?.slug);

  if (!blog?._id && !blog?.slug) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const relatedBlogs = await getRelatedBlogs({
    blog,
    limit: 4,
  });

  return {
    props: {
      blog,
      relatedBlogs,
    },
    revalidate: 300,
  };
}
