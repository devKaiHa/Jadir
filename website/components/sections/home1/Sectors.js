import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { useIsMobile } from "@/lib/helpers";

export default function Sectors({ values }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const isMobile = useIsMobile();

  const icons = [
    "flaticon-knowledge",
    "flaticon-united",
    "flaticon-clock",
    "flaticon-risk-management",
    "flaticon-monitor",
    "flaticon-advice",
  ];

  return (
    <>
      <section className="chooseus-section sec-pad">
        <span className="big-text">
          {lang === "ar" ? "قيمنا" : "Our Values"}
        </span>
        <div className="auto-container">
          <div className="sec-title centred">
            <span className="sub-title">
              {values[0]?.valuesTitle?.title?.[lang] || t("values.title")}
            </span>
            <h2>
              {values[0]?.valuesTitle?.subtitle?.[lang] || t("values.subtitle")}
            </h2>
          </div>
          <div className="row align-items-center" style={{ direction: "ltr" }}>
            <div className="col-lg-4 col-md-6 col-sm-12 left-column">
              <div className="inner-content">
                {values?.slice(0, 3).map((item, index) => (
                  <div className="chooseus-block-one" key={index}>
                    <div className="inner-box">
                      <div className="icon-box">
                        <i className={icons[index]} />
                      </div>
                      <div className="static-content">
                        <h3>{item?.name[lang]}</h3>
                        <p>{item?.content[lang]}</p>
                      </div>
                      <div className="overlay-content">
                        <p>
                          {truncateText(
                            item?.description[lang],
                            isMobile ? 100 : 200,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 image-column">
              <div className="image-box p-0">
                <figure className="image">
                  <img
                    src="/assets/images/17.jpeg"
                    style={{ borderRadius: "100%" }}
                  />
                </figure>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 right-column">
              <div className="inner-content">
                {values?.slice(3, 6).map((item, index) => (
                  <div className="chooseus-block-one" key={index}>
                    <div className="inner-box">
                      <div className="icon-box">
                        <i className={icons[index + 3]} />
                      </div>
                      <div className="static-content">
                        <h3>{item?.name[lang]}</h3>
                        <p>{item?.content[lang]}</p>
                      </div>
                      <div className="overlay-content">
                        <p style={{ fontSize: "18px" }}>
                          {truncateText(
                            item?.description[lang],
                            isMobile ? 100 : 200,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
