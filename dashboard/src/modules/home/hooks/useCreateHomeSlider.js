import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useHomeSliders } from "../../hooks/useHomeSliders";

export const useCreateHomeSlider = () => {
  const navigate = useNavigate();
  const { postHomeSlider, isPosting } = useHomeSliders();

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
    setOrder(0);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("order", String(order || 0));

      if (imageFile) {
        formData.append("img", imageFile);
      }

      await postHomeSlider(formData).unwrap();

      toast.success("Slider created successfully");
      resetForm();

      setTimeout(() => {
        navigate("/all-home-sliders");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create slider");
    }
  };

  return {
    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleSave,
    resetForm,

    isLoading: isPosting,
  };
};

export default useCreateHomeSlider;
