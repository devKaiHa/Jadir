"use client";

import Link from "next/link";
import { siteLinks } from "@/components/website/websiteUtils";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

const navIcons = {
  "/": "fa-solid fa-house",
  "/about": "fa-regular fa-building",
  "/services": "fa-solid fa-layer-group",
  "/projects": "fa-regular fa-folder-open",
  "/companies": "fa-regular fa-building",
  "/investment-funds": "fa-solid fa-chart-line",
  "/research": "fa-regular fa-newspaper",
  "/career": "fa-solid fa-briefcase",
  "/blogs": "fa-solid fa-newspaper",
  "/contact": "fa-regular fa-paper-plane",
  "/policies": "fa-solid fa-shield-halved",
};

export default function Menu() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <ul className="navigation clearfix">
      {siteLinks.map(({ href, label }) => (
        <li
          key={href}
          className={
            href === "/"
              ? pathname === "/"
                ? "current"
                : ""
              : pathname.startsWith(href)
                ? "current"
                : ""
          }
        >
          <Link href={href}>
            <span className="jadwa-nav-icon">
              <i className={navIcons[href] || "fa-regular fa-circle"} />
            </span>
            <span className="jadwa-nav-label mx-1">{t(label)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
