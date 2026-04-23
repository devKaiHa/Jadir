import { useEffect, useState } from "react";

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
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Sector Content ({language.toUpperCase()})
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add the localized sector name and description.
          </p>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Name ({language})
            </label>
            <input
              type="text"
              className="input"
              value={localState.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={`Enter name in ${language.toUpperCase()}`}
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Description ({language})
            </label>
            <div className="w-full bg-white">
              <textarea
                value={localState.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder={`Enter description in ${language.toUpperCase()}`}
                className="input min-h-[220px] w-full p-3 tracking-[1px] leading-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorLangForm;
