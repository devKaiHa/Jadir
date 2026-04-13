import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import PartnerFormCard from "./PartnerFormCard";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import useUpdatePartner from "../hooks/useUpdatePartner";

const UpdatePartner = () => {
  const {
    error,
    isPageLoading,
    isUpdating,

    title,
    setTitle,

    isActive,
    setIsActive,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleSave,
  } = useUpdatePartner();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

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
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Partner"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdatePartner;
