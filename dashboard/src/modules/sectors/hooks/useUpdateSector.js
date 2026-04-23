import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOneSector, useSectors } from "../../hooks/useSectors";

const emptyLangState = {
  en: "",
  ar: "",
};

const useUpdateSector = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { sector, isLoading, error } = useOneSector(id);
  const { updateSector, isUpdating } = useSectors();

  const [name, setName] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });

  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState("");
  const [currentImg, setCurrentImg] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (!sector) return;

    setName({
      en: sector?.name?.en || "",
      ar: sector?.name?.ar || "",
    });

    setDescription({
      en: sector?.description?.en || "",
      ar: sector?.description?.ar || "",
    });

    setCurrentImg(sector?.image || sector?.img || "");
    setImgPreview("");
    setImg(null);
    setOrder(sector?.order ?? 0);
  }, [sector]);

  const handleNameChange = (lang, value) => {
    setName((prev) => ({ ...prev, [lang]: value }));
  };

  const handleDescriptionChange = (lang, value) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const handleImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setImg(file);
      setImgPreview(URL.createObjectURL(file));
    } else {
      setImg(null);
      setImgPreview("");
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("name", JSON.stringify(name));
      formData.append("description", JSON.stringify(description));
      formData.append("order", order);

      if (img) {
        formData.append("image", img);
      }

      await updateSector({
        id,
        data: formData,
      }).unwrap();

      toast.success("Sector updated successfully");

      setTimeout(() => {
        navigate("/all-sectors");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update sector");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,

    name,
    description,

    img,
    imgPreview,
    currentImg,

    order,
    setOrder,

    handleNameChange,
    handleDescriptionChange,
    handleImageChange,

    handleSave,
  };
};

export default useUpdateSector;
