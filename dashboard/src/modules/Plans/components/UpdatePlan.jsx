import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import PlanLangForm from "./PlanLangForm";
import PlanGeneralInfoTab from "./PlanGeneralInfoTab";
import useUpdatePlan from "../hooks/useUpdatePlan";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Tabs from "../../../components/Global/Tabs";

const UpdatePlan = () => {
  const {
    error,
    isPageLoading,
    isUpdating,
    title,
    description,
    order,
    setOrder,
    handleTitleChange,
    handleDescriptionChange,
    handleSave,
  } = useUpdatePlan();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "plan_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <PlanGeneralInfoTab
          order={order}
          setOrder={setOrder}
        />
      ),
    },
    ...["en", "ar"].map((lang) => ({
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
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Plan"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdatePlan;
