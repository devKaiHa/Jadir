import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOneProject, useProjects } from "../../hooks/useProjects";
import { imageURL } from "../../../Api/GlobalData";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useUpdateProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { project, isLoading, error } = useOneProject(id);
  const { updateProject, isUpdating } = useProjects();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [brief, setBrief] = useState({ ...emptyLangState });
  const [projectLink, setProjectLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!project) return;

    setTitle({
      en: project?.title?.en || "",
      ar: project?.title?.ar || "",
      tr: project?.title?.tr || "",
    });

    setBrief({
      en: project?.brief?.en || "",
      ar: project?.brief?.ar || "",
      tr: project?.brief?.tr || "",
    });

    setProjectLink(project?.projectLink || "");
    setIsActive(project?.isActive ?? true);
    setOrder(project?.order || 0);

    setImagePreview(`${imageURL}/projects/${project?.image}` || null);
    setImageFile(null);
  }, [project]);

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
      setImagePreview(
        project?.image ? `${imageURL}/projects/${project.image}` : null,
      );
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

      await updateProject({
        id,
        data: formData,
      }).unwrap();

      toast.success("Project updated successfully");

      setTimeout(() => {
        navigate("/all-projects");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update project");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,
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
  };
};

export default useUpdateProject;
