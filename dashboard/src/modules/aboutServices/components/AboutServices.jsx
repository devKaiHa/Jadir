import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import AboutServicesItemsManager from "./AboutServicesItemsManager";
import useAboutServicesEditor from "../hooks/useAboutServicesEditor";

const AboutServices = () => {
  const {
    items,
    isLoading,
    error,
    isUpdating,
    handleAddItem,
    handleRemoveItem,
    handleChangeGeneralField,
    handleChangeLangField,
    handleAddContentLine,
    handleRemoveContentLine,
    handleChangeContentLine,
    handleSave,
  } = useAboutServicesEditor();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                About Services
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Edit the About Services content with the same polished workspace used elsewhere
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Manage all about-service sections, reorder them, and update the
                multilingual content blocks from one page.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Items</div>
                <div className="mt-2 text-2xl font-semibold">{items.length}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Editor</div>
                <div className="mt-2 text-sm font-semibold">
                  {isUpdating ? "Saving changes" : "Ready"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AboutServicesItemsManager
          items={items}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onChangeGeneralField={handleChangeGeneralField}
          onChangeLangField={handleChangeLangField}
          onAddContentLine={handleAddContentLine}
          onRemoveContentLine={handleRemoveContentLine}
          onChangeContentLine={handleChangeContentLine}
        />

        <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
          <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save About Services"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AboutServices;
