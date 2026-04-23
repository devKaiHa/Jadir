const StatisticGeneralInfoTab = ({
  value,
  setValue,
  order,
  setOrder,
}) => {
  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="card-title">General Info</h3>
      </div>
      <div className="card-table scrollable-x-auto pb-3">
        <table className="table-auto w-full text-sm text-gray-600">
          <tbody>
            <tr>
              <td className="p-2 pt-4">
                <div className="input-group">
                  <span className="btn btn-input w-[20%]">Value</span>
                  <input
                    type="text"
                    className="input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter value (e.g. 250, 1.2B, 45)"
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticGeneralInfoTab;
