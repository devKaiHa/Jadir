import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Tabs from "../../../components/Global/Tabs";
import { useTestimonials } from "../../hooks/useTestimonials";
import { useTestimonialEditorState } from "../hooks/useTestimonialEditor";
import TestimonialGeneralInfoTab from "./TestimonialGeneralInfoTab";
import TestimonialLangForm from "./TestimonialLangForm";

const AddTestimonial = () => {
  const navigate = useNavigate();
  const { postTestimonial, isPosting } = useTestimonials();
  const {
    name,
    setName,
    role,
    company,
    content,
    rating,
    setRating,
    isFeatured,
    setIsFeatured,
    order,
    setOrder,
    imagePreview,
    onImageChange,
    handleLangChange,
    toFormData,
  } = useTestimonialEditorState();

  const handleSave = async () => {
    try {
      await postTestimonial(toFormData()).unwrap();
      toast.success("Testimonial created successfully");
      setTimeout(() => navigate("/all-testimonials"), 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create testimonial");
    }
  };

  const tabConfig = [
    {
      key: "testimonial_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <TestimonialGeneralInfoTab
          name={name}
          setName={setName}
          rating={rating}
          setRating={setRating}
          isFeatured={isFeatured}
          setIsFeatured={setIsFeatured}
          order={order}
          setOrder={setOrder}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      ),
    },
    ...["en", "ar"].map((lang) => ({
      key: `testimonial_${lang}`,
      label: `Testimonial ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <TestimonialLangForm
          language={lang}
          roleValue={role[lang]}
          companyValue={company[lang]}
          contentValue={content[lang]}
          onLangChange={handleLangChange}
        />
      ),
    })),
  ];

  return (
    <Container>
      <Tabs tabs={tabConfig} />
      <div className="mt-6">
        <button className="btn btn-primary" onClick={handleSave} disabled={isPosting}>
          {isPosting ? "Submitting..." : "Create Testimonial"}
        </button>
      </div>
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddTestimonial;
