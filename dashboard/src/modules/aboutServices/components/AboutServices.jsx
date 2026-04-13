import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import AboutServicesItemsManager from "./AboutServicesItemsManager";
import useAboutServicesEditor from "../hooks/useAboutServicesEditor";

const AboutServices = () => {
  const {
    items,
    isLoading,
    error,
    isUpdating,
    handleAddItem,
    handleRemoveItem,
    handleChangeGeneralField,
    handleChangeLangField,
    handleAddContentLine,
    handleRemoveContentLine,
    handleChangeContentLine,
    handleSave,
  } = useAboutServicesEditor();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <AboutServicesItemsManager
        items={items}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onChangeGeneralField={handleChangeGeneralField}
        onChangeLangField={handleChangeLangField}
        onAddContentLine={handleAddContentLine}
        onRemoveContentLine={handleRemoveContentLine}
        onChangeContentLine={handleChangeContentLine}
      />

      <div className="mt-6 flex justify-end">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save About Services"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AboutServices;
