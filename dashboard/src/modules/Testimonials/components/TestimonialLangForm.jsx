import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TestimonialLangForm = ({
  language,
  roleValue = "",
  companyValue = "",
  contentValue = "",
  onLangChange,
}) => {
  const [localState, setLocalState] = useState({
    role: roleValue || "",
    company: companyValue || "",
    content: contentValue || "",
  });

  useEffect(() => {
    setLocalState({
      role: roleValue || "",
      company: companyValue || "",
      content: contentValue || "",
    });
  }, [roleValue, companyValue, contentValue]);

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
                  Role ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={localState.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Company ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={localState.company}
                  onChange={(e) => handleChange("company", e.target.value)}
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
                  className="bg-white text-black min-h-[220px] w-full pb-[3rem]"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialLangForm;
