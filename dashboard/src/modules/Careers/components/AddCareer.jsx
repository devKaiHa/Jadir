import { Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Tabs from "../../../components/Global/Tabs";
import { useCareers, useCareerTemplates } from "../../hooks/useCareers";
import { useCareerEditorState } from "../hooks/useCareerEditor";
import CareerGeneralInfoTab from "./CareerGeneralInfoTab";
import CareerApplicationFormTab from "./CareerApplicationFormTab";
import CareerLangForm from "./CareerLangForm";
import CareerTemplateModal from "./CareerTemplateModal";

const AddCareer = () => {
  const navigate = useNavigate();
  const { postCareer, isPosting, createTemplate, isCreatingTemplate } =
    useCareers();
  const { templates } = useCareerTemplates();
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const {
    title,
    position,
    location,
    description,
    applicationLink,
    setApplicationLink,
    endDate,
    setEndDate,
    status,
    setStatus,
    imagePreview,
    onImageChange,
    handleLangChange,
    applicationFields,
    setApplicationFields,
    toFormData,
    toTemplatePayload,
    applyTemplate,
  } = useCareerEditorState();

  const handleSave = async (nextStatus = status) => {
    try {
      const hasApplicationForm = applicationFields.length > 0;
      const hasApplicationLink = applicationLink?.trim();

      if (hasApplicationForm && hasApplicationLink) {
        toast.warning(
          "Both application form and application link are provided. Link will override the form.",
        );
      }

      setStatus(nextStatus);
      const data = toFormData();
      data.set("status", nextStatus);
      await postCareer(data).unwrap();
      toast.success("Career job created successfully");
      setTimeout(
        () => navigate("/careers"),
        hasApplicationForm && hasApplicationLink ? 5000 : 1200,
      );
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create career job");
    }
  };

  const handleSaveTemplate = async (name) => {
    try {
      await createTemplate(toTemplatePayload(name)).unwrap();
      toast.success("Career template saved successfully");
      setIsTemplateModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save template");
    }
  };

  const handleApplyTemplate = (event) => {
    const template = templates.find((item) => item._id === event.target.value);
    if (!template) return;
    applyTemplate(template);
    event.target.value = "";
    toast.success("Template applied");
  };

  const tabConfig = [
    {
      key: "career_general",
      label: "General Info",
      icon: "ki-outline ki-briefcase",
      content: (
        <CareerGeneralInfoTab
          applicationLink={applicationLink}
          setApplicationLink={setApplicationLink}
          endDate={endDate}
          setEndDate={setEndDate}
          status={status}
          setStatus={setStatus}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      ),
    },
    {
      key: "career_application_form",
      label: "Application Form",
      icon: "ki-outline ki-questionnaire-tablet",
      content: (
        <CareerApplicationFormTab
          fields={applicationFields}
          setFields={setApplicationFields}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `career_${lang}`,
      label: `Career ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <CareerLangForm
          language={lang}
          titleValue={title[lang]}
          // positionValue={position[lang]}
          locationValue={location[lang]}
          descriptionValue={description[lang]}
          onLangChange={handleLangChange}
        />
      ),
    })),
  ];

  return (
    <Container>
      <div className="card mb-5">
        <div className="card-body flex flex-wrap items-center gap-3">
          <select
            className="select max-w-[320px]"
            onChange={handleApplyTemplate}
          >
            <option value="">Apply a saved template</option>
            {templates.map((template) => (
              <option key={template._id} value={template._id}>
                {template.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-light"
            onClick={() => setIsTemplateModalOpen(true)}
            disabled={isCreatingTemplate}
          >
            {isCreatingTemplate ? "Saving Template..." : "Save as Template"}
          </button>
        </div>
      </div>
      <Tabs tabs={tabConfig} />
      <div className="mt-6 flex gap-3">
        <button
          className="btn btn-primary"
          onClick={() => handleSave("published")}
          disabled={isPosting}
        >
          {isPosting ? "Submitting..." : "Publish Career Job"}
        </button>
        <button
          className="btn btn-light"
          onClick={() => handleSave("draft")}
          disabled={isPosting}
        >
          Save Draft
        </button>
      </div>
      <CareerTemplateModal
        isOpen={isTemplateModalOpen}
        isSaving={isCreatingTemplate}
        onClose={() => setIsTemplateModalOpen(false)}
        onSave={handleSaveTemplate}
      />
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddCareer;
