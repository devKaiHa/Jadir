"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
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
      : "Funds Available In The Data Source";

  return (
    <section
      className={`funds-section sec-pad ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="funds-bg-shape funds-bg-shape-one" />
      <div className="funds-bg-shape funds-bg-shape-two" />

      <div className="auto-container">
        <div className="sec-title centred funds-title-wrap">
          <span className="sub-title funds-subtitle">{sectionTitle}</span>
          <h2 className="funds-heading">{sectionHeading}</h2>
        </div>

        <div className="row clearfix">
          {funds.map((item, index) => {
            const title = item?.title?.[lang] || item?.title?.en || "";
            const desc =
              item?.shortAbout?.[lang] ||
              item?.shortAbout?.en ||
              item?.content?.[lang] ||
              item?.content?.en ||
              "";

            const assetsVolume = item?.assetsVolume
              ? formatNumberSuff(item.assetsVolume)
              : null;

            const irrValue = item?.irr ? `${item.irr}%` : null;

            const minInvestment = item?.minInvestAmount || null;

            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 funds-block"
                key={item?._id || index}
              >
                <div className="fund-card">
                  <div className="fund-card-inner">
                    <span className="fund-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="fund-card-topline" />

                    <div className="fund-card-main">
                      <div className="fund-card-head">
                        <h3 className="fund-card-title">{title}</h3>
                      </div>

                      <div className="fund-card-desc-wrap">
                        <p className="fund-card-desc">
                          {truncateText(desc, 120)}
                        </p>
                      </div>

                      <div className="fund-card-metric-wrap">
                        {assetsVolume || irrValue ? (
                          <div className="fund-card-stats">
                            {assetsVolume && (
                              <div className="fund-stat-item">
                                <span className="fund-stat-label">
                                  {lang === "ar"
                                    ? "حجم الأصول"
                                    : lang === "tr"
                                    ? "Varlık Hacmi"
                                    : "Assets Volume"}
                                </span>
                                <strong className="fund-stat-value">
                                  {assetsVolume}
                                </strong>
                              </div>
                            )}

                            {irrValue && (
                              <div className="fund-stat-item">
                                <span className="fund-stat-label">IRR</span>
                                <strong className="fund-stat-value">
                                  {irrValue}
                                </strong>
                              </div>
                            )}
                          </div>
                        ) : minInvestment ? (
                          <div className="fund-card-stats fund-card-stats-single">
                            <div className="fund-stat-item">
                              <span className="fund-stat-label">
                                {lang === "ar"
                                  ? "الحد الأدنى للاستثمار"
                                  : lang === "tr"
                                  ? "Minimum Yatırım"
                                  : "Minimum Investment"}
                              </span>
                              <strong className="fund-stat-value">
                                {minInvestment}
                              </strong>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="fund-card-footer">
                      <Link
                        href={item?.fundLink || "/funds"}
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
