import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useUpdateOurService from "../hooks/useUpdateOurService";
import OurServiceGeneralInfoTab from "./OurServiceGeneralInfoTab";
import OurServiceLangForm from "./OurServiceLangForm";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Tabs from "../../../components/Global/Tabs";

const UpdateOurService = () => {
  const {
    error,
    isPageLoading,
    isUpdating,
    title,
    description,
    isActive,
    setIsActive,
    order,
    setOrder,
    handleTitleChange,
    handleDescriptionChange,
    handleSave,
  } = useUpdateOurService();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

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
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Service"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateOurService;
