import Link from "next/link";
import Layout from "@/components/layout/Layout";
import baseURL, { imageURL, SearchEndPoint } from "@/api/GlobalData";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPageBanners, resolvePageBanner } from "@/lib/pageBanners";

const typeOptions = [
  { value: "all", labelKey: "all" },
  { value: "services", labelKey: "services" },
  { value: "projects", labelKey: "projects" },
  { value: "blogs", labelKey: "blogs" },
  { value: "pages", labelKey: "pages" },
  { value: "team", labelKey: "team" },
  { value: "careers", labelKey: "careers" },
];

const sortOptions = [
  { value: "relevant", labelKey: "relevant" },
  { value: "newest", labelKey: "newest" },
  { value: "oldest", labelKey: "oldest" },
];

const createEmptyResults = (
  pageLimit = 10,
  type = "all",
  sort = "relevant",
) => ({
  data: [],
  suggestions: [],
  groups: {},
  total: 0,
  pagination: {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: pageLimit,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  filters: { type, sort },
});

const localize = (value, lang = "en") => {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  return value[lang] || value.en || value.ar || "";
};

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const Highlight = ({ text, keyword }) => {
  if (!keyword?.trim()) return text;

  const parts = `${text || ""}`.split(
    new RegExp(`(${escapeRegex(keyword)})`, "ig"),
  );

  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark key={`${part}-${index}`}>{part}</mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
};

const getImageSrc = (item) => {
  if (!item?.image || !item?.imageFolder) return "";
  return `${imageURL}${item.imageFolder}/${item.image}`;
};

const buildSearchHref = ({ q, type, sort, page = 1, pageLimit = 10 }) => {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (type && type !== "all") params.set("type", type);
  if (sort && sort !== "relevant") params.set("sort", sort);
  if (page > 1) params.set("page", String(page));
  if (pageLimit !== 10) params.set("pageLimit", String(pageLimit));
  return `/search?${params.toString()}`;
};

export default function SearchPage({
  initialQuery = "",
  selectedType = "all",
  selectedSort = "relevant",
  pageLimit = 10,
  initialResults = {},
  pageBanners = {},
}) {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isArabic = lang === "ar";

  const [queryValue, setQueryValue] = useState(initialQuery);
  const [activeType, setActiveType] = useState(selectedType);
  const [activeSort, setActiveSort] = useState(selectedSort);
  const [results, setResults] = useState(initialResults);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQueryValue(initialQuery);
    setActiveType(selectedType);
    setActiveSort(selectedSort);
    setResults(initialResults);
  }, [initialQuery, selectedType, selectedSort, initialResults]);

  const items = Array.isArray(results?.data) ? results.data : [];
  const suggestions = Array.isArray(results?.suggestions)
    ? results.suggestions
    : [];
  const groups = results?.groups || {};
  const pagination = results?.pagination || {};
  const total = pagination?.totalItems || results?.total || 0;
  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.totalPages || 0;
  const getTypeLabel = (item) =>
    t(`search.types.${item?.type}`, item?.typeLabel);

  const typeCounts = useMemo(
    () =>
      typeOptions.map((option) => ({
        ...option,
        count:
          option.value === "all"
            ? Object.values(groups).reduce(
                (sum, group) => sum + (group?.total || 0),
                0,
              )
            : groups?.[option.value]?.total || 0,
      })),
    [groups],
  );

  const runSearch = async ({
    q = queryValue,
    type = activeType,
    sort = activeSort,
    page = 1,
  } = {}) => {
    const trimmedQuery = `${q || ""}`.trim();
    const nextHref = buildSearchHref({
      q: trimmedQuery,
      type,
      sort,
      page,
      pageLimit,
    });

    router.replace(nextHref, undefined, { shallow: true, scroll: false });

    if (!trimmedQuery) {
      setResults(createEmptyResults(pageLimit, type, sort));
      return;
    }

    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        q: trimmedQuery,
        all: "true",
        type,
        sort,
        page: String(page),
        pageLimit: String(pageLimit),
      });

      const payload = await fetchJSON(
        `${baseURL}${SearchEndPoint}?${params.toString()}`,
      );

      setResults(payload);
    } catch (error) {
      setResults(createEmptyResults(pageLimit, type, sort));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      breadcrumbTitle={t("search.breadcrumb")}
      image={resolvePageBanner("search", pageBanners)}
    >
      <section
        className={`search-page-section sec-pad jadwa-search-page ${
          isArabic ? "rtl" : ""
        }`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">{t("search.eyebrow")}</span>
            <h2>{t("search.title")}</h2>
          </div>

          <form
            className="search-page-form"
            onSubmit={(event) => {
              event.preventDefault();
              runSearch({
                q: queryValue,
                type: activeType,
                sort: activeSort,
                page: 1,
              });
            }}
          >
            <div className="search-page-control">
              <span>{t("search.keyword")}</span>
              <input
                type="search"
                name="q"
                value={queryValue}
                onChange={(event) => setQueryValue(event.target.value)}
                placeholder={t("search.input")}
                aria-label={t("search.input")}
              />
            </div>

            <div className="search-page-control">
              <span>{t("search.sort")}</span>
              <select
                name="sort"
                value={activeSort}
                onChange={(event) => {
                  const nextSort = event.target.value;
                  setActiveSort(nextSort);
                  runSearch({
                    q: queryValue,
                    type: activeType,
                    sort: nextSort,
                    page: 1,
                  });
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(`search.${option.labelKey}`)}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={isLoading}>
              <i className="fa-solid fa-magnifying-glass" />
              <span>{isLoading ? "..." : t("search.button")}</span>
            </button>
          </form>

          <div className="search-page-type-strip">
            {typeCounts.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => {
                  setActiveType(option.value);
                  runSearch({
                    q: queryValue,
                    type: option.value,
                    sort: activeSort,
                    page: 1,
                  });
                }}
                className={activeType === option.value ? "active" : ""}
              >
                <span>{t(`search.types.${option.labelKey}`)}</span>
                <strong>{option.count}</strong>
              </button>
            ))}
          </div>

          <div className="search-page-summary">
            <strong>{total}</strong> {t("search.count")}
          </div>

          {isLoading && (
            <div className="search-page-loading">{t("search.updating")}</div>
          )}

          {total === 0 ? (
            <>
              <div className="search-page-empty">{t("search.empty")}</div>

              {!!suggestions.length && (
                <div className="search-page-suggestions">
                  <div className="search-page-suggestions-head">
                    <h3>{t("search.suggestionsTitle")}</h3>
                    <p>{t("search.suggestionsCopy")}</p>
                  </div>

                  <div className="search-page-list">
                    {suggestions.map((item) => {
                      const title = localize(item.title, lang);
                      const imgSrc = getImageSrc(item);

                      return (
                        <Link
                          key={`suggested-${item.type}-${item.id}`}
                          href={item.url}
                          className="search-page-result suggested"
                        >
                          <span className="search-page-thumb">
                            {imgSrc ? (
                              <img src={imgSrc} alt={title} />
                            ) : (
                              <i className="fa-solid fa-file-lines" />
                            )}
                          </span>
                          <span className="search-page-result-copy">
                            <span className="search-page-result-meta">
                              <span>{getTypeLabel(item)}</span>
                              <em>{t("search.suggested")}</em>
                            </span>
                            <strong>
                              <Highlight text={title} keyword={queryValue} />
                            </strong>
                          </span>
                          <i
                            className={`fa-solid ${
                              isArabic ? "fa-arrow-left" : "fa-arrow-right"
                            }`}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="search-page-list">
                {items.map((item) => {
                  const title = localize(item.title, lang);
                  const imgSrc = getImageSrc(item);

                  return (
                    <Link
                      key={`${item.type}-${item.id}`}
                      href={item.url}
                      className={`search-page-result ${
                        item.suggested ? "suggested" : ""
                      }`}
                    >
                      <span className="search-page-thumb">
                        {imgSrc ? (
                          <img src={imgSrc} alt={title} />
                        ) : (
                          <i className="fa-solid fa-file-lines" />
                        )}
                      </span>
                      <span className="search-page-result-copy">
                        <span className="search-page-result-meta">
                          <span>{getTypeLabel(item)}</span>
                          {item.suggested ? (
                            <em>{t("search.suggested")}</em>
                          ) : null}
                        </span>
                        <strong>
                          <Highlight text={title} keyword={queryValue} />
                        </strong>
                      </span>
                      <i
                        className={`fa-solid ${
                          isArabic ? "fa-arrow-left" : "fa-arrow-right"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <nav
                  className="search-page-pagination"
                  aria-label={t("search.pagination")}
                >
                  <button
                    type="button"
                    className={!pagination.hasPreviousPage ? "disabled" : ""}
                    onClick={() =>
                      pagination.hasPreviousPage &&
                      runSearch({
                        q: queryValue,
                        type: activeType,
                        sort: activeSort,
                        page: Math.max(currentPage - 1, 1),
                      })
                    }
                  >
                    <i
                      className={`fa-solid ${
                        isArabic ? "fa-arrow-right" : "fa-arrow-left"
                      }`}
                    />
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    const shouldShow =
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1;

                    if (!shouldShow) {
                      if (page === 2 || page === totalPages - 1) {
                        return (
                          <span key={page} className="search-page-dots">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        type="button"
                        key={page}
                        className={page === currentPage ? "active" : ""}
                        onClick={() =>
                          runSearch({
                            q: queryValue,
                            type: activeType,
                            sort: activeSort,
                            page,
                          })
                        }
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    className={!pagination.hasNextPage ? "disabled" : ""}
                    onClick={() =>
                      pagination.hasNextPage &&
                      runSearch({
                        q: queryValue,
                        type: activeType,
                        sort: activeSort,
                        page: Math.min(currentPage + 1, totalPages),
                      })
                    }
                  >
                    <i
                      className={`fa-solid ${
                        isArabic ? "fa-arrow-left" : "fa-arrow-right"
                      }`}
                    />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const initialQuery = `${query?.q || ""}`.trim();
  const selectedType = `${query?.type || "all"}`.trim() || "all";
  const selectedSort = `${query?.sort || "relevant"}`.trim() || "relevant";
  const currentPage = Math.max(Number(query?.page) || 1, 1);
  const pageLimit = Math.min(Math.max(Number(query?.pageLimit) || 10, 1), 50);
  const pageBanners = await getPageBanners();

  if (!initialQuery) {
    return {
      props: {
        initialQuery: "",
        selectedType,
        selectedSort,
        pageLimit,
        pageBanners,
        initialResults: createEmptyResults(
          pageLimit,
          selectedType,
          selectedSort,
        ),
      },
    };
  }

  const params = new URLSearchParams({
    q: initialQuery,
    all: "true",
    type: selectedType,
    sort: selectedSort,
    page: String(currentPage),
    pageLimit: String(pageLimit),
  });

  try {
    const res = await fetch(`${baseURL}${SearchEndPoint}?${params.toString()}`);
    const payload = await res.json();

    return {
      props: {
        initialQuery,
        selectedType: payload?.filters?.type || selectedType,
        selectedSort: payload?.filters?.sort || selectedSort,
        pageLimit,
        pageBanners,
        initialResults: payload,
      },
    };
  } catch (error) {
    return {
      props: {
        initialQuery,
        selectedType,
        selectedSort,
        pageLimit,
        pageBanners,
        initialResults: createEmptyResults(
          pageLimit,
          selectedType,
          selectedSort,
        ),
      },
    };
  }
}
