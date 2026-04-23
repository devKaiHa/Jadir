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
    brief,
    setBrief,
    testimonial,
    setTestimonial,

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
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Partner"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdatePartner;
