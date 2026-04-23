import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import SliderGeneralInfoTab from "../components/SliderGeneralInfoTab";
import useUpdateHomeSlider from "../hooks/useUpdateHomeSlider";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";

const UpdateHomeSlider = () => {
  const {
    error,
    isPageLoading,
    isUpdating,

    order,
    setOrder,
    imagePreview,
    onImageChange,

    handleSave,
  } = useUpdateHomeSlider();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
        <SliderGeneralInfoTab
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
          {isUpdating ? "Updating..." : "Update Slider"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateHomeSlider;
