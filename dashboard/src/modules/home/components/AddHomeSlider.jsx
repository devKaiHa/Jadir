import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import SliderLangForm from "../components/SliderLangForm";
import SliderGeneralInfoTab from "../components/SliderGeneralInfoTab";
import useCreateHomeSlider from "../hooks/useCreateHomeSlider";
import Tabs from "../../../components/Global/Tabs";

const AddHomeSlider = () => {
  const {
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
    isLoading,
  } = useCreateHomeSlider();

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
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Slider"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddHomeSlider;
