import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import SliderLangForm from "../components/SliderLangForm";
import SliderGeneralInfoTab from "../components/SliderGeneralInfoTab";
import useUpdateHomeSlider from "../hooks/useUpdateHomeSlider";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";
import Tabs from "../../../components/Global/Tabs";

const UpdateHomeSlider = () => {
  const {
    error,
    isPageLoading,
    isUpdating,

    sliderType,
    setSliderType,

    isActive,
    setIsActive,

    order,
    setOrder,

    btnLink,
    setBtnLink,

    sliderData,
    handleLangChange,

    imagePreview,
    onImageChange,

    handleSave,
  } = useUpdateHomeSlider();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "tab_info",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <SliderGeneralInfoTab
          sliderType={sliderType}
          setSliderType={setSliderType}
          btnLink={btnLink}
          setBtnLink={setBtnLink}
          order={order}
          setOrder={setOrder}
          isActive={isActive}
          setIsActive={setIsActive}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `slider_${lang}`,
      label: `Slider ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <SliderLangForm
          language={lang}
          value={sliderData[lang]}
          onChange={handleLangChange}
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
          {isUpdating ? "Updating..." : "Update Slider"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateHomeSlider;
