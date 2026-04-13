import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

const FundAdvantages = ({ fund }) => {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRTL = lang === "ar";
  const associatedCompaniesLabel = (() => {
    const value = t("associated_companies");
    return value === "associated_companies" ? "Associated Companies" : value;
  })();
  if (fund && fund?.companiesAssociated?.length > 0)
    return (
      <section
        className={`fund working-style-two sec-pad ${isRTL ? "rtl" : ""}`}
        style={{ padding: "50px 0" }}
      >
        <div className="auto-container">
          <div className="sec-title centred">
            {lang === "ar" && (
              <span className="sub-title" style={{ color: "#e9b083" }}>
                {t("arFundBenefits")}
              </span>
            )}
            <h2>
              {fund?.benefitsTitle?.[lang] ||
                fund?.benefitsTitle?.en ||
                associatedCompaniesLabel}
            </h2>
            {lang != "ar" && (
              <span className="sub-title" style={{ color: "#e9b083" }}>
                {t("fundBenefits")}
              </span>
            )}
          </div>
          <div className="inner-container">
            <div className="row clearfix">
              {fund?.companiesAssociated?.map((item, idx) => (
                <div
                  className="col-lg-6 col-md-6 col-sm-12 working-block mx-auto"
                  key={item?._id}
                >
                  <div className="working-block-two">
                    <div className="inner-box">
                      <div
                        className="upper-box centred"
                        style={{ height: "8em", borderBottom: "0px" }}
                      >
                        <span
                          className="count-text"
                          style={{ color: "#e9b0834d" }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="icon-box">
                          <h2
                            className="cursor-pointer text-center"
                            style={{
                              paddingTop: "25px",
                            }}
                            onClick={() =>
                              router.push(
                                `/company-details/${item?.slug || item?._id}`,
                              )
                            }
                          >
                            {item?.name?.[lang] || item?.name?.en}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};

export default FundAdvantages;
