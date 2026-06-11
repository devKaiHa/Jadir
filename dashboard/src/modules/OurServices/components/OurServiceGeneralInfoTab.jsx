import { CrudAvatarUpload } from "../../../partials/crud/CrudAvatarUpload";
import MultiSelect from "../../../components/MultiSelect";

const OurServiceGeneralInfoTab = ({
  order,
  setOrder,
  imagePreview,
  onImageChange,
  projectOptions,
  relatedProjects,
  setRelatedProjects,
  serviceOptions,
  relatedServices,
  setRelatedServices,
}) => {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              Service Settings
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Control visibility, ordering, and linked content for this service
              page.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Display Order
              </label>
              <input
                type="number"
                className="input"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              Relationships
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Connect this service to related projects and supporting service
              pages.
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Related Projects
              </label>
              <MultiSelect
                options={projectOptions}
                selected={relatedProjects}
                onChange={setRelatedProjects}
                placeholder="Select related projects"
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Related Services
              </label>
              <MultiSelect
                options={serviceOptions}
                selected={relatedServices}
                onChange={setRelatedServices}
                placeholder="Select related services"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Banner Image
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload the banner used across service pages.
            </p>
          </div>

          <div className="p-2">
            <CrudAvatarUpload
              onChange={onImageChange}
              value={imagePreview}
              initialImageURL={
                typeof imagePreview === "string" ? imagePreview : ""
              }
              adviceMessage="Banner image | Max 1MB"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServiceGeneralInfoTab;
