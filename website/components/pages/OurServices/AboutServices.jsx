"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const AboutServices = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!data) return null;

  return (
    <section className="about-style-two sec-pad">
      <div
        className="pattern-layer"
        style={{ backgroundImage: "url(assets/images/shape/shape-13.png)" }}
      />
      <div className="auto-container">
        <div className="sec-title">
          <span className="sub-title">{data?.title?.[lang] || data?.title?.en}</span>
          <h2>{data?.highlight?.[lang] || data?.highlight?.en}</h2>
        </div>

        <div className="row clearfix">
          <div className="col-lg-6 col-md-12 col-sm-12 inner-column">
              <div className="inner-box">
                <ul className="list-item clearfix">
                  {(data?.contentText?.[lang] || data?.contentText?.en || []).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <h3>
                {data?.contentTitle?.[lang] || data?.contentTitle?.en}
              </h3>
              <div className="text-box">
                {(data?.description?.[lang] ? [data.description[lang]] : []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <h5>{data?.highlight?.[lang] || data?.highlight?.en}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
