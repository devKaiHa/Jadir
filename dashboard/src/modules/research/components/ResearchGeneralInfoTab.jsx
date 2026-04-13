import { CrudAvatarUpload } from "../../../partials/crud/CrudAvatarUpload";

const ResearchGeneralInfoTab = ({
  isActive,
  setIsActive,
  isPublished,
  setIsPublished,
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
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Published</span>
                    <select
                      className="input"
                      value={isPublished ? "true" : "false"}
                      onChange={(e) =>
                        setIsPublished(e.target.value === "true")
                      }
                    >
                      <option value="true">Published</option>
                      <option value="false">Draft</option>
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
            <h3 className="card-title">Research Image</h3>
          </div>
          <div className="p-6">
            <CrudAvatarUpload
              onChange={onImageChange}
              value={imagePreview}
              initialImageURL={
                typeof imagePreview === "string" ? `${imagePreview}` : ""
              }
              adviceMessage="Research Image | Max 1MB"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchGeneralInfoTab;
