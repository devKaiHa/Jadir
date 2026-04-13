"use client";
import Layout from "@/components/layout/Layout";
import { formatDate, truncateText } from "@/GlobalHooks/GlobalHooks";
import Link from "next/link";
import Pagination from "@/GlobalComponents/Pagination";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { getAllBlogs, getAllCategories } from "@/api/getOtherData";
import { imageURL } from "@/api/GlobalData";

const BLOGS_PER_PAGE = 5;

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

export default function BlogPage({ initialBlogs, initialCategories }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [blogs, setBlogs] = useState(initialBlogs);
  const [isLoading, setIsLoading] = useState(false);

  const categories = useMemo(
    () => initialCategories?.data || [],
    [initialCategories],
  );

  useEffect(() => {
    if (!router.isReady) return;

    const queryPage = Number.parseInt(router.query.page, 10);
    const nextPage =
      Number.isFinite(queryPage) && queryPage > 0 ? queryPage : 1;
    const nextCategory =
      typeof router.query.category === "string" ? router.query.category : "";
    const nextKeyword =
      typeof router.query.keyword === "string" ? router.query.keyword : "";

    setCurrentPage(nextPage);
    setCategoryId(nextCategory);
    setSearchInput(nextKeyword);
    setKeyword(nextKeyword);
  }, [
    router.isReady,
    router.query.page,
    router.query.category,
    router.query.keyword,
  ]);

  useEffect(() => {
    if (!router.isReady) return;

    const nextQuery = {};
    if (currentPage > 1) nextQuery.page = String(currentPage);
    if (categoryId) nextQuery.category = categoryId;
    if (keyword) nextQuery.keyword = keyword;

    const currentQuery = {
      page:
        typeof router.query.page === "string" ? router.query.page : undefined,
      category:
        typeof router.query.category === "string"
          ? router.query.category
          : undefined,
      keyword:
        typeof router.query.keyword === "string"
          ? router.query.keyword
          : undefined,
    };

    const hasChanged =
      currentQuery.page !== nextQuery.page ||
      currentQuery.category !== nextQuery.category ||
      currentQuery.keyword !== nextQuery.keyword;

    if (hasChanged) {
      router.replace(
        {
          pathname: "/blog-2",
          query: nextQuery,
        },
        undefined,
        { shallow: true },
      );
    }
  }, [router, router.isReady, currentPage, categoryId, keyword]);

  useEffect(() => {
    let active = true;

    async function loadBlogs() {
      setIsLoading(true);

      try {
        const data = await getAllBlogs({
          page: currentPage,
          limit: BLOGS_PER_PAGE,
          CategoryId: categoryId,
          keyword,
        });

        if (active) {
          setBlogs(data);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadBlogs();

    return () => {
      active = false;
    };
  }, [currentPage, categoryId, keyword]);

  const totalPages = blogs?.pagination?.totalPages ?? 0;
  const totalItems = blogs?.pagination?.totalItems ?? blogs?.data?.length ?? 0;

  const handleCategoryChange = (nextCategoryId = "") => {
    setCategoryId(nextCategoryId);
    setCurrentPage(1);
  };

  return (
    <Layout
      breadcrumbTitle={t("blog.Blogs")}
      image="/assets/images/background/blogs.png"
    >
      <section className="sidebar-page-container blog-list-one sec-pad">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar">
                <div className="sidebar-widget search-widget">
                  <div className="search-inner">
                    <form
                      className="p-0"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setKeyword(searchInput.trim());
                        setCurrentPage(1);
                      }}
                    >
                      <div className="form-group">
                        <input
                          type="search"
                          className="input w-100 pe-1"
                          placeholder="Search by title, author, or tags"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              setKeyword(searchInput.trim());
                              setCurrentPage(1);
                            }
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <div className="sidebar-widget category-widget">
                  <div className="widget-title">
                    <h3>{t("Categories")}</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="category-list clearfix">
                      <li
                        onClick={() => handleCategoryChange("")}
                        style={{ cursor: "pointer" }}
                        className={!categoryId ? "current" : ""}
                      >
                        <a>{t("All")}</a>
                      </li>
                      {categories.length > 0 ? (
                        categories.map((item) => (
                          <li
                            key={item._id}
                            onClick={() => handleCategoryChange(item._id)}
                            style={{ cursor: "pointer" }}
                            className={categoryId === item._id ? "current" : ""}
                          >
                            <a>{getCategoryLabel(item, currentLang)}</a>
                          </li>
                        ))
                      ) : (
                        <p>{t("noCategories")}</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-list-content">
                {isLoading ? (
                  <p>
                    {t("loading") === "loading" ? "Loading..." : t("loading")}
                  </p>
                ) : null}

                {!isLoading && blogs?.data?.length > 0
                  ? blogs.data.map((blog) => (
                      <div
                        className="news-block-two"
                        key={blog?._id || blog?.slug}
                      >
                        <div className="inner-box">
                          <div className="image-box">
                            <figure className="image">
                              <Link
                                href={`/blog-details/${blog?.slug || blog?._id}`}
                              >
                                <img
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                  src={getBlogImage(blog)}
                                  alt={
                                    blog?.title?.[currentLang] ||
                                    blog?.title?.en ||
                                    "Blog"
                                  }
                                />
                              </Link>
                            </figure>
                          </div>
                          <div className="content-box">
                            <ul className="post-info clearfix">
                              <li>
                                <span>{t("On")}</span>
                                {formatDate(blog?.createdAt)}
                              </li>
                              <li>
                                <span>{t("By")}</span>{" "}
                                <Link
                                  href={`/blog-details/${blog?.slug || blog?._id}`}
                                >
                                  {blog?.author?.name || "Jadwa investment"}{" "}
                                  <span
                                    className="text-muted"
                                    style={{ fontSize: "14px" }}
                                  >
                                    (
                                    {blog?.author?.role?.[currentLang] ||
                                      "Blogger"}
                                    )
                                  </span>
                                </Link>
                              </li>
                            </ul>
                            <h3 className="h-auto">
                              <Link
                                href={`/blog-details/${blog?.slug || blog?._id}`}
                              >
                                {truncateText(
                                  blog?.title?.[currentLang] || blog?.title?.en,
                                  30,
                                ) || "There is no title"}
                              </Link>
                            </h3>

                            {blog?.category ? (
                              <p
                                className="mb-2 h-auto"
                                style={{ color: "#0f5662", fontWeight: 600 }}
                              >
                                {getCategoryLabel(blog.category, currentLang)}
                              </p>
                            ) : null}

                            {blog?.content?.[currentLang] ||
                            blog?.content?.en ? (
                              <span
                                className="h-auto"
                                dangerouslySetInnerHTML={{
                                  __html: truncateText(
                                    blog?.content?.[currentLang] ||
                                      blog?.content?.en,
                                    100,
                                  ),
                                }}
                              />
                            ) : (
                              <p>There is no content.</p>
                            )}

                            <div className="link">
                              <Link
                                href={`/blog-details/${blog?.slug || blog?._id}`}
                              >
                                <span>{t("ExploreMore")}</span>
                              </Link>
                            </div>
                            <div className="share-box">
                              <Link
                                href={`/blog-details/${blog?.slug || blog?._id}`}
                              >
                                <i className="flaticon-share" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}

                {!isLoading && !blogs?.data?.length ? (
                  <p>
                    {keyword || categoryId
                      ? "No blogs match the current filters."
                      : "There are no blogs available yet."}
                  </p>
                ) : null}

                {!isLoading && totalItems > 0 ? (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const [blogs, categories] = await Promise.all([
    getAllBlogs({ page: 1, limit: BLOGS_PER_PAGE }),
    getAllCategories(),
  ]);

  return {
    props: {
      initialBlogs: blogs,
      initialCategories: categories,
    },
    revalidate: 60,
  };
}
