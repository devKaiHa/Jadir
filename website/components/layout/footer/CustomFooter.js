import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import baseURL from "@/api/GlobalData";
import { fetchJSON, pickArray } from "@/GlobalHooks/GlobalHooks";

const socialConfig = [
  { key: "facebook", icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { key: "xTwitter", icon: "fa-brands fa-twitter", label: "X" },
  { key: "instagram", icon: "fa-brands fa-instagram", label: "Instagram" },
  { key: "linkedin", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
];

const localize = (value, lang) =>
  value?.[lang] || value?.en || value?.ar || value?.tr || "";

const newsletterCopy = {
  en: {
    title: "Newsletter",
    text: "Stay tuned for market updates, insights, and new opportunities.",
    email: "Your email address",
    button: "Subscribe",
  },
  ar: {
    title: "النشرة البريدية",
    text: "ابقَ على اطلاع بآخر التحديثات والرؤى والفرص الاستثمارية.",
    email: "بريدك الإلكتروني",
    button: "اشترك",
  },
  tr: {
    title: "Bulten",
    text: "Piyasa guncellemeleri, analizler ve yeni firsatlar icin takipte kalin.",
    email: "E-posta adresiniz",
    button: "Abone Ol",
  },
};

const defaultAddress = {
  en: "Mahmutbey Mah. Haci Bostan Cad. No.22, Bagcilar - Istanbul",
  ar: "محلة محمود بيه، شارع حاجي بستان، رقم 22، باغجلار - إسطنبول",
  tr: "Mahmutbey Mah. Haci Bostan Cad. No.22, Bağcılar - İstanbul",
};

const CustomFooter = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const [footerData, setFooterData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [funds, setFunds] = useState([]);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      fetchJSON(`${baseURL}footer`),
      fetchJSON(`${baseURL}contact-us/public`),
      fetchJSON(`${baseURL}investment-funds/public?limit=3`),
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
      setFunds(
        results[2].status === "fulfilled"
          ? pickArray(results[2].value).slice(0, 3)
          : [],
      );
      setPolicies(
        results[3].status === "fulfilled" ? pickArray(results[3].value) : [],
      );
    });

    return () => {
      mounted = false;
    };
  }, []);

  const footerLinks = useMemo(
    () =>
      Array.isArray(footerData?.links)
        ? footerData.links.filter((item) => item?.isActive)
        : [],
    [footerData],
  );

  const socialLinks = useMemo(
    () =>
      socialConfig
        .filter((item) => footerData?.[item.key])
        .map((item) => ({ ...item, href: footerData[item.key] })),
    [footerData],
  );

  const branches = Array.isArray(contactData?.branches)
    ? contactData.branches.filter((item) => item?.isActive !== false)
    : [];
  const mainAddress =
    localize(contactData?.address, lang) ||
    defaultAddress[lang] ||
    defaultAddress.en;
  const policyLinks = {
    privacy:
      policies.find((item) => item?.policyType === "privacy")?.slug || null,
    terms: policies.find((item) => item?.policyType === "terms")?.slug || null,
  };
  const copy = newsletterCopy[lang] || newsletterCopy.en;
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section
        className="footer-style-three"
        style={{ background: "#0b2230", color: "#fff" }}
      >
        <div className="widget-section" style={{ padding: "78px 0 42px" }}>
          <div className="auto-container">
            <div className="row clearfix">
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget logo-widget">
                  <div className="footer-logo" style={{ marginBottom: "22px" }}>
                    <Link href="/">
                      <img
                        style={{ height: "72px" }}
                        src="/assets/images/logos/jadwa-en-light.png"
                        alt="Jadwa"
                      />
                    </Link>
                  </div>
                  <p
                    style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.9 }}
                  >
                    {localize(footerData?.description, lang) ||
                      t("companySpecialization")}
                  </p>
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    {socialLinks.map((item) => (
                      <a
                        key={item.key}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "999px",
                          border: "1px solid rgba(255,255,255,0.12)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                        }}
                      >
                        <i className={item.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget">
                  <div className="widget-title">
                    <h3 style={{ color: "#fff" }}>
                      {t("quick_links") === "quick_links"
                        ? "Quick Links"
                        : t("quick_links")}
                    </h3>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      {footerLinks.map((item, index) => (
                        <li key={`${item?.link}-${index}`}>
                          <Link href={item?.link || "#"}>{item?.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget links-widget">
                  <div className="widget-title">
                    <h3 style={{ color: "#fff" }}>
                      {t("InvestmentFunds") === "InvestmentFunds"
                        ? "Investment Funds"
                        : t("InvestmentFunds")}
                    </h3>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      {funds.map((fund) => (
                        <li key={fund?._id || fund?.slug}>
                          <a
                            href={fund?.fundLink || "/funds"}
                            target={fund?.fundLink ? "_blank" : undefined}
                            rel={fund?.fundLink ? "noreferrer" : undefined}
                          >
                            {localize(fund?.title, lang)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 col-sm-12 footer-column">
                <div className="footer-widget contact-widget" dir="ltr">
                  <div className="widget-title">
                    <h3 style={{ color: "#fff" }}>
                      {t("contact_us") === "contact_us"
                        ? "Contact"
                        : t("contact_us")}
                    </h3>
                  </div>
                  <ul>
                    <li>
                      <i className="fas fa-phone-alt"></i>
                      <a
                        href={`tel:${(contactData?.phones?.[0] || footerData?.phone || "").replace(/\s+/g, "")}`}
                      >
                        {contactData?.phones?.[0] ||
                          footerData?.phone ||
                          "+90 537 306 38 91"}
                      </a>
                    </li>
                    <li>
                      <i className="fas fa-envelope"></i>
                      <a
                        href={`mailto:${contactData?.emails?.[0] || footerData?.email || "info@jadwainvest.com"}`}
                      >
                        {contactData?.emails?.[0] ||
                          footerData?.email ||
                          "info@jadwainvest.com"}
                      </a>
                    </li>
                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      <a
                        href={
                          contactData?.mapLink ||
                          "https://maps.app.goo.gl/9GYrWv7hNnnmPyZf9"
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {mainAddress}
                      </a>
                    </li>
                    {branches.slice(0, 2).map((branch) => (
                      <li key={branch?._id || branch?.name?.en}>
                        <i className="fas fa-location-dot"></i>
                        <a
                          href={branch?.mapLink || contactData?.mapLink || "#"}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {localize(branch?.name, lang)}:{" "}
                          {localize(branch?.address, lang)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  marginTop: "10px",
                  paddingTop: "32px",
                }}
              >
                <div className="row clearfix align-items-center">
                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <div className="footer-widget mb-3 mb-lg-0">
                      <div className="widget-title">
                        <h3 style={{ color: "#fff", marginBottom: "10px" }}>
                          {copy.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          lineHeight: 1.8,
                          marginBottom: 0,
                        }}
                      >
                        {copy.text}
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-7 col-md-12 col-sm-12">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <input
                          type="email"
                          placeholder={copy.email}
                          style={{
                            flex: "1 1 320px",
                            minWidth: "260px",
                            padding: "14px 16px",
                            borderRadius: "12px",
                            border: "1px solid rgba(255,255,255,0.16)",
                            background: "rgba(255,255,255,0.04)",
                            color: "#fff",
                          }}
                        />
                        <button type="submit" className="theme-btn btn-two">
                          {copy.button}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "#081821",
          }}
        >
          <div className="auto-container">
            <div className="bottom-inner">
              <div className="left-column">
                <p>
                  &copy; {currentYear}, {t("all_rights_reserved")}
                </p>
                <ul className="footer-nav clearfix">
                  <li>
                    <Link
                      href={
                        policyLinks.privacy
                          ? `/policies/${policyLinks.privacy}`
                          : "/policies"
                      }
                    >
                      {t("privacy_policy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={
                        policyLinks.terms
                          ? `/policies/${policyLinks.terms}`
                          : "/policies"
                      }
                    >
                      {t("terms_conditions")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomFooter;
