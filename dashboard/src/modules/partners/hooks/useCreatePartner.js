import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePartners } from "../../hooks/usePartners";

const useCreatePartner = () => {
  const navigate = useNavigate();
  const { postPartner, isPosting } = usePartners();

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const onImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const resetForm = () => {
    setTitle("");
    setIsActive(true);
    setOrder(0);
    setImageFile(null);
    setImagePreview(null);
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

      await postPartner(formData).unwrap();

      toast.success("Partner created successfully");
      resetForm();

      setTimeout(() => {
        navigate("/all-partners");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create partner");
    }
  };

  return {
    title,
    setTitle,

    isActive,
    setIsActive,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleSave,
    isLoading: isPosting,
  };
};

export default useCreatePartner;
