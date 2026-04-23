import { useEffect, useState } from "react";

const InvestmentFundLangForm = ({
  language,
  titleValue = "",
  contentValue = "",
  shortAboutValue = "",
  onTitleChange,
  onContentChange,
  onShortAboutChange,
}) => {
  const [localState, setLocalState] = useState({
    title: titleValue || "",
    content: contentValue || "",
    shortAbout: shortAboutValue || "",
  });

  useEffect(() => {
    setLocalState({
      title: titleValue || "",
      content: contentValue || "",
      shortAbout: shortAboutValue || "",
    });
  }, [titleValue, contentValue, shortAboutValue]);

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);

    if (key === "title") onTitleChange?.(language, value);
    if (key === "content") onContentChange?.(language, value);
    if (key === "shortAbout") onShortAboutChange?.(language, value);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Fund Content ({language.toUpperCase()})
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add the localized fund title, summary, and detailed content.
          </p>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Title ({language})
            </label>
            <input
              type="text"
              className="input"
              value={localState.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder={`Enter title in ${language.toUpperCase()}`}
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Short About ({language})
            </label>
            <input
              type="text"
              className="input"
              value={localState.shortAbout}
              onChange={(e) => handleChange("shortAbout", e.target.value)}
              placeholder={`Enter short about in ${language.toUpperCase()}`}
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Content ({language})
            </label>
            <div className="w-full bg-white">
              <textarea
                value={localState.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder={`Enter content in ${language.toUpperCase()}`}
                className="input min-h-[180px] w-full p-3 tracking-[1px] leading-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentFundLangForm;
