import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { useGetAllCompaniesQuery } from "@/RTK/Api/Companies/CompaniesApi";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const { data: companies } = useGetAllCompaniesQuery(`keyword=${id}`);

  const GoToCompany = (slugOrId) => {
    router.push(`/company-details/${slugOrId}`);
  };

  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <>
      <Layout
        headerStyle={1}
        footerStyle={1}
        breadcrumbTitle={t("companies.title")}
      >
        <section className="team-section about-page sec-pad">
          <div className="auto-container">
            <div className="sec-title">
              <h2>{t("companies.subtitle")}</h2>
            </div>

            <div className={`${lang === "ar" ? "rtl" : ""}`}>
              <div className="company-cards-container">
                {companies?.data?.map((company, index) => (
                  <div
                    key={index}
                    className="company-card"
                    onClick={() => GoToCompany(company?.slug || company?._id)}
                  >
                    <div
                      className="team-block-one"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="inner-box">
                        <h3 className="text-center text-muted">
                          {company?.companyName?.[lang] ||
                            company?.companyName?.en}
                        </h3>
                        <figure className={lang === "ar" ? "" : "image-box"}>
                          <img
                            src={company?.company_logo}
                            alt={
                              company?.companyName?.[lang] ||
                              company?.companyName?.en
                            }
                            style={{ borderRadius: "30px 30px 0 0" }}
                          />
                        </figure>
                        <div className="lower-content">
                          <div className="share-box">
                            <div className="share-icon">
                              <i className="flaticon-share" />
                            </div>
                            <ul className="social-links clearfix">
                              {company?.social_links?.facebook && (
                                <li>
                                  <Link
                                    href={company?.social_links?.facebook}
                                    target="_blank"
                                  >
                                    <i
                                      className="fa-brands fa-facebook"
                                      title={t("facebook")}
                                    />
                                  </Link>
                                </li>
                              )}
                              {company?.social_links?.xTwitter && (
                                <li>
                                  <Link
                                    href={company?.social_links?.xTwitter}
                                    target="_blank"
                                  >
                                    <i
                                      className="fa-brands fa-square-twitter"
                                      title={t("twitter")}
                                    />
                                  </Link>
                                </li>
                              )}
                              {company?.social_links?.instagram && (
                                <li>
                                  <Link
                                    href={company?.social_links?.instagram}
                                    target="_blank"
                                  >
                                    <i
                                      className="fa-brands fa-instagram-square"
                                      title={t("instagram")}
                                    />
                                  </Link>
                                </li>
                              )}
                              {company?.social_links?.linkedin && (
                                <li>
                                  <Link
                                    href={company?.social_links?.linkedin}
                                    target="_blank"
                                  >
                                    <i
                                      className="fa-brands fa-linkedin"
                                      title="LinkedIn"
                                    />
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="d-flex">
                            <img
                              className="py-1"
                              style={{ objectFit: "contain" }}
                              src={company?.company_logo2}
                            />
                          </div>

                          <p>
                            {truncateText(
                              company?.about?.[lang] || company?.about?.en,
                              100,
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
