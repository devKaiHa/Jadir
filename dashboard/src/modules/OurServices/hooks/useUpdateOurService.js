import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOneOurService, useOurServices } from "../../hooks/useOurServices";
import { useProjects } from "../../hooks/useProjects";
import { imageURL } from "../../../Api/GlobalData";

const emptyLangState = {
  en: "",
  ar: "",
};

const createEmptyTestimonial = () => ({
  clientName: { ...emptyLangState },
  clientRole: { ...emptyLangState },
  quote: { ...emptyLangState },
});

const useUpdateOurService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { service, isLoading, error } = useOneOurService(id);
  const { updateOurService, isUpdating, services } = useOurServices({ limit: 100 });
  const { projects } = useProjects({ limit: 100 });

  const [title, setTitle] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });
  const [features, setFeatures] = useState({ en: [], ar: [] });
  const [steps, setSteps] = useState({ en: [], ar: [] });
  const [targetingSectors, setTargetingSectors] = useState({
    en: [],
    ar: [],
  });
  const [testimonials, setTestimonials] = useState([]);
  const [order, setOrder] = useState(0);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [relatedServices, setRelatedServices] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!service) return;

    setTitle({
      en: service?.title?.en || "",
      ar: service?.title?.ar || "",
    });

    setDescription({
      en: service?.description?.en || "",
      ar: service?.description?.ar || "",
    });
    setFeatures({
      en: service?.features?.en || [],
      ar: service?.features?.ar || [],
    });
    setSteps({
      en: service?.steps?.en || [],
      ar: service?.steps?.ar || [],
    });
    setTargetingSectors({
      en: service?.targetingSectors?.en || [],
      ar: service?.targetingSectors?.ar || [],
    });
    const serviceTestimonials = Array.isArray(service?.testimonials)
      ? service.testimonials
      : service?.testimonial
        ? [service.testimonial]
        : [];

    setTestimonials(
      serviceTestimonials.map((item) => ({
        clientName: {
          en: item?.clientName?.en || "",
          ar: item?.clientName?.ar || "",
        },
        clientRole: {
          en: item?.clientRole?.en || "",
          ar: item?.clientRole?.ar || "",
        },
        quote: {
          en: item?.quote?.en || "",
          ar: item?.quote?.ar || "",
        },
      })),
    );
    setOrder(service?.order || 0);
    setRelatedProjects(service?.relatedProjects || []);
    setRelatedServices(
      (service?.relatedServices || []).filter((item) => item?._id !== service?._id),
    );
    setImagePreview(
      service?.bannerImage ? `${imageURL}/ourServices/${service.bannerImage}` : null,
    );
    setImageFile(null);
  }, [service]);

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
  };

  const handleDescriptionChange = (lang, value) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const handleFeaturesChange = (lang, value) => {
    setFeatures((prev) => ({ ...prev, [lang]: value }));
  };

  const handleStepsChange = (lang, value) => {
    setSteps((prev) => ({ ...prev, [lang]: value }));
  };

  const handleTargetingSectorsChange = (lang, value) => {
    setTargetingSectors((prev) => ({ ...prev, [lang]: value }));
  };

  const addTestimonial = () => {
    setTestimonials((prev) => [...prev, createEmptyTestimonial()]);
  };

  const removeTestimonial = (index) => {
    setTestimonials((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleTestimonialFieldChange = (index, field, lang, value) => {
    setTestimonials((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: { ...item[field], [lang]: value },
            }
          : item,
      ),
    );
  };

  const onImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(
        service?.bannerImage ? `${imageURL}/ourServices/${service.bannerImage}` : null,
      );
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(title));
      formData.append("description", JSON.stringify(description));
      formData.append("features", JSON.stringify(features));
      formData.append("steps", JSON.stringify(steps));
      formData.append("targetingSectors", JSON.stringify(targetingSectors));
      formData.append("testimonials", JSON.stringify(testimonials));
      formData.append(
        "relatedProjects",
        JSON.stringify(relatedProjects.map((item) => item._id || item.id)),
      );
      formData.append(
        "relatedServices",
        JSON.stringify(
          relatedServices
            .filter((item) => (item._id || item.id) !== id)
            .map((item) => item._id || item.id),
        ),
      );
      formData.append("order", String(order || 0));

      if (imageFile) {
        formData.append("bannerImage", imageFile);
      }

      await updateOurService({
        id,
        data: formData,
      }).unwrap();

      toast.success("Service updated successfully");

      setTimeout(() => {
        navigate("/all-our-services");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update service");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,

    title,
    description,
    features,
    steps,
    targetingSectors,
    testimonials,
    addTestimonial,
    removeTestimonial,
    order,
    setOrder,
    relatedProjects,
    setRelatedProjects,
    relatedServices,
    setRelatedServices,
    projectOptions: projects,
    serviceOptions: services.filter((item) => item?._id !== id),
    imagePreview,
    onImageChange,

    handleTitleChange,
    handleDescriptionChange,
    handleFeaturesChange,
    handleStepsChange,
    handleTargetingSectorsChange,
    handleTestimonialFieldChange,
    handleSave,
  };
};

export default useUpdateOurService;
