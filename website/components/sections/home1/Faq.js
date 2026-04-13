"use client";

import { useState } from "react";
import { turkishCitizenship } from "@/StaticData/TurkishCitzinShip";
import { useTranslation } from "react-i18next";

export default function Faq({ data }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const faqData = turkishCitizenship.faqData;

  const [isActive, setIsActive] = useState({
    status: true,
    key: data?._id, // Default to first
  });

  const handleToggle = (key) => {
    if (isActive.key === key) {
      setIsActive({ status: false, key });
    } else {
      setIsActive({ status: true, key });
    }
  };

  return (
    <section className="faq-section sec-pad">
      {/* <span className="big-text">{faqData.section_title[lang]}</span> */}
      <div className="auto-container">
        <div className="row clearfix">
          {/* Image Column */}
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-box">
              <figure className="image">
                <img src={faqData.image} alt="FAQ" />
              </figure>
              {/* <div className="btn-box">
                <Link
                  href={faqData.read_more_link}
                  className="theme-btn btn-one"
                >
                  {faqData.read_more_text[lang]}
                </Link>
              </div> */}
            </div>
          </div>

          {/* Content Column */}
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <div className="sec-title">
                <span className="sub-title">
                  {data?.questionsTitle?.[lang] || faqData.section_title[lang]}
                </span>
                <h2 style={{ color: "#939393" }}>
                  {faqData.section_subtitle[lang]}
                </h2>
              </div>
              <ul className="accordion-box">
                {data?.map((item, index) => (
                  <li
                    key={index}
                    className={`accordion block ${
                      isActive.key === item?._id ? "active-block" : ""
                    }`}
                  >
                    <div
                      className={`acc-btn ${
                        isActive.key === item?._id ? "active" : ""
                      }`}
                      onClick={() => handleToggle(item?._id)}
                    >
                      <div className="icon-box">
                        <i className="flaticon-right-chevron"></i>
                      </div>
                      <h4>{item?.questions?.[lang]}</h4>
                    </div>
                    <div
                      className={`acc-content ${
                        isActive.key === item?._id ? "current" : ""
                      }`}
                    >
                      <p>{item?.answers?.[lang]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
