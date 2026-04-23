import { CrudAvatarUpload } from "../../../partials/crud/CrudAvatarUpload";

const SliderGeneralInfoTab = ({
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

        <div className="card-table scrollable-x-auto pb-3">
          <table className="table-auto w-full text-sm text-gray-600">
            <tbody>
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
