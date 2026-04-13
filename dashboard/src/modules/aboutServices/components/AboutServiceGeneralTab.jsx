const AboutServiceGeneralTab = ({ item, index, onRemove, onChangeField }) => {
  return (
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
                  value={item?.order ?? index}
                  onChange={(e) =>
                    onChangeField("order", Number(e.target.value))
                  }
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
                  value={item?.isActive ? "true" : "false"}
                  onChange={(e) =>
                    onChangeField("isActive", e.target.value === "true")
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-6">
              <div className="flex justify-end">
                <button className="btn btn-danger" onClick={onRemove}>
                  Remove Item
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AboutServiceGeneralTab;
