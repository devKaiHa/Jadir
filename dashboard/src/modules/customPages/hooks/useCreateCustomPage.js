import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCustomPages } from "../../hooks/useCustomPages";

const emptyLangState = {
  en: "",
  ar: "",
};

const useCreateCustomPage = () => {
  const navigate = useNavigate();
  const { postCustomPage, isPosting } = useCustomPages();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });
  const [order, setOrder] = useState(0);

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
        order,
      };

      await postCustomPage(payload).unwrap();

      toast.success("Custom page created successfully");

      setTimeout(() => {
        navigate("/all-custom-pages");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create custom page");
    }
  };

  return {
    title,
    content,
    order,
    setOrder,
    handleTitleChange,
    handleContentChange,
    handleSave,
    isLoading: isPosting,
  };
};

export default useCreateCustomPage;
