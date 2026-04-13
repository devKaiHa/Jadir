import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useHomeSliders } from "../../hooks/useHomeSliders";

export const useCreateHomeSlider = () => {
  const navigate = useNavigate();
  const { postHomeSlider, isPosting } = useHomeSliders();

  const [sliderType, setSliderType] = useState("main");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);
  const [btnLink, setBtnLink] = useState("");

  const [sliderData, setSliderData] = useState({
    en: { title: "", description: "" },
    ar: { title: "", description: "" },
    tr: { title: "", description: "" },
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleLangChange = (lang, data) => {
    setSliderData((prev) => ({
      ...prev,
      [lang]: data,
    }));
  };

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
    setSliderType("main");
    setIsActive(true);
    setOrder(0);
    setBtnLink("");
    setSliderData({
      en: { title: "", description: "" },
      ar: { title: "", description: "" },
      tr: { title: "", description: "" },
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "title",
        JSON.stringify({
          en: sliderData.en.title || "",
          ar: sliderData.ar.title || "",
          tr: sliderData.tr.title || "",
        }),
      );

      formData.append(
        "description",
        JSON.stringify({
          en: sliderData.en.description || "",
          ar: sliderData.ar.description || "",
          tr: sliderData.tr.description || "",
        }),
      );

      formData.append("sliderType", sliderType);
      formData.append("btnLink", btnLink || "");
      formData.append("isActive", isActive ? "true" : "false");
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
    sliderType,
    setSliderType,

    isActive,
    setIsActive,

    order,
    setOrder,

    btnLink,
    setBtnLink,

    sliderData,
    handleLangChange,

    imagePreview,
    onImageChange,

    handleSave,
    resetForm,

    isLoading: isPosting,
  };
};

export default useCreateHomeSlider;
