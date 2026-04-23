import Link from "next/link";
import { useTranslation } from "react-i18next";
import About from "../sections/home2/About";
import AboutCompany from "../pages/Companies/AboutCompany";

export default function Breadcrumb({ breadcrumbTitle, img }) {
  const { t } = useTranslation();
  return (
    <>
      <section className="page-title centred">
        <div className="bg-layer" style={{ backgroundImage: `url(${img})` }}>
          <div className="overlay"></div>
        </div>

        <div className="auto-container">
          <div className="content-box breadcrumb_box">
            <h1>{breadcrumbTitle}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link href="/">{t("Breadcrumbhome")}</Link>
              </li>
              <li>{breadcrumbTitle}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
