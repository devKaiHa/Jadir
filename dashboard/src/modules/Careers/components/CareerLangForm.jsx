import { TextEditor } from "../../../components/TextEditor";

const CareerLangForm = ({
  language,
  titleValue,
  // positionValue,
  locationValue,
  descriptionValue,
  onLangChange,
}) => {
  return (
    <div
      className="card-table scrollable-x-auto pb-3"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
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

          {/* <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Position ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={positionValue}
                  onChange={(e) =>
                    onLangChange("position", language, e.target.value)
                  }
                  placeholder={`Enter position in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr> */}

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Location ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={locationValue}
                  onChange={(e) =>
                    onLangChange("location", language, e.target.value)
                  }
                  placeholder={`Enter location in ${language.toUpperCase()}`}
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
                <TextEditor
                  language={language}
                  value={descriptionValue}
                  onChange={(value) =>
                    onLangChange("description", language, value)
                  }
                  placeholder={`Enter description in ${language.toUpperCase()}`}
                  className="bg-white text-black w-full pb-[3rem]"
                />

                {/* <textarea
                  className="input min-h-[180px] tracking-[1px] leading-[20px]"
                  value={descriptionValue}
                  onChange={(e) =>
                    onLangChange("description", language, e.target.value)
                  }
                  placeholder={`Enter description in ${language.toUpperCase()}`}
                /> */}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CareerLangForm;
