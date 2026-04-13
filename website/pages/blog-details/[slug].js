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

  if (!blog) return null;

  return (
    <Layout breadcrumbTitle={t("blog.BlogDetails")}>
      <section className="sidebar-page-container blog-details sec-pad">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-details-content">
                <div className="content-one">
                  <div className="author-post">
                    <ul className="clearfix">
                      <li>
                        <span>{t("On")}: </span>
                        {formatDate(blog?.createdAt)}
                      </li>
                      {blog?.author?.name ? (
                        <li>
                          <span>{t("By")}: </span>
                          {blog.author.name}
                        </li>
                      ) : null}
                    </ul>
                  </div>

                  <h2>{blog?.title?.[lang] || blog?.title?.en}</h2>

                  {blog?.category ? (
                    <p style={{ color: "#0f5662", fontWeight: 600 }}>
                      <Link href={`/blog-2?category=${blog.category._id}`}>
                        {getCategoryLabel(blog.category, lang)}
                      </Link>
                    </p>
                  ) : null}

                  <img
                    style={{ objectFit: "contain" }}
                    src={getBlogImage(blog)}
                    className="blog-detail-img"
                    alt={blog?.title?.[lang] || blog?.title?.en || "Blog"}
                  />

                  <div className="text-box">
                    {blog?.content?.[lang]
                      ? parse(blog.content[lang])
                      : parse(blog?.content?.en || "")}
                  </div>
                </div>

                {relatedBlogs.length ? (
                  <div className="content-one" style={{ marginTop: "60px" }}>
                    <div className="sec-title mb-4">
                      <span className="sub-title">
                        {t("blog.RelatedBlogs") === "blog.RelatedBlogs"
                          ? "More From The Blog"
                          : t("blog.RelatedBlogs")}
                      </span>
                      <h2>
                        {t("blog.RelatedArticles") === "blog.RelatedArticles"
                          ? "Related Articles"
                          : t("blog.RelatedArticles")}
                      </h2>
                    </div>

                    <div className="row clearfix">
                      {relatedBlogs.map((item) => (
                        <div
                          key={item?._id || item?.slug}
                          className="col-lg-6 col-md-6 col-sm-12"
                        >
                          <div className="news-block-one">
                            <div className="inner-box">
                              <figure className="image-box">
                                <Link
                                  href={`/blog-details/${item?.slug || item?._id}`}
                                >
                                  <img
                                    src={getBlogImage(item)}
                                    alt={
                                      item?.title?.[lang] ||
                                      item?.title?.en ||
                                      "Blog"
                                    }
                                    style={{
                                      objectFit: "cover",
                                      width: "100%",
                                      height: "240px",
                                    }}
                                  />
                                </Link>
                              </figure>
                              <div className="lower-content">
                                <div className="post-date">
                                  {formatDate(item?.createdAt)}
                                </div>
                                <h3>
                                  <Link
                                    href={`/blog-details/${item?.slug || item?._id}`}
                                  >
                                    {item?.title?.[lang] || item?.title?.en}
                                  </Link>
                                </h3>
                                {item?.category ? (
                                  <p
                                    style={{
                                      color: "#0f5662",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {getCategoryLabel(item.category, lang)}
                                  </p>
                                ) : null}
                                <div className="link">
                                  <Link
                                    href={`/blog-details/${item?.slug || item?._id}`}
                                  >
                                    {t("ExploreMore")}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar">
                {blog?.category ? (
                  <div className="sidebar-widget tags-widget">
                    <div className="widget-title">
                      <h3>{t("category")}</h3>
                    </div>
                    <div className="widget-content">
                      <ul className="tags-list clearfix">
                        <li>
                          <Link href={`/blog-2?category=${blog.category._id}`}>
                            {getCategoryLabel(blog.category, lang)}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : null}

                {relatedBlogs.length ? (
                  <div className="sidebar-widget post-widget">
                    <div className="widget-title">
                      <h3>
                        {t("blog.RelatedBlogs") === "blog.RelatedBlogs"
                          ? "Related Blogs"
                          : t("blog.RelatedBlogs")}
                      </h3>
                    </div>
                    <div className="post-inner">
                      {relatedBlogs.map((item) => (
                        <div className="post" key={item?._id || item?.slug}>
                          <figure className="post-thumb">
                            <Link
                              href={`/blog-details/${item?.slug || item?._id}`}
                            >
                              <img
                                src={getBlogImage(item)}
                                alt={
                                  item?.title?.[lang] ||
                                  item?.title?.en ||
                                  "Blog"
                                }
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "90px",
                                }}
                              />
                            </Link>
                          </figure>
                          <h5>
                            <Link
                              href={`/blog-details/${item?.slug || item?._id}`}
                            >
                              {item?.title?.[lang] || item?.title?.en}
                            </Link>
                          </h5>
                          <span className="post-date">
                            {formatDate(item?.createdAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <ShareArticle
                title={blog?.title?.[lang] || blog?.title?.en}
                description={blog?.excerpt?.[lang] || blog?.excerpt?.en}
              />
            </div>
          </div>
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
