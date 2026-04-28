"use client";

import Link from "next/link";
import Menu from "../Menu";
import SearchBox from "../SearchBox";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/lib/helpers";

const languages = [
  { value: "en", label: "English" },
  { value: "ar", label: "عربي" },
  { value: "tr", label: "Türkçe" },
];

const socialConfig = [
  { key: "facebook", icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { key: "xTwitter", icon: "fa-brands fa-twitter", label: "X" },
  { key: "instagram", icon: "fa-brands fa-instagram", label: "Instagram" },
  { key: "linkedin", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
];

export default function Header({
  scroll,
  handleMobileMenu,
  sticky,
  footerData,
}) {
  const isMobile = useIsMobile();
  const { i18n, t } = useTranslation();
  const [activeLang, setActiveLang] = useState("en");
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/site_lang=(\w+)/);
    if (match) setActiveLang(match[1]);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(activeLang);
    document.documentElement.dir = activeLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = activeLang;
  }, [activeLang, i18n]);

  const socialLinks = useMemo(
    () =>
      socialConfig
        .filter((item) => footerData?.[item.key])
        .map((item) => ({ ...item, href: footerData[item.key] })),
    [footerData],
  );

  const saveLanguage = (lng) => {
    setActiveLang(lng);
    document.cookie = `site_lang=${lng}; path=/; max-age=${30 * 24 * 60 * 60}`;
  };

  return (
    <header
      className={`jadwa-header ${scroll || sticky ? "is-sticky" : ""} ${
        openSearch ? "is-search-open" : ""
      }`}
    >
      <div className="outer-container">
        <div className="jadwa-header-wrap">
          <div className="jadwa-header-lower">
            <div className="jadwa-header-inner">
              <div className="jadwa-logo-box">
                <Link href="/" aria-label="Go to homepage">
                  <img
                    src="/assets/images/logos/jadir-dark.png"
                    alt="Jadir"
                    className="jadwa-logo"
                  />
                </Link>
              </div>

              <div className="jadwa-header-stack">
                <div className="jadwa-header-meta">
                  <div className="jadwa-header-tagline">
                    {t("digitalFinancialSolutions")}
                  </div>

                  <div className="jadwa-header-meta-actions">
                    <div className="jadwa-header-socials">
                      {footerData?.phone ? (
                        <a
                          href={`tel:${footerData.phone.replace(/\s+/g, "")}`}
                          aria-label="Phone"
                          className="jadwa-social-link"
                        >
                          <i className="fa-solid fa-phone" />
                        </a>
                      ) : null}

                      {footerData?.email ? (
                        <a
                          href={`mailto:${footerData.email}`}
                          aria-label="Email"
                          className="jadwa-social-link"
                        >
                          <i className="fa-solid fa-envelope" />
                        </a>
                      ) : null}

                      {socialLinks.map((item) => (
                        <a
                          key={item.key}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={item.label}
                          className="jadwa-social-link"
                        >
                          <i className={item.icon} />
                        </a>
                      ))}
                    </div>

                    <div className="jadwa-select-box">
                      <select
                        className="jadwa-language-select"
                        value={activeLang}
                        onChange={(e) => saveLanguage(e.target.value)}
                        aria-label="Select language"
                      >
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="jadwa-header-main-row">
                  <nav className="jadwa-nav main-menu navbar-expand-md navbar-light">
                    <div
                      className="collapse navbar-collapse clearfix"
                      id="navbarSupportedContent"
                    >
                      <Menu />
                    </div>
                  </nav>

                  <div className="jadwa-header-actions">
                    {isMobile ? null : !openSearch ? (
                      <button
                        type="button"
                        aria-label="Open search"
                        onClick={() => setOpenSearch(true)}
                        className="jadwa-search-icon"
                      >
                        <i className="fa-solid fa-magnifying-glass" />
                      </button>
                    ) : (
                      <SearchBox
                        autoFocus
                        variant="desktop"
                        onClose={() => setOpenSearch(false)}
                      />
                    )}

                    <Link href="/contact" className="jadwa-invest-btn">
                      {t("requestConsult")}
                    </Link>

                    <button
                      type="button"
                      className="mobile-nav-toggler jadwa-mobile-toggler"
                      onClick={handleMobileMenu}
                      aria-label="Open mobile menu"
                    >
                      <i className="icon-bar" />
                      <i className="icon-bar" />
                      <i className="icon-bar" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
