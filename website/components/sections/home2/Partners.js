import { imageURL } from "@/api/GlobalData";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Partners({ partners }) {
  const { t } = useTranslation();

  return (
    <section className="clients-style-two" style={{ marginTop: "100px" }}>
      <div className="auto-container">
        <div className="sec-title centred">
          <span className="sub-title">{t("partners.title")}</span>
          <h2>{t("partners.subtitle")}</h2>
        </div>
        <div className="inner-container">
          <ul
            style={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
            className="clients-list clearfix d-flex"
          >
            {partners?.map((partner, index) => (
              <li className="shadow-sm rounded-5" key={index}>
                <h4 className="mb-2">{partner?.title}</h4>
                <figure className="clients-logo">
                  <Link
                    href=""
                    style={{ cursor: "default" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      style={{
                        width: "250px",
                        height: "200px",
                        objectFit: "contain",
                      }}
                      src={`${imageURL}partners/${partner?.img}`}
                      alt={partner?.title}
                    />
                  </Link>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
