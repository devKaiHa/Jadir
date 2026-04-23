import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import useCreateInvestmentFund from "../hooks/useCreateInvestmentFund";
import InvestmentFundGeneralInfoTab from "./InvestmentFundGeneralInfoTab";
import InvestmentFundLangForm from "./InvestmentFundLangForm";
import Tabs from "../../../components/Global/Tabs";

const AddInvestmentFund = () => {
  const {
    title,
    content,
    shortAbout,

    fundLink,
    setFundLink,
    launchDate,
    setLaunchDate,
    fundDuration,
    setFundDuration,
    durationSuffix,
    setDurationSuffix,
    assetsVolume,
    setAssetsVolume,
    sharePrice,
    setSharePrice,
    minInvestAmount,
    setMinInvestAmount,
    irr,
    setIrr,
    companiesAssociated,
    setCompaniesAssociated,
    companies,

    order,
    setOrder,

    imagePreview,
    onImageChange,

    handleTitleChange,
    handleContentChange,
    handleShortAboutChange,
    handleSave,
    isLoading,
  } = useCreateInvestmentFund();

  const tabConfig = [
    {
      key: "fund_general",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <InvestmentFundGeneralInfoTab
          fundLink={fundLink}
          setFundLink={setFundLink}
          launchDate={launchDate}
          setLaunchDate={setLaunchDate}
          fundDuration={fundDuration}
          setFundDuration={setFundDuration}
          durationSuffix={durationSuffix}
          setDurationSuffix={setDurationSuffix}
          assetsVolume={assetsVolume}
          setAssetsVolume={setAssetsVolume}
          sharePrice={sharePrice}
          setSharePrice={setSharePrice}
          minInvestAmount={minInvestAmount}
          setMinInvestAmount={setMinInvestAmount}
          irr={irr}
          setIrr={setIrr}
          companiesAssociated={companiesAssociated}
          setCompaniesAssociated={setCompaniesAssociated}
          companies={companies}
          order={order}
          setOrder={setOrder}
          imagePreview={imagePreview}
          onImageChange={onImageChange}
        />
      ),
    },
    ...["en", "ar"].map((lang) => ({
      key: `fund_${lang}`,
      label: `Fund ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <InvestmentFundLangForm
          language={lang}
          titleValue={title[lang]}
          contentValue={content[lang]}
          shortAboutValue={shortAbout[lang]}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
          onShortAboutChange={handleShortAboutChange}
        />
      ),
    })),
  ];

  return (
    <Container>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                New Investment Fund
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Add a fund profile using the same guided admin layout as leadership pages
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Configure fund metrics, linked companies, and publishing state
                first, then complete the translated fund content.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Status</div>
                <div className="mt-2 text-sm font-semibold">
                  Active
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Order</div>
                <div className="mt-2 text-sm font-semibold">{order}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Companies Linked</div>
                <div className="mt-2 text-sm font-semibold">{companiesAssociated.length}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Fund Link</div>
                <div className="mt-2 text-sm font-semibold">{fundLink ? "Set" : "Not set"}</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs tabs={tabConfig} />

        <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
          <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Create Investment Fund"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddInvestmentFund;
