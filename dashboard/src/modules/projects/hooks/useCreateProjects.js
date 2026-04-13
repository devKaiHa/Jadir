import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useCreateProject = () => {
  const navigate = useNavigate();
  const { postProject, isPosting } = useProjects();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [brief, setBrief] = useState({ ...emptyLangState });
  const [projectLink, setProjectLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleTitleChange = (lang, value) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
  };

  const handleBriefChange = (lang, value) => {
    setBrief((prev) => ({ ...prev, [lang]: value }));
  };

  const onImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("title", JSON.stringify(title));
      formData.append("brief", JSON.stringify(brief));
      formData.append("projectLink", projectLink || "");
      formData.append("isActive", isActive ? "true" : "false");
      formData.append("order", String(order || 0));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await postProject(formData).unwrap();

      toast.success("Project created successfully");

      setTimeout(() => {
        navigate("/all-projects");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create project");
    }
  };

  return {
    title,
    brief,
    projectLink,
    setProjectLink,
    isActive,
    setIsActive,
    order,
    setOrder,
    imagePreview,
    onImageChange,
    handleTitleChange,
    handleBriefChange,
    handleSave,
    isLoading: isPosting,
  };
};

export default useCreateProject;
