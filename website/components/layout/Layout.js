"use client";

import { useEffect, useState } from "react";
import BackToTop from "../elements/BackToTop";
import Breadcrumb from "./Breadcrumb";
import Header from "./header/Header";
import CustomFooter from "./footer/CustomFooter";
import MobileMenu from "./MobileMenu";
import baseURL from "@/api/GlobalData";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";

export default function Layout({
  breadcrumbTitle,
  image,
  children,
  wrapperCls,
  sticky,
}) {
  const [scroll, setScroll] = useState(false);
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [footerData, setFooterData] = useState(null);

  const handleMobileMenu = () => {
    setMobileMenu((prev) => {
      const next = !prev;

      if (typeof document !== "undefined") {
        if (next) {
          document.body.classList.add("mobile-menu-visible");
        } else {
          document.body.classList.remove("mobile-menu-visible");
        }
      }

      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY > 100);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("mobile-menu-visible");
    };
  }, []);

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

  return (
    <>
      <div className={`boxed_wrapper ${wrapperCls || ""}`} id="top">
        <Header
          scroll={scroll}
          handleMobileMenu={handleMobileMenu}
          sticky={sticky}
          footerData={footerData}
        />

        <MobileMenu
          handleMobileMenu={handleMobileMenu}
          isMobileMenu={isMobileMenu}
          footerData={footerData}
        />

        {breadcrumbTitle && (
          <Breadcrumb breadcrumbTitle={breadcrumbTitle} img={image} />
        )}

        {children}
        <CustomFooter />
      </div>

      <BackToTop scroll={scroll} />
    </>
  );
}
