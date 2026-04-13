import { CrudAvatarUpload } from "../../../partials/crud/CrudAvatarUpload";

const SliderGeneralInfoTab = ({
  sliderType,
  setSliderType,
  btnLink,
  setBtnLink,
  order,
  setOrder,
  isActive,
  setIsActive,
  imagePreview,
  onImageChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 card">
        <div className="card-header flex items-center justify-between">
          <h3 className="card-title">General Info</h3>
        </div>

        <div className="card-table scrollable-x-auto pb-3">
          <table className="table-auto w-full text-sm text-gray-600">
            <tbody>
              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Slider Type</span>
                    <select
                      className="input"
                      value={sliderType}
                      onChange={(e) => setSliderType(e.target.value)}
                    >
                      <option value="main">Main</option>
                      <option value="secondary">Secondary</option>
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Button Link</span>
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter button link"
                      value={btnLink}
                      onChange={(e) => setBtnLink(e.target.value)}
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
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:w-[35%] self-start">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Slider Image</h3>
          </div>
          <div className="p-6">
            <CrudAvatarUpload
              onChange={onImageChange}
              value={imagePreview}
              initialImageURL={
                typeof imagePreview === "string" ? `${imagePreview}` : ""
              }
              adviceMessage="Slider Image | Max 1MB | Recommended wide banner ratio"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderGeneralInfoTab;
