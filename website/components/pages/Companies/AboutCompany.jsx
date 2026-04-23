import { imageURL } from "@/api/GlobalData";
import { getCountryNameByCode } from "@/lib/helpers";
import { useTranslation } from "react-i18next";

const AboutCompany = ({ company = {} }) => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const label = (key, fallback) => {
    const value = t(key);
    return value === key ? fallback : value;
  };
  const introItems = Array.isArray(company?.introduction?.array)
    ? company.introduction.array
    : [];
  const introTitle =
    company?.introduction?.title?.[lang] || company?.introduction?.title?.en;
  const mission = company?.mission?.[lang] || company?.mission?.en;
  const vision = company?.vision?.[lang] || company?.vision?.en;
  const addresses = Array.isArray(company?.addresses) ? company.addresses : [];
  const socialEntries = Object.entries(company?.social_links || {}).filter(
    ([, value]) => Boolean(value),
  );
  const websiteHref =
    company?.website && /^https?:\/\//i.test(company.website)
      ? company.website
      : company?.website
        ? `https://${company.website}`
        : "";
  const contactItems = [
    company?.country
      ? {
          label: label("country", "Country"),
          value: getCountryNameByCode(company.country, lang),
        }
      : null,
    company?.phone
      ? {
          label: label("phone", "Phone"),
          value: company.phone,
          href: `tel:${company.phone}`,
        }
      : null,
    company?.email
      ? {
          label: label("email", "Email"),
          value: company.email,
          href: `mailto:${company.email}`,
        }
      : null,
    websiteHref
      ? {
          label: label("website", "Website"),
          value: company.website,
          href: websiteHref,
        }
      : null,
  ].filter(Boolean);

  return (
    <>
      {/* about-style-two */}
      <section className="about-style-two sec-pad">
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(assets/images/shape/shape-13.png)" }}
        />
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">
              {company?.aboutus?.[lang] || company?.aboutus?.en}
            </span>
            <h2>
              <span
                dangerouslySetInnerHTML={{
                  __html: company?.about?.[lang] || company?.about?.en,
                }}
              />
            </h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 inner-column">
              <div className="inner-box">
                <div className="experience-box">
                  <h2>{company?.Experience}</h2>
                  <h6>
                    {t("years")} <br />
                    {t("experience_in")}
                    <br />
                    {company?.ExperienceField?.[lang] ||
                      company?.ExperienceField?.en}
                  </h6>
                </div>
                <ul className="list-item clearfix">
                  {introItems?.map((item, index) => {
                    return (
                      <li key={index}>{item?.[lang] || item?.en || item}</li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <h3>
                  {t("more_about")}{" "}
                  {company?.companyName?.[lang] || company?.companyName?.en}
                  <img
                    src={`${imageURL}companies/${company?.logo}`}
                    alt={
                      company?.companyName?.[lang] || company?.companyName?.en
                    }
                    style={{ height: "1em", margin: "0px 10px" }}
                  />
                </h3>

                <div className="text-box">
                  <p dangerouslySetInnerHTML={{ __html: introTitle }} />
                </div>
                {contactItems.length ? (
                  <div className="text-box">
                    {contactItems.map((item) => (
                      <p key={item.label} style={{ marginBottom: "8px" }}>
                        <strong>{item.label}: </strong>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noreferrer">
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </p>
                    ))}
                  </div>
                ) : null}
                {addresses.length ? (
                  <div className="text-box">
                    <h5>{label("address", "Address")}</h5>
                    {addresses.map((address, index) => (
                      <p key={index}>
                        {address?.[lang] || address?.en || address?.ar || ""}
                      </p>
                    ))}
                  </div>
                ) : null}
                {socialEntries.length ? (
                  <div className="text-box">
                    <h5>{label("social_media", "Social Media")}</h5>
                    {socialEntries.map(([key, value]) => (
                      <p key={key} style={{ marginBottom: "8px" }}>
                        <strong>{key}: </strong>
                        <a href={value} target="_blank" rel="noreferrer">
                          {value}
                        </a>
                      </p>
                    ))}
                  </div>
                ) : null}
                {mission ? (
                  <>
                    <h5> {t("our_mission")}</h5>
                    <div className="quote-box">
                      <div className="icon-box">
                        <i className="flaticon-quote" />
                      </div>

                      <span className="designation">{mission}</span>
                    </div>
                  </>
                ) : null}
                {vision ? (
                  <>
                    <h5 className="mt-5"> {t("our_vision")}</h5>
                    <div className="quote-box">
                      <div className="icon-box">
                        <i className="flaticon-quote" />
                      </div>

                      <span className="designation">{vision}</span>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about-style-two end */}
    </>
  );
};

export default AboutCompany;
