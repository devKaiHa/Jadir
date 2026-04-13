import { useState, useEffect } from "react";
import countries from "./countries.json";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This code only runs on the client
    const userAgent = navigator.userAgent;
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(userAgent));
  }, []);

  return isMobile;
}

export const getCountryNameByCode = (code, lang = "en") => {
  if (!code) return "";

  const country = countries.find((c) => c.code === code);

  if (!country) return code;

  return lang === "ar" ? country.name_ar : country.name_en;
};
