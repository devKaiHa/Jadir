"use client";
import { useEffect, useState } from "react";
import BackToTop from "../elements/BackToTop";
import Breadcrumb from "./Breadcrumb";
import Header from "./header/Header";
import CustomFooter from "./footer/CustomFooter";
import MobileMenu from "./MobileMenu";

export default function Layout({
  breadcrumbTitle,
  image,
  children,
  wrapperCls,
  sticky,
}) {
  const [scroll, setScroll] = useState(0);
  // Mobile Menu
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
    !isMobileMenu
      ? document.body.classList.add("mobile-menu-visible")
      : document.body.classList.remove("mobile-menu-visible");
  };

  // Sidebar
  const [isSidebar, setSidebar] = useState(false);
  const handleSidebar = () => setSidebar(!isSidebar);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, []);
  return (
    <>
      <div
        className={`boxed_wrapper ${wrapperCls ? wrapperCls : ""}`}
        id="#top"
      >
        <Header
          scroll={scroll}
          handleMobileMenu={handleMobileMenu}
          sticky={sticky}
        />

        {/* Mobile Menu */}
        <MobileMenu
          handleMobileMenu={handleMobileMenu}
          handleSidebar={handleSidebar}
          isMobileMenu={isMobileMenu}
          isSidebar={isSidebar}
          sticky={sticky}
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
