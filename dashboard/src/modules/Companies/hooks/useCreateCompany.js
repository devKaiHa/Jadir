import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCompanies } from "../../hooks/useCompanies";
import { useInvestmentFunds } from "../../hooks/useInvestmentFunds";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const createEmptyMultilingualItem = () => ({
  en: "",
  ar: "",
  tr: "",
});

const createEmptyStatistic = () => ({
  title: createEmptyMultilingualItem(),
  value: "",
  description: createEmptyMultilingualItem(),
});

const useCreateCompany = () => {
  const navigate = useNavigate();
  const { postCompany, isPosting } = useCompanies();
  const { investmentFunds } = useInvestmentFunds({ limit: 100 });

  const [name, setName] = useState({ ...emptyLangState });
  const [about, setAbout] = useState({ ...emptyLangState });
  const [experienceField, setExperienceField] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [country, setCountry] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);
  const [fundsAssociated, setFundsAssociated] = useState([]);
  const [services, setServices] = useState([]);
  const [values, setValues] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const [socialLinks, setSocialLinks] = useState({
    xTwitter: "",
    instagram: "",
    facebook: "",
    linkedin: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);

  const handleLangChange = (group, lang, value) => {
    if (group === "name") {
      setName((prev) => ({ ...prev, [lang]: value }));
    }
    if (group === "about") {
      setAbout((prev) => ({ ...prev, [lang]: value }));
    }
    if (group === "experienceField") {
      setExperienceField((prev) => ({ ...prev, [lang]: value }));
    }
    if (group === "content") {
      setContent((prev) => ({ ...prev, [lang]: value }));
    }
  };

  const handleSocialChange = (field, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onLogoChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setLogoFile(null);
      setLogoPreview(null);
    }
  };

  const onBackgroundChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setBackgroundFile(file);
      setBackgroundPreview(URL.createObjectURL(file));
    } else {
      setBackgroundFile(null);
      setBackgroundPreview(null);
    }
  };

  const addMultilingualListItem = (setter) => {
    setter((prev) => [...prev, createEmptyMultilingualItem()]);
  };

  const removeMultilingualListItem = (setter, index) => {
    setter((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const updateMultilingualListItem = (setter, index, lang, value) => {
    setter((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [lang]: value } : item,
      ),
    );
  };

  const addStatistic = () => {
    setStatistics((prev) => [...prev, createEmptyStatistic()]);
  };

  const removeStatistic = (index) => {
    setStatistics((prev) =>
      prev.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const updateStatisticField = (index, key, value) => {
    setStatistics((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [key]: value } : item,
      ),
    );
  };

  const updateStatisticLangField = (index, key, lang, value) => {
    setStatistics((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index
          ? {
              ...item,
              [key]: {
                ...(item[key] || createEmptyMultilingualItem()),
                [lang]: value,
              },
            }
          : item,
      ),
    );
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("name", JSON.stringify(name));
      formData.append("about", JSON.stringify(about));
      formData.append("experienceField", JSON.stringify(experienceField));
      formData.append("content", JSON.stringify(content));
      formData.append("social_links", JSON.stringify(socialLinks));

      formData.append("experienceYears", experienceYears || "");
      formData.append("country", country || "");
      formData.append("phone", phone || "");
      formData.append("email", email || "");
      formData.append("website", website || "");
      formData.append("isActive", isActive ? "true" : "false");
      formData.append("order", String(order || 0));

      formData.append(
        "fundsAssociated",
        JSON.stringify(
          fundsAssociated
            .map((fund) => fund?._id || fund?.id)
            .filter(Boolean),
        ),
      );
      formData.append("services", JSON.stringify(services));
      formData.append("values", JSON.stringify(values));
      formData.append("addresses", JSON.stringify(addresses));
      formData.append("goals", JSON.stringify(goals));
      formData.append("statistics", JSON.stringify(statistics));

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (backgroundFile) {
        formData.append("background", backgroundFile);
      }

      await postCompany(formData).unwrap();

      toast.success("Company created successfully");

      setTimeout(() => {
        navigate("/all-companies");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create company");
    }
  };

  return {
    name,
    about,
    experienceField,
    content,

    experienceYears,
    setExperienceYears,

    country,
    setCountry,

    phone,
    setPhone,

    email,
    setEmail,

    website,
    setWebsite,

    isActive,
    setIsActive,

    order,
    setOrder,

    fundsAssociated,
    setFundsAssociated,
    investmentFunds,
    services,
    values,
    addresses,
    goals,
    statistics,

    socialLinks,
    handleSocialChange,

    logoPreview,
    onLogoChange,

    backgroundPreview,
    onBackgroundChange,
    addService: () => addMultilingualListItem(setServices),
    removeService: (index) => removeMultilingualListItem(setServices, index),
    updateService: (index, lang, value) =>
      updateMultilingualListItem(setServices, index, lang, value),
    addValue: () => addMultilingualListItem(setValues),
    removeValue: (index) => removeMultilingualListItem(setValues, index),
    updateValue: (index, lang, value) =>
      updateMultilingualListItem(setValues, index, lang, value),
    addAddress: () => addMultilingualListItem(setAddresses),
    removeAddress: (index) => removeMultilingualListItem(setAddresses, index),
    updateAddress: (index, lang, value) =>
      updateMultilingualListItem(setAddresses, index, lang, value),
    addGoal: () => addMultilingualListItem(setGoals),
    removeGoal: (index) => removeMultilingualListItem(setGoals, index),
    updateGoal: (index, lang, value) =>
      updateMultilingualListItem(setGoals, index, lang, value),
    addStatistic,
    removeStatistic,
    updateStatisticField,
    updateStatisticLangField,

    handleLangChange,
    handleSave,
    isLoading: isPosting,
  };
};

export default useCreateCompany;
