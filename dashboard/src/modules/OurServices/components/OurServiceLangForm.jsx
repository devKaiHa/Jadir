import { useEffect, useMemo, useState } from "react";

const toTextareaValue = (value) =>
  Array.isArray(value) ? value.filter(Boolean).join("\n") : "";

const fromTextareaValue = (value) => value.split("\n");

const getLocalizedValue = (value = {}, language = "en") =>
  value?.[language] || value?.en || value?.ar || "";

const TestimonialModal = ({
  isOpen,
  language,
  testimonial,
  onClose,
  onFieldChange,
}) => {
  if (!isOpen || !testimonial) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Edit Testimonial ({language.toUpperCase()})
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Update the full quote and client details in a focused modal.
            </p>
          </div>

          <button className="btn btn-xs btn-icon btn-light" onClick={onClose}>
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Client Quote
            </label>
            <textarea
              value={testimonial?.quote?.[language] || ""}
              onChange={(e) => onFieldChange("quote", e.target.value)}
              placeholder={`Client quote in ${language.toUpperCase()}`}
              className="input min-h-[180px] w-full p-3 tracking-[1px] leading-[20px]"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Client Name
              </label>
              <input
                type="text"
                className="input"
                value={testimonial?.clientName?.[language] || ""}
                onChange={(e) => onFieldChange("clientName", e.target.value)}
                placeholder={`Client name in ${language.toUpperCase()}`}
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Client Role
              </label>
              <input
                type="text"
                className="input"
                value={testimonial?.clientRole?.[language] || ""}
                onChange={(e) => onFieldChange("clientRole", e.target.value)}
                placeholder={`Client role in ${language.toUpperCase()}`}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 px-6 py-5">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const OurServiceLangForm = ({
  language,
  titleValue = "",
  descriptionValue = "",
  featuresValue = [],
  stepsValue = [],
  targetingSectorsValue = [],
  testimonialsValue = [],
  onTitleChange,
  onDescriptionChange,
  onFeaturesChange,
  onStepsChange,
  onTargetingSectorsChange,
  onAddTestimonial,
  onRemoveTestimonial,
  onTestimonialFieldChange,
}) => {
  const [localState, setLocalState] = useState({
    title: titleValue || "",
    description: descriptionValue || "",
    features: toTextareaValue(featuresValue),
    steps: toTextareaValue(stepsValue),
    targetingSectors: toTextareaValue(targetingSectorsValue),
  });
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(null);

  useEffect(() => {
    setLocalState((prev) => ({
      ...prev,
      title: titleValue || "",
      description: descriptionValue || "",
      features: toTextareaValue(featuresValue),
      steps: toTextareaValue(stepsValue),
      targetingSectors: toTextareaValue(targetingSectorsValue),
    }));
  }, [
    titleValue,
    descriptionValue,
    featuresValue,
    stepsValue,
    targetingSectorsValue,
  ]);

  const activeTestimonial =
    activeTestimonialIndex !== null ? testimonialsValue[activeTestimonialIndex] : null;

  const testimonialSummary = useMemo(
    () =>
      testimonialsValue.map((testimonial, index) => ({
        index,
        quote: getLocalizedValue(testimonial?.quote, language),
        clientName: getLocalizedValue(testimonial?.clientName, language),
        clientRole: getLocalizedValue(testimonial?.clientRole, language),
      })),
    [testimonialsValue, language],
  );

  const handleChange = (key, value) => {
    const updated = { ...localState, [key]: value };
    setLocalState(updated);

    if (key === "title") onTitleChange?.(language, value);
    if (key === "description") onDescriptionChange?.(language, value);
    if (key === "features") {
      onFeaturesChange?.(language, fromTextareaValue(value));
    }
    if (key === "steps") onStepsChange?.(language, fromTextareaValue(value));
    if (key === "targetingSectors") {
      onTargetingSectorsChange?.(language, fromTextareaValue(value));
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

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Testimonials ({language.toUpperCase()})
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Keep the list minimal here and open the modal to view or edit
                  the full testimonial.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onAddTestimonial?.();
                  setActiveTestimonialIndex(testimonialsValue.length);
                }}
              >
                <i className="ki-outline ki-plus mr-1"></i>
                Add Testimonial
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {!testimonialSummary.length ? (
                <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
                  <h4 className="text-base font-semibold text-gray-900">
                    No testimonials yet
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">
                    You can leave this section empty or add as many client
                    testimonials as needed.
                  </p>
                </div>
              ) : null}

              {testimonialSummary.map((item) => (
                <div
                  key={`${language}-testimonial-${item.index}`}
                  className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Testimonial {item.index + 1}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-gray-900">
                      {item.clientName || "No client name yet"}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {item.clientRole || "No client role yet"}
                    </div>
                    <div className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {item.quote || "No quote yet"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-light-primary btn-sm"
                      onClick={() => setActiveTestimonialIndex(item.index)}
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-outline btn-sm"
                      onClick={() => {
                        if (activeTestimonialIndex === item.index) {
                          setActiveTestimonialIndex(null);
                        }
                        onRemoveTestimonial?.(item.index);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TestimonialModal
        isOpen={activeTestimonialIndex !== null}
        language={language}
        testimonial={activeTestimonial}
        onClose={() => setActiveTestimonialIndex(null)}
        onFieldChange={(field, value) =>
          onTestimonialFieldChange?.(activeTestimonialIndex, field, language, value)
        }
      />
    </div>
  );
};

export default OurServiceLangForm;
