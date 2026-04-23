import { useEffect, useState } from "react";

const emptyLangState = {
  en: "",
  ar: "",
};

export const useTestimonialEditorState = (testimonial, initialImage = "") => {
  const [name, setName] = useState("");
  const [role, setRole] = useState({ ...emptyLangState });
  const [company, setCompany] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });
  const [rating, setRating] = useState(5);
  const [isFeatured, setIsFeatured] = useState(false);
  const [order, setOrder] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialImage || "");

  useEffect(() => {
    if (!testimonial) return;

    setName(testimonial?.name || "");
    setRole({
      en: testimonial?.role?.en || "",
      ar: testimonial?.role?.ar || "",
    });
    setCompany({
      en: testimonial?.company?.en || "",
      ar: testimonial?.company?.ar || "",
    });
    setContent({
      en: testimonial?.content?.en || "",
      ar: testimonial?.content?.ar || "",
    });
    setRating(testimonial?.rating ?? 5);
    setIsFeatured(testimonial?.isFeatured ?? false);
    setOrder(testimonial?.order ?? 0);
    setImageFile(null);
    setImagePreview(initialImage || "");
  }, [initialImage, testimonial]);

  const handleLangChange = (group, lang, value) => {
    if (group === "role") {
      setRole((prev) => ({ ...prev, [lang]: value }));
    }
    if (group === "company") {
      setCompany((prev) => ({ ...prev, [lang]: value }));
    }
    if (group === "content") {
      setContent((prev) => ({ ...prev, [lang]: value }));
    }
  };

  const onImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

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
    formData.append("name", name);
    formData.append("role", JSON.stringify(role));
    formData.append("company", JSON.stringify(company));
    formData.append("content", JSON.stringify(content));
    formData.append("rating", String(rating || 5));
    formData.append("isFeatured", isFeatured ? "true" : "false");
    formData.append("order", String(order || 0));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    return formData;
  };

  return {
    name,
    setName,
    role,
    company,
    content,
    rating,
    setRating,
    isFeatured,
    setIsFeatured,
    order,
    setOrder,
    imagePreview,
    onImageChange,
    handleLangChange,
    toFormData,
  };
};
