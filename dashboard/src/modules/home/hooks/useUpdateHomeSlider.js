import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useHomeSliders, useOneHomeSlider } from "../../hooks/useHomeSliders";

export const useUpdateHomeSlider = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { slider, isLoading, error } = useOneHomeSlider(id);
  const { updateHomeSlider, isUpdating } = useHomeSliders();

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

  useEffect(() => {
    if (!slider) return;

    setSliderType(slider.sliderType || "main");
    setIsActive(slider.isActive ?? true);
    setOrder(slider.order || 0);
    setBtnLink(slider.btnLink || "");

    setSliderData({
      en: {
        title: slider.title?.en || "",
        description: slider.description?.en || "",
      },
      ar: {
        title: slider.title?.ar || "",
        description: slider.description?.ar || "",
      },
      tr: {
        title: slider.title?.tr || "",
        description: slider.description?.tr || "",
      },
    });

    setImagePreview(slider.img || null);
    setImageFile(null);
  }, [slider]);

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
      setImagePreview(slider?.img || null);
    }
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
  };
};

export default useUpdateHomeSlider;
