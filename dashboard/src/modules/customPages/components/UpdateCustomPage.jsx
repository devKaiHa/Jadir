import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import CustomPageLangForm from "./CustomPageLangForm";
import CustomPageGeneralTab from "./CustomPageGeneralTab";
import useUpdateCustomPage from "../hooks/useUpdateCustomPage";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Tabs from "../../../components/Global/Tabs";

const UpdateCustomPage = () => {
  const {
    error,
    isPageLoading,
    isUpdating,
    title,
    content,
    order,
    setOrder,
    handleTitleChange,
    handleContentChange,
    handleSave,
  } = useUpdateCustomPage();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

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
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Page"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateCustomPage;
