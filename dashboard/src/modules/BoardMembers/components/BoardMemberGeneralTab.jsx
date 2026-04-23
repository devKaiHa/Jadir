import { CrudAvatarUpload } from "../../../partials/crud/CrudAvatarUpload";

const BoardMemberGeneralTab = ({
  order,
  setOrder,
  onImageChange,
  imgPreview,
  currentImg,
  isBoardMember,
  setIsBoardMember,
}) => {
  const previewToShow = imgPreview || currentImg || "";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Profile Settings
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Control whether this profile is visible and where it appears in
                the list.
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

            <div className="grow mx-2 mt-4">
              <label className="switch">
                <span className="switch-label">Is board member</span>
                <input
                  type="checkbox"
                  defaultChecked
                  checked={isBoardMember}
                  onChange={(e) => setIsBoardMember(e.target.checked)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Profile Image
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload the board member image used on the company pages.
              </p>
            </div>

            <div className="p-2">
              <CrudAvatarUpload
                onChange={onImageChange}
                value={previewToShow}
                initialImageURL={
                  typeof previewToShow === "string" ? `${previewToShow}` : ""
                }
                adviceMessage="Board member image | Max 1MB"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardMemberGeneralTab;
