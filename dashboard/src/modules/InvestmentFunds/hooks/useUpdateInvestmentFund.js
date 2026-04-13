import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useInvestmentFunds,
  useOneInvestmentFund,
} from "../../hooks/useInvestmentFunds";
import { useCompanies } from "../../hooks/useCompanies";
import { imageURL } from "../../../Api/GlobalData";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useUpdateInvestmentFund = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { investmentFund, isLoading, error } = useOneInvestmentFund(id);
  const { updateInvestmentFund, isUpdating } = useInvestmentFunds();
  const { companies } = useCompanies({ limit: 100 });

  const [title, setTitle] = useState({ ...emptyLangState });
  const [content, setContent] = useState({ ...emptyLangState });
  const [shortAbout, setShortAbout] = useState({ ...emptyLangState });

  const [fundLink, setFundLink] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [fundDuration, setFundDuration] = useState(0);
  const [durationSuffix, setDurationSuffix] = useState("weeks");
  const [assetsVolume, setAssetsVolume] = useState(0);
  const [sharePrice, setSharePrice] = useState(0);
  const [minInvestAmount, setMinInvestAmount] = useState(0);
  const [irr, setIrr] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);
  const [companiesAssociated, setCompaniesAssociated] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!investmentFund) return;

    setTitle({
      en: investmentFund?.title?.en || "",
      ar: investmentFund?.title?.ar || "",
      tr: investmentFund?.title?.tr || "",
    });

    setContent({
      en: investmentFund?.content?.en || "",
      ar: investmentFund?.content?.ar || "",
      tr: investmentFund?.content?.tr || "",
    });

    setShortAbout({
      en: investmentFund?.shortAbout?.en || "",
      ar: investmentFund?.shortAbout?.ar || "",
      tr: investmentFund?.shortAbout?.tr || "",
    });

    setFundLink(investmentFund?.fundLink || "");
    setLaunchDate(
      investmentFund?.launchDate
        ? new Date(investmentFund.launchDate).toISOString().slice(0, 10)
        : "",
    );
    setFundDuration(investmentFund?.fundDuration || 0);
    setDurationSuffix(investmentFund?.durationSuffix || "weeks");
    setAssetsVolume(investmentFund?.assetsVolume || 0);
    setSharePrice(investmentFund?.sharePrice || 0);
    setMinInvestAmount(investmentFund?.minInvestAmount || 0);
    setIrr(investmentFund?.irr || 0);
    setIsActive(investmentFund?.isActive ?? true);
    setOrder(investmentFund?.order || 0);
    setCompaniesAssociated(investmentFund?.companiesAssociated || []);

    setImagePreview(
      `${imageURL}/investmentFunds/${investmentFund?.image}` || null,
    );
    setImageFile(null);
  }, [investmentFund]);

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
      setImagePreview(
        investmentFund?.image
          ? `${imageURL}/investmentFunds/${investmentFund.image}`
          : null,
      );
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
      formData.append("isActive", isActive ? "true" : "false");
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

      await updateInvestmentFund({
        id,
        data: formData,
      }).unwrap();

      toast.success("Investment fund updated successfully");

      setTimeout(() => {
        navigate("/all-investment-funds");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update investment fund");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,

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

    isActive,
    setIsActive,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleTitleChange,
    handleContentChange,
    handleShortAboutChange,
    handleSave,
  };
};

export default useUpdateInvestmentFund;
