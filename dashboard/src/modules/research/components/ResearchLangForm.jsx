import { useEffect, useState } from "react";

const ResearchLangForm = ({
  language,
  titleValue = "",
  contentValue = "",
  onTitleChange,
  onContentChange,
}) => {
  const [localState, setLocalState] = useState({
    title: titleValue || "",
    content: contentValue || "",
  });

  useEffect(() => {
    setLocalState({
      title: titleValue || "",
      content: contentValue || "",
    });
  }, [titleValue, contentValue]);

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);
    if (key === "title") onTitleChange?.(language, value);
    if (key === "content") onContentChange?.(language, value);
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
                  Content ({language})
                </span>
                <textarea
                  value={localState.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder={`Enter content in ${language.toUpperCase()}`}
                  className="input min-h-[180px] w-full p-3 tracking-[1px] leading-[20px]"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResearchLangForm;
