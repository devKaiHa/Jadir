import { useEffect, useState } from "react";

const AboutServiceLangForm = ({
  language,
  item,
  onChangeField,
  onAddContentLine,
  onRemoveContentLine,
  onChangeContentLine,
}) => {
  const [localState, setLocalState] = useState({
    title: item?.title?.[language] || "",
    description: item?.description?.[language] || "",
    contentTitle: item?.contentTitle?.[language] || "",
    highlight: item?.highlight?.[language] || "",
    contentText: item?.contentText?.[language] || [""],
  });

  useEffect(() => {
    setLocalState({
      title: item?.title?.[language] || "",
      description: item?.description?.[language] || "",
      contentTitle: item?.contentTitle?.[language] || "",
      highlight: item?.highlight?.[language] || "",
      contentText: item?.contentText?.[language] || [""],
    });
  }, [item, language]);

  const handleSimpleChange = (key, value) => {
    setLocalState((prev) => ({ ...prev, [key]: value }));
    onChangeField?.(key, value);
  };

  const handleContentLineChange = (index, value) => {
    const updated = [...localState.contentText];
    updated[index] = value;
    setLocalState((prev) => ({ ...prev, contentText: updated }));
    onChangeContentLine?.(index, value);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            About Service Content ({language.toUpperCase()})
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add the localized section copy, highlight text, and content lines.
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
              onChange={(e) => handleSimpleChange("title", e.target.value)}
              placeholder={`Enter title in ${language.toUpperCase()}`}
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Description ({language})
            </label>
            <div className="w-full bg-white">
              <textarea
                value={localState.description}
                onChange={(e) => handleSimpleChange("description", e.target.value)}
                placeholder={`Enter description in ${language.toUpperCase()}`}
                className="input min-h-[180px] w-full p-3"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Content Title ({language})
              </label>
              <input
                type="text"
                className="input"
                value={localState.contentTitle}
                onChange={(e) =>
                  handleSimpleChange("contentTitle", e.target.value)
                }
                placeholder={`Enter content title in ${language.toUpperCase()}`}
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Highlight ({language})
              </label>
              <input
                type="text"
                className="input"
                value={localState.highlight}
                onChange={(e) =>
                  handleSimpleChange("highlight", e.target.value)
                }
                placeholder={`Enter highlight in ${language.toUpperCase()}`}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Content Text ({language})
              </label>
              <button
                type="button"
                className="btn btn-light btn-sm"
                onClick={onAddContentLine}
              >
                Add Line
              </button>
            </div>

            <div className="space-y-4">
              {(localState.contentText || []).map((line, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-gray-700">
                      Line {index + 1}
                    </span>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => onRemoveContentLine(index)}
                    >
                      Remove
                    </button>
                  </div>

                  <textarea
                value={line}
                onChange={(e) => handleContentLineChange(index, e.target.value)}
                placeholder={`Enter content line ${index + 1}`}
                className="input min-h-[180px] w-full p-3"
              />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutServiceLangForm;
