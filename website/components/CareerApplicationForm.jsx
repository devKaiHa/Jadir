import baseURL from "@/api/GlobalData";
import { localize } from "@/components/website/websiteUtils";
import { useEffect, useState } from "react";

const labels = {
  en: {
    title: "Application Form",
    submit: "Submit Application",
    submitting: "Submitting...",
    success: "Your application has been submitted successfully.",
    error: "Could not submit your application. Please try again.",
    required: "Required",
  },
  ar: {
    title: "نموذج التقديم",
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال...",
    success: "تم إرسال طلبك بنجاح.",
    error: "تعذر إرسال طلبك. يرجى المحاولة مرة أخرى.",
    required: "مطلوب",
  },
  tr: {
    title: "Başvuru Formu",
    submit: "Başvuruyu Gönder",
    submitting: "Gönderiliyor...",
    success: "Başvurunuz başarıyla gönderildi.",
    error: "Başvurunuz gönderilemedi. Lütfen tekrar deneyin.",
    required: "Zorunlu",
  },
};

const optionLabel = (option, lang) =>
  localize(option?.label, lang) || option?.value || "";

const CareerApplicationForm = ({ career, lang = "en", onSuccess }) => {
  const [values, setValues] = useState({});
  const [files, setFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const copy = labels[lang] || labels.en;
  const fields = career?.applicationForm?.fields || [];

  useEffect(() => {
    if (!career?._id) return;

    setValues({});
    setFiles({});
    setMessage("");
  }, [career?._id]);

  const setValue = (fieldId, value) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const setCheckedValue = (fieldId, optionValue, checked) => {
    setValues((prev) => {
      const current = Array.isArray(prev[fieldId]) ? prev[fieldId] : [];
      return {
        ...prev,
        [fieldId]: checked
          ? [...current, optionValue]
          : current.filter((item) => item !== optionValue),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("answers", JSON.stringify(values));

      Object.entries(files).forEach(([fieldId, fileList]) => {
        Array.from(fileList || []).forEach((file) => {
          formData.append(`field_${fieldId}`, file);
        });
      });

      const response = await fetch(`${baseURL}careers/${career._id}/apply`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message || copy.error);
      }

      setValues({});
      setFiles({});
      setMessage("");
      onSuccess?.(copy.success);
    } catch (error) {
      setMessage(error.message || copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const fieldId = String(field._id);
    const fieldLabel = localize(field.label, lang);
    const placeholder = localize(field.placeholder, lang);
    const commonProps = {
      id: fieldId,
      name: field.name,
      required: field.required,
    };

    if (field.type === "textarea") {
      return (
        <textarea
          {...commonProps}
          className="career-application-input min-height"
          placeholder={placeholder}
          value={values[fieldId] || ""}
          onChange={(event) => setValue(fieldId, event.target.value)}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          {...commonProps}
          className="career-application-input"
          value={values[fieldId] || ""}
          onChange={(event) => setValue(fieldId, event.target.value)}
        >
          <option value="">{placeholder || fieldLabel}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {optionLabel(option, lang)}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "radio") {
      return (
        <div className="career-application-options">
          {field.options?.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name={fieldId}
                value={option.value}
                required={field.required}
                checked={values[fieldId] === option.value}
                onChange={(event) => setValue(fieldId, event.target.value)}
              />
              {optionLabel(option, lang)}
            </label>
          ))}
        </div>
      );
    }

    if (field.type === "checkbox") {
      return (
        <div className="career-application-options">
          {field.options?.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                value={option.value}
                checked={(values[fieldId] || []).includes(option.value)}
                onChange={(event) =>
                  setCheckedValue(fieldId, option.value, event.target.checked)
                }
              />
              {optionLabel(option, lang)}
            </label>
          ))}
        </div>
      );
    }

    if (field.type === "file") {
      return (
        <input
          {...commonProps}
          type="file"
          className="career-application-input"
          onChange={(event) =>
            setFiles((prev) => ({ ...prev, [fieldId]: event.target.files }))
          }
        />
      );
    }

    return (
      <input
        {...commonProps}
        type={field.type === "phone" ? "tel" : field.type}
        className="career-application-input"
        placeholder={placeholder}
        value={values[fieldId] || ""}
        onChange={(event) => setValue(fieldId, event.target.value)}
      />
    );
  };

  if (!fields.length) return null;

  return (
    <div className="career-application-panel">
      <div className="career-application-panel-head">
        <span className="career-modal-status open">{copy.title}</span>
      </div>

      <form className="career-application-form inline" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field._id} className="career-application-field">
            <span>
              {localize(field.label, lang)}
              {field.required ? <small>{copy.required}</small> : null}
            </span>
            {renderField(field)}
          </label>
        ))}

        {message ? (
          <div className="career-application-message error">{message}</div>
        ) : null}

        <div className="career-application-submit-row">
          <button
            type="submit"
            className="career-modal-apply"
            disabled={isSubmitting}
          >
            {isSubmitting ? copy.submitting : copy.submit}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareerApplicationForm;
