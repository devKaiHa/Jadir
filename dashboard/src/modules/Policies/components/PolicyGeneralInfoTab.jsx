const PolicyGeneralInfoTab = ({
  policyType,
  setPolicyType,
  order,
  setOrder,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">General Info</h3>
      </div>

      <div className="card-table scrollable-x-auto pb-3">
        <table className="table-auto w-full text-sm text-gray-600">
          <tbody>
            <tr>
              <td className="p-2 pt-4">
                <div className="input-group">
                  <span className="btn btn-input w-[20%]">Type</span>
                  <input
                    type="text"
                    className="input"
                    value={policyType}
                    placeholder="Enter policy type"
                    onChange={(e) => setPolicyType(e.target.value)}
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

export default PolicyGeneralInfoTab;
