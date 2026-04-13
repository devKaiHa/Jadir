import { turkishCitizenship } from "@/StaticData/TurkishCitzinShip";
import { useTranslation } from "react-i18next";

export default function About({ data }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <section className="about-section sec-pad">
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-box">
              <div className="image-shape">
                <div
                  className="shape-1"
                  style={{
                    backgroundImage: "url(/assets/images/shape/shape-1.png)",
                  }}
                />
                <div
                  className="shape-2"
                  style={{
                    backgroundImage: "url(/assets/images/shape/shape-2.png)",
                  }}
                />
                <div
                  className="shape-3"
                  style={{
                    backgroundImage: "url(/assets/images/shape/shape-3.png)",
                  }}
                />
              </div>
              <figure className="image">
                <img src="/assets/images/turkpassaport.jpg" alt="" />
              </figure>
              <div className="experience-box"></div>
              <div className="dot-box">
                <span className="dot dot-1" />
                <span className="dot dot-2" />
                <span className="dot dot-3" />
                <span className="dot dot-4" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <div className="sec-title">
                <span className="sub-title">
                  {data?.aboutTitle?.[lang] || turkishCitizenship?.title[lang]}
                </span>
                <h2>{turkishCitizenship?.short_about[lang]}</h2>
              </div>
              <ul className="list-item clearfix">
                <li>
                  {data?.helper1?.[lang] ||
                    turkishCitizenship?.helper_about1[lang]}
                </li>
                <li>
                  {data?.helper2?.[lang] ||
                    turkishCitizenship?.helper_about2[lang]}
                </li>
              </ul>
              <div className="text-box">
                <p>
                  {data?.longAbout?.[lang] ||
                    turkishCitizenship?.long_about[lang]}
                </p>
              </div>
              <div className="btn-box">
                {/* <Link href="/about" className="theme-btn btn-two">
                    {turkishCitizenship?.more_about[lang]}
                  </Link> */}
                <span className="theme-btn btn-two">
                  {data?.yearsExp?.[lang]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
