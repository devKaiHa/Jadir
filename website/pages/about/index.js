"use client";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import AboutUsSlider from "@/components/slider/AboutUsSlider";
import { getOtherData } from "@/api/getOtherData";
import TeamlSlider from "@/components/pages/AboutUs/TeamlSlider";
import CompaniesBrief from "@/components/pages/AboutUs/CompaniesBrief";
import TestimonialSlider03 from "@/components/slider/TestimonialSlider03";
import Sectors from "@/components/sections/home1/Sectors";
import { getHomeData } from "@/api/getHomeData";
import { imageURL } from "@/api/GlobalData";

export async function getStaticProps() {
  try {
    const data = await getOtherData();
    const homeData = await getHomeData();
    return { props: { data, homeData }, revalidate: 300 };
  } catch (err) {
    console.error("Other data error:", err);
    return { props: { data: {} }, revalidate: 300 };
  }
}

export default function About({ data = {}, homeData = {} }) {
  const { i18n, t } = useTranslation();
  const lang = i18n?.language || "en";

  const {
    aboutUs = [],
    members = [],
    testimonials = [],
    companies = [],
  } = data;
  const { values } = homeData;
  const boardMembers = members?.filter((item) => item.isFounder);
  const team = members?.filter((item) => !item.isFounder);

  // Normalize: allow array or object
  const item = Array.isArray(aboutUs) ? aboutUs[0] || {} : aboutUs || {};

  // helper: pick current lang, then fall back
  const pick = (obj) =>
    obj && typeof obj === "object"
      ? obj[lang] ?? obj.en ?? obj.ar ?? obj.tr ?? ""
      : "";

  // Support both shapes:
  const title = pick(item?.aboutUsTitle?.title) || pick(item?.title);
  const subtitle = pick(item?.aboutUsTitle?.subtitle) || pick(item?.subtitle);
  const content = pick(item?.content);
  const businessApproach = item?.businessApproach;
  const whyUs = item?.whyUs;
  const governance = item?.governance;
  const prizes = item?.prizes || [];
  const certificates = item?.certificates || [];

  // Build slider items from API (no static):
  const sliderItems = [
    {
      title: item?.message || { en: "Our Mission" },
      content: item?.messageDescription || { en: "" },
      url: "/mission",
    },
    {
      title: item?.vision || { en: "Our Vision" },
      content: item?.visionDescription || { en: "" },
      url: "/vision",
    },
  ];

  const hasAny =
    title ||
    subtitle ||
    content ||
    sliderItems.some((s) => pick(s.title) || pick(s.content));

  if (!hasAny) return null;

  const localizedText = (field, lang) => field?.[lang] || field?.en || "";

  const formatDate = (date, locale = "en") => {
    if (!date) return "";
    try {
      return new Date(date).toLocaleDateString(
        locale === "ar" ? "ar" : locale === "tr" ? "tr-TR" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
    } catch {
      return "";
    }
  };

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      breadcrumbTitle={t("about.about-us")}
    >
      <section className="about-style-three sec-pad">
        <div className="auto-container">
          <div className="row clearfix" dir="ltr" style={{ direction: "ltr" }}>
            <div className="col-lg-7 col-md-12 col-sm-12 image-column">
              <div className="image-box">
                <div
                  className="image-shape"
                  style={{
                    backgroundImage: "url(/assets/images/shape/shape-24.png)",
                  }}
                />
                <figure className="image image-1">
                  <img src="/assets/images/about-2.jpg" alt="about" />
                </figure>
                <figure className="image image-2">
                  <img src="/assets/images/about-1.jpg" alt="about" />
                </figure>
                <div className="image-content">
                  <h6>2013</h6>
                  <div className="icon-box">
                    <i className="flaticon-diagonal-arrow" />
                  </div>
                  <h2>
                    1000<span>+</span>
                  </h2>
                  <p>{t("about.investor")}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div className="sec-title">
                  <span className="sub-title">Who are we?</span>
                  <h2>About Jadwa Invest</h2>
                </div>

                <div className="text-box">
                  <p dangerouslySetInnerHTML={{ __html: content }} />
                </div>

                {/* Pass API-driven slides */}
                <AboutUsSlider slides={sliderItems} />
              </div>
            </div>

            {values && <Sectors values={values} />}

            {(businessApproach ||
              whyUs ||
              governance ||
              prizes?.length ||
              certificates?.length) && (
              <div className="mt-5 w-full">
                <div className="row clearfix">
                  {(businessApproach || whyUs || governance) && (
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="content-box">
                        <div className="sec-title text-center mb-4">
                          <span className="sub-title">
                            {t("about.about-us")}
                          </span>
                          <h2>{t("about.moreAboutUs")}</h2>
                        </div>
                      </div>
                    </div>
                  )}

                  {businessApproach && (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                      <div
                        className="content-box h-full"
                        style={{
                          background: "#fff",
                          padding: "30px",
                          borderRadius: "16px",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                          height: "100%",
                        }}
                      >
                        <div className="sec-title mb-3">
                          <span className="sub-title">
                            {t("about.section")}
                          </span>
                          <h3 style={{ fontSize: "28px" }}>
                            {t("about.businessApproach")}
                          </h3>
                        </div>

                        <div className="text-box">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: localizedText(businessApproach, lang),
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  )}

                  {whyUs && (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                      <div
                        className="content-box h-full"
                        style={{
                          background: "#fff",
                          padding: "30px",
                          borderRadius: "16px",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                          height: "100%",
                        }}
                      >
                        <div className="sec-title mb-3">
                          <span className="sub-title">
                            {t("about.section")}
                          </span>
                          <h3 style={{ fontSize: "28px" }}>
                            {t("about.whyUs")}
                          </h3>
                        </div>

                        <div className="text-box">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: localizedText(whyUs, lang),
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  )}

                  {governance && (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                      <div
                        className="content-box h-full"
                        style={{
                          background: "#fff",
                          padding: "30px",
                          borderRadius: "16px",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                          height: "100%",
                        }}
                      >
                        <div className="sec-title mb-3">
                          <span className="sub-title">
                            {t("about.section")}
                          </span>
                          <h3 style={{ fontSize: "28px" }}>
                            {t("about.governance")}
                          </h3>
                        </div>

                        <div className="text-box">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: localizedText(governance, lang),
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!!prizes?.length && (
                  <div className="mt-5">
                    <div className="sec-title text-center mb-4">
                      <span className="sub-title">
                        {t("about.recognition")}
                      </span>
                      <h2>{t("about.prizes")}</h2>
                    </div>

                    <div className="row clearfix">
                      {prizes.map((item, index) => (
                        <div
                          key={item?._id || index}
                          className="col-lg-4 col-md-6 col-sm-12 mb-4"
                        >
                          <div
                            style={{
                              background: "#fff",
                              borderRadius: "16px",
                              overflow: "hidden",
                              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                              height: "100%",
                            }}
                          >
                            {item?.image ? (
                              <div
                                style={{ height: "220px", overflow: "hidden" }}
                              >
                                <img
                                  src={`${imageURL}homeAbout/${item.image}`}
                                  alt={localizedText(item?.name, lang)}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                />
                              </div>
                            ) : null}

                            <div style={{ padding: "24px" }}>
                              <h4
                                style={{
                                  fontSize: "22px",
                                  marginBottom: "10px",
                                }}
                              >
                                {localizedText(item?.name, lang)}
                              </h4>

                              {item?.provider ? (
                                <p
                                  style={{ marginBottom: "8px", color: "#666" }}
                                >
                                  <strong>{t("about.provider")}:</strong>{" "}
                                  {item.provider}
                                </p>
                              ) : null}

                              <p style={{ marginBottom: 0, color: "#888" }}>
                                <strong>{t("about.date")}:</strong>{" "}
                                {formatDate(item?.date, lang)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!!certificates?.length && (
                  <div className="mt-5">
                    <div className="sec-title text-center mb-4">
                      <span className="sub-title">
                        {t("about.credentials")}
                      </span>
                      <h2>{t("about.certificates")}</h2>
                    </div>

                    <div className="row clearfix">
                      {certificates.map((item, index) => (
                        <div
                          key={item?._id || index}
                          className="col-lg-4 col-md-6 col-sm-12 mb-4"
                        >
                          <div
                            style={{
                              background: "#fff",
                              borderRadius: "16px",
                              overflow: "hidden",
                              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                              height: "100%",
                            }}
                          >
                            {item?.image ? (
                              <div
                                style={{ height: "220px", overflow: "hidden" }}
                              >
                                <img
                                  src={`${imageURL}homeAbout/${item.image}`}
                                  alt={localizedText(item?.name, lang)}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                />
                              </div>
                            ) : null}

                            <div style={{ padding: "24px" }}>
                              <h4
                                style={{
                                  fontSize: "22px",
                                  marginBottom: "10px",
                                }}
                              >
                                {localizedText(item?.name, lang)}
                              </h4>

                              {item?.provider ? (
                                <p
                                  style={{ marginBottom: "8px", color: "#666" }}
                                >
                                  <strong>{t("about.provider")}:</strong>{" "}
                                  {item.provider}
                                </p>
                              ) : null}

                              <p style={{ marginBottom: 0, color: "#888" }}>
                                <strong>{t("about.date")}:</strong>{" "}
                                {formatDate(item?.date, lang)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {boardMembers && (
              <div className="mt-5">
                <h2
                  className="sec-title mb-0 text-center"
                  style={{ fontSize: "40px" }}
                >
                  {t("about.theFounders")}
                </h2>
                <TeamlSlider team={boardMembers} />
              </div>
            )}

            {team && (
              <div className="mt-5">
                <h2
                  className="sec-title mb-0 text-center"
                  style={{ fontSize: "40px" }}
                >
                  {t("about.ourTeam")}
                </h2>
                <TeamlSlider team={team} />
              </div>
            )}

            {!!companies?.length && <CompaniesBrief companies={companies} />}

            {testimonials && (
              <div className="mt-5">
                <h2
                  className="sec-title mb-0 text-center"
                  style={{ fontSize: "40px" }}
                >
                  {t("about.testimonials")}
                </h2>
                <TestimonialSlider03 testimonials={testimonials} />
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
