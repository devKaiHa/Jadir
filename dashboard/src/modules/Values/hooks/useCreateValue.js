import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useValues } from "../../hooks/useValues";

const emptyLangState = {
  en: "",
  ar: "",
};

const useCreateValue = () => {
  const navigate = useNavigate();
  const { postValue, isPosting } = useValues();

  const [name, setName] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });

  const [order, setOrder] = useState(0);

  const handleNameChange = (lang, value) => {
    setName((prev) => ({ ...prev, [lang]: value }));
  };

  const handleContentChange = (lang, value) => {
    setContent((prev) => ({ ...prev, [lang]: value }));
  };

  const handleDescriptionChange = (lang, value) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const resetForm = () => {
    setName({ ...emptyLangState });
    setContent({ ...emptyLangState });
    setDescription({ ...emptyLangState });
    setOrder(0);
  };

  const handleSave = async () => {
    try {
      const payload = {
        name,
        content,
        description,
        order,
      };

      await postValue(payload).unwrap();

      toast.success("Value created successfully");
      resetForm();

      setTimeout(() => {
        navigate("/all-values");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create value");
    }
  };

  return {
    name,
    content,
    description,

    order,
    setOrder,

    handleNameChange,
    handleContentChange,
    handleDescriptionChange,

    handleSave,
    isLoading: isPosting,
  };
};

export default useCreateValue;
