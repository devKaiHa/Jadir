import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useUpdateOurService from "../hooks/useUpdateOurService";
import OurServiceGeneralInfoTab from "./OurServiceGeneralInfoTab";
import OurServiceLangForm from "./OurServiceLangForm";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Tabs from "../../../components/Global/Tabs";

const UpdateOurService = () => {
  const {
    error,
    isPageLoading,
    isUpdating,
    title,
    description,
    features,
    steps,
    targetingSectors,
    testimonials,
    addTestimonial,
    removeTestimonial,
    order,
    setOrder,
    relatedProjects,
    setRelatedProjects,
    relatedServices,
    setRelatedServices,
    projectOptions,
    serviceOptions,
    imagePreview,
    onImageChange,
    handleTitleChange,
    handleDescriptionChange,
    handleFeaturesChange,
    handleStepsChange,
    handleTargetingSectorsChange,
    handleTestimonialFieldChange,
    handleSave,
  } = useUpdateOurService();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "service_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <OurServiceGeneralInfoTab
          order={order}
          setOrder={setOrder}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
          projectOptions={projectOptions}
          relatedProjects={relatedProjects}
          setRelatedProjects={setRelatedProjects}
          serviceOptions={serviceOptions}
          relatedServices={relatedServices}
          setRelatedServices={setRelatedServices}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `service_${lang}`,
      label: `Service ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <OurServiceLangForm
          language={lang}
          titleValue={title[lang]}
          descriptionValue={description[lang]}
          featuresValue={features[lang]}
          stepsValue={steps[lang]}
          targetingSectorsValue={targetingSectors[lang]}
          testimonialsValue={testimonials}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          onFeaturesChange={handleFeaturesChange}
          onStepsChange={handleStepsChange}
          onTargetingSectorsChange={handleTargetingSectorsChange}
          onAddTestimonial={addTestimonial}
          onRemoveTestimonial={removeTestimonial}
          onTestimonialFieldChange={handleTestimonialFieldChange}
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
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Service"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateOurService;
