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
      content: <ValueGeneralInfoTab order={order} setOrder={setOrder} />,
    },
    ...["en", "ar"].map((lang) => ({
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
      <div className="space-y-6">
        <Tabs tabs={tabConfig} />

        <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
          <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Create Value"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddValue;
