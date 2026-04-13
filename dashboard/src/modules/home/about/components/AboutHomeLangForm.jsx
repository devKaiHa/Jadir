import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutHomeLangForm = ({
  language,
  contentValue = "",
  visionValue = "",
  visionDescriptionValue = "",
  messageValue = "",
  messageDescriptionValue = "",
  onContentChange,
  onVisionChange,
  onVisionDescriptionChange,
  onMessageChange,
  onMessageDescriptionChange,
  businessApproachValue = "",
  whyUsValue = "",
  governanceValue = "",
  onBusinessApproachChange,
  onWhyUsChange,
  onGovernanceChange,
}) => {
  const [localState, setLocalState] = useState({
    content: contentValue ?? "",
    vision: visionValue ?? "",
    visionDescription: visionDescriptionValue ?? "",
    message: messageValue ?? "",
    messageDescription: messageDescriptionValue ?? "",
    businessApproach: businessApproachValue ?? "",
    whyUs: whyUsValue ?? "",
    governance: governanceValue ?? "",
  });

  useEffect(() => {
    setLocalState({
      content: contentValue ?? "",
      vision: visionValue ?? "",
      visionDescription: visionDescriptionValue ?? "",
      message: messageValue ?? "",
      messageDescription: messageDescriptionValue ?? "",
      businessApproach: businessApproachValue ?? "",
      whyUs: whyUsValue ?? "",
      governance: governanceValue ?? "",
    });
  }, [
    contentValue,
    visionValue,
    visionDescriptionValue,
    messageValue,
    messageDescriptionValue,
    businessApproachValue,
    whyUsValue,
    governanceValue,
  ]);

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);

    if (key === "content") onContentChange?.(language, value);
    if (key === "vision") onVisionChange?.(language, value);
    if (key === "visionDescription")
      onVisionDescriptionChange?.(language, value);
    if (key === "message") onMessageChange?.(language, value);
    if (key === "messageDescription")
      onMessageDescriptionChange?.(language, value);
    if (key === "businessApproach")
      onBusinessApproachChange?.(language, value);
    if (key === "whyUs") onWhyUsChange?.(language, value);
    if (key === "governance") onGovernanceChange?.(language, value);
  };

  return (
    <div className="card-table scrollable-x-auto pb-3">
      <table className="table-auto w-full text-sm text-gray-600">
        <tbody>
          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[25%] capitalize">
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

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[25%] capitalize">
                  Vision ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={localState.vision}
                  onChange={(e) => handleChange("vision", e.target.value)}
                  placeholder={`Enter vision in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[25%] capitalize">
                  Vision Description ({language})
                </span>
                <ReactQuill
                  value={localState.visionDescription}
                  onChange={(value) => handleChange("visionDescription", value)}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder={`Enter vision description in ${language.toUpperCase()}`}
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
                <span className="btn btn-input w-[25%] capitalize">
                  Message ({language})
                </span>
                <input
                  type="text"
                  className="input"
                  value={localState.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder={`Enter message in ${language.toUpperCase()}`}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[25%] capitalize">
                  Message Description ({language})
                </span>
                <ReactQuill
                  value={localState.messageDescription}
                  onChange={(value) =>
                    handleChange("messageDescription", value)
                  }
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder={`Enter message description in ${language.toUpperCase()}`}
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
                <span className="btn btn-input w-[25%] capitalize">
                  Business Approach ({language})
                </span>
                <ReactQuill
                  value={localState.businessApproach}
                  onChange={(value) => handleChange("businessApproach", value)}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder={`Enter business approach in ${language.toUpperCase()}`}
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
                <span className="btn btn-input w-[25%] capitalize">
                  Why Us ({language})
                </span>
                <ReactQuill
                  value={localState.whyUs}
                  onChange={(value) => handleChange("whyUs", value)}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder={`Enter why us in ${language.toUpperCase()}`}
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
                <span className="btn btn-input w-[25%] capitalize">
                  Governance ({language})
                </span>
                <ReactQuill
                  value={localState.governance}
                  onChange={(value) => handleChange("governance", value)}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder={`Enter governance in ${language.toUpperCase()}`}
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

export default AboutHomeLangForm;
