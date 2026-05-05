import { localize } from "@/components/website/websiteUtils";
import React from "react";

const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const labels = {
  en: {
    overview: "Role Overview",
    details: "Role Details",
    requirements: "Requirements",
    responsibilities: "Responsibilities",
    benefits: "Benefits",
    endDate: "End Date",
    department: "Department",
    location: "Location",
    type: "Type",
    apply: "Apply Now",
    close: "Close",
    openRole: "Open role",
    closed: "Application closed",
    notSpecified: "Not specified",
  },
  ar: {
    overview: "نظرة عامة",
    details: "تفاصيل الوظيفة",
    requirements: "المتطلبات",
    responsibilities: "المسؤوليات",
    benefits: "المزايا",
    endDate: "تاريخ الانتهاء",
    department: "القسم",
    location: "الموقع",
    type: "النوع",
    apply: "قدم الآن",
    close: "إغلاق",
    openRole: "متاحة",
    closed: "انتهى التقديم",
    notSpecified: "غير محدد",
  },
  tr: {
    overview: "Rol Özeti",
    details: "Rol Detayları",
    requirements: "Gereksinimler",
    responsibilities: "Sorumluluklar",
    benefits: "Avantajlar",
    endDate: "Bitiş Tarihi",
    department: "Departman",
    location: "Konum",
    type: "Tür",
    apply: "Başvur",
    close: "Kapat",
    openRole: "Açık rol",
    closed: "Başvuru kapandı",
    notSpecified: "Belirtilmedi",
  },
};

const formatDate = (value, lang) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString(lang === "ar" ? "ar" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const normalizeList = (value, lang) => {
  const localized = localize(value, lang);

  if (Array.isArray(localized)) return localized.filter(Boolean);
  if (Array.isArray(value)) return value.filter(Boolean);

  if (typeof localized === "string" && localized.trim()) {
    return localized
      .split(/\n|•|-/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const InfoItem = ({ icon, label, value }) => {
  if (!value) return null;

  return (
    <div className="career-modal-info-item">
      <span className="career-modal-info-icon">
        <i className={icon} />
      </span>

      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
};

const ListSection = ({ title, items = [] }) => {
  if (!items.length) return null;

  return (
    <div className="career-modal-section">
      <h4>{title}</h4>

      <ul className="career-modal-list">
        {items.map((item, index) => (
          <li key={`${title}-${index}`}>{stripHtml(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export const CareerModal = ({
  isOpen,
  setSelectedCareer,
  selectedCareer,
  lang = "en",
}) => {
  if (!isOpen || !selectedCareer) return null;

  const copy = labels[lang] || labels.en;
  const isRtl = lang === "ar";

  const title = localize(selectedCareer?.title, lang);
  const description = localize(selectedCareer?.description, lang);
  const department =
    localize(
      selectedCareer?.department ||
        selectedCareer?.category ||
        selectedCareer?.type,
      lang
    ) || copy.notSpecified;

  const location =
    localize(selectedCareer?.location, lang) ||
    selectedCareer?.location ||
    copy.notSpecified;

  const type =
    localize(selectedCareer?.jobType || selectedCareer?.workType, lang) ||
    copy.notSpecified;

  const requirements = normalizeList(
    selectedCareer?.requirements || selectedCareer?.qualifications,
    lang
  );

  const responsibilities = normalizeList(
    selectedCareer?.responsibilities || selectedCareer?.tasks,
    lang
  );

  const benefits = normalizeList(selectedCareer?.benefits, lang);

  const isExpired =
    selectedCareer?.endDate &&
    new Date(selectedCareer.endDate).getTime() < Date.now();

  return (
    <div
      className={`career-modal-overlay ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
      onClick={() => setSelectedCareer(null)}
    >
      <div className="career-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => setSelectedCareer(null)}
          className="career-modal-close"
          aria-label={copy.close}
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="career-modal-head">
          <div className="career-modal-status-row">
            <span
              className={`career-modal-status ${isExpired ? "closed" : "open"}`}
            >
              {isExpired ? copy.closed : copy.openRole}
            </span>

            {selectedCareer?.endDate ? (
              <span className="career-modal-date">
                <i className="fa-regular fa-calendar" />
                {copy.endDate}: {formatDate(selectedCareer.endDate, lang)}
              </span>
            ) : null}
          </div>

          <h3>{title}</h3>

          {description ? (
            <p className="career-modal-summary">{stripHtml(description)}</p>
          ) : null}
        </div>

        <div className="career-modal-info-grid">
          <InfoItem
            icon="fa-solid fa-briefcase"
            label={copy.department}
            value={department}
          />
          <InfoItem
            icon="fa-solid fa-location-dot"
            label={copy.location}
            value={location}
          />
          <InfoItem
            icon="fa-solid fa-layer-group"
            label={copy.type}
            value={type}
          />
        </div>

        <div className="career-modal-body">
          {description ? (
            <div className="career-modal-section">
              <h4>{copy.overview}</h4>
              <div
                className="career-modal-rich-text"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          ) : null}

          <ListSection title={copy.responsibilities} items={responsibilities} />
          <ListSection title={copy.requirements} items={requirements} />
          <ListSection title={copy.benefits} items={benefits} />
        </div>

        <div className="career-modal-footer">
          <button
            type="button"
            className="career-modal-secondary"
            onClick={() => setSelectedCareer(null)}
          >
            {copy.close}
          </button>

          {selectedCareer?.applicationLink ? (
            !isExpired ? (
              <a
                href={selectedCareer.applicationLink}
                target="_blank"
                rel="noreferrer"
                className="career-modal-apply"
              >
                <span>{copy.apply}</span>
                <i
                  className={`fa-solid ${
                    isRtl ? "fa-arrow-left" : "fa-arrow-right"
                  }`}
                />
              </a>
            ) : (
              <span className="career-modal-closed">{copy.closed}</span>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};
