"use client";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";

const WhyChooseUs = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <section className="working-style-two sec-pad">
      <div className="auto-container">
        <div className="sec-title centred">
          <span className="sub-title" style={{ color: "#e9b083" }}>
            {lang === "en" && "Why Choose Us"}
            {lang === "ar" && "لماذا تختارنا"}
            {lang === "tr" && "Neden Bizi Seçmelisiniz"}
          </span>
          <h2>
            {lang === "en" && "Our Key Advantages"}
            {lang === "ar" && "مميزاتنا الرئيسية"}
            {lang === "tr" && "Temel Avantajlarımız"}
          </h2>
        </div>

        <div className="inner-container">
          <div className="row clearfix">
            {data?.map((item, idx) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 working-block"
                key={idx}
              >
                <div className="working-block-two">
                  <div className="inner-box">
                    <div className="upper-box centred">
                      <span className="count-text">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="icon-box">
                        <h1>{item?.title?.[lang]}</h1>
                      </div>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        {truncateText(item?.description?.[lang], 100)}
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
  );
};

export default WhyChooseUs;
