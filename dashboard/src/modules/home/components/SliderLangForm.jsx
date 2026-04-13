import { useEffect, useState } from "react";

const SliderLangForm = ({ language, value = {}, onChange }) => {
  const [localValue, setLocalValue] = useState({
    title: value.title || "",
    description: value.description || "",
  });

  useEffect(() => {
    setLocalValue({
      title: value.title || "",
      description: value.description || "",
    });
  }, [value.title, value.description]);

  const handleChange = (key, val) => {
    const updated = { ...localValue, [key]: val };
    setLocalValue(updated);
    onChange?.(language, updated);
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
                  name="title"
                  type="text"
                  value={localValue.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder={`Enter title in ${language.toUpperCase()}`}
                  className="input"
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
                  name="description"
                  value={localValue.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder={`Enter description in ${language.toUpperCase()}`}
                  className="input min-h-[180px] py-3"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SliderLangForm;
