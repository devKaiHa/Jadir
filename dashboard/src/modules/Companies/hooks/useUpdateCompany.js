import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanies, useOneCompany } from "../../hooks/useCompanies";
import { imageURL } from "../../../Api/GlobalData";

const emptyLangState = {
  en: "",
  ar: "",
};

const useUpdateCompany = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { company, isLoading, error } = useOneCompany(id);
  const { updateCompany, isUpdating } = useCompanies();

  const [name, setName] = useState({ ...emptyLangState });
  const [brief, setBrief] = useState({ ...emptyLangState });
  const [testimonial, setTestimonial] = useState({ ...emptyLangState });
  const [order, setOrder] = useState(0);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    if (!company) return;

    setName({
      en: company?.name?.en || "",
      ar: company?.name?.ar || "",
    });

    setBrief({
      en: company?.brief?.en || "",
      ar: company?.brief?.ar || "",
    });

    setTestimonial({
      en: company?.testimonial?.en || "",
      ar: company?.testimonial?.ar || "",
    });
    setOrder(company?.order || 0);
    setLogoPreview(company?.logo ? `${imageURL}/companies/${company.logo}` : null);
    setLogoFile(null);
  }, [company]);

  const handleLangChange = (group, lang, value) => {
    if (group === "name") {
      setName((prev) => ({ ...prev, [lang]: value }));
    }

    if (group === "brief") {
      setBrief((prev) => ({ ...prev, [lang]: value }));
    }

    if (group === "testimonial") {
      setTestimonial((prev) => ({ ...prev, [lang]: value }));
    }
  };

  const onLogoChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      return;
    }

    setLogoFile(null);
    setLogoPreview(company?.logo ? `${imageURL}/companies/${company.logo}` : null);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("name", JSON.stringify(name));
      formData.append("brief", JSON.stringify(brief));
      formData.append("testimonial", JSON.stringify(testimonial));
      formData.append("order", String(order || 0));

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      await updateCompany({
        id,
        data: formData,
      }).unwrap();

      toast.success("Company updated successfully");

      setTimeout(() => {
        navigate("/all-companies");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update company");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,
    name,
    brief,
    testimonial,
    order,
    setOrder,
    logoPreview,
    onLogoChange,
    handleLangChange,
    handleSave,
  };
};

export default useUpdateCompany;
