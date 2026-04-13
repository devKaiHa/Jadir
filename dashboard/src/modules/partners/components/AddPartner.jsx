import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import PartnerFormCard from "./PartnerFormCard";
import useCreatePartner from "../hooks/useCreatePartner";

const AddPartner = () => {
  const {
    title,
    setTitle,

    isActive,
    setIsActive,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleSave,
    isLoading,
  } = useCreatePartner();

  return (
    <Container>
      <PartnerFormCard
        title={title}
        setTitle={setTitle}
        isActive={isActive}
        setIsActive={setIsActive}
        order={order}
        setOrder={setOrder}
        imagePreview={imagePreview}
        onImageChange={onImageChange}
      />

      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Partner"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddPartner;
