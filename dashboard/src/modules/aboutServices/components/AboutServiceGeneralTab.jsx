const AboutServiceGeneralTab = ({ item, index, onRemove, onChangeField }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Item Settings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Set the order and visibility for this About Services block.
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
              value={item?.order ?? index}
              onChange={(e) => onChangeField("order", Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-red-200 bg-red-50 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-red-700">Remove Item</h3>
            <p className="mt-1 text-sm text-red-500">
              Delete this content block if it is no longer needed.
            </p>
          </div>

          <button className="btn btn-danger" onClick={onRemove}>
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutServiceGeneralTab;
