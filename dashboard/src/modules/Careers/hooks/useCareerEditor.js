import { useEffect, useState } from "react";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const toLangState = (value = "") => {
  if (typeof value === "string") {
    return { en: value, ar: value, tr: value };
  }

  return {
    en: value?.en || "",
    ar: value?.ar || "",
    tr: value?.tr || "",
  };
};

const defaultApplicationFields = [
  {
    label: "Full Name",
    name: "full_name",
    type: "text",
    placeholder: "Full name",
    required: true,
    options: [],
    order: 0,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email address",
    required: true,
    options: [],
    order: 1,
  },
  {
    label: "CV",
    name: "cv",
    type: "file",
    placeholder: "",
    required: true,
    options: [],
    order: 2,
  },
];

const formatDateInput = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

export const useCareerEditorState = (career, initialImage = "") => {
  const [title, setTitle] = useState({ ...emptyLangState });
  const [position, setPosition] = useState({ ...emptyLangState });
  const [location, setLocation] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });
  const [applicationLink, setApplicationLink] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("published");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialImage || "");
  const [applicationFields, setApplicationFields] = useState([
    ...defaultApplicationFields,
  ]);

  useEffect(() => {
    if (!career) return;

    setTitle({
      en: career?.title?.en || "",
      ar: career?.title?.ar || "",
      tr: career?.title?.tr || "",
    });
    setPosition({
      en: career?.position?.en || "",
      ar: career?.position?.ar || "",
      tr: career?.position?.tr || "",
    });
    setLocation({
      en: career?.location?.en || "",
      ar: career?.location?.ar || "",
      tr: career?.location?.tr || "",
    });
    setDescription({
      en: career?.description?.en || "",
      ar: career?.description?.ar || "",
      tr: career?.description?.tr || "",
    });
    setApplicationLink(career?.applicationLink || "");
    setEndDate(formatDateInput(career?.endDate));
    setStatus(career?.status || "published");
    setImageFile(null);
    setImagePreview(initialImage || "");
    setApplicationFields(
      career?.applicationForm?.fields?.length
        ? career.applicationForm.fields.map((field, index) => ({
            _id: field._id,
            label: toLangState(field.label),
            name: field.name || "",
            type: field.type || "text",
            placeholder: toLangState(field.placeholder),
            required: Boolean(field.required),
            options: (field.options || []).map((option) => ({
              ...option,
              label: toLangState(option.label),
            })),
            order: field.order ?? index,
          }))
        : [...defaultApplicationFields],
    );
  }, [career, initialImage]);

  const handleLangChange = (group, lang, value) => {
    if (group === "title") {
      setTitle((prev) => ({ ...prev, [lang]: value }));
    }
    if (group === "position") {
      setPosition((prev) => ({ ...prev, [lang]: value }));
    }
    if (group === "location") {
      setLocation((prev) => ({ ...prev, [lang]: value }));
    }
    if (group === "description") {
      setDescription((prev) => ({ ...prev, [lang]: value }));
    }
  };

  const onImageChange = (selectedImage) => {
    const file = selectedImage?.[0]?.file;

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(initialImage || "");
    }
  };

  const toFormData = () => {
    const formData = new FormData();
    formData.append("title", JSON.stringify(title));
    formData.append("position", JSON.stringify(position));
    formData.append("location", JSON.stringify(location));
    formData.append("description", JSON.stringify(description));
    formData.append("applicationLink", applicationLink);
    formData.append("endDate", endDate);
    formData.append("status", status);
    formData.append(
      "applicationForm",
      JSON.stringify({
        fields: applicationFields.map((field, index) => ({
          ...field,
          order: index,
        })),
      }),
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    return formData;
  };

  const toTemplatePayload = (name) => ({
    name,
    title,
    position,
    location,
    description,
    applicationLink,
    status,
    applicationForm: {
      fields: applicationFields.map((field, index) => ({
        ...field,
        _id: undefined,
        order: index,
      })),
    },
  });

  const applyTemplate = (template) => {
    if (!template) return;

    setTitle(toLangState(template.title));
    setPosition(toLangState(template.position));
    setLocation(toLangState(template.location));
    setDescription(toLangState(template.description));
    setApplicationLink(template.applicationLink || "");
    setStatus(template.status || "published");
    setApplicationFields(
      template.applicationForm?.fields?.length
        ? template.applicationForm.fields.map((field, index) => ({
            label: toLangState(field.label),
            name: field.name || "",
            type: field.type || "text",
            placeholder: toLangState(field.placeholder),
            required: Boolean(field.required),
            options: (field.options || []).map((option) => ({
              ...option,
              label: toLangState(option.label),
            })),
            order: field.order ?? index,
          }))
        : [...defaultApplicationFields],
    );
  };

  return {
    title,
    position,
    location,
    description,
    applicationLink,
    setApplicationLink,
    endDate,
    setEndDate,
    status,
    setStatus,
    imagePreview,
    onImageChange,
    handleLangChange,
    applicationFields,
    setApplicationFields,
    toFormData,
    toTemplatePayload,
    applyTemplate,
  };
};
