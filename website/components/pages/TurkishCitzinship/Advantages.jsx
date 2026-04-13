import React from "react";
import { turkishCitizenship } from "@/StaticData/TurkishCitzinShip";
import { useTranslation } from "react-i18next";

const Advantages = ({ data }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const Advantages = turkishCitizenship?.Advantages;

  return (
    <section className="chooseus-style-three sec-pad">
      <div className="auto-container">
        <div className="sec-title centred ">
          <span className="sub-title">{Advantages?.section_title[lang]}</span>
          <h2>{Advantages?.section_subtitle[lang]}</h2>
        </div>

        <div
          className="advantages-wrapper"
          style={{ justifyContent: "space-around" }}
        >
          {data?.map((item, index) => (
            <div className="chooseus-block-three" key={index}>
              <div className="inner-box">
                <span className="count-text">{`0${index + 1}`}</span>
                <h3>{item?.title?.[lang]}</h3>
                <p>{item?.shortDescriptopn?.[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
