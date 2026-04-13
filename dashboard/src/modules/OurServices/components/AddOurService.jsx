import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import OurServiceLangForm from "./OurServiceLangForm";
import useCreateOurService from "../hooks/useCreateOurService";
import OurServiceGeneralInfoTab from "./OurServiceGeneralInfoTab";
import Tabs from "../../../components/Global/Tabs";

const AddOurService = () => {
  const {
    title,
    description,
    isActive,
    setIsActive,
    order,
    setOrder,
    handleTitleChange,
    handleDescriptionChange,
    handleSave,
    isLoading,
  } = useCreateOurService();

  const tabConfig = [
    {
      key: "service_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <OurServiceGeneralInfoTab
          isActive={isActive}
          setIsActive={setIsActive}
          order={order}
          setOrder={setOrder}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `service_${lang}`,
      label: `Service ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <OurServiceLangForm
          language={lang}
          titleValue={title[lang]}
          descriptionValue={description[lang]}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
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
          {isLoading ? "Submitting..." : "Create Service"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddOurService;
