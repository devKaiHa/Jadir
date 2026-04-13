import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StatisticLangForm = ({
  language,
  titleValue = "",
  suffixValue = "",
  descriptionValue = "",
  onLangChange,
}) => {
  const [localState, setLocalState] = useState({
    title: titleValue || "",
    suffix: suffixValue || "",
    description: descriptionValue || "",
  });

  useEffect(() => {
    setLocalState({
      title: titleValue || "",
      suffix: suffixValue || "",
      description: descriptionValue || "",
    });
  }, [titleValue, suffixValue, descriptionValue]);

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);
    onLangChange?.(key, language, value);
  };

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
                  value={localState.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder={`Enter title in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Suffix ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={localState.suffix}
                  onChange={(e) => handleChange("suffix", e.target.value)}
                  placeholder={`Enter suffix in ${language.toUpperCase()} (e.g. +, %, M)`}
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
                <ReactQuill
                  value={localState.description}
                  onChange={(value) => handleChange("description", value)}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder={`Enter description in ${language.toUpperCase()}`}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "list",
                    "bullet",
                    "link",
                    "image",
                  ]}
                  className="bg-white text-black min-h-[180px] w-full pb-[3rem]"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatisticLangForm;
