import { useEffect, useState } from "react";

const ProjectLangForm = ({
  language,
  titleValue = "",
  briefValue = "",
  onTitleChange,
  onBriefChange,
}) => {
  const [localState, setLocalState] = useState({
    title: titleValue || "",
    brief: briefValue || "",
  });

  useEffect(() => {
    setLocalState({
      title: titleValue || "",
      brief: briefValue || "",
    });
  }, [titleValue, briefValue]);

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);

    if (key === "title") onTitleChange?.(language, value);
    if (key === "brief") onBriefChange?.(language, value);
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
                  Brief ({language})
                </span>
                <textarea
                  value={localState.brief}
                  onChange={(e) => handleChange("brief", e.target.value)}
                  placeholder={`Enter brief in ${language.toUpperCase()}`}
                  className="input min-h-[180px] w-full p-2"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectLangForm;
