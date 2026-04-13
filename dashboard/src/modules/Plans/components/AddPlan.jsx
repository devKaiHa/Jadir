import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import PlanLangForm from "./PlanLangForm";
import PlanGeneralInfoTab from "./PlanGeneralInfoTab";
import useCreatePlan from "../hooks/useCreatePlan";
import Tabs from "../../../components/Global/Tabs";

const AddPlan = () => {
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
  } = useCreatePlan();

  const tabConfig = [
    {
      key: "plan_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <PlanGeneralInfoTab
          isActive={isActive}
          setIsActive={setIsActive}
          order={order}
          setOrder={setOrder}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `plan_${lang}`,
      label: `Plan ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <PlanLangForm
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
          {isLoading ? "Submitting..." : "Create Plan"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddPlan;
