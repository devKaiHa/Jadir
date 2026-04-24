import baseURL, { PageBannersEndPoint, imageURL } from "@/api/GlobalData";
import { fetchJSON, pickObject } from "@/GlobalHooks/GlobalHooks";

export const PAGE_BANNER_DEFAULTS = {
  about: "/assets/images/background/partners.png",
  services: "/assets/images/background/services.png",
  projects: "/assets/images/background/partners.png",
  blogs: "/assets/images/background/blogs.png",
  careers: "/assets/images/background/partners.png",
  search: "/assets/search-bg.jpg",
  contact: "/assets/images/background/partners.png",
};

export const toBannerImageUrl = (value = "") => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value) || value.startsWith("/")) return value;
  return `${imageURL}${value}`;
};

export async function getPageBanners() {
  try {
    const payload = await fetchJSON(`${baseURL}${PageBannersEndPoint}/public`);
    return pickObject(payload);
  } catch (error) {
    return {};
  }
}

export function resolvePageBanner(pageKey, pageBanners = {}) {
  const configuredBanner = toBannerImageUrl(pageBanners?.[pageKey] || "");
  return configuredBanner || PAGE_BANNER_DEFAULTS[pageKey] || "";
}
