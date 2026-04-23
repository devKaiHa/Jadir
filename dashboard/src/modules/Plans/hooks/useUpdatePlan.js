import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOnePlan, usePlans } from "../../hooks/usePlans";

const emptyLangState = {
  en: "",
  ar: "",
};

const useUpdatePlan = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { plan, isLoading, error } = useOnePlan(id);
  const { updatePlan, isUpdating } = usePlans();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (!plan) return;

    setTitle({
      en: plan?.title?.en || "",
      ar: plan?.title?.ar || "",
    });

    setDescription({
      en: plan?.description?.en || "",
      ar: plan?.description?.ar || "",
    });
    setOrder(plan?.order || 0);
  }, [plan]);

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
        order,
      };

      await updatePlan({
        id,
        data: payload,
      }).unwrap();

      toast.success("Plan updated successfully");

      setTimeout(() => {
        navigate("/all-plans");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update plan");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,
    title,
    description,
    order,
    setOrder,
    handleTitleChange,
    handleDescriptionChange,
    handleSave,
  };
};

export default useUpdatePlan;
