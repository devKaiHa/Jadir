import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PolicyLangForm = ({
  language,
  titleValue = "",
  summaryValue = "",
  contentValue = "",
  onLangChange,
}) => {
  const [localState, setLocalState] = useState({
    title: titleValue || "",
    summary: summaryValue || "",
    content: contentValue || "",
  });

  useEffect(() => {
    setLocalState({
      title: titleValue || "",
      summary: summaryValue || "",
      content: contentValue || "",
    });
  }, [titleValue, summaryValue, contentValue]);

  const handleChange = (key, value) => {
    setLocalState((prev) => ({ ...prev, [key]: value }));
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
                  Summary ({language})
                </span>
                <ReactQuill
                  value={localState.summary}
                  onChange={(value) => handleChange("summary", value)}
                  className="bg-white text-black min-h-[180px] w-full pb-[3rem]"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Content ({language})
                </span>
                <ReactQuill
                  value={localState.content}
                  onChange={(value) => handleChange("content", value)}
                  className="bg-white text-black min-h-[240px] w-full pb-[3rem]"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PolicyLangForm;
