import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import PartnerFormCard from "./PartnerFormCard";
import useCreatePartner from "../hooks/useCreatePartner";

const AddPartner = () => {
  const {
    title,
    setTitle,
    brief,
    setBrief,
    testimonial,
    setTestimonial,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleSave,
    isLoading,
  } = useCreatePartner();

  return (
    <Container>
      <div className="space-y-6">
        <PartnerFormCard
          title={title}
          setTitle={setTitle}
          brief={brief}
          setBrief={setBrief}
          testimonial={testimonial}
          setTestimonial={setTestimonial}
          order={order}
          setOrder={setOrder}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />

        <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
          <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Create Partner"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddPartner;
