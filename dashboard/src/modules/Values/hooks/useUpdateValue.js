import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOneValue, useValues } from "../../hooks/useValues";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useUpdateValue = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { value, isLoading, error } = useOneValue(id);
  const { updateValue, isUpdating } = useValues();

  const [name, setName] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });

  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (!value) return;

    setName({
      en: value?.name?.en || "",
      ar: value?.name?.ar || "",
      tr: value?.name?.tr || "",
    });

    setContent({
      en: value?.content?.en || "",
      ar: value?.content?.ar || "",
      tr: value?.content?.tr || "",
    });

    setDescription({
      en: value?.description?.en || "",
      ar: value?.description?.ar || "",
      tr: value?.description?.tr || "",
    });

    setIsActive(value?.isActive ?? true);
    setOrder(value?.order || 0);
  }, [value]);

  const handleNameChange = (lang, value) => {
    setName((prev) => ({ ...prev, [lang]: value }));
  };

  const handleContentChange = (lang, value) => {
    setContent((prev) => ({ ...prev, [lang]: value }));
  };

  const handleDescriptionChange = (lang, value) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        name,
        content,
        description,
        isActive,
        order,
      };

      await updateValue({
        id,
        data: payload,
      }).unwrap();

      toast.success("Value updated successfully");

      setTimeout(() => {
        navigate("/all-values");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update value");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,

    name,
    content,
    description,

    isActive,
    setIsActive,

    order,
    setOrder,

    handleNameChange,
    handleContentChange,
    handleDescriptionChange,

    handleSave,
  };
};

export default useUpdateValue;
