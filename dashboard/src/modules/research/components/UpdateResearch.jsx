import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ResearchLangForm from "./ResearchLangForm";
import ResearchGeneralInfoTab from "./ResearchGeneralInfoTab";
import useUpdateResearch from "../hooks/useUpdateResearch";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Tabs from "../../../components/Global/Tabs";

const UpdateResearch = () => {
  const {
    error,
    isPageLoading,
    isUpdating,
    title,
    content,
    imagePreview,
    onImageChange,
    isActive,
    setIsActive,
    isPublished,
    setIsPublished,
    order,
    setOrder,
    handleTitleChange,
    handleContentChange,
    handleSave,
  } = useUpdateResearch();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "research_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <ResearchGeneralInfoTab
          isActive={isActive}
          setIsActive={setIsActive}
          isPublished={isPublished}
          setIsPublished={setIsPublished}
          order={order}
          setOrder={setOrder}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `research_${lang}`,
      label: `Research ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <ResearchLangForm
          language={lang}
          titleValue={title[lang]}
          contentValue={content[lang]}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
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
          {isUpdating ? "Updating..." : "Update Research"}
        </button>
      </div>
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateResearch;
