import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function ConsultCTA() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  return (
    <section
      className={`consult-cta-section ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="auto-container">
        <div className="consult-cta-box">
          <h2 className="consult-cta-title">{t("consultTitle")}</h2>

          <button
            className="consult-cta-btn"
            onClick={() => router.push("/Contact-us")}
          >
            {t("contactUs")}
          </button>
        </div>
      </div>
    </section>
  );
}
