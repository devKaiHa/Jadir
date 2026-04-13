import { ToastContainer } from "react-toastify";
import useUpdateSector from "../hooks/useUpdateSector";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import SectorGeneralInfoTab from "./SectorGeneralInfoTab";
import SectorLangForm from "./SectorLangForm";
import { Container } from "@mui/material";
import Tabs from "../../../components/Global/Tabs";

const UpdateSector = () => {
  const {
    error,
    isPageLoading,
    isUpdating,

    name,
    description,

    imgPreview,
    currentImg,

    isActive,
    setIsActive,

    order,
    setOrder,

    handleNameChange,
    handleDescriptionChange,
    handleImageChange,

    handleSave,
  } = useUpdateSector();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "tab_info",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <SectorGeneralInfoTab
          isActive={isActive}
          setIsActive={setIsActive}
          order={order}
          setOrder={setOrder}
          handleImageChange={handleImageChange}
          imgPreview={imgPreview}
          currentImg={currentImg}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `sector_${lang}`,
      label: `Sector ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <SectorLangForm
          language={lang}
          nameValue={name[lang]}
          descriptionValue={description[lang]}
          onNameChange={handleNameChange}
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
          {isUpdating ? "Updating..." : "Update Sector"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateSector;
