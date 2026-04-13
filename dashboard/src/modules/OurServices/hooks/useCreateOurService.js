import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useOurServices } from "../../hooks/useOurServices";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useCreateOurService = () => {
  const navigate = useNavigate();
  const { postOurService, isPosting } = useOurServices();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
  };

  const handleDescriptionChange = (lang, value) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        title,
        description,
        isActive,
        order,
      };

      await postOurService(payload).unwrap();

      toast.success("Service created successfully");

      setTimeout(() => {
        navigate("/all-our-services");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create service");
    }
  };

  return {
    title,
    description,
    isActive,
    setIsActive,
    order,
    setOrder,
    handleTitleChange,
    handleDescriptionChange,
    handleSave,
    isLoading: isPosting,
  };
};

export default useCreateOurService;
