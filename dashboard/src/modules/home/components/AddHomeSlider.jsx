import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import SliderGeneralInfoTab from "../components/SliderGeneralInfoTab";
import useCreateHomeSlider from "../hooks/useCreateHomeSlider";

const AddHomeSlider = () => {
  const {
    order,
    setOrder,
    imagePreview,
    onImageChange,

    handleSave,
    isLoading,
  } = useCreateHomeSlider();

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
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Slider"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddHomeSlider;
