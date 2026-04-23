import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOnePartner, usePartners } from "../../hooks/usePartners";

const emptyLangState = {
  en: "",
  ar: "",
};

const useUpdatePartner = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { partner, isLoading, error } = useOnePartner(id);
  const { updatePartner, isUpdating } = usePartners();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [brief, setBrief] = useState({ ...emptyLangState });
  const [testimonial, setTestimonial] = useState({ ...emptyLangState });
  const [order, setOrder] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!partner) return;

    setTitle({
      en: partner.title?.en || "",
      ar: partner.title?.ar || "",
    });
    setBrief({
      en: partner.brief?.en || "",
      ar: partner.brief?.ar || "",
    });
    setTestimonial({
      en: partner.testimonial?.en || "",
      ar: partner.testimonial?.ar || "",
    });
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

      formData.append("title", JSON.stringify(title));
      formData.append("brief", JSON.stringify(brief));
      formData.append("testimonial", JSON.stringify(testimonial));
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
    brief,
    setBrief,
    testimonial,
    setTestimonial,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleSave,
  };
};

export default useUpdatePartner;
