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
          order={order}
          setOrder={setOrder}
        />
      ),
    },
    ...["en", "ar"].map((lang) => ({
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
      <div className="space-y-6">
        <Tabs tabs={tabConfig} />

        <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
          <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Create Sector"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddSector;
