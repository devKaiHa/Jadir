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
  const [testimonial, setTestimonial] = useState({
    clientName: { ...emptyLangState },
    clientRole: { ...emptyLangState },
    quote: { ...emptyLangState },
  });
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
    setTestimonial({
      clientName: {
        en: service?.testimonial?.clientName?.en || "",
        ar: service?.testimonial?.clientName?.ar || "",
      },
      clientRole: {
        en: service?.testimonial?.clientRole?.en || "",
        ar: service?.testimonial?.clientRole?.ar || "",
      },
      quote: {
        en: service?.testimonial?.quote?.en || "",
        ar: service?.testimonial?.quote?.ar || "",
      },
    });
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

  const handleTestimonialFieldChange = (field, lang, value) => {
    setTestimonial((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
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
      formData.append("testimonial", JSON.stringify(testimonial));
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
    testimonial,
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
