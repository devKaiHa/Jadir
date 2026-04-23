import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSectors } from "../../hooks/useSectors";

const emptyLangState = {
  en: "",
  ar: "",
};

const useCreateSector = () => {
  const navigate = useNavigate();
  const { postSector, isPosting } = useSectors();

  const [name, setName] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });

  const [slug, setSlug] = useState("");
  const [order, setOrder] = useState(0);

  const handleNameChange = (lang, value) => {
    setName((prev) => ({ ...prev, [lang]: value }));
  };

  const handleDescriptionChange = (lang, value) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const resetForm = () => {
    setName({ ...emptyLangState });
    setDescription({ ...emptyLangState });
    setSlug("");
    setOrder(0);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("name", JSON.stringify(name));
      formData.append("description", JSON.stringify(description));
      formData.append("slug", slug);
      formData.append("order", order);

      await postSector(formData).unwrap();

      toast.success("Sector created successfully");
      resetForm();

      setTimeout(() => {
        navigate("/all-sectors");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create sector");
    }
  };

  return {
    name,
    description,
    slug,
    setSlug,

    order,
    setOrder,

    handleNameChange,
    handleDescriptionChange,

    handleSave,
    isLoading: isPosting,
  };
};

export default useCreateSector;
