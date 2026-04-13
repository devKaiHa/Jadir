"use client";

import Link from "next/link";
import Menu from "../Menu";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import baseURL from "@/api/GlobalData";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";

const languages = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
  { value: "tr", label: "Türkçe" },
];

const socialConfig = [
  { key: "facebook", icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { key: "xTwitter", icon: "fa-brands fa-twitter", label: "X" },
  { key: "instagram", icon: "fa-brands fa-instagram", label: "Instagram" },
  { key: "linkedin", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
];

export default function Header({ scroll, handleMobileMenu, sticky }) {
  const { t, i18n } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [suggestedLang, setSuggestedLang] = useState("en");
  const [activeLang, setActiveLang] = useState("en");
  const [userLocation, setUserLocation] = useState("");
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetchJSON(`${baseURL}footer`)
      .then((payload) => {
        if (mounted) setFooterData(payload?.data || null);
      })
      .catch(() => {
        if (mounted) setFooterData(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const match = document.cookie.match(/site_lang=(\w+)/);
    if (match) {
      setActiveLang(match[1]);
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        let userLang = data.languages
          ? data.languages.split(",")[0].slice(0, 2)
          : "en";
        if (!supportedLangs.includes(userLang)) userLang = "en";

        setSuggestedLang(userLang);
        setActiveLang(userLang);
        setShowModal(true);

        const location = `${data.city || "Unknown City"}, ${
          data.region || "Unknown Region"
        }, ${data.country_name || "Unknown Country"}`;
        setUserLocation(location);
      })
      .catch(() => {
        setSuggestedLang("en");
        setActiveLang("en");
        setShowModal(true);
        setUserLocation("Unknown Location");
      });
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
        .map((item) => ({
          ...item,
          href: footerData?.[item.key],
        })),
    [footerData]
  );

  const handleAccept = () => {
    setActiveLang(suggestedLang);
    document.cookie = `site_lang=${suggestedLang}; path=/; max-age=${
      30 * 24 * 60 * 60
    }`;
    setShowModal(false);
  };

  const handleOtherLang = (lng) => {
    setActiveLang(lng);
    document.cookie = `site_lang=${lng}; path=/; max-age=${30 * 24 * 60 * 60}`;
    setShowModal(false);
  };

  return (
    <>
      <header className={`jadwa-header ${scroll || sticky ? "is-sticky" : ""}`}>
        <div className="outer-container">
          <div className="jadwa-header-wrap">
            <div className="jadwa-header-top">
              <div className="jadwa-header-top-left">
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

              <div className="jadwa-header-top-right">
                {/* <span className="jadwa-language-label">
                  {t("language") === "language" ? "Language" : t("language")}
                </span> */}

                <div className="jadwa-select-box">
                  <select
                    className="jadwa-language-select"
                    value={activeLang}
                    onChange={(e) => handleOtherLang(e.target.value)}
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

            <div className="jadwa-header-lower">
              <div className="jadwa-header-inner">
                <div className="jadwa-logo-box">
                  <Link href="/">
                    <img
                      src={
                        i18n.language === "ar"
                          ? "/assets/images/logos/jadwa-ar-light.png"
                          : "/assets/images/logos/jadwa-en-light.png"
                      }
                      alt="Jadwa"
                      className="jadwa-logo"
                    />
                  </Link>
                </div>

                <nav className="jadwa-nav main-menu navbar-expand-md navbar-light">
                  <div
                    className="collapse navbar-collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <Menu />
                  </div>
                </nav>

                <Link
                  href="https://investment.jadwainvest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="jadwa-invest-btn"
                >
                  {activeLang === "ar"
                    ? "استثمر الآن"
                    : activeLang === "tr"
                    ? "Yatırım yap"
                    : "Invest now"}
                </Link>

                <div
                  className="mobile-nav-toggler jadwa-mobile-toggler"
                  onClick={handleMobileMenu}
                >
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showModal && (
        <div className="language-modal-overlay">
          <div className="language-modal">
            <div className="language-modal-content">
              <h2 className="language-modal-title">Language Preference</h2>
              <p className="language-modal-text">
                Based on your location, we detected your site in{" "}
                <b>{userLocation}</b>. The suggested language is{" "}
                <b>{suggestedLang.toUpperCase()}</b>.
              </p>
              <p className="language-modal-subtext">
                Or choose another language from the options below:
              </p>
              <div className="language-options">
                {supportedLangs
                  .filter((lng) => lng !== suggestedLang)
                  .map((lng) => (
                    <button
                      key={lng}
                      onClick={() => handleOtherLang(lng)}
                      className="language-option-btn"
                    >
                      {lng.toUpperCase()}
                    </button>
                  ))}
              </div>
            </div>

            <button onClick={handleAccept} className="theme-btn btn-two">
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
