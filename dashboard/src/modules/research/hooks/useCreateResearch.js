import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useResearch } from "../../hooks/useResearch";

const emptyLangState = {
  en: "",
  ar: "",
};

const useCreateResearch = () => {
  const navigate = useNavigate();
  const { postResearch, isPosting } = useResearch();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [order, setOrder] = useState(0);

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
  };

  const handleContentChange = (lang, value) => {
    setContent((prev) => ({ ...prev, [lang]: value }));
  };

  const onImageChange = (image) => {
    const file = image?.[0]?.file;

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(title));
      formData.append("content", JSON.stringify(content));
      formData.append("isPublished", isPublished ? "true" : "false");
      formData.append("order", String(order || 0));

      if (image) {
        formData.append("image", image);
      }

      await postResearch(formData).unwrap();

      toast.success("Research created successfully");

      setTimeout(() => {
        navigate("/all-research");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create research");
    }
  };

  return {
    title,
    content,
    imagePreview,
    onImageChange,
    isPublished,
    setIsPublished,
    order,
    setOrder,
    handleTitleChange,
    handleContentChange,
    handleSave,
    isLoading: isPosting,
  };
};

export default useCreateResearch;
