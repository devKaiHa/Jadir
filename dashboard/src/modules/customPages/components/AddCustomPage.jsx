import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import CustomPageLangForm from "./CustomPageLangForm";
import CustomPageGeneralTab from "./CustomPageGeneralTab";
import useCreateCustomPage from "../hooks/useCreateCustomPage";
import Tabs from "../../../components/Global/Tabs";

const AddCustomPage = () => {
  const {
    title,
    content,
    order,
    setOrder,
    handleTitleChange,
    handleContentChange,
    handleSave,
    isLoading,
  } = useCreateCustomPage();

  const tabConfig = [
    {
      key: "custom_page_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <CustomPageGeneralTab
          order={order}
          setOrder={setOrder}
        />
      ),
    },
    ...["en", "ar"].map((lang) => ({
      key: `custom_page_${lang}`,
      label: `Page ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <CustomPageLangForm
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
          {isLoading ? "Submitting..." : "Create Page"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddCustomPage;
