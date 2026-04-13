import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOnePartner, usePartners } from "../../hooks/usePartners";

const useUpdatePartner = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { partner, isLoading, error } = useOnePartner(id);
  const { updatePartner, isUpdating } = usePartners();

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!partner) return;

    setTitle(partner.title || "");
    setIsActive(partner.isActive ?? true);
    setOrder(partner.order || 0);
    setImagePreview(partner.img || null);
    setImageFile(null);
  }, [partner]);

  const onImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(partner?.img || null);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title || "");
      formData.append("isActive", isActive ? "true" : "false");
      formData.append("order", String(order || 0));

      if (imageFile) {
        formData.append("img", imageFile);
      }

      await updatePartner({
        id,
        data: formData,
      }).unwrap();

      toast.success("Partner updated successfully");

      setTimeout(() => {
        navigate("/all-partners");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update partner");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,

    title,
    setTitle,

    isActive,
    setIsActive,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleSave,
  };
};

export default useUpdatePartner;
