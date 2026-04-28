import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import baseURL from "@/api/GlobalData";
import { fetchJSON, pickArray } from "@/GlobalHooks/GlobalHooks";
import { localize, siteLinks } from "@/components/website/websiteUtils";

const socialConfig = [
  { key: "facebook", icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { key: "xTwitter", icon: "fa-brands fa-twitter", label: "X" },
  { key: "instagram", icon: "fa-brands fa-instagram", label: "Instagram" },
  { key: "linkedin", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
];

const closedLabel = {
  en: "Closed",
  ar: "مغلق",
};

const formatDayRange = (days, lang) => {
  if (!days.length) return "";
  if (days.length === 1) return days[0];
  return `${days[0]} - ${days[days.length - 1]}`;
};

const groupWorkingSchedule = (schedule, lang) => {
  const grouped = [];
  let current = null;

  schedule.forEach((item) => {
    const dayLabel = localize(item?.day, lang);
    const hoursLabel = item?.isClosed
      ? closedLabel[lang]
      : localize(item?.hours, lang) || localize(item?.hours, "en");

    if (!dayLabel || !hoursLabel) return;

    if (!current || current.hours !== hoursLabel) {
      if (current) {
        grouped.push({
          days: formatDayRange(current.days, lang),
          hours: current.hours,
        });
      }

      current = {
        days: [dayLabel],
        hours: hoursLabel,
      };
    } else {
      current.days.push(dayLabel);
    }
  });

  if (current) {
    grouped.push({
      days: formatDayRange(current.days, lang),
      hours: current.hours,
    });
  }

  return grouped;
};

export default function CustomFooter() {
  const { i18n, t } = useTranslation();
  const lang = i18n?.language === "ar" ? "ar" : "en";
  const [footerData, setFooterData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [policies, setPolicies] = useState([]);

  const workingSchedule = useMemo(() => {
    const schedule = Array.isArray(footerData?.workingSchedule)
      ? [...footerData.workingSchedule]
          .filter(
            (item) => localize(item?.day, lang) || localize(item?.hours, lang),
          )
          .sort((a, b) => (a?.order || 0) - (b?.order || 0))
      : [];

    return groupWorkingSchedule(schedule, lang);
  }, [footerData?.workingSchedule, lang]);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      fetchJSON(`${baseURL}footer`),
      fetchJSON(`${baseURL}contact-us/public`),
      fetchJSON(`${baseURL}policies/public`),
    ]).then((results) => {
      if (!mounted) return;

      setFooterData(
        results[0].status === "fulfilled"
          ? results[0].value?.data || null
          : null,
      );
      setContactData(
        results[1].status === "fulfilled"
          ? results[1].value?.data || null
          : null,
      );
      setPolicies(
        results[2].status === "fulfilled" ? pickArray(results[2].value) : [],
      );
    });

    return () => {
      mounted = false;
    };
  }, []);

  const socialLinks = useMemo(
    () =>
      socialConfig
        .filter((item) => footerData?.[item.key])
        .map((item) => ({ ...item, href: footerData[item.key] })),
    [footerData],
  );

  const currentYear = new Date().getFullYear();
  const address = localize(contactData?.address, lang) || "Istanbul, Turkey";
  const phone = contactData?.phones?.[0] || footerData?.phone || "";
  const email = contactData?.emails?.[0] || footerData?.email || "";

  return (
    <section className="footer-premium">
      <div className="footer-premium-main">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget footer-premium-widget">
                <div className="footer-logo footer-premium-logo">
                  <Link href="/">
                    <img
                      className="footer-premium-logo-img"
                      src="/assets/images/logos/jadir-dark.png"
                      alt="Jadir"
                    />
                  </Link>
                </div>
                <p className="footer-premium-desc">
                  {localize(footerData?.description, lang) ||
                    "Structured advisory, services, projects, and insights for better business decisions."}
                </p>
                <div className="footer-premium-socials">
                  {socialLinks.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="footer-premium-social-link"
                    >
                      <i className={item.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget footer-premium-widget">
                <div className="widget-title footer-premium-widget-title">
                  <h3>{t("quickLinks")}</h3>
                </div>
                <ul className="links-list clearfix footer-premium-links">
                  {siteLinks.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{t(item.label)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget footer-premium-widget">
                <div className="widget-title footer-premium-widget-title">
                  <h3>{t("policies")}</h3>
                </div>
                <ul className="links-list clearfix footer-premium-links">
                  {policies.map((policy) => (
                    <li key={policy?._id || policy?.slug}>
                      <Link href={`/policies/${policy?.slug}`}>
                        {localize(policy?.title, lang)}
                      </Link>
                    </li>
                  ))}
                  {!policies.length ? (
                    <li>
                      <Link href="/policies">{t("privacyTerms")}</Link>
                    </li>
                  ) : null}
                </ul>
                <div className="footer-premium-schedule">
                  <strong>{t("workDaysHours")}</strong>
                  {workingSchedule.length ? (
                    <ul className="footer-premium-schedule-list">
                      {workingSchedule.map((item, index) => (
                        <li key={`${item?.days}-${index}`}>
                          <span>{item?.days}</span>
                          <strong>{item?.hours}</strong>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      {footerData?.workDays || "Monday - Friday"}
                      <br />
                      {footerData?.workingHours || "09:00 - 17:00"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12 footer-column">
              <div className="footer-widget contact-widget footer-premium-widget footer-premium-contact">
                <div className="widget-title footer-premium-widget-title">
                  <h3>{t("contactInfo")}</h3>
                </div>
                <ul className="footer-premium-contact-list">
                  {phone ? (
                    <li>
                      <span className="footer-premium-contact-icon">
                        <i className="fas fa-phone-alt" />
                      </span>
                      <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
                    </li>
                  ) : null}
                  {email ? (
                    <li>
                      <span className="footer-premium-contact-icon">
                        <i className="fas fa-envelope" />
                      </span>
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  ) : null}
                  <li>
                    <span className="footer-premium-contact-icon">
                      <i className="fas fa-map-marker-alt" />
                    </span>
                    <a
                      href={contactData?.mapLink || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {address}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-premium-newsletter-wrap">
            <div className="row clearfix align-items-center">
              <div className="col-lg-5 col-md-12 col-sm-12">
                <div className="footer-widget footer-premium-widget">
                  <div className="widget-title footer-premium-widget-title">
                    <h3>{t("newsletter")}</h3>
                  </div>
                  <p className="footer-premium-newsletter-text">
                    {t("newsletterText")}
                  </p>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12">
                <form onSubmit={(event) => event.preventDefault()}>
                  <div className="footer-premium-newsletter-form">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="footer-premium-input"
                    />
                    <button
                      type="submit"
                      className="theme-btn btn-two footer-premium-btn"
                    >
                      <span>{t("subscribe")}</span>
                      <i className="fas fa-paper-plane" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-premium-bottom">
        <div className="auto-container">
          <div className="footer-premium-bottom-inner">
            <div className="footer-premium-bottom-left">
              <div className="footer-premium-bottom-brand">
                <p>
                  &copy; {currentYear}, {t("allRightsReserved")}
                </p>
              </div>

              <ul className="clearfix footer-premium-bottom-nav">
                <li>
                  <Link href="/policies">{t("privacyTerms")}</Link>
                </li>
                {policies.slice(0, 2).map((item) => (
                  <li key={item?._id || item?.slug}>
                    <Link href={`/policies/${item?.slug}`}>
                      {localize(item?.title, lang)}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href="https://smartinb.com"
                target="_blank"
                rel="noreferrer"
                className="footer-premium-credit"
                aria-label="Developed by Smartinb"
              >
                <span className="footer-premium-credit-text">
                  {t("developedBy")}
                </span>
                <span className="footer-premium-credit-brand">
                  <span className="footer-premium-credit-dot" />
                  Smartinb
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
