import { localize } from "@/components/website/websiteUtils";
import React from "react";

export const CareerModal = ({
  isOpen,
  setSelectedCareer,
  selectedCareer,
  lang,
}) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={() => setSelectedCareer(null)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "80vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ margin: 0 }}>{localize(selectedCareer?.title, lang)}</h3>

          <button
            type="button"
            onClick={() => setSelectedCareer(null)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "24px",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <p style={{ margin: 0 }}>
          {localize(selectedCareer?.description, lang)}
        </p>
      </div>
    </div>
  );
};
