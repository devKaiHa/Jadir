import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOneProject, useProjects } from "../../hooks/useProjects";
import { imageURL } from "../../../Api/GlobalData";

const emptyLangState = {
  en: "",
  ar: "",
};

const useUpdateProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { project, isLoading, error } = useOneProject(id);
  const { updateProject, isUpdating } = useProjects();

  const [title, setTitle] = useState({ ...emptyLangState });
  const [brief, setBrief] = useState({ ...emptyLangState });
  const [challenge, setChallenge] = useState({ ...emptyLangState });
  const [solution, setSolution] = useState({ ...emptyLangState });
  const [result, setResult] = useState({ ...emptyLangState });
  const [projectLink, setProjectLink] = useState("");
  const [order, setOrder] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!project) return;

    setTitle({
      en: project?.title?.en || "",
      ar: project?.title?.ar || "",
    });

    setBrief({
      en: project?.brief?.en || "",
      ar: project?.brief?.ar || "",
    });

    setChallenge({
      en: project?.challenge?.en || "",
      ar: project?.challenge?.ar || "",
    });

    setSolution({
      en: project?.solution?.en || "",
      ar: project?.solution?.ar || "",
    });

    setResult({
      en: project?.result?.en || "",
      ar: project?.result?.ar || "",
    });

    setProjectLink(project?.projectLink || "");
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

  const handleChallengeChange = (lang, value) => {
    setChallenge((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSolutionChange = (lang, value) => {
    setSolution((prev) => ({ ...prev, [lang]: value }));
  };

  const handleResultChange = (lang, value) => {
    setResult((prev) => ({ ...prev, [lang]: value }));
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
      formData.append("challenge", JSON.stringify(challenge));
      formData.append("solution", JSON.stringify(solution));
      formData.append("result", JSON.stringify(result));
      formData.append("projectLink", projectLink || "");
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
    challenge,
    solution,
    result,
    projectLink,
    setProjectLink,
    order,
    setOrder,
    imagePreview,
    onImageChange,
    handleTitleChange,
    handleBriefChange,
    handleChallengeChange,
    handleSolutionChange,
    handleResultChange,
    handleSave,
  };
};

export default useUpdateProject;
