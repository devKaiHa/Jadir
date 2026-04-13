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
  isActive,
  setIsActive,
  order,
  setOrder,
  imagePreview,
  onImageChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 card">
        <div className="card-header flex items-center justify-between">
          <h3 className="card-title">General Info</h3>
        </div>

        <div className="card-table scrollable-x-auto pb-3 overflow-visible">
          <table className="table-auto w-full text-sm text-gray-600">
            <tbody>
              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Fund Link</span>
                    <input
                      type="text"
                      className="input"
                      value={fundLink}
                      onChange={(e) => setFundLink(e.target.value)}
                      placeholder="Enter fund link"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Order</span>
                    <input
                      type="number"
                      className="input"
                      value={order}
                      onChange={(e) => setOrder(Number(e.target.value))}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Launch Date</span>
                    <input
                      type="date"
                      className="input"
                      value={launchDate}
                      onChange={(e) => setLaunchDate(e.target.value)}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4 flex gap-x-2">
                  <div className="input-group w-[50%]">
                    <span className="btn btn-input w-[40%]">Fund Duration</span>
                    <input
                      type="number"
                      className="input"
                      value={fundDuration}
                      onChange={(e) => setFundDuration(Number(e.target.value))}
                    />
                  </div>
                  <div className="input-group w-[50%]">
                    <span className="btn btn-input w-[40%]">
                      Duration suffix
                    </span>
                    <select
                      className="select w-full"
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
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4 flex gap-x-2">
                  <div className="input-group w-[50%]">
                    <span className="btn btn-input w-[40%]">Assets Volume</span>
                    <input
                      type="number"
                      className="input"
                      value={assetsVolume}
                      onChange={(e) => setAssetsVolume(Number(e.target.value))}
                    />
                  </div>
                  <div className="input-group w-[50%]">
                    <span className="btn btn-input w-[40%]">Share Price</span>
                    <input
                      type="number"
                      className="input"
                      value={sharePrice}
                      onChange={(e) => setSharePrice(Number(e.target.value))}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Min Invest</span>
                    <input
                      type="number"
                      className="input"
                      value={minInvestAmount}
                      onChange={(e) =>
                        setMinInvestAmount(Number(e.target.value))
                      }
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">IRR</span>
                    <input
                      type="number"
                      className="input"
                      value={irr}
                      onChange={(e) => setIrr(Number(e.target.value))}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Status</span>
                    <select
                      className="input"
                      value={isActive ? "true" : "false"}
                      onChange={(e) => setIsActive(e.target.value === "true")}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group items-start">
                    <span className="btn btn-input w-[20%]">
                      Associated Companies
                    </span>
                    <div className="w-full">
                      <MultiSelect
                        options={companies}
                        selected={companiesAssociated}
                        onChange={setCompaniesAssociated}
                        placeholder="Select companies"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:w-[35%] self-start">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Fund Image</h3>
          </div>

          <div className="p-6">
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
