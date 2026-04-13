import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FooterLangForm = ({
  language,
  descriptionValue = "",
  onDescriptionChange,
}) => {
  const [localValue, setLocalValue] = useState(descriptionValue || "");

  useEffect(() => {
    setLocalValue(descriptionValue || "");
  }, [descriptionValue]);

  const handleChange = (value) => {
    setLocalValue(value);
    onDescriptionChange?.(language, value);
  };

  return (
    <div className="card-table scrollable-x-auto pb-3">
      <table className="table-auto w-full text-sm text-gray-600">
        <tbody>
          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Description ({language})
                </span>
                <ReactQuill
                  value={localValue}
                  onChange={(value) => handleChange(value)}
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

export default FooterLangForm;
