// CompaniesGrid.js (or inline if you prefer)
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { getCountryNameByCode, useIsMobile } from "@/lib/helpers";
import { imageURL } from "@/api/GlobalData";

export default function CompaniesGrid({ CompanyData, setActiveCompany }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isMobile = useIsMobile();

  return (
    <div className="row">
      {CompanyData?.map((company, index) => {
        return (
          <div
            key={index}
            className="col-lg-4 mb-4"
            style={{ height: isMobile ? "80%" : "100%" }}
          >
            <div
              className="company-card"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveCompany(company)}
            >
              <div className="team-block-one h-100">
                <div className="inner-box h-100 d-flex flex-column">
                  <figure
                    className="image-box mb-3"
                    style={{ height: isMobile ? "80%" : "100%" }}
                  >
                    <img
                      src={`${imageURL}companies/${company?.background}`}
                      alt={
                        company?.companyName?.[lang] || company?.companyName?.en
                      }
                      style={{
                        borderRadius: "30px 30px 0 0",
                        width: "100%",
                        height: "230px",
                        objectFit: "contain",
                      }}
                    />
                  </figure>

                  <div className="lower-content flex-grow-1 d-flex flex-column">
                    {/* Logo */}
                    {company?.country ? (
                      <p className="text-center fw-bold mb-2">
                        {getCountryNameByCode(company.country, lang)}
                      </p>
                    ) : null}

                    {/* Description */}
                    <p className="flex-grow-1 mb-3">
                      {truncateText(
                        company?.about?.[lang] || company?.about?.en,
                        120,
                      )}
                    </p>

                    {/* Social Links */}
                    <div className="share-box mt-auto">
                      <ul className="social-links clearfix d-flex justify-content-center gap-3">
                        {company?.social_links?.facebook && (
                          <li>
                            <Link
                              href={company.social_links.facebook}
                              target="_blank"
                            >
                              <i
                                className="fa-brands fa-facebook"
                                title="Facebook"
                              />
                            </Link>
                          </li>
                        )}
                        {company?.social_links?.xTwitter && (
                          <li>
                            <Link
                              href={company.social_links.xTwitter}
                              target="_blank"
                            >
                              <i
                                className="fa-brands fa-square-twitter"
                                title="Twitter"
                              />
                            </Link>
                          </li>
                        )}
                        {company?.social_links?.instagram && (
                          <li>
                            <Link
                              href={company.social_links.instagram}
                              target="_blank"
                            >
                              <i
                                className="fa-brands fa-instagram-square"
                                title="Instagram"
                              />
                            </Link>
                          </li>
                        )}
                        {company?.social_links?.linkedin && (
                          <li>
                            <Link
                              href={company.social_links.linkedin}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
