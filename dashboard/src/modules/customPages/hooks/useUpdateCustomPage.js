import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomPages, useOneCustomPage } from "../../hooks/useCustomPages";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useUpdateCustomPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { customPage, isLoading, error } = useOneCustomPage(id);
  const { updateCustomPage, isUpdating } = useCustomPages();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (!customPage) return;

    setTitle({
      en: customPage?.title?.en || "",
      ar: customPage?.title?.ar || "",
      tr: customPage?.title?.tr || "",
    });

    setContent({
      en: customPage?.content?.en || "",
      ar: customPage?.content?.ar || "",
      tr: customPage?.content?.tr || "",
    });

    setSlug(customPage?.slug || "");
    setIsActive(customPage?.isActive ?? true);
    setOrder(customPage?.order || 0);
  }, [customPage]);

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
  };

  const handleContentChange = (lang, value) => {
    setContent((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        title,
        content,
        slug,
        isActive,
        order,
      };

      await updateCustomPage({
        id,
        data: payload,
      }).unwrap();

      toast.success("Custom page updated successfully");

      setTimeout(() => {
        navigate("/all-custom-pages");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update custom page");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,
    title,
    content,
    slug,
    setSlug,
    isActive,
    setIsActive,
    order,
    setOrder,
    handleTitleChange,
    handleContentChange,
    handleSave,
  };
};

export default useUpdateCustomPage;
