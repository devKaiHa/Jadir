import Link from "next/link";
import { imageURL } from "@/api/GlobalData";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { getCountryNameByCode } from "@/lib/helpers";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function CompaniesBrief({ companies = [] }) {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  const visibleCompanies = [...companies]
    .filter(
      (company) => company?.companyName?.en || company?.companyName?.[lang],
    )
    .sort((a, b) => (a?.order || 0) - (b?.order || 0))
    .slice(0, 3);

  if (!visibleCompanies.length) return null;

  const fallbackLabel = (key, defaultValue) => {
    const value = t(key);
    return value === key ? defaultValue : value;
  };

  return (
    <div className="mt-5">
      <div className="sec-title text-center mb-4">
        <span className="sub-title">
          {fallbackLabel("companies.title", "Companies")}
        </span>
        <h2>
          {fallbackLabel(
            "about.ourCompaniesBrief",
            "A Brief Look At Our Companies",
          )}
        </h2>
      </div>

      <div className="row clearfix">
        {visibleCompanies.map((company) => {
          const companyName =
            company?.companyName?.[lang] ||
            company?.companyName?.en ||
            company?.aboutus?.[lang] ||
            company?.aboutus?.en;
          const companyAbout =
            company?.about?.[lang] || company?.about?.en || "";
          const experienceField =
            company?.ExperienceField?.[lang] ||
            company?.ExperienceField?.en ||
            "";
          const companyCountry = company?.country
            ? getCountryNameByCode(company.country, lang)
            : "";

          return (
            <div
              key={company?._id || company?.slug}
              className="col-lg-4 col-md-6 col-sm-12 mb-4"
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 12px 34px rgba(0,0,0,0.08)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    background:
                      "linear-gradient(135deg, rgba(15,86,98,0.12), rgba(222,176,131,0.2))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                  }}
                >
                  {company?.logo ? (
                    <img
                      src={`${imageURL}companies/${company.logo}`}
                      alt={companyName}
                      style={{
                        maxWidth: "170px",
                        maxHeight: "110px",
                        objectFit: "contain",
                      }}
                    />
                  ) : company?.background ? (
                    <img
                      src={`${imageURL}companies/${company.background}`}
                      alt={companyName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  ) : null}
                </div>

                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>
                    {companyName}
                  </h3>

                  {experienceField ? (
                    <p
                      style={{
                        color: "#0f5662",
                        fontWeight: 600,
                        marginBottom: "8px",
                      }}
                    >
                      {experienceField}
                    </p>
                  ) : null}

                  {companyCountry ? (
                    <p style={{ color: "#6b7280", marginBottom: "10px" }}>
                      {companyCountry}
                    </p>
                  ) : null}

                  <p
                    style={{ marginBottom: "18px", flexGrow: 1 }}
                    dangerouslySetInnerHTML={{
                      __html: truncateText(companyAbout, 160),
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/company-details/${company?.slug}`)
                      }
                      style={{ color: "#0f5662", fontWeight: 700 }}
                    >
                      {fallbackLabel("read_more", "Read more")}
                    </span>
                    {company?.website ? (
                      <a
                        href={
                          /^https?:\/\//i.test(company.website)
                            ? company.website
                            : `https://${company.website}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#de934f", fontWeight: 700 }}
                      >
                        {fallbackLabel("website", "Website")}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
