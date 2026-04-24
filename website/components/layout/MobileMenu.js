"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { siteLinks } from "@/components/website/websiteUtils";
import SearchBox from "./SearchBox";

const languages = [
  { value: "en", label: "EN" },
  { value: "ar", label: "AR" },
  { value: "tr", label: "TR" },
];

const socialConfig = [
  { key: "facebook", icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { key: "xTwitter", icon: "fa-brands fa-twitter", label: "X" },
  { key: "instagram", icon: "fa-brands fa-instagram", label: "Instagram" },
  { key: "linkedin", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
];

const MobileMenu = ({ handleMobileMenu, isMobileMenu, footerData }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n?.language || "en";
  const isAr = currentLang === "ar";

  const socialLinks = useMemo(
    () =>
      socialConfig
        .filter((item) => footerData?.[item.key])
        .map((item) => ({ ...item, href: footerData?.[item.key] })),
    [footerData],
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);

    if (typeof document !== "undefined") {
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lng;
      document.cookie = `site_lang=${lng}; path=/; max-age=${30 * 24 * 60 * 60}`;
    }

    handleMobileMenu?.();
  };

  return (
    <div className={`jadwa-mobile-menu ${isMobileMenu ? "is-open" : ""}`}>
      <div className="jadwa-mobile-backdrop" onClick={handleMobileMenu} />

      <aside className={`jadwa-mobile-panel ${isAr ? "rtl" : "ltr"}`}>
        <div className="jadwa-mobile-panel-inner">
          <div className="jadwa-mobile-header">
            <Link
              href="/"
              className="jadwa-mobile-logo"
              onClick={handleMobileMenu}
            >
              <img
                src={
                  currentLang === "ar"
                    ? "/assets/images/logos/jadwa-ar-light.png"
                    : "/assets/images/logos/jadwa-en-light.png"
                }
                alt="Jadir"
              />
            </Link>

            <button
              type="button"
              className="jadwa-mobile-close"
              onClick={handleMobileMenu}
              aria-label="Close menu"
            >
              <i className="fas fa-times" />
            </button>
          </div>

          <div className="jadwa-mobile-top">
            {!!socialLinks.length && (
              <div className="jadwa-mobile-socials">
                {socialLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="jadwa-mobile-social-link"
                  >
                    <i className={item.icon} />
                  </a>
                ))}
              </div>
            )}

            <div className="jadwa-mobile-lang">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  type="button"
                  className={currentLang === lang.value ? "active" : ""}
                  onClick={() => changeLanguage(lang.value)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="jadwa-mobile-nav-wrap">
            <SearchBox
              variant="mobile"
              className="jadwa-mobile-search"
              onClose={handleMobileMenu}
            />

            <ul className="jadwa-mobile-nav">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={handleMobileMenu}>
                    <span>{link.label}</span>
                    <i
                      className={`fas ${isAr ? "fa-arrow-left" : "fa-arrow-right"}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="jadwa-mobile-cta">
            <Link
              href="/contact"
              className="jadwa-mobile-invest-btn"
              onClick={handleMobileMenu}
            >
              Request a consult
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;
