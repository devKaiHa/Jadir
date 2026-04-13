import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useCreateInvestmentFund from "../hooks/useCreateInvestmentFund";
import InvestmentFundGeneralInfoTab from "./InvestmentFundGeneralInfoTab";
import InvestmentFundLangForm from "./InvestmentFundLangForm";
import Tabs from "../../../components/Global/Tabs";

const AddInvestmentFund = () => {
  const {
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
    isLoading,
  } = useCreateInvestmentFund();

  const tabConfig = [
    {
      key: "fund_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <InvestmentFundGeneralInfoTab
          fundLink={fundLink}
          setFundLink={setFundLink}
          launchDate={launchDate}
          setLaunchDate={setLaunchDate}
          fundDuration={fundDuration}
          setFundDuration={setFundDuration}
          durationSuffix={durationSuffix}
          setDurationSuffix={setDurationSuffix}
          assetsVolume={assetsVolume}
          setAssetsVolume={setAssetsVolume}
          sharePrice={sharePrice}
          setSharePrice={setSharePrice}
          minInvestAmount={minInvestAmount}
          setMinInvestAmount={setMinInvestAmount}
          irr={irr}
          setIrr={setIrr}
          companiesAssociated={companiesAssociated}
          setCompaniesAssociated={setCompaniesAssociated}
          companies={companies}
          isActive={isActive}
          setIsActive={setIsActive}
          order={order}
          setOrder={setOrder}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `fund_${lang}`,
      label: `Fund ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <InvestmentFundLangForm
          language={lang}
          titleValue={title[lang]}
          contentValue={content[lang]}
          shortAboutValue={shortAbout[lang]}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
          onShortAboutChange={handleShortAboutChange}
        />
      ),
    })),
  ];

  return (
    <Container>
      <Tabs tabs={tabConfig} />

      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Investment Fund"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddInvestmentFund;
