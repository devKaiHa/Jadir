import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOneOurService, useOurServices } from "../../hooks/useOurServices";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useUpdateOurService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { service, isLoading, error } = useOneOurService(id);
  const { updateOurService, isUpdating } = useOurServices();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (!service) return;

    setTitle({
      en: service?.title?.en || "",
      ar: service?.title?.ar || "",
      tr: service?.title?.tr || "",
    });

    setDescription({
      en: service?.description?.en || "",
      ar: service?.description?.ar || "",
      tr: service?.description?.tr || "",
    });

    setIsActive(service?.isActive ?? true);
    setOrder(service?.order || 0);
  }, [service]);

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

      await updateOurService({
        id,
        data: payload,
      }).unwrap();

      toast.success("Service updated successfully");

      setTimeout(() => {
        navigate("/all-our-services");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update service");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,

    title,
    description,
    isActive,
    setIsActive,
    order,
    setOrder,

    handleTitleChange,
    handleDescriptionChange,
    handleSave,
  };
};

export default useUpdateOurService;
