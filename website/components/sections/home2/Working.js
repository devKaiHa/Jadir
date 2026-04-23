"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { formatNumberSuff } from "@/components/utils/helpers";

export default function Working({ funds = [] }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  if (!funds?.length) return null;

  const sectionTitle =
    lang === "ar"
      ? "الصناديق الاستثمارية"
      : lang === "tr"
      ? "Yatırım Fonları"
      : "Investment Funds";

  const sectionHeading =
    lang === "ar"
      ? "الصناديق المتاحة من مصدر البيانات"
      : lang === "tr"
      ? "Veri kaynağındaki mevcut fonlar"
      : "Funds Available In The Data";

  const getText = (field) =>
    field?.[lang] || field?.en || field?.ar || field?.tr || "";

  return (
    <section
      className={`funds-section sec-pad ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="auto-container">
        <div className="jadwa-testimonials-head">
          <div className="jadwa-pill">
            <span className="jadwa-pill-dot" />
            <span>{sectionTitle}</span>
          </div>

          <h2 className="jadwa-testimonials-title">{sectionHeading}</h2>

          <p className="jadwa-testimonials-subtitle">
            {lang === "ar"
              ? "اكتشف مجموعة مختارة من الصناديق الاستثمارية المصممة للنمو طويل الأجل وإدارة الفرص بكفاءة."
              : lang === "tr"
              ? "Uzun vadeli büyüme ve fırsat yönetimi için tasarlanmış seçkin yatırım fonlarını keşfedin."
              : "Explore a curated selection of investment funds designed for long-term growth."}
          </p>
        </div>

        <div className="row clearfix">
          {funds.map((item, index) => {
            const title = getText(item?.title);
            const type = getText(item?.type);

            const sectors = Array.isArray(item?.sectors)
              ? item.sectors.map((sector) => getText(sector)).filter(Boolean)
              : [];

            const investmentVolume =
              item?.investmentVolume || item?.assetsVolume;
            const investmentVolumeValue = investmentVolume
              ? formatNumberSuff(investmentVolume)
              : null;

            const irrValue = item?.irr ? `${item.irr}%` : null;

            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 funds-block"
                key={item?._id || index}
              >
                <div className="fund-card">
                  <div className="fund-card-inner">
                    <span className="fund-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>{" "}
                    <div className="fund-card-meta-top">
                      {type ? (
                        <span className="fund-card-type">{type}</span>
                      ) : null}
                      <div className="fund-card-topline" />
                    </div>
                    <div className="fund-card-main">
                      <div className="fund-card-head">
                        <h3 className="fund-card-title">{title}</h3>
                      </div>

                      {!!sectors.length && (
                        <div className="fund-card-sectors-wrap">
                          <div className="fund-card-sectors">
                            {sectors.slice(0, 3).map((sector, sectorIndex) => (
                              <span
                                key={`${sector}-${sectorIndex}`}
                                className="fund-card-sector-chip"
                              >
                                {sector}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="fund-card-metric-wrap">
                        <div className="fund-card-stats">
                          {investmentVolumeValue ? (
                            <div className="fund-stat-item">
                              <span className="fund-stat-label">
                                {lang === "ar"
                                  ? "حجم الاستثمار"
                                  : lang === "tr"
                                  ? "Yatırım Hacmi"
                                  : "Investment Volume"}
                              </span>
                              <strong className="fund-stat-value">
                                {investmentVolumeValue}
                              </strong>
                            </div>
                          ) : null}

                          {irrValue ? (
                            <div className="fund-stat-item">
                              <span className="fund-stat-label">
                                {lang === "ar"
                                  ? "العائد السنوي"
                                  : lang === "tr"
                                  ? "Hedef IRR"
                                  : "Target IRR"}
                              </span>
                              <strong className="fund-stat-value">
                                {irrValue}
                              </strong>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="fund-card-footer">
                      <Link
                        href={
                          item?.slug ? `/fund-details/${item.slug}` : "/funds"
                        }
                        className="fund-card-link"
                      >
                        <span className="fund-card-link-icon">↗</span>
                        <span>{t("see_more")}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
