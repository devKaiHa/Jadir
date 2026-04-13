import shape from "@/public/assets/images/contact/shape.png";
import location from "@/public/assets/images/contact/location.png";
import emailImg from "@/public/assets/images/contact/email.png";
import phoneImg from "@/public/assets/images/contact/phone.png";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetContactInfoQuery,
  useSendMessageMutation,
} from "@/RTK/Api/Contact/ContactApi";
import LoadingCard from "@/components/utils/LoadingCard";

const requestTypeOptions = [
  { value: "investment-inquiry", label: "Investment Inquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "media", label: "Media" },
  { value: "support", label: "Support" },
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

  const handleChange = (field) => (e) => {
    setFormData((current) => ({
      ...current,
      [field]: e.target.value,
    }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      requestType: "investment-inquiry",
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
    if (!formData.name.trim()) {
      return "Please enter your name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    if (!formData.message.trim()) {
      return "Please enter your message.";
    }

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
        requestType: formData.requestType,
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
      <div className="container-contact" style={{ padding: "60px 0" }}>
        <div className="form">
          <div className="contact-form" style={{ width: "100%" }}>
            <h3 className="title">Unable to load contact details</h3>
            <p>Please try again in a moment.</p>
            <button type="button" className="btn" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-contact">
      <span className="big-circle"></span>
      <img src={shape.src} className="square" alt="shape" />
      <div className="form" style={{ marginTop: "30px" }}>
        <div className="contact-info">
          <h3 className="title">
            {t("contact.title") === "contact.title"
              ? "Stay in touch with us"
              : t("contact.title")}
          </h3>
          <p className="text">
            {t("contact.description") === "contact.description"
              ? "If you have any questions, send us a message and our team will get back to you."
              : t("contact.description")}
          </p>

          <div className="info">
            {contact?.address ? (
              <div className="information">
                <img src={location.src} className="icon me-2" alt="location" />
                <div className="paragraf-contant">
                  <p style={{ marginBottom: "4px" }}>
                    {localize(contact.address, lang)}
                  </p>
                  {contact?.mapLink ? (
                    <a
                      href={contact.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#75727b", textDecoration: "underline" }}
                    >
                      Open map
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}

            {Array.isArray(contact?.emails) &&
            contact.emails.filter(Boolean).length > 0 ? (
              <div className="information">
                <img src={emailImg.src} className="icon me-2" alt="email" />
                <div className="paragraf-contant">
                  {contact.emails.filter(Boolean).map((item) => (
                    <p key={item} style={{ marginBottom: "6px" }}>
                      <a href={`mailto:${item}`} style={{ color: "inherit" }}>
                        {item}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {Array.isArray(contact?.phones) &&
            contact.phones.filter(Boolean).length > 0 ? (
              <div className="information">
                <img src={phoneImg.src} className="icon me-2" alt="phone" />
                <div className="paragraf-contant">
                  {contact.phones.filter(Boolean).map((item) => (
                    <p key={item} style={{ marginBottom: "6px" }}>
                      <a
                        href={`tel:${item.replace(/\s+/g, "")}`}
                        style={{ color: "inherit" }}
                      >
                        {item}
                      </a>
                    </p>
                  ))}
                  {contact?.whatsapp ? (
                    <p style={{ marginBottom: 0 }}>
                      <a
                        href={`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "inherit" }}
                      >
                        WhatsApp: {contact.whatsapp}
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          {branches.length ? (
            <div className="social-media" style={{ marginTop: "30px" }}>
              <p>
                {t("headquarters") === "headquarters"
                  ? "Branches"
                  : t("headquarters")}
              </p>
              <div style={{ display: "grid", gap: "14px" }}>
                {branches.map((branch) => (
                  <div
                    key={branch?._id}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "14px",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <strong style={{ display: "block", marginBottom: "6px" }}>
                      {localize(branch?.name, lang)}
                    </strong>
                    <p style={{ marginBottom: "6px" }}>
                      {localize(branch?.address, lang)}
                    </p>
                    {branch?.phones?.[0] ? (
                      <p style={{ marginBottom: "6px" }}>
                        <a
                          href={`tel:${branch.phones[0].replace(/\s+/g, "")}`}
                          style={{ color: "inherit" }}
                        >
                          {branch.phones[0]}
                        </a>
                      </p>
                    ) : null}
                    <div
                      style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                    >
                      {branch?.mapLink ? (
                        <a
                          href={branch.mapLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "#75727b",
                            textDecoration: "underline",
                          }}
                        >
                          View branch map
                        </a>
                      ) : null}
                      {branch?.whatsapp ? (
                        <a
                          href={`https://wa.me/${branch.whatsapp.replace(/[^\d]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "#75727b",
                            textDecoration: "underline",
                          }}
                        >
                          WhatsApp
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form autoComplete="off" onSubmit={submit}>
            <h3 className="title">
              {t("contact.formTitle") === "contact.formTitle"
                ? "Send us a message"
                : t("contact.formTitle")}
            </h3>

            <div className="input-container">
              <input
                placeholder={t("contact.name")}
                name="name"
                className="input"
                value={formData.name}
                onChange={handleChange("name")}
              />
            </div>

            <div className="input-container">
              <input
                type="email"
                placeholder={t("contact.email")}
                name="email"
                className="input"
                value={formData.email}
                onChange={handleChange("email")}
              />
            </div>

            <div className="input-container">
              <input
                placeholder={t("contact.phone")}
                name="phone"
                className="input"
                value={formData.phone}
                onChange={handleChange("phone")}
              />
            </div>

            <div className="input-container">
              <input
                placeholder="Subject"
                name="subject"
                className="input"
                value={formData.subject}
                onChange={handleChange("subject")}
              />
            </div>

            <div className="input-container">
              <select
                name="requestType"
                className="input"
                value={formData.requestType}
                onChange={handleChange("requestType")}
              >
                {requestTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-container textarea">
              <textarea
                placeholder={t("contact.message")}
                name="message"
                className="input"
                value={formData.message}
                onChange={handleChange("message")}
              ></textarea>
            </div>

            {submitState.type === "error" && submitState.message ? (
              <p
                style={{
                  marginBottom: "16px",
                  color: "#ffe0e0",
                }}
              >
                {submitState.message}
              </p>
            ) : null}

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting
                ? "Sending..."
                : t("contact.submit") === "contact.submit"
                  ? "Send"
                  : t("contact.submit")}
            </button>
          </form>
        </div>
      </div>

      {showSuccess ? (
        <div
          className="language-modal-overlay"
          onClick={closeSuccessModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 18, 24, 0.55)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "560px",
              position: "relative",
              borderRadius: "32px",
              background:
                "linear-gradient(180deg, #ffffff 0%, #f8fbfc 55%, #f3f7f8 100%)",
              boxShadow: "0 40px 100px rgba(0, 0, 0, 0.22)",
              overflow: "hidden",
              padding: "0",
            }}
          >
            {/* decorative background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "260px",
                  height: "260px",
                  borderRadius: "50%",
                  background: "rgba(74, 177, 212, 0.12)",
                  top: "-120px",
                  left: "-80px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: "rgba(18, 92, 121, 0.10)",
                  bottom: "-60px",
                  right: "-40px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: "120px",
                  height: "120px",
                  borderRadius: "24px",
                  transform: "rotate(22deg)",
                  background: "rgba(18, 92, 121, 0.05)",
                  top: "90px",
                  right: "-20px",
                }}
              />
            </div>

            {/* top section */}
            <div
              style={{
                position: "relative",
                padding: "34px 34px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "rgba(18, 92, 121, 0.08)",
                  color: "#125c79",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.2px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                Message sent
              </div>

              <button
                type="button"
                onClick={closeSuccessModal}
                style={{
                  width: "42px",
                  height: "42px",
                  border: "none",
                  borderRadius: "50%",
                  background: "#eef4f6",
                  color: "#4b5563",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            {/* content */}
            <div
              style={{
                position: "relative",
                padding: "0 34px 34px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  margin: "0 auto 24px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 30% 30%, #6ad6f7 0%, #4ab1d4 35%, #125c79 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 20px 40px rgba(18, 92, 121, 0.22), 0 0 0 10px rgba(74, 177, 212, 0.10), 0 0 0 20px rgba(74, 177, 212, 0.05)",
                }}
              >
                <i
                  className="fa-solid fa-check"
                  style={{
                    color: "#fff",
                    fontSize: "42px",
                  }}
                />
              </div>

              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: "34px",
                  lineHeight: 1.15,
                  color: "#0f1728",
                  fontWeight: 800,
                  letterSpacing: "-0.8px",
                }}
              >
                Thanks, we got it
              </h3>

              <p
                style={{
                  margin: "0 auto 28px",
                  maxWidth: "420px",
                  fontSize: "15px",
                  lineHeight: 1.9,
                  color: "#667085",
                }}
              >
                Your message was sent successfully. Our team will review it and
                get back to you as soon as possible.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    padding: "16px 12px",
                    borderRadius: "18px",
                    background: "#ffffff",
                    border: "1px solid #e8eef0",
                  }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      color: "#125c79",
                      marginBottom: "8px",
                    }}
                  >
                    <i className="fa-regular fa-envelope" />
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#667085",
                      lineHeight: 1.6,
                    }}
                  >
                    Message received
                  </div>
                </div>

                <div
                  style={{
                    padding: "16px 12px",
                    borderRadius: "18px",
                    background: "#ffffff",
                    border: "1px solid #e8eef0",
                  }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      color: "#125c79",
                      marginBottom: "8px",
                    }}
                  >
                    <i className="fa-regular fa-clock" />
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#667085",
                      lineHeight: 1.6,
                    }}
                  >
                    Under review soon
                  </div>
                </div>

                <div
                  style={{
                    padding: "16px 12px",
                    borderRadius: "18px",
                    background: "#ffffff",
                    border: "1px solid #e8eef0",
                  }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      color: "#125c79",
                      marginBottom: "8px",
                    }}
                  >
                    <i className="fa-regular fa-bell" />
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#667085",
                      lineHeight: 1.6,
                    }}
                  >
                    We’ll contact you
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={closeSuccessModal}
                style={{
                  minWidth: "190px",
                  height: "56px",
                  border: "none",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, #125c79 0%, #4ab1d4 100%)",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 18px 35px rgba(18, 92, 121, 0.24)",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContactForm;
