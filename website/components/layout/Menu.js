"use client";

import Link from "next/link";
import { siteLinks } from "@/components/website/websiteUtils";

export default function Menu() {
  return (
    <ul className="navigation clearfix">
      {siteLinks.map(({ href, label }) => (
        <li key={href}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}
