import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ProjectLangForm from "./ProjectLangForm";
import ProjectGeneralInfoTab from "./ProjectGeneralInfoTab";
import Tabs from "../../../components/Global/Tabs";
import useCreateProject from "../hooks/useCreateProjects";

const AddProject = () => {
  const {
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
    isLoading,
  } = useCreateProject();

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
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Project"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddProject;
