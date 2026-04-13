import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SectorLangForm = ({
  language,
  nameValue = "",
  descriptionValue = "",
  onNameChange,
  onDescriptionChange,
}) => {
  const [localState, setLocalState] = useState({
    name: nameValue || "",
    description: descriptionValue || "",
  });

  useEffect(() => {
    setLocalState({
      name: nameValue || "",
      description: descriptionValue || "",
    });
  }, [nameValue, descriptionValue]);

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);

    if (key === "name") onNameChange?.(language, value);
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
                <span className="btn btn-input w-[20%] capitalize">
                  Description ({language})
                </span>
                <ReactQuill
                  value={localState.description}
                  onChange={(value) => handleChange("description", value)}
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

export default SectorLangForm;
