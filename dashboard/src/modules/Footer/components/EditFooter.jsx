import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import FooterLangForm from "./FooterLangForm";
import FooterGeneralInfoTab from "./FooterGeneralInfoTab";
import useFooterForm from "../hooks/useFooterForm";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Tabs from "../../../components/Global/Tabs";

const EditFooter = () => {
  const {
    isLoading,
    error,
    isUpdating,

    description,
    handleDescriptionChange,
    address,
    handleAddressChange,

    facebook,
    setFacebook,
    instagram,
    setInstagram,
    xTwitter,
    setXTwitter,
    linkedin,
    setLinkedin,
    phone,
    setPhone,
    email,
    setEmail,
    workDays,
    setWorkDays,
    workingHours,
    setWorkingHours,
    workingSchedule,
    setWorkingSchedule,

    links,
    addLink,
    removeLink,
    updateLinkField,

    handleSave,
  } = useFooterForm();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "footer_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <FooterGeneralInfoTab
          facebook={facebook}
          setFacebook={setFacebook}
          instagram={instagram}
          setInstagram={setInstagram}
          xTwitter={xTwitter}
          setXTwitter={setXTwitter}
          linkedin={linkedin}
          setLinkedin={setLinkedin}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          workDays={workDays}
          setWorkDays={setWorkDays}
          workingHours={workingHours}
          setWorkingHours={setWorkingHours}
          workingSchedule={workingSchedule}
          setWorkingSchedule={setWorkingSchedule}
          links={links}
          addLink={addLink}
          removeLink={removeLink}
          updateLinkField={updateLinkField}
        />
      ),
    },
    ...["en", "ar"].map((lang) => ({
      key: `footer_${lang}`,
      label: `Footer ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <FooterLangForm
          language={lang}
          descriptionValue={description[lang]}
          onDescriptionChange={handleDescriptionChange}
          onAddressChange={handleAddressChange}
        />
      ),
    })),
  ];

  return (
    <Container>
      <Tabs tabs={tabConfig} />

      <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
        <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Footer"}
          </button>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default EditFooter;
