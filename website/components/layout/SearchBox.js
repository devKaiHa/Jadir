"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import baseURL, { imageURL, SearchEndPoint } from "@/api/GlobalData";

const labels = {
  en: {
    placeholder: "Search by name or title",
    empty: "No matching results",
    loading: "Searching...",
    showAll: "Show all results",
  },
  ar: {
    placeholder: "ابحث بالاسم أو العنوان",
    empty: "لا توجد نتائج مطابقة",
    loading: "جاري البحث...",
    showAll: "عرض كل النتائج",
  },
  tr: {
    placeholder: "Ada veya basliga gore ara",
    empty: "Eslesen sonuc yok",
    loading: "Araniyor...",
    showAll: "Tum sonuclari goster",
  },
};

const localize = (value, lang = "en") => {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  return value[lang] || value.en || value.ar || "";
};

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const Highlight = ({ text, keyword }) => {
  if (!keyword?.trim()) return text;

  const parts = `${text || ""}`.split(
    new RegExp(`(${escapeRegex(keyword)})`, "ig"),
  );

  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark key={`${part}-${index}`}>{part}</mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
};

const getImageSrc = (item) => {
  if (!item?.image || !item?.imageFolder) return "";
  return `${imageURL}${item.imageFolder}/${item.image}`;
};

export default function SearchBox({
  autoFocus = false,
  className = "",
  variant = "desktop",
  onClose,
}) {
  const router = useRouter();
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const copy = labels[lang] || labels.en;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  const trimmedQuery = query.trim();
  const searchHref = useMemo(
    () => `/search?q=${encodeURIComponent(trimmedQuery)}`,
    [trimmedQuery],
  );

  useEffect(() => {
    if (!trimmedQuery) {
      setResults([]);
      setTotal(0);
      setIsOpen(false);
      return undefined;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setIsLoading(true);
      setIsOpen(true);

      try {
        const res = await fetch(
          `${baseURL}${SearchEndPoint}?q=${encodeURIComponent(trimmedQuery)}&limit=4`,
          { signal: controller.signal },
        );
        const payload = await res.json();
        setResults(Array.isArray(payload?.data) ? payload.data : []);
        setTotal(payload?.total || 0);
      } catch (error) {
        if (error.name !== "AbortError") {
          setResults([]);
          setTotal(0);
        }
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [trimmedQuery]);

  useEffect(() => {
    const onClick = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const goToSearch = (event) => {
    event.preventDefault();
    if (!trimmedQuery) return;

    setIsOpen(false);
    onClose?.();
    router.push(searchHref);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div
      ref={boxRef}
      className={`jadwa-global-search jadwa-global-search-${variant} ${className}`}
    >
      <form className="jadwa-global-search-form" onSubmit={goToSearch}>
        <input
          type="search"
          aria-label="Search"
          placeholder={copy.placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => trimmedQuery && setIsOpen(true)}
          autoFocus={autoFocus}
        />
        <button type="submit" aria-label="Search" disabled={!trimmedQuery}>
          <i className="fa-solid fa-magnifying-glass" />
        </button>
        {onClose && (
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="jadwa-global-search-close"
          >
            ×
          </button>
        )}
      </form>

      {isOpen && (
        <div className="jadwa-search-results-popover">
          {isLoading && (
            <div className="jadwa-search-state">{copy.loading}</div>
          )}

          {!isLoading && !!results.length && (
            <div className="jadwa-search-result-list">
              {results.map((item) => {
                const title = localize(item.title, lang);
                const imgSrc = getImageSrc(item);

                return (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={item.url}
                    className="jadwa-search-result-item"
                    onClick={handleResultClick}
                  >
                    <span className="jadwa-search-result-thumb">
                      {imgSrc ? (
                        <img src={imgSrc} alt={title} />
                      ) : (
                        <i className="fa-solid fa-file-lines" />
                      )}
                    </span>
                    <span className="jadwa-search-result-content">
                      <span className="jadwa-search-result-type">
                        {item.typeLabel}
                      </span>
                      <strong>
                        <Highlight text={title} keyword={trimmedQuery} />
                      </strong>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}

          {!isLoading && trimmedQuery && !results.length && (
            <div className="jadwa-search-state">{copy.empty}</div>
          )}

          {!isLoading && !!results.length && (
            <Link
              href={searchHref}
              className="jadwa-search-show-all"
              onClick={handleResultClick}
            >
              {copy.showAll}
              <i className="fa-solid fa-arrow-right" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
