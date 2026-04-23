import { CrudAvatarUpload } from "../../../partials/crud/CrudAvatarUpload";
import MultiSelect from "../../../components/MultiSelect";

const InvestmentFundGeneralInfoTab = ({
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
}) => {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900">Fund Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Configure publishing, timeline, performance numbers, and linked companies.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Fund Link
              </label>
              <input
                type="text"
                className="input"
                value={fundLink}
                onChange={(e) => setFundLink(e.target.value)}
                placeholder="Enter fund link"
              />
            </div>

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

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Launch Date
              </label>
              <input
                type="date"
                className="input"
                value={launchDate}
                onChange={(e) => setLaunchDate(e.target.value)}
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Associated Companies
              </label>
              <MultiSelect
                options={companies}
                selected={companiesAssociated}
                onChange={setCompaniesAssociated}
                placeholder="Select companies"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900">Fund Metrics</h3>
            <p className="mt-1 text-sm text-gray-500">
              Keep the fund duration, investment thresholds, and return metrics up to date.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Fund Duration
              </label>
              <input
                type="number"
                className="input"
                value={fundDuration}
                onChange={(e) => setFundDuration(Number(e.target.value))}
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Duration Suffix
              </label>
              <select
                className="input"
                name="duration-suffix"
                value={durationSuffix}
                onChange={(e) => setDurationSuffix(e.target.value)}
              >
                <option value="">Select</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="months">Years</option>
              </select>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Assets Volume
              </label>
              <input
                type="number"
                className="input"
                value={assetsVolume}
                onChange={(e) => setAssetsVolume(Number(e.target.value))}
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Share Price
              </label>
              <input
                type="number"
                className="input"
                value={sharePrice}
                onChange={(e) => setSharePrice(Number(e.target.value))}
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Minimum Investment
              </label>
              <input
                type="number"
                className="input"
                value={minInvestAmount}
                onChange={(e) => setMinInvestAmount(Number(e.target.value))}
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                IRR
              </label>
              <input
                type="number"
                className="input"
                value={irr}
                onChange={(e) => setIrr(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Fund Image</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload the image used to represent this fund on listing and detail pages.
            </p>
          </div>

          <div className="p-2">
            <CrudAvatarUpload
              onChange={onImageChange}
              value={imagePreview}
              initialImageURL={
                typeof imagePreview === "string" ? `${imagePreview}` : ""
              }
              adviceMessage="Fund Image | Max 1MB"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentFundGeneralInfoTab;
