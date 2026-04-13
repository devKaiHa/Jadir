import React, { useState } from "react";
import { turkishCitizenship } from "@/StaticData/TurkishCitzinShip";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const InvestmentOptions = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const investment_options = turkishCitizenship?.investment_options;
  const [activeTab, setActiveTab] = useState(data[0]?._id);

  return (
    <section className="industries-section" style={{ marginTop: "200px" }}>
      <div className="outer-container">
        <div
          className="bg-layer"
          style={{
            backgroundImage: "url(/assets/images/background/choose_us3.jpg)",
          }}
        />
        <div className="auto-container">
          <div className="tabs-box">
            <div className="row clearfix">
              {/* Content Column */}
              <div className="col-lg-8 col-md-12 col-sm-12 content-column">
                <div className="content-box">
                  <div className="sec-title light">
                    <span className="sub-title">
                      {investment_options?.section_title[lang]}
                    </span>
                    <h2>{investment_options?.section_subtitle[lang]}</h2>
                  </div>
                  <div className="tab-btns tab-buttons clearfix">
                    {data?.map((item, i) => (
                      <div
                        key={item?._id}
                        className={`tab-btn ${
                          activeTab === item?._id ? "active-btn" : ""
                        }`}
                        onClick={() => setActiveTab(item?._id)}
                      >
                        <span className="count-text">{`0${i + 1}`}</span>
                        <h3>{item?.title?.[lang]}</h3>
                        <Link href="">
                          <i className="flaticon-diagonal-arrow"></i>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inner Column */}
              <div className="col-lg-4 col-md-12 col-sm-12 inner-column">
                <div className="tabs-content">
                  {data?.map((item) => (
                    <div
                      key={item?._id}
                      className={`tab ${
                        activeTab === item?._id ? "active-tab" : ""
                      }`}
                      id={item?._id}
                    >
                      <div className="inner-box">
                        <h3>{item?.title?.[lang]}</h3>
                        <p>{item?.shortDescriptopn?.[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentOptions;
