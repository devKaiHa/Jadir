import { useEffect, useState } from "react";

const CompanyLangForm = ({
  language,
  nameValue = "",
  briefValue = "",
  testimonialValue = "",
  onLangChange,
}) => {
  const [localState, setLocalState] = useState({
    name: nameValue || "",
    brief: briefValue || "",
    testimonial: testimonialValue || "",
  });

  useEffect(() => {
    setLocalState({
      name: nameValue || "",
      brief: briefValue || "",
      testimonial: testimonialValue || "",
    });
  }, [nameValue, briefValue, testimonialValue]);

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
                <span className="btn btn-input w-[22%] capitalize">
                  Name ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={localState.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder={`Enter name in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[22%] capitalize">
                  Brief ({language})
                </span>
                <textarea
                  value={localState.brief}
                  onChange={(e) => handleChange("brief", e.target.value)}
                  placeholder={`Enter brief in ${language.toUpperCase()}`}
                  className="input min-h-[180px] w-full p-3 tracking-[1px] leading-[20px]"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[22%] capitalize">
                  Testimonial ({language})
                </span>
                <textarea
                  value={localState.testimonial}
                  onChange={(e) => handleChange("testimonial", e.target.value)}
                  placeholder={`Enter testimonial in ${language.toUpperCase()}`}
                  className="input min-h-[140px] w-full p-2 tracking-[1px] leading-[20px]"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompanyLangForm;
