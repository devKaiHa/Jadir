import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./custom.css";

const SizeStyle = Quill.import("attributors/style/size");
SizeStyle.whitelist = ["12px", "14px", "16px", "18px", "20px", "24px", "32px"];
Quill.register(SizeStyle, true);

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    [{ size: ["12px", "14px", "16px", "18px", "20px", "24px", "32px"] }],
    ["bold", "italic", "underline" /*, "strike" */],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "align",
  "list",
  "bullet",
  // "link",
  // "image",
  // "header",
  // "strike",
  // "background",
];

const ProjectLangForm = ({
  language,
  titleValue = "",
  briefValue = "",
  challengeValue = "",
  solutionValue = "",
  resultValue = "",
  onTitleChange,
  onBriefChange,
  onChallengeChange,
  onSolutionChange,
  onResultChange,
}) => {
  const [localState, setLocalState] = useState({
    title: titleValue || "",
    brief: briefValue || "",
    challenge: challengeValue || "",
    solution: solutionValue || "",
    result: resultValue || "",
  });

  useEffect(() => {
    setLocalState({
      title: titleValue || "",
      brief: briefValue || "",
      challenge: challengeValue || "",
      solution: solutionValue || "",
      result: resultValue || "",
    });
  }, [titleValue, briefValue, challengeValue, solutionValue, resultValue]);

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);

    if (key === "title") onTitleChange?.(language, value);
    if (key === "brief") onBriefChange?.(language, value);
    if (key === "challenge") onChallengeChange?.(language, value);
    if (key === "solution") onSolutionChange?.(language, value);
    if (key === "result") onResultChange?.(language, value);
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
                <ReactQuill
                  value={localState.brief}
                  onChange={(value) => handleChange("brief", value)}
                  placeholder={`Enter brief in ${language.toUpperCase()}`}
                  className="bg-white text-black min-h-[180px] w-full pb-[3rem]"
                  modules={modules}
                  formats={formats}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Challenge ({language})
                </span>
                <ReactQuill
                  value={localState.challenge}
                  onChange={(value) => handleChange("challenge", value)}
                  placeholder={`Enter challenge in ${language.toUpperCase()}`}
                  className="bg-white text-black min-h-[180px] w-full pb-[3rem]"
                  modules={modules}
                  formats={formats}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Solution ({language})
                </span>
                <ReactQuill
                  value={localState.solution}
                  onChange={(value) => handleChange("solution", value)}
                  placeholder={`Enter solution in ${language.toUpperCase()}`}
                  className="bg-white text-black min-h-[180px] w-full pb-[3rem]"
                  modules={modules}
                  formats={formats}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Result ({language})
                </span>
                <ReactQuill
                  value={localState.result}
                  onChange={(value) => handleChange("result", value)}
                  placeholder={`Enter result in ${language.toUpperCase()}`}
                  className="bg-white text-black min-h-[180px] w-full pb-[3rem]"
                  modules={modules}
                  formats={formats}
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
