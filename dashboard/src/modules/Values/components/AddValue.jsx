import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ValueLangForm from "./ValueLangForm";
import ValueGeneralInfoTab from "./ValueGeneralInfoTab";
import useCreateValue from "../hooks/useCreateValue";
import Tabs from "../../../components/Global/Tabs";

const AddValue = () => {
  const {
    name,
    content,
    description,

    isActive,
    setIsActive,

    order,
    setOrder,

    handleNameChange,
    handleContentChange,
    handleDescriptionChange,

    handleSave,
    isLoading,
  } = useCreateValue();

  const tabConfig = [
    {
      key: "tab_info",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <ValueGeneralInfoTab
          isActive={isActive}
          setIsActive={setIsActive}
          order={order}
          setOrder={setOrder}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `value_${lang}`,
      label: `Value ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <ValueLangForm
          language={lang}
          nameValue={name[lang]}
          contentValue={content[lang]}
          descriptionValue={description[lang]}
          onNameChange={handleNameChange}
          onContentChange={handleContentChange}
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
          {isLoading ? "Submitting..." : "Create Value"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddValue;
