import React from "react";
import { useTranslation } from "react-i18next";

const StrategicGoals = ({ goals = [], lang = "en" }) => {
  const { t } = useTranslation();
  const displayedGoals = [
    goals[0] || null,
    goals[1] || null,
    goals[2] || null,
    null, // هنا الفراغ
    goals[3] || null,
    goals[4] || null,
  ];

  let realGoalIndex = 0;

  return (
    <section className="chooseus-style-two sec-pad">
      <span className="big-text">{t("strategic_goals")}</span>
      <div className="auto-container">
        <div className="sec-title">
          <span className="sub-title">{t("strategic_goals")}</span>
          <h2>{t("our_strategic_goals")}</h2>
        </div>

        <div className="inner-container">
          <div
            className="bg-layer"
            style={{
              backgroundImage: "url(/assets/images/background/choose_us3.jpg)",
            }}
          />

          <div className="inner-content clearfix">
            {displayedGoals.map((goal, index) => {
              // لو فيه هدف حقيقي، زيد العداد
              if (goal) {
                realGoalIndex++;
              }

              return (
                <div className="chooseus-block-two" key={index}>
                  {goal ? (
                    <div className="inner-box">
                      <div className="icon-box">
                        <i className="flaticon-downloads" />
                      </div>

                      <div className="text">
                        {t("goal")}
                        <span>{String(realGoalIndex).padStart(2, "0")}</span>
                      </div>
                      <p>
                        {goal?.[lang] ||
                          goal?.en ||
                          goal?.ar ||
                          goal?.tr ||
                          ""}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicGoals;
