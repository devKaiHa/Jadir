import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useHomeSliders, useOneHomeSlider } from "../../hooks/useHomeSliders";

export const useUpdateHomeSlider = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { slider, isLoading, error } = useOneHomeSlider(id);
  const { updateHomeSlider, isUpdating } = useHomeSliders();

  const [order, setOrder] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!slider) return;

    setOrder(slider.order || 0);

    setImagePreview(slider.img || null);
    setImageFile(null);
  }, [slider]);

  const onImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(slider?.img || null);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("order", String(order || 0));

      if (imageFile) {
        formData.append("img", imageFile);
      }

      await updateHomeSlider({
        id,
        data: formData,
      }).unwrap();

      toast.success("Slider updated successfully");

      setTimeout(() => {
        navigate("/all-home-sliders");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update slider");
    }
  };

  return {
    id,
    slider,
    error,

    isPageLoading: isLoading,
    isUpdating,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleSave,
  };
};

export default useUpdateHomeSlider;
