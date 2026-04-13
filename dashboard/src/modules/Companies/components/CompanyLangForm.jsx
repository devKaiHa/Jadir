import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CompanyLangForm = ({
  language,
  nameValue = "",
  aboutValue = "",
  experienceFieldValue = "",
  contentValue = "",
  onLangChange,
}) => {
  const [localState, setLocalState] = useState({
    name: nameValue || "",
    about: aboutValue || "",
    experienceField: experienceFieldValue || "",
    content: contentValue || "",
  });

  useEffect(() => {
    setLocalState({
      name: nameValue || "",
      about: aboutValue || "",
      experienceField: experienceFieldValue || "",
      content: contentValue || "",
    });
  }, [nameValue, aboutValue, experienceFieldValue, contentValue]);

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
                  About ({language})
                </span>
                {/* <textarea value={localState.about} className="input"></textarea> */}
                <ReactQuill
                  value={localState.about}
                  onChange={(value) => handleChange("about", value)}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder={`Enter about in ${language.toUpperCase()}`}
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

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[22%] capitalize">
                  Experience Field ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={localState.experienceField}
                  onChange={(e) =>
                    handleChange("experienceField", e.target.value)
                  }
                  placeholder={`Enter experience field in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[22%] capitalize">
                  Content ({language})
                </span>
                <ReactQuill
                  value={localState.content}
                  onChange={(value) => handleChange("content", value)}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder={`Enter content in ${language.toUpperCase()}`}
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

export default CompanyLangForm;
