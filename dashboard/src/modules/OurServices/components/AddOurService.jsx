import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import OurServiceLangForm from "./OurServiceLangForm";
import useCreateOurService from "../hooks/useCreateOurService";
import OurServiceGeneralInfoTab from "./OurServiceGeneralInfoTab";
import Tabs from "../../../components/Global/Tabs";

const AddOurService = () => {
  const {
    title,
    description,
    features,
    steps,
    targetingSectors,
    testimonial,
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
    isLoading,
  } = useCreateOurService();

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
    ...["en", "ar"].map((lang) => ({
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
          testimonialQuoteValue={testimonial.quote[lang]}
          testimonialClientNameValue={testimonial.clientName[lang]}
          testimonialClientRoleValue={testimonial.clientRole[lang]}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          onFeaturesChange={handleFeaturesChange}
          onStepsChange={handleStepsChange}
          onTargetingSectorsChange={handleTargetingSectorsChange}
          onTestimonialQuoteChange={(language, value) =>
            handleTestimonialFieldChange("quote", language, value)
          }
          onTestimonialClientNameChange={(language, value) =>
            handleTestimonialFieldChange("clientName", language, value)
          }
          onTestimonialClientRoleChange={(language, value) =>
            handleTestimonialFieldChange("clientRole", language, value)
          }
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
              {isLoading ? "Submitting..." : "Create Service"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddOurService;
