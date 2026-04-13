import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useBoardMembers,
  useOneBoardMember,
} from "../../hooks/useBoardMembers";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const useUpdateBoardMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { boardMember, isLoading, error } = useOneBoardMember(id);
  const { updateBoardMember, isUpdating } = useBoardMembers();

  const [name, setName] = useState({ ...emptyLangState });
  const [position, setPosition] = useState({ ...emptyLangState });
  const [description, setDescription] = useState({ ...emptyLangState });

  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState("");
  const [currentImg, setCurrentImg] = useState("");

  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (!boardMember) return;

    setName({
      en: boardMember?.name?.en || "",
      ar: boardMember?.name?.ar || "",
      tr: boardMember?.name?.tr || "",
    });

    setPosition({
      en: boardMember?.position?.en || "",
      ar: boardMember?.position?.ar || "",
      tr: boardMember?.position?.tr || "",
    });

    setDescription({
      en: boardMember?.bio?.en || "",
      ar: boardMember?.bio?.ar || "",
      tr: boardMember?.bio?.tr || "",
    });

    setCurrentImg(boardMember?.image || "");
    setImgPreview("");
    setImg(null);

    setIsActive(boardMember?.isActive ?? true);
    setOrder(boardMember?.order ?? 0);
  }, [boardMember]);

  const handleNameChange = (lang, value) => {
    setName((prev) => ({ ...prev, [lang]: value }));
  };

  const handlePositionChange = (lang, value) => {
    setPosition((prev) => ({ ...prev, [lang]: value }));
  };

  const handleDescriptionChange = (lang, value) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const handleImageChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setImg(file);
      setImgPreview(URL.createObjectURL(file));
    } else {
      setImg(null);
      setImgPreview(null);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("name", JSON.stringify(name));
      formData.append("position", JSON.stringify(position));
      formData.append("bio", JSON.stringify(description));
      formData.append("isActive", isActive);
      formData.append("order", order);

      if (img) {
        formData.append("image", img);
      }

      await updateBoardMember({
        id,
        data: formData,
      }).unwrap();

      toast.success("Board member updated successfully");

      setTimeout(() => {
        navigate("/all-board-members");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update board member");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,

    name,
    position,
    description,

    img,
    imgPreview,
    currentImg,

    isActive,
    setIsActive,

    order,
    setOrder,

    handleNameChange,
    handlePositionChange,
    handleDescriptionChange,
    handleImageChange,

    handleSave,
  };
};

export default useUpdateBoardMember;
