import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { createEmptyAboutServiceItem } from "../helpers/createEmptyAboutServiceItem";
import useAboutServices from "../../hooks/useAboutServices";

const normalizeMultilingual = (value) => ({
  en: value?.en || "",
  ar: value?.ar || "",
});

const normalizeContentText = (value) => ({
  en: Array.isArray(value?.en) && value.en.length ? value.en : [""],
  ar: Array.isArray(value?.ar) && value.ar.length ? value.ar : [""],
});

const normalizeItem = (item, index = 0) => ({
  _id: item?._id || `${Date.now()}-${index}`,
  title: normalizeMultilingual(item?.title),
  description: normalizeMultilingual(item?.description),
  contentTitle: normalizeMultilingual(item?.contentTitle),
  contentText: normalizeContentText(item?.contentText),
  highlight: normalizeMultilingual(item?.highlight),
  order: item?.order ?? index,
});

const useAboutServicesEditor = () => {
  const {
    aboutServices,
    isLoading,
    isFetching,
    error,
    updateAboutServices,
    isUpdating,
  } = useAboutServices();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!aboutServices) return;

    const normalizedItems = Array.isArray(aboutServices.items)
      ? aboutServices.items.map((item, index) => normalizeItem(item, index))
      : [];

    setItems(normalizedItems);
  }, [aboutServices]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [items]);

  const handleAddItem = () => {
    setItems((prev) => [...prev, createEmptyAboutServiceItem()]);
  };

  const handleRemoveItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item._id !== itemId));
  };

  const handleChangeGeneralField = (itemId, key, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, [key]: value } : item,
      ),
    );
  };

  const handleChangeLangField = (itemId, field, language, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === itemId
          ? {
              ...item,
              [field]: {
                ...item[field],
                [language]: value,
              },
            }
          : item,
      ),
    );
  };

  const handleAddContentLine = (itemId, language) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === itemId
          ? {
              ...item,
              contentText: {
                ...item.contentText,
                [language]: [...(item.contentText?.[language] || []), ""],
              },
            }
          : item,
      ),
    );
  };

  const handleRemoveContentLine = (itemId, language, indexToRemove) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== itemId) return item;

        const currentLines = item.contentText?.[language] || [];
        const updatedLines = currentLines.filter(
          (_, index) => index !== indexToRemove,
        );

        return {
          ...item,
          contentText: {
            ...item.contentText,
            [language]: updatedLines.length ? updatedLines : [""],
          },
        };
      }),
    );
  };

  const handleChangeContentLine = (itemId, language, indexToUpdate, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== itemId) return item;

        const currentLines = item.contentText?.[language] || [];
        const updatedLines = currentLines.map((line, index) =>
          index === indexToUpdate ? value : line,
        );

        return {
          ...item,
          contentText: {
            ...item.contentText,
            [language]: updatedLines,
          },
        };
      }),
    );
  };

  const handleSave = async () => {
    try {
      const payload = {
        items: items.map((item, index) => ({
          ...(String(item._id).length === 24 ? { _id: item._id } : {}),
          title: normalizeMultilingual(item.title),
          description: normalizeMultilingual(item.description),
          contentTitle: normalizeMultilingual(item.contentTitle),
          contentText: {
            en: (item.contentText?.en || []).filter(
              (line) => line?.trim() !== "",
            ),
            ar: (item.contentText?.ar || []).filter(
              (line) => line?.trim() !== "",
            ),
          },
          highlight: normalizeMultilingual(item.highlight),
          order: Number(item.order) || 0,
        })),
      };

      await updateAboutServices(payload).unwrap();
      toast.success("About services saved successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save about services");
    }
  };

  return {
    items: sortedItems,
    isLoading,
    isFetching,
    error,
    isUpdating,

    handleAddItem,
    handleRemoveItem,
    handleChangeGeneralField,
    handleChangeLangField,
    handleAddContentLine,
    handleRemoveContentLine,
    handleChangeContentLine,
    handleSave,
  };
};

export default useAboutServicesEditor;
