import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePlans } from "../../hooks/usePlans";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useCreatePlan = () => {
  const navigate = useNavigate();
  const { postPlan, isPosting } = usePlans();

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

      await postPlan(payload).unwrap();

      toast.success("Plan created successfully");

      setTimeout(() => {
        navigate("/all-plans");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create plan");
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

export default useCreatePlan;
