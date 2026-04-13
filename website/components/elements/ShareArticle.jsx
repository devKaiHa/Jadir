"use client";

import { useMemo, useState } from "react";
import { stripHtml } from "../utils/helpers";

const ShareArticle = ({ title = "", description = "", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const cleanDescription = stripHtml(description || title);
  const encodedText = encodeURIComponent(cleanDescription);

  const links = [
    {
      key: "x",
      label: "X",
      icon: "fa-brands fa-twitter",
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      key: "facebook",
      label: "Facebook",
      icon: "fa-brands fa-facebook-f",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: "fa-brands fa-whatsapp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const handleNativeShare = async () => {
    try {
      if (!navigator.share) return;
      await navigator.share({
        title: stripHtml(title),
        text: cleanDescription,
        url: shareUrl,
      });
    } catch (error) {
      console.error("Native share cancelled or failed", error);
    }
  };

  return (
    <div
      className={className}
      style={{
        padding: "20px 24px",
        border: "1px solid #e9ecef",
        borderRadius: "18px",
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h5
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Share this article
          </h5>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            Send it to someone who may find it useful.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {typeof navigator !== "undefined" && navigator.share ? (
            <button
              type="button"
              onClick={handleNativeShare}
              style={buttonStyle}
              aria-label="Share"
            >
              <i className="fa-solid fa-arrow-up-from-bracket" />
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleCopy}
            style={{
              ...buttonStyle,
              width: "auto",
              padding: "0 14px",
              gap: "8px",
            }}
            aria-label="Copy link"
          >
            <i className="fa-solid fa-link" />
            <span>{copied ? "Copied" : "Copy link"}</span>
          </button>

          {links.map((item) => (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              style={buttonStyle}
              title={item.label}
            >
              <i className={item.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  width: "44px",
  height: "44px",
  borderRadius: "999px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  color: "#0f172a",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  cursor: "pointer",
  transition: "0.2s ease",
};

export default ShareArticle;
