import { CrudAvatarUpload } from "../../../partials/crud/CrudAvatarUpload";

const CareerGeneralInfoTab = ({
  applicationLink,
  setApplicationLink,
  endDate,
  setEndDate,
  imagePreview,
  onImageChange,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 card">
        <div className="card-header">
          <h3 className="card-title">General Info</h3>
        </div>

        <div className="card-table scrollable-x-auto pb-3">
          <table className="table-auto w-full text-sm text-gray-600">
            <tbody>
              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[24%]">Application Link</span>
                    <input
                      type="url"
                      className="input"
                      value={applicationLink}
                      onChange={(e) => setApplicationLink(e.target.value)}
                      placeholder="https://example.com/apply"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[24%]">End Date</span>
                    <input
                      type="date"
                      className="input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
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
            <h3 className="card-title">Image</h3>
          </div>

          <div className="p-6">
            <CrudAvatarUpload
              onChange={onImageChange}
              value={imagePreview}
              initialImageURL={typeof imagePreview === "string" ? imagePreview : ""}
              adviceMessage="Career image | Max 1MB"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerGeneralInfoTab;
