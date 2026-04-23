import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ResearchLangForm from "./ResearchLangForm";
import ResearchGeneralInfoTab from "./ResearchGeneralInfoTab";
import Tabs from "../../../components/Global/Tabs";
import useCreateResearch from "../hooks/useCreateResearch";

const AddResearch = () => {
  const {
    title,
    content,
    imagePreview,
    onImageChange,
    isPublished,
    setIsPublished,
    order,
    setOrder,
    handleTitleChange,
    handleContentChange,
    handleSave,
    isLoading,
  } = useCreateResearch();

  const tabConfig = [
    {
      key: "research_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <ResearchGeneralInfoTab
          isPublished={isPublished}
          setIsPublished={setIsPublished}
          order={order}
          setOrder={setOrder}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      ),
    },
    ...["en", "ar"].map((lang) => ({
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
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Research"}
        </button>
      </div>
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddResearch;
