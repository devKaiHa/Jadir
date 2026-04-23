import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ValueLangForm from "./ValueLangForm";
import ValueGeneralInfoTab from "./ValueGeneralInfoTab";
import useUpdateValue from "../hooks/useUpdateValue";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import Tabs from "../../../components/Global/Tabs";

const UpdateValue = () => {
  const {
    error,
    isPageLoading,
    isUpdating,

    name,
    content,
    description,

    order,
    setOrder,

    handleNameChange,
    handleContentChange,
    handleDescriptionChange,

    handleSave,
  } = useUpdateValue();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  const tabConfig = [
    {
      key: "tab_info",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: <ValueGeneralInfoTab order={order} setOrder={setOrder} />,
    },
    ...["en", "ar"].map((lang) => ({
      key: `value_${lang}`,
      label: `Value ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <ValueLangForm
          language={lang}
          nameValue={name[lang]}
          contentValue={content[lang]}
          descriptionValue={description[lang]}
          onNameChange={handleNameChange}
          onContentChange={handleContentChange}
          onDescriptionChange={handleDescriptionChange}
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
                Update Value
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Refine the value messaging from one consistent editing workspace
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Adjust visibility, ordering, and localized descriptions without
                switching to a different page structure.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">
                  Status
                </div>
                <div className="mt-2 text-sm font-semibold">
                  Active
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">
                  Order
                </div>
                <div className="mt-2 text-sm font-semibold">{order}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">
                  Languages
                </div>
                <div className="mt-2 text-sm font-semibold">3 locales</div>
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
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Value"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateValue;
