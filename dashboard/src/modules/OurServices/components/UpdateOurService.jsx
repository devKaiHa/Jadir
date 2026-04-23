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
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Update Service
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Refine the service page from the same structured editing workspace
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Keep media, linked content, and multilingual service copy aligned
                without switching layouts.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Status</div>
                <div className="mt-2 text-sm font-semibold">
                  Active
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Order</div>
                <div className="mt-2 text-sm font-semibold">{order}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Projects Linked</div>
                <div className="mt-2 text-sm font-semibold">{relatedProjects.length}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Services Linked</div>
                <div className="mt-2 text-sm font-semibold">{relatedServices.length}</div>
              </div>
            </div>
          </div>
        </div>

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
