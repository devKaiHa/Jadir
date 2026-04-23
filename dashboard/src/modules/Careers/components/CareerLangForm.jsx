const CareerLangForm = ({
  language,
  titleValue,
  descriptionValue,
  onLangChange,
}) => {
  return (
    <div className="card-table scrollable-x-auto pb-3">
      <table className="table-auto w-full text-sm text-gray-600">
        <tbody>
          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Title ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={titleValue}
                  onChange={(e) =>
                    onLangChange("title", language, e.target.value)
                  }
                  placeholder={`Enter title in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Description ({language})
                </span>
                <textarea
                  className="input min-h-[180px] tracking-[1px] leading-[20px]"
                  value={descriptionValue}
                  onChange={(e) =>
                    onLangChange("description", language, e.target.value)
                  }
                  placeholder={`Enter description in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CareerLangForm;
