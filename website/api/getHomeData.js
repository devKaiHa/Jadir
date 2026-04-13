import { fetchJSON, pickArray, pickObject } from "../GlobalHooks/GlobalHooks";
import baseURL, {
  AboutHomeEndPoint,
  BlogEndPoint,
  CompaniesPublicEndPoint,
  FundsEndPoint,
  HomeSliderEndPoint,
  HomeSectorsEndPoint,
  OurServicesEndPoint,
  PartnerEndPoint,
  ProjectsEndPoint,
  StatisticsEndPoint,
  ValuesEndPoint,
} from "@/api/GlobalData";
import {
  normalizeBlog,
  normalizeCompany,
  normalizeFund,
  normalizeStatistic,
} from "@/api/serverData";

export async function getHomeData() {
  const urls = [
    `${baseURL}${HomeSliderEndPoint}/public/list?sliderType=main&isActive=true`, // 0
    `${baseURL}${AboutHomeEndPoint}`, // 1
    `${baseURL}${OurServicesEndPoint}/public`, // 2
    `${baseURL}${HomeSectorsEndPoint}/public`, // 3
    `${baseURL}${BlogEndPoint}/public?limit=10`, // 4
    `${baseURL}${ProjectsEndPoint}`, // 5
    `${baseURL}${FundsEndPoint}/public`, // 6
    `${baseURL}${StatisticsEndPoint}`, // 7
    `${baseURL}${PartnerEndPoint}/public`, // 8
    `${baseURL}${ValuesEndPoint}/public`, // 9
    `${baseURL}${CompaniesPublicEndPoint}`, // 10
  ];

  const results = await Promise.allSettled(urls.map((u) => fetchJSON(u)));
  const safe = (i, fb = []) =>
    results[i].status === "fulfilled" ? results[i].value : fb;

  const companies = pickArray(safe(10, [])).map(normalizeCompany);

  return {
    banners: pickArray(safe(0, [])),
    about: pickObject(safe(1, {})),
    services: pickArray(safe(2, [])),
    sectors: pickArray(safe(3, [])),
    news: pickArray(safe(4, [])).map(normalizeBlog),
    projects: pickArray(safe(5, [])),
    funds: pickArray(safe(6, [])).map(normalizeFund),
    statistics: pickArray(safe(7, [])).map(normalizeStatistic),
    partners: pickArray(safe(8, [])),
    values: pickArray(safe(9, [])),
    companies,
  };
}
