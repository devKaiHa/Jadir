import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAboutHome from "../../../hooks/useAboutHome";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const createEmptyPrizeCert = () => ({
  name: { ...emptyLangState },
  date: "",
  image: "",
  provider: "",
});

const mapPrizeCert = (item) => ({
  _id: item?._id,
  name: {
    en: item?.name?.en || "",
    ar: item?.name?.ar || "",
    tr: item?.name?.tr || "",
  },
  date: item?.date ? new Date(item.date).toISOString().split("T")[0] : "",
  image: item?.image || "",
  provider: item?.provider || "",
});

const buildAttachmentFieldName = (collectionName, index) =>
  `${collectionName}Image_${index}`;

const buildMultipartCollection = (collectionName, items, formData) =>
  items.map((item, index) => {
    const nextItem = {
      _id: item?._id,
      name: item?.name || { ...emptyLangState },
      date: item?.date || "",
      provider: item?.provider || "",
      image: typeof item?.image === "string" ? item.image : "",
    };

    if (item?.image instanceof File) {
      const fileField = buildAttachmentFieldName(collectionName, index);
      formData.append(fileField, item.image);
      nextItem.imageField = fileField;
    }

    return nextItem;
  });

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
  const [governance, setGovernance] = useState({ ...emptyLangState });
  const [prizes, setPrizes] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (!aboutHome) return;

    setContent({
      en: aboutHome?.content?.en || "",
      ar: aboutHome?.content?.ar || "",
      tr: aboutHome?.content?.tr || "",
    });

    setVision({
      en: aboutHome?.vision?.en || "",
      ar: aboutHome?.vision?.ar || "",
      tr: aboutHome?.vision?.tr || "",
    });

    setVisionDescription({
      en: aboutHome?.visionDescription?.en || "",
      ar: aboutHome?.visionDescription?.ar || "",
      tr: aboutHome?.visionDescription?.tr || "",
    });

    setMessage({
      en: aboutHome?.message?.en || "",
      ar: aboutHome?.message?.ar || "",
      tr: aboutHome?.message?.tr || "",
    });

    setMessageDescription({
      en: aboutHome?.messageDescription?.en || "",
      ar: aboutHome?.messageDescription?.ar || "",
      tr: aboutHome?.messageDescription?.tr || "",
    });

    setBusinessApproach({
      en: aboutHome?.businessApproach?.en || "",
      ar: aboutHome?.businessApproach?.ar || "",
      tr: aboutHome?.businessApproach?.tr || "",
    });

    setWhyUs({
      en: aboutHome?.whyUs?.en || "",
      ar: aboutHome?.whyUs?.ar || "",
      tr: aboutHome?.whyUs?.tr || "",
    });

    setGovernance({
      en: aboutHome?.governance?.en || "",
      ar: aboutHome?.governance?.ar || "",
      tr: aboutHome?.governance?.tr || "",
    });

    setPrizes((aboutHome?.prizes || []).map(mapPrizeCert));
    setCertificates((aboutHome?.certificates || []).map(mapPrizeCert));
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

  const handleGovernanceChange = (lang, value) => {
    setGovernance((prev) => ({ ...prev, [lang]: value }));
  };

  const addPrize = () => {
    setPrizes((prev) => [...prev, createEmptyPrizeCert()]);
  };

  const removePrize = (index) => {
    setPrizes((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const updatePrizeField = (index, key, value) => {
    setPrizes((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [key]: value } : item,
      ),
    );
  };

  const updatePrizeName = (index, lang, value) => {
    setPrizes((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index
          ? { ...item, name: { ...item.name, [lang]: value } }
          : item,
      ),
    );
  };

  const addCertificate = () => {
    setCertificates((prev) => [...prev, createEmptyPrizeCert()]);
  };

  const removeCertificate = (index) => {
    setCertificates((prev) =>
      prev.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const updateCertificateField = (index, key, value) => {
    setCertificates((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [key]: value } : item,
      ),
    );
  };

  const updateCertificateName = (index, lang, value) => {
    setCertificates((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index
          ? { ...item, name: { ...item.name, [lang]: value } }
          : item,
      ),
    );
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("content", JSON.stringify(content));
      formData.append("vision", JSON.stringify(vision));
      formData.append("visionDescription", JSON.stringify(visionDescription));
      formData.append("message", JSON.stringify(message));
      formData.append(
        "messageDescription",
        JSON.stringify(messageDescription),
      );
      formData.append("businessApproach", JSON.stringify(businessApproach));
      formData.append("whyUs", JSON.stringify(whyUs));
      formData.append("governance", JSON.stringify(governance));
      formData.append(
        "prizes",
        JSON.stringify(buildMultipartCollection("prizes", prizes, formData)),
      );
      formData.append(
        "certificates",
        JSON.stringify(
          buildMultipartCollection("certificates", certificates, formData),
        ),
      );

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
    governance,
    prizes,
    certificates,

    handleContentChange,
    handleVisionChange,
    handleVisionDescriptionChange,
    handleMessageChange,
    handleMessageDescriptionChange,
    handleBusinessApproachChange,
    handleWhyUsChange,
    handleGovernanceChange,
    addPrize,
    removePrize,
    updatePrizeField,
    updatePrizeName,
    addCertificate,
    removeCertificate,
    updateCertificateField,
    updateCertificateName,

    handleSave,
  };
};

export default useAboutHomeForm;
