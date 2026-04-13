import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useHomeSliders } from "../../hooks/useHomeSliders";

const createEmptySlide = (sliderType = "main", order = 0) => ({
  _id: undefined,
  sliderType,
  btnLink: "",
  isActive: true,
  order,
  title: { en: "", ar: "", tr: "" },
  description: { en: "", ar: "", tr: "" },
  img: "",
  newImageFile: null,
  previewImage: "",
});

export const useBulkHomeSliderEditor = (sliderType = "main") => {
  const { sliders, isLoading, refetch, updateHomeSliderBulk, isBulkUpdating } =
    useHomeSliders({ sliderType, limit: 100 });

  const [localSlides, setLocalSlides] = useState([]);

  useEffect(() => {
    const normalized = (sliders || []).map((slide) => ({
      ...slide,
      newImageFile: null,
      previewImage: slide.img || "",
    }));

    setLocalSlides(normalized);
  }, [sliders]);

  const addSlide = () => {
    setLocalSlides((prev) => [
      ...prev,
      createEmptySlide(sliderType, prev.length),
    ]);
  };

  const removeSlide = (index) => {
    setLocalSlides((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((slide, idx) => ({ ...slide, order: idx })),
    );
  };

  const updateSlideField = (index, key, value) => {
    setLocalSlides((prev) =>
      prev.map((slide, i) =>
        i === index ? { ...slide, [key]: value } : slide,
      ),
    );
  };

  const updateSlideLangField = (index, group, lang, value) => {
    setLocalSlides((prev) =>
      prev.map((slide, i) =>
        i === index
          ? {
              ...slide,
              [group]: {
                ...slide[group],
                [lang]: value,
              },
            }
          : slide,
      ),
    );
  };

  const updateSlideImage = (index, selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (!file) return;

    setLocalSlides((prev) =>
      prev.map((slide, i) =>
        i === index
          ? {
              ...slide,
              newImageFile: file,
              previewImage: URL.createObjectURL(file),
            }
          : slide,
      ),
    );
  };

  const reorderedSlides = useMemo(
    () => localSlides.map((slide, index) => ({ ...slide, order: index })),
    [localSlides],
  );

  const handleSaveAll = async () => {
    try {
      const payload = reorderedSlides.map((slide, index) => ({
        _id: slide._id,
        sliderType,
        btnLink: slide.btnLink || "",
        isActive: slide.isActive ?? true,
        order: index,
        title: {
          en: slide.title?.en || "",
          ar: slide.title?.ar || "",
          tr: slide.title?.tr || "",
        },
        description: {
          en: slide.description?.en || "",
          ar: slide.description?.ar || "",
          tr: slide.description?.tr || "",
        },
      }));

      await updateHomeSliderBulk({
        sliderType,
        data: payload,
      }).unwrap();

      toast.success("Slider updated successfully");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update slider");
    }
  };

  return {
    slides: reorderedSlides,
    isLoading,
    isBulkUpdating,

    addSlide,
    removeSlide,
    updateSlideField,
    updateSlideLangField,
    updateSlideImage,

    handleSaveAll,
  };
};

export default useBulkHomeSliderEditor;
