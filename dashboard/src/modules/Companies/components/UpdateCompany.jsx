import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import CompanyLangForm from "./CompanyLangForm";
import CompanyGeneralInfoTab from "./CompanyGeneralInfoTab";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import useUpdateCompany from "../hooks/useUpdateCompany";
import Tabs from "../../../components/Global/Tabs";

const UpdateCompany = () => {
  const {
    error,
    isPageLoading,
    isUpdating,

    name,
    about,
    experienceField,
    content,

    experienceYears,
    setExperienceYears,

    country,
    setCountry,

    phone,
    setPhone,

    email,
    setEmail,

    website,
    setWebsite,

    isActive,
    setIsActive,

    order,
    setOrder,

    fundsAssociated,
    setFundsAssociated,
    investmentFunds,
    services,
    values,
    addresses,
    goals,
    statistics,

    socialLinks,
    handleSocialChange,

    logoPreview,
    onLogoChange,

    backgroundPreview,
    onBackgroundChange,
    addService,
    removeService,
    updateService,
    addValue,
    removeValue,
    updateValue,
    addAddress,
    removeAddress,
    updateAddress,
    addGoal,
    removeGoal,
    updateGoal,
    addStatistic,
    removeStatistic,
    updateStatisticField,
    updateStatisticLangField,

    handleLangChange,
    handleSave,
  } = useUpdateCompany();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "company_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <CompanyGeneralInfoTab
          experienceYears={experienceYears}
          setExperienceYears={setExperienceYears}
          country={country}
          setCountry={setCountry}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          website={website}
          setWebsite={setWebsite}
          isActive={isActive}
          setIsActive={setIsActive}
          order={order}
          setOrder={setOrder}
          fundsAssociated={fundsAssociated}
          setFundsAssociated={setFundsAssociated}
          investmentFunds={investmentFunds}
          services={services}
          values={values}
          addresses={addresses}
          goals={goals}
          statistics={statistics}
          socialLinks={socialLinks}
          handleSocialChange={handleSocialChange}
          logoPreview={logoPreview}
          onLogoChange={onLogoChange}
          backgroundPreview={backgroundPreview}
          onBackgroundChange={onBackgroundChange}
          addService={addService}
          removeService={removeService}
          updateService={updateService}
          addValue={addValue}
          removeValue={removeValue}
          updateValue={updateValue}
          addAddress={addAddress}
          removeAddress={removeAddress}
          updateAddress={updateAddress}
          addGoal={addGoal}
          removeGoal={removeGoal}
          updateGoal={updateGoal}
          addStatistic={addStatistic}
          removeStatistic={removeStatistic}
          updateStatisticField={updateStatisticField}
          updateStatisticLangField={updateStatisticLangField}
        />
      ),
    },
    ...["en", "ar", "tr"].map((lang) => ({
      key: `company_${lang}`,
      label: `Company ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <CompanyLangForm
          language={lang}
          nameValue={name[lang]}
          aboutValue={about[lang]}
          experienceFieldValue={experienceField[lang]}
          contentValue={content[lang]}
          onLangChange={handleLangChange}
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
          {isUpdating ? "Updating..." : "Update Company"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateCompany;
