import { twMerge } from "tailwind-merge";
import countries from "../config/countries.json";

// eslint-disable-next-line no-unused-vars
export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
};

export function debounce(func, wait) {
  let timeout = null;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function deepMerge(obj1, obj2) {
  const output = Object.assign({}, obj1);
  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      if (typeof obj2[key] === "object" && obj2[key] !== null && obj1[key]) {
        output[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        output[key] = obj2[key];
      }
    }
  }
  return output;
}

export function uniqueID() {
  return (Date.now() + Math.floor(Math.random() * 1000)).toString();
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getCountryNameByCode = (code, locale = "en") => {
  if (!code) return "";

  const country = countries.find((c) => c.code === code);

  if (!country) return code;

  return locale === "ar" ? country.name_ar : country.name_en;
};

export const truncateText = (text = "", maxLength = 120) => {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
};
