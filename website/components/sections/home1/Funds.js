import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Funds() {
  const { t } = useTranslation();

  return (
    <>
      {/* working-section */}
      <section className="working-section centred">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">{t("investmentFunds")}</span>
            <h2>{t("title")}</h2>
          </div>
          <div className="inner-content">
            <div
              className="shape"
              style={{
                backgroundImage: "url(/assets/images/shape/shape-9.png)",
              }}
            />
            <div className="row clearfix">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="col-lg-4 col-md-6 col-sm-12 working-block"
                >
                  <div className="working-block-one">
                    <div className="inner-box">
                      <div className="image-box">
                        <figure className="image">
                          <img
                            src={`/assets/images/resource/working-${num}.jpg`}
                            alt=""
                          />
                        </figure>
                        <div className="icon-box">
                          <i className={`flaticon-${t(`icon${num}`)}`} />
                        </div>
                      </div>
                      <div className="lower-content">
                        <h3>
                          <Link
                            href="/fund-detailes"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {t(`block${num}.title`)}
                          </Link>
                        </h3>
                        <p>{t(`block${num}.description`)}</p>
                        <h2>
                          {t(`block${num}.number`)}{" "}
                          <span>{t(`block${num}.suffix`)}</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="more-text centred">
            <h5>
              {t("moreText")}{" "}
              <Link href="/">
                <i className="flaticon-right-chevron" />
                {t("moreLink")}
              </Link>
            </h5>
          </div>
        </div>
      </section>
      {/* working-section end */}
    </>
  );
}
