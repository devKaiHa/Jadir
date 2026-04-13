import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import BoardMemberLangForm from "./BoardMemberLangForm";
import BoardMemberGeneralTab from "./BoardMemberGeneralTab";
import useCreateBoardMember from "../hooks/useCreateBoardMember";
import Tabs from "../../../components/Global/Tabs";

const AddBoardMember = () => {
  const {
    name,
    position,
    description,

    imgPreview,

    isActive,
    setIsActive,

    order,
    setOrder,

    handleNameChange,
    handlePositionChange,
    handleDescriptionChange,
    handleImageChange,

    handleSave,
    isLoading,
  } = useCreateBoardMember();

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
          currentImg=""
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
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Board Member"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddBoardMember;
