import { ToastContainer } from "react-toastify";
import SectorGeneralInfoTab from "./SectorGeneralInfoTab";
import SectorLangForm from "./SectorLangForm";
import useCreateSector from "../hooks/useCreateSector";
import { Container } from "@mui/material";
import Tabs from "../../../components/Global/Tabs";

const AddSector = () => {
  const {
    name,
    description,
    slug,
    setSlug,

    isActive,
    setIsActive,

    order,
    setOrder,

    handleNameChange,
    handleDescriptionChange,

    handleSave,
    isLoading,
  } = useCreateSector();

  const tabConfig = [
    {
      key: "tab_info",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <SectorGeneralInfoTab
          slug={slug}
          setSlug={setSlug}
          isActive={isActive}
          setIsActive={setIsActive}
          order={order}
          setOrder={setOrder}
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
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Sector"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddSector;
