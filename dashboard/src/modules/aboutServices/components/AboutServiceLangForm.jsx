import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutServiceLangForm = ({
  language,
  item,
  onChangeField,
  onAddContentLine,
  onRemoveContentLine,
  onChangeContentLine,
}) => {
  const [localState, setLocalState] = useState({
    title: item?.title?.[language] || "",
    description: item?.description?.[language] || "",
    contentTitle: item?.contentTitle?.[language] || "",
    highlight: item?.highlight?.[language] || "",
    contentText: item?.contentText?.[language] || [""],
  });

  useEffect(() => {
    setLocalState({
      title: item?.title?.[language] || "",
      description: item?.description?.[language] || "",
      contentTitle: item?.contentTitle?.[language] || "",
      highlight: item?.highlight?.[language] || "",
      contentText: item?.contentText?.[language] || [""],
    });
  }, [item, language]);

  const handleSimpleChange = (key, value) => {
    setLocalState((prev) => ({ ...prev, [key]: value }));
    onChangeField?.(key, value);
  };

  const handleContentLineChange = (index, value) => {
    const updated = [...localState.contentText];
    updated[index] = value;
    setLocalState((prev) => ({ ...prev, contentText: updated }));
    onChangeContentLine?.(index, value);
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
                  onChange={(e) => handleSimpleChange("title", e.target.value)}
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
                <ReactQuill
                  value={localState.description}
                  onChange={(value) => handleSimpleChange("description", value)}
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

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Content Title ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={localState.contentTitle}
                  onChange={(e) =>
                    handleSimpleChange("contentTitle", e.target.value)
                  }
                  placeholder={`Enter content title in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Highlight ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={localState.highlight}
                  onChange={(e) =>
                    handleSimpleChange("highlight", e.target.value)
                  }
                  placeholder={`Enter highlight in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">
                  Content Text ({language})
                </span>

                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  onClick={onAddContentLine}
                >
                  Add Line
                </button>
              </div>

              <div className="space-y-3">
                {(localState.contentText || []).map((line, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <ReactQuill
                      value={line}
                      onChange={(value) =>
                        handleContentLineChange(index, value)
                      }
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link", "image"],
                          ["clean"],
                        ],
                      }}
                      placeholder={`Enter content line ${index + 1} in ${language.toUpperCase()}`}
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
                      className="bg-white text-black w-full pb-[3rem]"
                    />

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => onRemoveContentLine(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AboutServiceLangForm;
