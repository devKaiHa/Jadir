"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetContactInfoQuery,
  useSendMessageMutation,
} from "@/RTK/Api/Contact/ContactApi";
import { useGetPublicServicesQuery } from "@/RTK/Api/Services/ServicesApi";
import SearchableSelect from "@/components/elements/SearchableSelect";
import LoadingCard from "@/components/utils/LoadingCard";

const requestTypeOptions = [
  { value: "investment-inquiry", label: "consultInquiry" },
  { value: "partnership", label: "partnership" },
  { value: "media", label: "media" },
  { value: "support", label: "support" },
  { value: "request-service", label: "serviceRequest" },
  { value: "complaint", label: "complaint" },
];

const localize = (value, lang) =>
  value?.[lang] || value?.en || value?.ar || value?.tr || "";

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    requestType: "investment-inquiry",
    service: "",
    message: "",
  });

  const [submitState, setSubmitState] = useState({
    type: "",
    message: "",
  });

  const {
    data: response,
    isLoading: isLoadingContact,
    isError: isContactError,
    refetch,
  } = useGetContactInfoQuery();

  const [sendMessage, { isLoading: isSubmitting }] = useSendMessageMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const isServiceRequest = formData.requestType === "request-service";
  const {
    data: servicesResponse,
    isLoading: isLoadingServices,
    isError: isServicesError,
  } = useGetPublicServicesQuery(undefined, {
    skip: !isServiceRequest,
  });

  const contact = response?.data || {};

  const branches = useMemo(
    () =>
      Array.isArray(contact?.branches)
        ? [...contact.branches]
            .filter((item) => item?.isActive !== false)
            .sort((a, b) => (a?.order || 0) - (b?.order || 0))
        : [],
    [contact?.branches],
  );

  const serviceOptions = useMemo(
    () =>
      Array.isArray(servicesResponse?.data)
        ? [...servicesResponse.data].sort(
            (a, b) => (a?.order || 0) - (b?.order || 0),
          )
        : [],
    [servicesResponse?.data],
  );

  const getServiceLabel = (service) =>
    localize(service?.title, lang) || service?.slug || "";

  const handleChange = (field) => (e) => {
    setFormData((current) => ({
      ...current,
      [field]: e.target.value,
    }));
  };

  const handleRequestTypeChange = (e) => {
    const nextRequestType = e.target.value;

    setFormData((current) => ({
      ...current,
      requestType: nextRequestType,
      service: nextRequestType === "request-service" ? current.service : "",
    }));
  };

  const handleServiceChange = (service) => {
    setFormData((current) => ({
      ...current,
      service: service?._id || service?.id || "",
    }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      requestType: "investment-inquiry",
      service: "",
      message: "",
    });
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
    setSubmitState({
      type: "",
      message: "",
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    if (isServiceRequest && !formData.service) {
      return "Please select the service you are interested in.";
    }
    if (!formData.message.trim()) return "Please enter your message.";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSubmitState({
        type: "error",
        message: validationError,
      });
      return;
    }

    try {
      const result = await sendMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        requestType: isServiceRequest
          ? "service-request"
          : formData.requestType,
        service: isServiceRequest ? formData.service : null,
        message: formData.message.trim(),
      }).unwrap();

      setShowSuccess(true);
      setSubmitState({
        type: "success",
        message: result?.message || "Message sent successfully.",
      });
      clearForm();
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error?.data?.message ||
          error?.error ||
          "We couldn't send your message. Please try again.",
      });
    }
  };

  if (isLoadingContact) return <LoadingCard />;

  if (isContactError) {
    return (
      <section className="jadwa-contact-v2">
        <div className="auto-container">
          <div className="jadwa-contact-v2-error">
            <h3>Unable to load contact details</h3>
            <p>Please try again in a moment.</p>
            <button
              type="button"
              className="jadwa-contact-v2-submit"
              onClick={() => refetch()}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="jadwa-contact-v2">
      <div className="auto-container">
        <div className="jadwa-contact-v2-shell">
          <span className="jadwa-contact-v2-glow jadwa-contact-v2-glow--one" />
          <span className="jadwa-contact-v2-glow jadwa-contact-v2-glow--two" />
          <span className="jadwa-contact-v2-glow jadwa-contact-v2-glow--three" />

          <div className="jadwa-contact-v2-panel">
            <div className="jadwa-contact-v2-info">
              <div className="jadwa-contact-v2-info-inner">
                <div className="jadwa-pill jadwa-contact-v2-pill-dark">
                  <span className="jadwa-pill-dot" />
                  <span>
                    {t("contact.title") === "contact.title"
                      ? "Contact Information"
                      : t("contact.title")}
                  </span>
                </div>

                <h2 className="jadwa-contact-v2-title">
                  {lang === "ar"
                    ? "يسعدنا تواصلك معنا"
                    : lang === "tr"
                      ? "Bizimle iletişime geçin"
                      : "We’d Love to Hear From You"}
                </h2>

                <p className="jadwa-contact-v2-text">
                  {t("contact.description") === "contact.description"
                    ? "If you have any questions, partnership ideas, or investment inquiries, our team is ready to help."
                    : t("contact.description")}
                </p>

                <div className="jadwa-contact-v2-list">
                  {contact?.address ? (
                    <div className="jadwa-contact-v2-item">
                      <div className="jadwa-contact-v2-item-icon">
                        <i className="fa-solid fa-location-dot" />
                      </div>
                      <div className="jadwa-contact-v2-item-body">
                        <h4>
                          {lang === "ar"
                            ? "العنوان"
                            : lang === "tr"
                              ? "Adres"
                              : "Address"}
                        </h4>
                        <p>{localize(contact.address, lang)}</p>
                        {contact?.mapLink ? (
                          <a
                            href={contact.mapLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {lang === "ar"
                              ? "عرض الموقع"
                              : lang === "tr"
                                ? "Haritada Aç"
                                : "Open Map"}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {Array.isArray(contact?.emails) &&
                  contact.emails.filter(Boolean).length > 0 ? (
                    <div className="jadwa-contact-v2-item">
                      <div className="jadwa-contact-v2-item-icon">
                        <i className="fa-solid fa-envelope" />
                      </div>
                      <div className="jadwa-contact-v2-item-body">
                        <h4>
                          {lang === "ar"
                            ? "البريد الإلكتروني"
                            : lang === "tr"
                              ? "E-posta"
                              : "Email"}
                        </h4>
                        {contact.emails.filter(Boolean).map((item) => (
                          <p key={item}>
                            <a href={`mailto:${item}`}>{item}</a>
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {Array.isArray(contact?.phones) &&
                  contact.phones.filter(Boolean).length > 0 ? (
                    <div className="jadwa-contact-v2-item">
                      <div className="jadwa-contact-v2-item-icon">
                        <i className="fa-solid fa-phone" />
                      </div>
                      <div className="jadwa-contact-v2-item-body">
                        <h4>
                          {lang === "ar"
                            ? "الهاتف"
                            : lang === "tr"
                              ? "Telefon"
                              : "Phone"}
                        </h4>
                        {contact.phones.filter(Boolean).map((item) => (
                          <p key={item}>
                            <a href={`tel:${item.replace(/\s+/g, "")}`}>
                              {item}
                            </a>
                          </p>
                        ))}
                        {contact?.whatsapp ? (
                          <p>
                            <a
                              href={`https://wa.me/${contact.whatsapp.replace(
                                /[^\d]/g,
                                "",
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              WhatsApp: {contact.whatsapp}
                            </a>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="jadwa-contact-v2-form-side">
              <div className="jadwa-contact-v2-form-card">
                <div className="jadwa-pill jadwa-contact-v2-pill-light">
                  <span className="jadwa-pill-dot" />
                  <span>
                    {t("contact.formTitle") === "contact.formTitle"
                      ? "Send Message"
                      : t("contact.formTitle")}
                  </span>
                </div>

                <h3 className="jadwa-contact-v2-form-title">
                  {lang === "ar"
                    ? "تواصل معنا"
                    : lang === "tr"
                      ? "Bize Yazın"
                      : "Contact Us"}
                </h3>

                <form
                  autoComplete="off"
                  onSubmit={submit}
                  className="jadwa-contact-v2-form"
                >
                  <div className="jadwa-contact-v2-fields">
                    <div className="jadwa-contact-v2-field">
                      <label>{t("contact.name")}</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange("name")}
                        placeholder={t("contact.name")}
                        required
                      />
                    </div>

                    <div className="jadwa-contact-v2-field">
                      <label>{t("contact.email")}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange("email")}
                        placeholder={t("contact.email")}
                        required
                      />
                    </div>

                    <div className="jadwa-contact-v2-field">
                      <label>{t("contact.phone")}</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange("phone")}
                        placeholder={t("contact.phone")}
                      />
                    </div>

                    <div className="jadwa-contact-v2-field">
                      <label>Subject</label>
                      <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange("subject")}
                        placeholder="Subject"
                      />
                    </div>

                    <div className="jadwa-contact-v2-field jadwa-contact-v2-field-full">
                      <label>
                        {lang === "ar"
                          ? "نوع الطلب"
                          : lang === "tr"
                            ? "Talep Türü"
                            : "Request Type"}
                      </label>
                      <select
                        name="requestType"
                        value={formData.requestType}
                        onChange={handleRequestTypeChange}
                      >
                        {requestTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {t(option.label)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {isServiceRequest ? (
                      <div className="jadwa-contact-v2-field jadwa-contact-v2-field-full">
                        <label>
                          {lang === "ar"
                            ? "Ø§Ù„Ø®Ø¯Ù…Ø©"
                            : lang === "tr"
                              ? "Hizmet"
                              : "Service"}
                        </label>
                        <SearchableSelect
                          className="jadwa-contact-v2-searchable"
                          inputClassName="jadwa-contact-v2-searchable-input"
                          menuClassName="jadwa-contact-v2-searchable-menu"
                          optionClassName="jadwa-contact-v2-searchable-option"
                          labelWidth={0}
                          height="3.25"
                          placeholder={
                            isLoadingServices
                              ? "Loading services..."
                              : isServicesError
                                ? "Unable to load services"
                                : "Search and select a service"
                          }
                          options={{ data: serviceOptions }}
                          selectedValue={formData.service}
                          onChange={handleServiceChange}
                          disabled={isLoadingServices || isServicesError}
                          error={isServiceRequest && !formData.service}
                          getOptionLabel={getServiceLabel}
                        />
                        {isServicesError ? (
                          <span className="jadwa-contact-v2-field-note">
                            We couldn't load the services right now. Please try
                            again in a moment.
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="jadwa-contact-v2-field jadwa-contact-v2-field-full">
                      <label>{t("contact.message")}</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange("message")}
                        placeholder={t("contact.message")}
                        required
                      />
                    </div>
                  </div>

                  {submitState.type === "error" && submitState.message ? (
                    <div className="jadwa-contact-v2-error-message">
                      {submitState.message}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className="jadwa-contact-v2-submit"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting
                        ? "Sending..."
                        : t("contact.submit") === "contact.submit"
                          ? "Send Message"
                          : t("contact.submit")}
                    </span>
                    <i
                      className={
                        isSubmitting
                          ? "fa-solid fa-spinner fa-spin"
                          : "fa-solid fa-arrow-right"
                      }
                      aria-hidden="true"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {branches.length ? (
          <div className="jadwa-contact-v2-branches-section">
            <div className="jadwa-testimonials-head jadwa-contact-v2-branches-head">
              <div className="jadwa-pill">
                <span className="jadwa-pill-dot" />
                <span>
                  {t("headquarters") === "headquarters"
                    ? "Branches"
                    : t("headquarters")}
                </span>
              </div>

              <h2 className="jadwa-testimonials-title">
                {lang === "ar"
                  ? "مكاتبنا وفروعنا"
                  : lang === "tr"
                    ? "Ofislerimiz ve Şubelerimiz"
                    : "Our Offices & Branches"}
              </h2>

              <p className="jadwa-testimonials-subtitle">
                {lang === "ar"
                  ? "يمكنك الوصول إلى فرقنا عبر أكثر من موقع حسب احتياجك."
                  : lang === "tr"
                    ? "Ekiplerimize ihtiyacınıza göre birden fazla lokasyondan ulaşabilirsiniz."
                    : "Reach our teams through multiple locations based on your needs."}
              </p>
            </div>

            <div className="row clearfix">
              {branches.map((branch) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 mb-4"
                  key={branch?._id}
                >
                  <div className="jadwa-contact-v2-branch-card">
                    <div className="jadwa-contact-v2-branch-card-top">
                      <div className="jadwa-contact-v2-branch-icon">
                        <i className="fa-solid fa-building" />
                      </div>

                      <div>
                        <h4>{localize(branch?.name, lang)}</h4>
                        <p>{localize(branch?.address, lang)}</p>
                      </div>
                    </div>

                    {branch?.phones?.[0] ? (
                      <a
                        className="jadwa-contact-v2-branch-phone"
                        href={`tel:${branch.phones[0].replace(/\s+/g, "")}`}
                      >
                        {branch.phones[0]}
                      </a>
                    ) : null}

                    <div className="jadwa-contact-v2-branch-card-links">
                      {branch?.mapLink ? (
                        <a
                          href={branch.mapLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {lang === "ar"
                            ? "الخريطة"
                            : lang === "tr"
                              ? "Harita"
                              : "Map"}
                        </a>
                      ) : null}

                      {branch?.whatsapp ? (
                        <a
                          href={`https://wa.me/${branch.whatsapp.replace(
                            /[^\d]/g,
                            "",
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          WhatsApp
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {showSuccess ? (
        <div
          className="jadwa-contact-v2-success-overlay"
          onClick={closeSuccessModal}
        >
          <div
            className="jadwa-contact-v2-success-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="jadwa-contact-v2-success-close"
              onClick={closeSuccessModal}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div className="jadwa-contact-v2-success-icon">
              <i className="fa-solid fa-check" />
            </div>

            <h3>
              {lang === "ar"
                ? "شكراً، تم استلام رسالتك"
                : lang === "tr"
                  ? "Teşekkürler, mesajınız alındı"
                  : "Thanks, we got your message"}
            </h3>

            <p>
              {lang === "ar"
                ? "سيقوم فريقنا بمراجعة رسالتك والرد عليك في أقرب وقت ممكن."
                : lang === "tr"
                  ? "Ekibimiz mesajınızı inceleyip size en kısa sürede dönüş yapacaktır."
                  : "Our team will review your message and get back to you as soon as possible."}
            </p>

            <button
              type="button"
              onClick={closeSuccessModal}
              className="jadwa-contact-v2-submit"
            >
              {lang === "ar"
                ? "متابعة"
                : lang === "tr"
                  ? "Devam Et"
                  : "Continue"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ContactForm;
