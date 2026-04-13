import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOneResearch, useResearch } from "../../hooks/useResearch";
import { imageURL } from "../../../Api/GlobalData";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useUpdateResearch = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { researchItem, isLoading, error } = useOneResearch(id);
  const { updateResearch, isUpdating } = useResearch();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [order, setOrder] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (!researchItem) return;

    setTitle({
      en: researchItem?.title?.en || "",
      ar: researchItem?.title?.ar || "",
      tr: researchItem?.title?.tr || "",
    });

    setContent({
      en: researchItem?.content?.en || "",
      ar: researchItem?.content?.ar || "",
      tr: researchItem?.content?.tr || "",
    });

    setImage(researchItem?.image || "");
    setCurrentImage(researchItem?.image || "");
    setImagePreview(
      researchItem?.image ? `${imageURL}/research/${researchItem.image}` : null,
    );
    setIsActive(researchItem?.isActive ?? true);
    setIsPublished(researchItem?.isPublished ?? false);
    setOrder(researchItem?.order || 0);
  }, [researchItem]);

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
  };

  const handleContentChange = (lang, value) => {
    setContent((prev) => ({ ...prev, [lang]: value }));
  };

  const onImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(currentImage || "");
      setImagePreview(currentImage ? `${imageURL}/research/${currentImage}` : null);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(title));
      formData.append("content", JSON.stringify(content));
      formData.append("isActive", isActive ? "true" : "false");
      formData.append("isPublished", isPublished ? "true" : "false");
      formData.append("order", String(order || 0));

      if (image) {
        formData.append("image", image);
      }

      await updateResearch({
        id,
        data: formData,
      }).unwrap();

      toast.success("Research updated successfully");

      setTimeout(() => {
        navigate("/all-research");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update research");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,
    title,
    content,
    imagePreview,
    onImageChange,
    isActive,
    setIsActive,
    isPublished,
    setIsPublished,
    order,
    setOrder,
    handleTitleChange,
    handleContentChange,
    handleSave,
  };
};

export default useUpdateResearch;
