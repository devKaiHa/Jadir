import { getOtherData } from "@/api/getOtherData";
import { imageURL } from "@/api/GlobalData";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Manager({ member }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const bioText = member?.bio?.[lang] || "";
  const isLongBio = bioText.length > 100;

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      breadcrumbTitle={member?.isFounder ? t("boardMember") : t("teamMember")}
    >
      <div>
        {/* Manager Section */}
        <section className="team-section about-page sec-pad">
          <div className="auto-container">
            <div className="sec-title">
              <span className="sub-title">
                {member?.isFounder ? t("leadership") : t("teamMember")}
              </span>
              {lang === "tr" ? (
                <h2>
                  {member?.position?.[lang] || member?.position?.en}{" "}
                  {t("meetOur")}
                </h2>
              ) : (
                <h2>
                  {t("meetOur")}{" "}
                  {member?.position?.[lang] || member?.position?.en}
                </h2>
              )}
            </div>

            <div className="row clearfix">
              {/* Manager Card */}
              <div className="team-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <figure className="image-box">
                    <img
                      style={{ borderRadius: "180px" }}
                      src={
                        `${imageURL}boardMember/${member?.image}` ||
                        "https://dummyimage.com/400x400/"
                      }
                      alt={member?.name?.[lang] || member?.name?.en}
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="my-3">
                      <h4 className="text-center">
                        {member?.name?.[lang] || member?.name?.en}
                      </h4>
                      <span className="designation">
                        <i>
                          {member?.position?.[lang] || member?.position?.en}
                        </i>
                      </span>
                    </div>

                    {!isLongBio && bioText && <p className="mb-3">{bioText}</p>}

                    <ul className="social-links clearfix">
                      {member?.email && (
                        <li className="mx-2">
                          <Link href={`mailto:${member?.email}`}>
                            <i
                              style={{ color: "#11959cff" }}
                              className="fa-solid fa-at"
                            ></i>
                          </Link>
                        </li>
                      )}
                      {member?.phone && (
                        <li className="mx-2">
                          <Link href={`tel:${member?.phone}`}>
                            <i
                              style={{ color: "#11959cff" }}
                              className="fa-solid fa-phone"
                            ></i>
                          </Link>
                        </li>
                      )}
                      {member?.website && (
                        <li className="mx-2">
                          <Link href={`${member?.website}`} target="_blank">
                            <i
                              style={{ color: "#11959cff" }}
                              className="fa-solid fa-globe"
                            ></i>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Headquarters & Education */}
              <div className="col-lg-8 col-md-6 col-sm-12">
                <div className="inner-content">
                  {member?.address?.[lang] && (
                    <>
                      <h3>{t("headquarters")}</h3>
                      <p>{member?.address?.[lang]}</p>
                    </>
                  )}
                  <br />
                  {member?.education?.length > 0 &&
                    member.education[0]?.[lang]?.length > 0 && (
                      <>
                        <h3>{t("education")}</h3>
                        <ul>
                          {member?.education.map((edu, idx) => (
                            <li key={idx}>{edu?.[lang] || edu?.en}</li>
                          ))}
                        </ul>
                        <br />
                      </>
                    )}

                  {member?.professionalExperience?.[0]?.[lang]?.length > 0 && (
                    <>
                      <h3>{t("profExp")}</h3>
                      <ul>
                        {member?.professionalExperience?.map((exp, idx) => (
                          <li key={idx}>{exp?.[lang] || exp?.en}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {isLongBio && (
                    <>
                      <br />
                      <h3>{t("bio")}</h3>
                      <p>{bioText}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { members } = await getOtherData();

  const paths = members.map((member) => ({
    params: { slug: member.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { members, investPortfolio } = await getOtherData();

  const member = members.find((m) => m.slug === slug) || null;

  return {
    props: { member, investPortfolio },
    revalidate: 300,
  };
}
