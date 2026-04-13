import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AboutHomeLangForm from "../components/AboutHomeLangForm";
import AboutHomeGeneralTab from "../components/AboutHomeGeneralTab";
import Tabs from "../../../../components/Global/Tabs";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import useAboutHomeForm from "../hooks/useAboutHomeForm";

const EditAboutHome = () => {
  const {
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
  } = useAboutHomeForm();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "about_home_general",
      label: "General Info",
      icon: "ki-outline ki-setting-2",
      content: (
        <AboutHomeGeneralTab
          prizes={prizes}
          certificates={certificates}
          addPrize={addPrize}
          removePrize={removePrize}
          updatePrizeField={updatePrizeField}
          updatePrizeName={updatePrizeName}
          addCertificate={addCertificate}
          removeCertificate={removeCertificate}
          updateCertificateField={updateCertificateField}
          updateCertificateName={updateCertificateName}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `about_home_${lang}`,
      label: `About Home ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <AboutHomeLangForm
          language={lang}
          contentValue={content[lang]}
          visionValue={vision[lang]}
          visionDescriptionValue={visionDescription[lang]}
          messageValue={message[lang]}
          messageDescriptionValue={messageDescription[lang]}
          businessApproachValue={businessApproach[lang]}
          whyUsValue={whyUs[lang]}
          governanceValue={governance[lang]}
          onContentChange={handleContentChange}
          onVisionChange={handleVisionChange}
          onVisionDescriptionChange={handleVisionDescriptionChange}
          onMessageChange={handleMessageChange}
          onMessageDescriptionChange={handleMessageDescriptionChange}
          onBusinessApproachChange={handleBusinessApproachChange}
          onWhyUsChange={handleWhyUsChange}
          onGovernanceChange={handleGovernanceChange}
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
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save About Home"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default EditAboutHome;
