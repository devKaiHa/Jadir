import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Tabs from "../../../components/Global/Tabs";
import { useCareers } from "../../hooks/useCareers";
import { useCareerEditorState } from "../hooks/useCareerEditor";
import CareerGeneralInfoTab from "./CareerGeneralInfoTab";
import CareerLangForm from "./CareerLangForm";

const AddCareer = () => {
  const navigate = useNavigate();
  const { postCareer, isPosting } = useCareers();
  const {
    title,
    description,
    applicationLink,
    setApplicationLink,
    endDate,
    setEndDate,
    imagePreview,
    onImageChange,
    handleLangChange,
    toFormData,
  } = useCareerEditorState();

  const handleSave = async () => {
    try {
      await postCareer(toFormData()).unwrap();
      toast.success("Career job created successfully");
      setTimeout(() => navigate("/careers"), 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create career job");
    }
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
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      ),
    },
    ...["en", "ar"].map((lang) => ({
      key: `career_${lang}`,
      label: `Career ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <CareerLangForm
          language={lang}
          titleValue={title[lang]}
          descriptionValue={description[lang]}
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
          {isPosting ? "Submitting..." : "Create Career Job"}
        </button>
      </div>
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddCareer;
