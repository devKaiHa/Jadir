"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const links = [
    {
      href: "/",
      label: { ar: "الرئيسية", en: "Home", tr: "Ana Sayfa" },
    },
    {
      href: "/about",
      label: { ar: "من نحن", en: "About", tr: "Hakkında" },
    },
    {
      href: "/investments",
      label: { ar: "الاستثمارات", en: "Investments", tr: "Yatırımlar" },
    },
    {
      href: "/research",
      label: { ar: "الأبحاث", en: "Research", tr: "Araştırma" },
    },
    {
      href: "/blog-2",
      label: { ar: "المدونة", en: "Blog", tr: "Blog" },
    },
    {
      href: "/Contact-us",
      label: { ar: "تواصل معنا", en: "Contact", tr: "İletişim" },
    },
  ];

  return (
    <ul className="navigation clearfix">
      {links.map(({ href, label }, idx) => (
        <li key={idx}>
          <Link style={{ fontSize: "14px" }} href={href}>
            {label[lang] || label.en}
          </Link>
        </li>
      ))}
    </ul>
  );
}
