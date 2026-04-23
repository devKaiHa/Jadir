import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAboutHome from "../../../hooks/useAboutHome";

const emptyLangState = {
  en: "",
  ar: "",
};

const useAboutHomeForm = () => {
  const { aboutHome, isLoading, error, updateAboutHome, isUpdating } =
    useAboutHome();

  const [content, setContent] = useState({ ...emptyLangState });
  const [vision, setVision] = useState({ ...emptyLangState });
  const [visionDescription, setVisionDescription] = useState({
    ...emptyLangState,
  });
  const [message, setMessage] = useState({ ...emptyLangState });
  const [messageDescription, setMessageDescription] = useState({
    ...emptyLangState,
  });

  const [businessApproach, setBusinessApproach] = useState({
    ...emptyLangState,
  });
  const [whyUs, setWhyUs] = useState({ ...emptyLangState });
  const [whoWeServe, setWhoWeServe] = useState({ ...emptyLangState });

  useEffect(() => {
    if (!aboutHome) return;

    setContent({
      en: aboutHome?.content?.en || "",
      ar: aboutHome?.content?.ar || "",
    });

    setVision({
      en: aboutHome?.vision?.en || "",
      ar: aboutHome?.vision?.ar || "",
    });

    setVisionDescription({
      en: aboutHome?.visionDescription?.en || "",
      ar: aboutHome?.visionDescription?.ar || "",
    });

    setMessage({
      en: aboutHome?.message?.en || "",
      ar: aboutHome?.message?.ar || "",
    });

    setMessageDescription({
      en: aboutHome?.messageDescription?.en || "",
      ar: aboutHome?.messageDescription?.ar || "",
    });

    setBusinessApproach({
      en: aboutHome?.businessApproach?.en || "",
      ar: aboutHome?.businessApproach?.ar || "",
    });

    setWhyUs({
      en: aboutHome?.whyUs?.en || "",
      ar: aboutHome?.whyUs?.ar || "",
    });

    setWhoWeServe({
      en: aboutHome?.whoWeServe?.en || "",
      ar: aboutHome?.whoWeServe?.ar || "",
    });
  }, [aboutHome]);

  const handleContentChange = (lang, value) => {
    setContent((prev) => ({ ...prev, [lang]: value }));
  };

  const handleVisionChange = (lang, value) => {
    setVision((prev) => ({ ...prev, [lang]: value }));
  };

  const handleVisionDescriptionChange = (lang, value) => {
    setVisionDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const handleMessageChange = (lang, value) => {
    setMessage((prev) => ({ ...prev, [lang]: value }));
  };

  const handleMessageDescriptionChange = (lang, value) => {
    setMessageDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const handleBusinessApproachChange = (lang, value) => {
    setBusinessApproach((prev) => ({ ...prev, [lang]: value }));
  };

  const handleWhyUsChange = (lang, value) => {
    setWhyUs((prev) => ({ ...prev, [lang]: value }));
  };

  const handleWhoWeServeChange = (lang, value) => {
    setWhoWeServe((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSave = async () => {
    try {
      const formData = {
        content: JSON.stringify(content),
        vision: JSON.stringify(vision),
        visionDescription: JSON.stringify(visionDescription),
        message: JSON.stringify(message),
        messageDescription: JSON.stringify(messageDescription),
        businessApproach: JSON.stringify(businessApproach),
        whyUs: JSON.stringify(whyUs),
        whoWeServe: JSON.stringify(whoWeServe),
      };
      await updateAboutHome(formData).unwrap();
      toast.success("About Home updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update About Home");
    }
  };

  return {
    isLoading,
    error,
    isUpdating,

    content,
    vision,
    visionDescription,
    message,
    messageDescription,
    businessApproach,
    whyUs,
    whoWeServe,

    handleContentChange,
    handleVisionChange,
    handleVisionDescriptionChange,
    handleMessageChange,
    handleMessageDescriptionChange,
    handleBusinessApproachChange,
    handleWhyUsChange,
    handleWhoWeServeChange,

    handleSave,
  };
};

export default useAboutHomeForm;
