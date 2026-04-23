import { Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Tabs from "../../../components/Global/Tabs";
import { imageURL } from "../../../Api/GlobalData";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";
import { useCareers, useOneCareer } from "../../hooks/useCareers";
import { useCareerEditorState } from "../hooks/useCareerEditor";
import CareerGeneralInfoTab from "./CareerGeneralInfoTab";
import CareerLangForm from "./CareerLangForm";

const UpdateCareer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { career, isLoading, error } = useOneCareer(id);
  const { updateCareer, isUpdating } = useCareers();

  const initialImage = career?.image ? `${imageURL}/careers/${career.image}` : "";
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
  } = useCareerEditorState(career, initialImage);

  const handleSave = async () => {
    try {
      await updateCareer({ id, data: toFormData() }).unwrap();
      toast.success("Career job updated successfully");
      setTimeout(() => navigate("/careers"), 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update career job");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

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
        <button className="btn btn-primary" onClick={handleSave} disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Career Job"}
        </button>
      </div>
      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateCareer;
