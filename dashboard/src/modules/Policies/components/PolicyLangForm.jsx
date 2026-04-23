import { useEffect, useState } from "react";

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
                <textarea
                  value={localState.summary}
                  onChange={(e) => handleChange("summary", e.target.value)}
                  className="input min-h-[180px] w-full p-3 bg-white text-black min-h-[180px] w-full pb-[3rem] tracking-[1px] leading-[20px]"
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
                <textarea
                  value={localState.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  className="input min-h-[180px] w-full p-3 bg-white text-black min-h-[240px] w-full pb-[3rem] tracking-[1px] leading-[20px]"
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
