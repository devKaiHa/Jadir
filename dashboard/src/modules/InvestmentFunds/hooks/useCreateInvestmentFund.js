import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useInvestmentFunds } from "../../hooks/useInvestmentFunds";
import { useCompanies } from "../../hooks/useCompanies";

const emptyLangState = {
  en: "",
  ar: "",
};

const useCreateInvestmentFund = () => {
  const navigate = useNavigate();
  const { postInvestmentFund, isPosting } = useInvestmentFunds();
  const { companies } = useCompanies({ limit: 100 });

  const [title, setTitle] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });
  const [shortAbout, setShortAbout] = useState({ ...emptyLangState });

  const [fundLink, setFundLink] = useState("");
  const [order, setOrder] = useState(0);

  const [launchDate, setLaunchDate] = useState("");
  const [fundDuration, setFundDuration] = useState(0);
  const [durationSuffix, setDurationSuffix] = useState("weeks");
  const [assetsVolume, setAssetsVolume] = useState(0);
  const [sharePrice, setSharePrice] = useState(0);
  const [minInvestAmount, setMinInvestAmount] = useState(0);
  const [irr, setIrr] = useState(0);
  const [companiesAssociated, setCompaniesAssociated] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
  };

  const handleContentChange = (lang, value) => {
    setContent((prev) => ({ ...prev, [lang]: value }));
  };

  const handleShortAboutChange = (lang, value) => {
    setShortAbout((prev) => ({ ...prev, [lang]: value }));
  };

  const onImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("title", JSON.stringify(title));
      formData.append("content", JSON.stringify(content));
      formData.append("shortAbout", JSON.stringify(shortAbout));
      formData.append("fundLink", fundLink || "");
      formData.append("launchDate", launchDate || "");
      formData.append("fundDuration", String(fundDuration || 0));
      formData.append("durationSuffix", durationSuffix || "");
      formData.append("assetsVolume", String(assetsVolume || 0));
      formData.append("sharePrice", String(sharePrice || 0));
      formData.append("minInvestAmount", String(minInvestAmount || 0));
      formData.append("irr", String(irr || 0));
      formData.append("order", String(order || 0));

      companiesAssociated.forEach((company) => {
        const companyId = company?._id || company?.id;
        if (companyId) {
          formData.append("companiesAssociated", companyId);
        }
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await postInvestmentFund(formData).unwrap();

      toast.success("Investment fund created successfully");

      setTimeout(() => {
        navigate("/all-investment-funds");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create investment fund");
    }
  };

  return {
    title,
    content,
    shortAbout,

    fundLink,
    setFundLink,
    launchDate,
    setLaunchDate,
    fundDuration,
    setFundDuration,
    durationSuffix,
    setDurationSuffix,
    assetsVolume,
    setAssetsVolume,
    sharePrice,
    setSharePrice,
    minInvestAmount,
    setMinInvestAmount,
    irr,
    setIrr,
    companiesAssociated,
    setCompaniesAssociated,
    companies,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleTitleChange,
    handleContentChange,
    handleShortAboutChange,
    handleSave,
    isLoading: isPosting,
  };
};

export default useCreateInvestmentFund;
