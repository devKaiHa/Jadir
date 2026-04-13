"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Industries({ sectors }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeTab, setActiveTab] = useState(sectors[0]?._id);

  return (
    <section className="industries-section">
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
                      {sectors[0]?.sectorsTitle?.title?.[lang] ||
                        t("investmentSectors.title")}
                    </span>
                    <h2>
                      {sectors[0]?.sectorsTitle?.subtitle?.[lang] ||
                        t("investmentSectors.subtitle")}
                    </h2>
                  </div>
                  <div className="tab-btns tab-buttons clearfix">
                    {sectors?.map((sector, index) => (
                      <div
                        key={index}
                        className={`tab-btn ${
                          activeTab === sector?._id ? "active-btn" : "text-gray"
                        }`}
                        onClick={() => setActiveTab(sector?._id)}
                      >
                        <span
                          className="count-text"
                          style={{ borderBottomLeftRadius: "30px" }}
                        >
                          0{index + 1}
                        </span>
                        <Link href={"/"}>
                          <i className="flaticon-diagonal-arrow"></i>
                        </Link>
                        <span className="ms-3">{sector?.name?.[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inner Column */}
              <div className="col-lg-4 col-md-12 col-sm-12 inner-column">
                <div className="tabs-content">
                  {sectors?.map((sector, index) => {
                    return (
                      <div
                        key={index}
                        className={`tab ${
                          activeTab === sector?._id ? "active-tab" : ""
                        }`}
                        id={sector?._id}
                      >
                        <div className="inner-box">
                          <h3>{sector?.name?.[lang]}</h3>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: sector?.description?.[lang],
                            }}
                          ></p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
