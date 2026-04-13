"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { contactInfo } from "@/StaticData/ContactUs";

const MobileMenu = ({
  isSidebar,
  handleMobileMenu,
  handleSidebar,
  sticky,
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const navLinks = [
    {
      href: "/",
      label: { ar: "الرئيسية", en: "Home", tr: "Ana Sayfa" },
    },
    {
      href: "/about",
      label: { ar: "من نحن", en: "About", tr: "Hakkinda" },
    },
    {
      href: "/Services",
      label: { ar: "خدماتنا", en: "Services", tr: "Hizmetler" },
    },
    {
      href: "/investments",
      label: { ar: "الاستثمارات", en: "Investments", tr: "Yatirimlar" },
    },
    {
      href: "/companies",
      label: { ar: "شركاتنا", en: "Companies", tr: "Sirketler" },
    },
    {
      href: "/funds",
      label: { ar: "الصناديق", en: "Funds", tr: "Fonlar" },
    },
    {
      href: "/projects",
      label: { ar: "المشاريع", en: "Projects", tr: "Projeler" },
    },
    {
      href: "/research",
      label: { ar: "الأبحاث", en: "Research", tr: "Arastirma" },
    },
    {
      href: "/team",
      label: { ar: "الفريق", en: "Team", tr: "Ekip" },
    },
    {
      href: "/blog-2",
      label: { ar: "المدونة", en: "Blog", tr: "Blog" },
    },
    {
      href: "/Contact-us",
      label: { ar: "تواصل معنا", en: "Contact", tr: "Iletisim" },
    },
  ];

  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
    subMenuKey: "",
  });

  const handleToggle = (key, subMenuKey = "") => {
    if (isActive.key === key && isActive.subMenuKey === subMenuKey) {
      setIsActive({ status: false, key: "", subMenuKey: "" });
    } else {
      setIsActive({ status: true, key, subMenuKey });
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    const dir = lng === "ar" ? "rtl" : "ltr";

    if (typeof document !== "undefined") {
      document.documentElement.dir = dir;
      document.documentElement.lang = lng;
    }

    handleMobileMenu?.();
  };

  return (
    <div className="mobile-menu">
      <div className="menu-backdrop" onClick={handleMobileMenu} />
      <div className="close-btn" onClick={handleMobileMenu}>
        <i className="fas fa-times"></i>
      </div>

      <nav className="menu-box">
        <div className="nav-logo">
          <Link href="/">
            <img src="/assets/images/logos/jadwa-en-light.png" alt="Jadwa" />
          </Link>
        </div>

        <div className="menu-outer">
          <div className="collapse navbar-collapse show clearfix">
            <ul className="navigation clearfix">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className={
                    isActive.key === index ? "dropdown current" : "dropdown"
                  }
                >
                  <Link href={link.href} onClick={handleMobileMenu}>
                    {link.label[currentLang] || link.label.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mobile-lang">
          <button
            className={currentLang === "en" ? "active" : ""}
            onClick={() => changeLanguage("en")}
          >
            EN
          </button>
          <button
            className={currentLang === "tr" ? "active" : ""}
            onClick={() => changeLanguage("tr")}
          >
            TR
          </button>
          <button
            className={currentLang === "ar" ? "active" : ""}
            onClick={() => changeLanguage("ar")}
          >
            AR
          </button>
        </div>

        <div className="contact-info">
          <h4>{contactInfo.title[currentLang] || contactInfo.title.en}</h4>
          <ul>
            <li>{contactInfo.address[currentLang] || contactInfo.address.en}</li>
            <li>
              <Link href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</Link>
            </li>
            <li>
              <Link href={`mailto:${contactInfo.email}`}>
                {contactInfo.email}
              </Link>
            </li>
          </ul>
        </div>

        <div className="social-links">
          <ul className="clearfix">
            {contactInfo.socials.map((social, index) => (
              <li key={index}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.platform === "Facebook" && (
                    <span className="fab fa-facebook-f" />
                  )}
                  {social.platform === "Twitter" && (
                    <span className="fab fa-twitter" />
                  )}
                  {social.platform === "Instagram" && (
                    <span className="fab fa-instagram" />
                  )}
                  {social.platform === "LinkedIn" && (
                    <span className="fab fa-linkedin-in" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
