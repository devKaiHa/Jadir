import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ProjectLangForm from "./ProjectLangForm";
import ProjectGeneralInfoTab from "./ProjectGeneralInfoTab";
import useUpdateProject from "../hooks/useUpdateProjects";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Tabs from "../../../components/Global/Tabs";

const UpdateProject = () => {
  const {
    error,
    isPageLoading,
    isUpdating,
    title,
    brief,
    challenge,
    solution,
    result,
    projectLink,
    setProjectLink,
    order,
    setOrder,
    imagePreview,
    onImageChange,
    handleTitleChange,
    handleBriefChange,
    handleChallengeChange,
    handleSolutionChange,
    handleResultChange,
    handleSave,
  } = useUpdateProject();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "project_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <ProjectGeneralInfoTab
          projectLink={projectLink}
          setProjectLink={setProjectLink}
          order={order}
          setOrder={setOrder}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `project_${lang}`,
      label: `Project ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <ProjectLangForm
          language={lang}
          titleValue={title[lang]}
          briefValue={brief[lang]}
          challengeValue={challenge[lang]}
          solutionValue={solution[lang]}
          resultValue={result[lang]}
          onTitleChange={handleTitleChange}
          onBriefChange={handleBriefChange}
          onChallengeChange={handleChallengeChange}
          onSolutionChange={handleSolutionChange}
          onResultChange={handleResultChange}
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
          {isUpdating ? "Updating..." : "Update Project"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateProject;
