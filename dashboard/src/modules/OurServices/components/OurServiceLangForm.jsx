import { useEffect, useState } from "react";

const toTextareaValue = (value) =>
  Array.isArray(value) ? value.filter(Boolean).join("\n") : "";

const fromTextareaValue = (value) => value.split("\n");

const OurServiceLangForm = ({
  language,
  titleValue = "",
  descriptionValue = "",
  featuresValue = [],
  stepsValue = [],
  targetingSectorsValue = [],
  testimonialQuoteValue = "",
  testimonialClientNameValue = "",
  testimonialClientRoleValue = "",
  onTitleChange,
  onDescriptionChange,
  onFeaturesChange,
  onStepsChange,
  onTargetingSectorsChange,
  onTestimonialQuoteChange,
  onTestimonialClientNameChange,
  onTestimonialClientRoleChange,
}) => {
  const [localState, setLocalState] = useState({
    title: titleValue || "",
    description: descriptionValue || "",
    features: toTextareaValue(featuresValue),
    steps: toTextareaValue(stepsValue),
    targetingSectors: toTextareaValue(targetingSectorsValue),
    testimonialQuote: testimonialQuoteValue || "",
    testimonialClientName: testimonialClientNameValue || "",
    testimonialClientRole: testimonialClientRoleValue || "",
  });

  useEffect(() => {
    setLocalState((prev) => ({
      ...prev,
      title: titleValue || "",
      description: descriptionValue || "",
      features: toTextareaValue(featuresValue),
      steps: toTextareaValue(stepsValue),
      targetingSectors: toTextareaValue(targetingSectorsValue),
      testimonialQuote: testimonialQuoteValue || "",
      testimonialClientName: testimonialClientNameValue || "",
      testimonialClientRole: testimonialClientRoleValue || "",
    }));
  }, [
    titleValue,
    descriptionValue,
    featuresValue,
    stepsValue,
    targetingSectorsValue,
    testimonialQuoteValue,
    testimonialClientNameValue,
    testimonialClientRoleValue,
  ]);

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);

    if (key === "title") onTitleChange?.(language, value);
    if (key === "description") onDescriptionChange?.(language, value);
    if (key === "features")
      onFeaturesChange?.(language, fromTextareaValue(value));
    if (key === "steps") onStepsChange?.(language, fromTextareaValue(value));
    if (key === "targetingSectors") {
      onTargetingSectorsChange?.(language, fromTextareaValue(value));
    }
    if (key === "testimonialQuote") {
      onTestimonialQuoteChange?.(language, value);
    }
    if (key === "testimonialClientName") {
      onTestimonialClientNameChange?.(language, value);
    }
    if (key === "testimonialClientRole") {
      onTestimonialClientRoleChange?.(language, value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Service Content ({language.toUpperCase()})
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add the localized service copy, lists, and testimonial details.
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
              Description ({language})
            </label>
            <textarea
              value={localState.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder={`Enter description in ${language.toUpperCase()}`}
              className="input min-h-[180px] w-full p-3 tracking-[1px] leading-[20px]"
            />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Features ({language})
              </label>
              <textarea
                value={localState.features}
                onChange={(e) => handleChange("features", e.target.value)}
                placeholder={`One feature per line in ${language.toUpperCase()}`}
                className="input min-h-[160px] w-full p-3 tracking-[1px] leading-[20px]"
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Steps ({language})
              </label>
              <textarea
                value={localState.steps}
                onChange={(e) => handleChange("steps", e.target.value)}
                placeholder={`One service step per line in ${language.toUpperCase()}`}
                className="input min-h-[160px] w-full p-3 tracking-[1px] leading-[20px]"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Target Sectors ({language})
            </label>
            <textarea
              value={localState.targetingSectors}
              onChange={(e) => handleChange("targetingSectors", e.target.value)}
              placeholder={`One sector per line in ${language.toUpperCase()}`}
              className="input min-h-[140px] w-full p-3 tracking-[1px] leading-[20px]"
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Testimonial Quote ({language})
            </label>
            <textarea
              value={localState.testimonialQuote}
              onChange={(e) => handleChange("testimonialQuote", e.target.value)}
              placeholder={`Client quote in ${language.toUpperCase()}`}
              className="input min-h-[150px] w-full p-3 tracking-[1px] leading-[20px]"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Client Name ({language})
              </label>
              <input
                type="text"
                className="input"
                value={localState.testimonialClientName}
                onChange={(e) =>
                  handleChange("testimonialClientName", e.target.value)
                }
                placeholder={`Client name in ${language.toUpperCase()}`}
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Client Role ({language})
              </label>
              <input
                type="text"
                className="input"
                value={localState.testimonialClientRole}
                onChange={(e) =>
                  handleChange("testimonialClientRole", e.target.value)
                }
                placeholder={`Client role in ${language.toUpperCase()}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServiceLangForm;
