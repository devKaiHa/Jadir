import { useEffect, useState } from "react";

const PlanLangForm = ({
  language,
  titleValue = "",
  descriptionValue = "",
  onTitleChange,
  onDescriptionChange,
}) => {
  const [localState, setLocalState] = useState({
    title: titleValue || "",
    description: descriptionValue || "",
  });

  useEffect(() => {
    setLocalState({
      title: titleValue || "",
      description: descriptionValue || "",
    });
  }, [titleValue, descriptionValue]);

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);

    if (key === "title") onTitleChange?.(language, value);
    if (key === "description") onDescriptionChange?.(language, value);
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
                  Description ({language})
                </span>
                <textarea
                  value={localState.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder={`Enter description in ${language.toUpperCase()}`}
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

export default PlanLangForm;
