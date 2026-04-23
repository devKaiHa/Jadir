import { useEffect, useState } from "react";

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
                <textarea
                  value={localState.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder={`Enter content in ${language.toUpperCase()}`}
                  className="input min-h-[180px] w-full tracking-[1px] leading-[20px]"
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
                <textarea
                  value={localState.visionDescription}
                  onChange={(e) =>
                    handleChange("visionDescription", e.target.value)
                  }
                  placeholder={`Enter vision description in ${language.toUpperCase()}`}
                  className="input min-h-[180px] w-full tracking-[1px] leading-[20px]"
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
                <textarea
                  value={localState.messageDescription}
                  onChange={(e) =>
                    handleChange("messageDescription", e.target.value)
                  }
                  placeholder={`Enter message description in ${language.toUpperCase()}`}
                  className="input min-h-[180px] w-full tracking-[1px] leading-[20px]"
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
                <textarea
                  value={localState.businessApproach}
                  onChange={(e) =>
                    handleChange("businessApproach", e.target.value)
                  }
                  placeholder={`Enter business approach in ${language.toUpperCase()}`}
                  className="input min-h-[180px] w-full tracking-[1px] leading-[20px]"
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
                <textarea
                  value={localState.whyUs}
                  onChange={(e) => handleChange("whyUs", e.target.value)}
                  placeholder={`Enter why us in ${language.toUpperCase()}`}
                  className="input min-h-[180px] w-full tracking-[1px] leading-[20px]"
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
                <textarea
                  value={localState.whoWeServe}
                  onChange={(e) => handleChange("whoWeServe", e.target.value)}
                  placeholder={`Enter who we serve in ${language.toUpperCase()}`}
                  className="input min-h-[180px] w-full tracking-[1px] leading-[20px]"
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
