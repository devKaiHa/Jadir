import { useEffect, useState } from "react";

const emptyLangState = {
  en: "",
  ar: "",
};

const formatDateInput = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

export const useCareerEditorState = (career, initialImage = "") => {
  const [title, setTitle] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });
  const [applicationLink, setApplicationLink] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialImage || "");

  useEffect(() => {
    if (!career) return;

    setTitle({
      en: career?.title?.en || "",
      ar: career?.title?.ar || "",
    });
    setDescription({
      en: career?.description?.en || "",
      ar: career?.description?.ar || "",
    });
    setApplicationLink(career?.applicationLink || "");
    setEndDate(formatDateInput(career?.endDate));
    setImageFile(null);
    setImagePreview(initialImage || "");
  }, [career, initialImage]);

  const handleLangChange = (group, lang, value) => {
    if (group === "title") {
      setTitle((prev) => ({ ...prev, [lang]: value }));
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
    formData.append("description", JSON.stringify(description));
    formData.append("applicationLink", applicationLink);
    formData.append("endDate", endDate);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    return formData;
  };

  return {
    title,
    description,
    applicationLink,
    setApplicationLink,
    endDate,
    setEndDate,
    imagePreview,
    onImageChange,
    handleLangChange,
    toFormData,
  };
};
