"use client";
import { getOtherData } from "@/api/getOtherData";
import { imageURL } from "@/api/GlobalData";
import Layout from "@/components/layout/Layout";
import CompaniesGrid from "@/components/pages/comapnies/CompaniesGrid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export async function getStaticProps() {
  try {
    const { companies } = await getOtherData();

    return {
      props: {
        data: {
          companies,
        },
      },
      revalidate: 300,
    };
  } catch (err) {
    console.error("Static props error:", err);

    return {
      props: {
        data: {
          companies: [],
        },
      },
      revalidate: 300,
    };
  }
}
export default function Home({ data = {} }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  const { companies: companiesData = [] } = data;

  const [companies, setCompanies] = useState(companiesData);
  const [activeCompany, setActiveCompany] = useState(null);

  useEffect(() => {
    if (companies.length) {
      setActiveCompany(companies[0]);
    }
  }, [companies]);

  useEffect(() => {
    if (activeCompany) {
      const element = document.getElementById(activeCompany.slug || activeCompany._id);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeCompany]);

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      breadcrumbTitle={t("companies.title")}
      sticky={true}
      image="/assets/images/background/partners.png"
    >
      {/* Companies list */}
      <section className="team-section about-page sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <h2>{t("companies.subtitle")}</h2>
          </div>

          <CompaniesGrid
            CompanyData={companies}
            setActiveCompany={setActiveCompany}
          />
        </div>
      </section>

      {/* Active company details */}
      <section
        id={activeCompany?.slug || activeCompany?._id}
        className={`testimonial-style-two ${lang === "ar" ? "rtl" : ""}`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="outer-container" style={{ color: "#272e39" }}>
          <div
            className="pattern-layer"
            style={{ backgroundImage: "url(assets/images/shape/shape-16.png)" }}
          />
          <div className="auto-container">
            <div className="testimonial-content">
              <div className="author-box">
                <div className="thumb-box">
                  <img
                    className="mx-auto"
                    src={`${imageURL}companies/${activeCompany?.logo}`}
                    alt={
                      activeCompany?.companyName?.[lang] ||
                      activeCompany?.companyName?.en
                    }
                  />
                </div>
                <h2 className="text-center">
                  {activeCompany?.ExperienceField?.[lang] ||
                    activeCompany?.ExperienceField?.en}
                </h2>
              </div>

              <p style={{ whiteSpace: "pre-line", color: "#272e39" }}>
                {activeCompany?.about?.[lang] || activeCompany?.about?.en}
              </p>

              {activeCompany?.introduction?.array?.length > 0 && (
                <ul className="companies-list-info">
                  {activeCompany.introduction.array.map((item, idx) => (
                    <li key={idx} style={{ padding: "10px" }}>
                      {item?.[lang] || item?.en || item}
                    </li>
                  ))}
                </ul>
              )}

              <br />
              <Link
                style={{ color: "#272e39", textDecoration: "underline" }}
                href={`/company-details/${activeCompany?.slug || activeCompany?._id}`}
              >
                {t("read_more")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
