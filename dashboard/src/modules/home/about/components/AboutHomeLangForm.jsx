import { useEffect, useState } from "react";
import { TextEditor } from "../../../../components/TextEditor";

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
  whoWeServeValue = "",
  onBusinessApproachChange,
  onWhyUsChange,
  onWhoWeServeChange,
}) => {
  const [localState, setLocalState] = useState({
    content: contentValue ?? "",
    vision: visionValue ?? "",
    visionDescription: visionDescriptionValue ?? "",
    message: messageValue ?? "",
    messageDescription: messageDescriptionValue ?? "",
    businessApproach: businessApproachValue ?? "",
    whyUs: whyUsValue ?? "",
    whoWeServe: whoWeServeValue ?? "",
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
      whoWeServe: whoWeServeValue ?? "",
    });
  }, [
    contentValue,
    visionValue,
    visionDescriptionValue,
    messageValue,
    messageDescriptionValue,
    businessApproachValue,
    whyUsValue,
    whoWeServeValue,
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
    if (key === "businessApproach") onBusinessApproachChange?.(language, value);
    if (key === "whyUs") onWhyUsChange?.(language, value);
    if (key === "whoWeServe") onWhoWeServeChange?.(language, value);
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
                <TextEditor
                  language={language}
                  value={localState.content}
                  onChange={(value) => handleChange("content", value)}
                  placeholder={`Enter content in ${language.toUpperCase()}`}
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
                <TextEditor
                  language={language}
                  value={localState.visionDescription}
                  onChange={(value) => handleChange("visionDescription", value)}
                  placeholder={`Enter vision description in ${language.toUpperCase()}`}
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
                <TextEditor
                  language={language}
                  value={localState.messageDescription}
                  onChange={(value) =>
                    handleChange("messageDescription", value)
                  }
                  placeholder={`Enter message description in ${language.toUpperCase()}`}
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
                <TextEditor
                  language={language}
                  value={localState.businessApproach}
                  onChange={(value) => handleChange("businessApproach", value)}
                  placeholder={`Enter business approach in ${language.toUpperCase()}`}
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
                <TextEditor
                  language={language}
                  value={localState.whyUs}
                  onChange={(value) => handleChange("whyUs", value)}
                  placeholder={`Enter why us in ${language.toUpperCase()}`}
                  className="bg-white text-black min-h-[180px] w-full pb-[3rem]"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[25%] capitalize">
                  Who we serve ({language})
                </span>
                <TextEditor
                  language={language}
                  value={localState.whoWeServe}
                  onChange={(value) => handleChange("whoWeServe", value)}
                  placeholder={`Enter who we serve in ${language.toUpperCase()}`}
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
