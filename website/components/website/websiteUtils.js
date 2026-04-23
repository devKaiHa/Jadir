import baseURL, { imageURL } from "@/api/GlobalData";
import { fetchJSON, pickArray, pickObject } from "@/GlobalHooks/GlobalHooks";
import {
  normalizeBlog,
  normalizeBoardMember,
  normalizeCompany,
  normalizeStatistic,
} from "@/api/serverData";

export const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

export const localize = (value, lang = "en") => {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  return value[lang] || value.en || value.ar || value.tr || "";
};

export const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const truncate = (value = "", length = 150) => {
  const clean = stripHtml(value);
  return clean.length > length ? `${clean.slice(0, length).trim()}...` : clean;
};

export const asset = (
  folder,
  filename,
  fallback = "/assets/images/news/news-1.jpg",
) => (filename ? `${imageURL}${folder}/${filename}` : fallback);

export async function safeFetch(url, fallback) {
  try {
    return await fetchJSON(url);
  } catch (error) {
    return fallback;
  }
}

export async function getWebsiteData() {
  const urls = {
    sliders: `${baseURL}home-slider/public/list?sliderType=main&isActive=true`,
    about: `${baseURL}about-home`,
    services: `${baseURL}our-services/public`,
    values: `${baseURL}values/public`,
    partners: `${baseURL}partners/public`,
    statistics: `${baseURL}statistics/public`,
    testimonials: `${baseURL}testimonials/public`,
    projects: `${baseURL}projects/public`,
    blogs: `${baseURL}blog/public?limit=12&published=true`,
    categories: `${baseURL}categories/public`,
    members: `${baseURL}board-member/public`,
    companies: `${baseURL}companies/public`,
    policies: `${baseURL}policies/public`,
    contact: `${baseURL}contact-us/public`,
    footer: `${baseURL}footer`,
  };

  const entries = await Promise.all(
    Object.entries(urls).map(async ([key, url]) => [
      key,
      await safeFetch(url, null),
    ]),
  );
  const data = Object.fromEntries(entries);

  return {
    sliders: pickArray(data.sliders),
    about: pickObject(data.about),
    services: pickArray(data.services),
    values: pickArray(data.values),
    partners: pickArray(data.partners),
    statistics: pickArray(data.statistics).map(normalizeStatistic),
    testimonials: pickArray(data.testimonials),
    projects: pickArray(data.projects),
    blogs: pickArray(data.blogs).map(normalizeBlog),
    categories: pickArray(data.categories),
    members: pickArray(data.members).map(normalizeBoardMember),
    companies: pickArray(data.companies).map(normalizeCompany),
    policies: pickArray(data.policies),
    contact: pickObject(data.contact),
    footer: pickObject(data.footer),
  };
}

export async function getServiceBySlug(slug) {
  const payload = await safeFetch(`${baseURL}our-services/public`, []);
  return pickArray(payload).find((item) => item?.slug === slug) || null;
}

export async function getProjectBySlug(slug) {
  const payload = await safeFetch(
    `${baseURL}projects/public/slug/${slug}`,
    null,
  );
  return payload?.data || null;
}

export async function getBlogBySlug(slug) {
  const payload = await safeFetch(`${baseURL}blog/public/slug/${slug}`, null);
  return payload?.data ? normalizeBlog(payload.data) : null;
}

export async function getPolicyBySlug(slug) {
  const payload = await safeFetch(
    `${baseURL}policies/public/slug/${slug}`,
    null,
  );
  return payload?.data || null;
}
