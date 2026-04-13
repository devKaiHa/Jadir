import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import BoardMemberLangForm from "./BoardMemberLangForm";
import BoardMemberGeneralTab from "./BoardMemberGeneralTab";
import useUpdateBoardMember from "../hooks/useUpdateBoardMember";
import Tabs from "../../../components/Global/Tabs";

const UpdateBoardMember = () => {
  const {
    error,
    isPageLoading,
    isUpdating,

    name,
    position,
    description,

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
  } = useUpdateBoardMember();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "tab_info",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <BoardMemberGeneralTab
          isActive={isActive}
          setIsActive={setIsActive}
          order={order}
          setOrder={setOrder}
          onImageChange={handleImageChange}
          imgPreview={imgPreview}
          currentImg={currentImg}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `board_member_${lang}`,
      label: `Board Member ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <BoardMemberLangForm
          language={lang}
          nameValue={name[lang]}
          positionValue={position[lang]}
          descriptionValue={description[lang]}
          onNameChange={handleNameChange}
          onPositionChange={handlePositionChange}
          onDescriptionChange={handleDescriptionChange}
        />
      ),
    })),
  ];

  return (
    <Container>
      <Tabs tabs={tabConfig} />

      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Board Member"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateBoardMember;
