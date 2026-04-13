import { fetchJSON, pickArray, pickObject } from "../GlobalHooks/GlobalHooks";
import baseURL, {
  AboutServiceEndPoint,
  AboutHomeEndPoint,
  BlogCategoriesEndPoint,
  BlogEndPoint,
  CompaniesPublicEndPoint,
  CustomPagesEndPoint,
  FundsEndPoint,
  MemberEndPoint,
  PlansEndPoint,
  ProjectsEndPoint,
  ResearchEndPoint,
  StatisticsEndPoint,
  OurServicesEndPoint,
  testimonialsEndPoint,
} from "@/api/GlobalData";
import {
  normalizeBlog,
  normalizeBoardMember,
  normalizeCompany,
  normalizeFund,
  normalizeStatistic,
} from "@/api/serverData";

export async function getAllBlogs({
  page = 1,
  limit = 10,
  CategoryId = "",
  keyword = "",
  published = true,
} = {}) {
  const params = new URLSearchParams();

  if (keyword) params.append("keyword", keyword);
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (CategoryId) params.append("category", CategoryId.toString());
  if (published) params.append("published", published.toString());

  try {
    const res = await fetch(
      `${baseURL}${BlogEndPoint}/public?${params.toString()}`,
    );

    if (!res.ok) {
      console.error("Failed to fetch blogs");
      return { data: [], pagination: { totalPages: 0 } };
    }

    const payload = await res.json();

    return {
      ...payload,
      data: pickArray(payload).map(normalizeBlog),
    };
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    return { data: [], pagination: { totalPages: 0 } };
  }
}

export async function getBlogBySlug(slug) {
  if (!slug) return null;

  try {
    const payload = await fetchJSON(`${baseURL}${BlogEndPoint}/public/slug/${slug}`);
    return normalizeBlog(payload?.data || {});
  } catch (error) {
    console.error("Failed to fetch blog by slug", error);
    return null;
  }
}

export async function getRelatedBlogs({
  blog,
  lang,
  limit = 3,
} = {}) {
  if (!blog) return [];

  const categoryId = blog?.category?._id || blog?.category;
  const excludeId = blog?._id;

  const selectUnique = (items = []) => {
    const seen = new Set();

    return items.filter((item) => {
      const id = item?._id || item?.slug;
      if (!id || id === excludeId || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  };

  const scoreRelated = (items = []) =>
    [...items].sort((a, b) => {
      const aLang = Boolean(a?.content?.[lang] || a?.title?.[lang]);
      const bLang = Boolean(b?.content?.[lang] || b?.title?.[lang]);
      return Number(bLang) - Number(aLang);
    });

  try {
    const categoryBlogs = categoryId
      ? await getAllBlogs({ page: 1, limit: limit + 4, CategoryId: categoryId })
      : { data: [] };
    let related = scoreRelated(selectUnique(categoryBlogs?.data || []));

    if (related.length < limit) {
      const fallbackBlogs = await getAllBlogs({ page: 1, limit: limit + 6 });
      const fallback = scoreRelated(selectUnique(fallbackBlogs?.data || []));

      related = selectUnique([...related, ...fallback]);
    }

    return related.slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch related blogs", error);
    return [];
  }
}

export async function getAllCategories({ keyword = "" } = {}) {
  try {
    const res = await fetch(
      `${baseURL}${BlogCategoriesEndPoint}/public?keyword=${keyword}`,
    );
    if (!res.ok) {
      console.error("Failed to fetch categories");
      return { data: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return { data: [] };
  }
}

export async function getOtherData() {
  const urls = [
    `${baseURL}${AboutHomeEndPoint}`,
    `${baseURL}${AboutServiceEndPoint}`,
    `${baseURL}${OurServicesEndPoint}/public`,
    `${baseURL}${PlansEndPoint}/public`,
    `${baseURL}${CompaniesPublicEndPoint}`,
    `${baseURL}${FundsEndPoint}/public`,
    `${baseURL}${MemberEndPoint}/public`,
    `${baseURL}${StatisticsEndPoint}`,
    `${baseURL}${ProjectsEndPoint}`,
    `${baseURL}${ResearchEndPoint}`,
    `${baseURL}${CustomPagesEndPoint}`,
    `${baseURL}${testimonialsEndPoint}`,
  ];

  const results = await Promise.allSettled(urls.map((u) => fetchJSON(u)));
  const safe = (i, fb = []) =>
    results[i].status === "fulfilled" ? results[i].value : fb;

  return {
    aboutUs: pickObject(safe(0, {})),
    aboutService: pickObject(safe(1, {})),
    servicesList: pickArray(safe(2, [])),
    plans: pickArray(safe(3, [])),
    companies: pickArray(safe(4, [])).map(normalizeCompany),
    funds: pickArray(safe(5, [])).map(normalizeFund),
    members: pickArray(safe(6, [])).map(normalizeBoardMember),
    statistics: pickArray(safe(7, [])).map(normalizeStatistic),
    projects: pickArray(safe(8, [])),
    research: pickArray(safe(9, [])),
    customPages: pickArray(safe(10, [])),
    testimonials: pickArray(safe(11, [])),
    investPortfolio: {},
  };
}
