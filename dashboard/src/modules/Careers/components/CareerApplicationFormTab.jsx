const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Textarea" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkboxes" },
  { value: "select", label: "Select" },
  { value: "file", label: "File Upload" },
];

const OPTION_TYPES = ["radio", "checkbox", "select"];
const LANGUAGES = ["en", "ar", "tr"];

const emptyLangValue = { en: "", ar: "", tr: "" };

const getLangValue = (value, lang = "en") => {
  if (typeof value === "string") return value;
  return value?.[lang] || "";
};

const toFieldName = (label, fallback) =>
  String(label || fallback)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const emptyField = (index) => ({
  label: { ...emptyLangValue },
  name: `field_${index + 1}`,
  type: "text",
  placeholder: { ...emptyLangValue },
  required: false,
  options: [],
  order: index,
});

const CareerApplicationFormTab = ({ fields, setFields }) => {
  const updateTranslatedField = (index, key, lang, value) => {
    setFields((prev) =>
      prev.map((field, fieldIndex) => {
        if (fieldIndex !== index) return field;

        const nextValue = {
          ...emptyLangValue,
          ...(typeof field[key] === "string"
            ? { en: field[key], ar: field[key], tr: field[key] }
            : field[key]),
          [lang]: value,
        };
        const nextField = { ...field, [key]: nextValue };

        if (key === "label" && field.name?.startsWith("field_")) {
          nextField.name = toFieldName(
            nextValue.en || nextValue.ar || nextValue.tr,
            `field_${index + 1}`,
          );
        }

        return nextField;
      }),
    );
  };

  const updateField = (index, key, value) => {
    setFields((prev) =>
      prev.map((field, fieldIndex) => {
        if (fieldIndex !== index) return field;

        const nextField = { ...field, [key]: value };

        if (key === "type" && !OPTION_TYPES.includes(value)) {
          nextField.options = [];
        }

        return nextField;
      }),
    );
  };

  const addField = () => {
    setFields((prev) => [...prev, emptyField(prev.length)]);
  };

  const removeField = (index) => {
    setFields((prev) => prev.filter((_, fieldIndex) => fieldIndex !== index));
  };

  const moveField = (index, direction) => {
    setFields((prev) => {
      const next = [...prev];
      const target = index + direction;

      if (target < 0 || target >= next.length) return prev;

      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const updateOptions = (index, lang, value) => {
    const nextLabels = value.split("\n");
    const desiredLength = value === "" ? 0 : nextLabels.length;

    setFields((prev) =>
      prev.map((field, fieldIndex) => {
        if (fieldIndex !== index) return field;

        const existingOptions = field.options || [];
        const lastOtherLanguageIndex = existingOptions.reduce(
          (lastIndex, option, optionIndex) => {
            const label =
              typeof option.label === "string"
                ? { en: option.label, ar: option.label, tr: option.label }
                : option.label || {};
            const hasOtherLanguageText = LANGUAGES.some(
              (item) => item !== lang && label[item],
            );

            return hasOtherLanguageText ? optionIndex : lastIndex;
          },
          -1,
        );
        const maxLength = Math.max(desiredLength, lastOtherLanguageIndex + 1);
        const options = Array.from({ length: maxLength }).map(
          (_, optionIndex) => {
            const existing = existingOptions[optionIndex] || {};
            const existingLabel =
              typeof existing.label === "string"
                ? {
                    en: existing.label,
                    ar: existing.label,
                    tr: existing.label,
                  }
                : { ...emptyLangValue, ...existing.label };
            const label = {
              ...existingLabel,
              [lang]: nextLabels[optionIndex] || "",
            };
            const fallbackLabel = label.en || label.ar || label.tr;

            return {
              label,
              value:
                existing.value ||
                toFieldName(fallbackLabel, `option_${optionIndex + 1}`),
            };
          },
        );

        return { ...field, options };
      }),
    );
  };

  return (
    <div className="card">
      <div className="card-header py-5 flex-wrap">
        <div>
          <h3 className="card-title">Application Form</h3>
          <p className="text-sm text-gray-500 mt-1">
            Build the questions applicants will answer on the website.
          </p>
        </div>
      </div>

      <div className="card-body flex flex-col gap-4">
        {fields.map((field, index) => {
          const usesOptions = OPTION_TYPES.includes(field.type);

          return (
            <div key={field._id || index} className="border rounded-md p-4">
              <div className="flex justify-between gap-3 flex-wrap mb-4">
                <div className="font-semibold text-gray-800">
                  Field {index + 1}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={() => moveField(index, -1)}
                    disabled={index === 0}
                  >
                    <i className="ki-outline ki-up" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={() => moveField(index, 1)}
                    disabled={index === fields.length - 1}
                  >
                    <i className="ki-outline ki-down" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => removeField(index)}
                  >
                    <i className="ki-outline ki-trash" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Field Name</span>
                  <input
                    className="input"
                    value={field.name}
                    onChange={(event) =>
                      updateField(index, "name", event.target.value)
                    }
                    placeholder="field_name"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium">Type</span>
                  <select
                    className="select"
                    value={field.type}
                    onChange={(event) =>
                      updateField(index, "type", event.target.value)
                    }
                  >
                    {FIELD_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid lg:grid-cols-3 gap-4 mt-4">
                {LANGUAGES.map((lang) => (
                  <label key={`label-${lang}`} className="flex flex-col gap-2">
                    <span className="text-sm font-medium">
                      Label {lang.toUpperCase()}
                    </span>
                    <input
                      className="input"
                      value={getLangValue(field.label, lang)}
                      onChange={(event) =>
                        updateTranslatedField(
                          index,
                          "label",
                          lang,
                          event.target.value,
                        )
                      }
                      placeholder={`Question label ${lang.toUpperCase()}`}
                    />
                  </label>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-4 mt-4">
                {LANGUAGES.map((lang) => (
                  <label
                    key={`placeholder-${lang}`}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-sm font-medium">
                      Placeholder {lang.toUpperCase()}
                    </span>
                    <input
                      className="input"
                      value={getLangValue(field.placeholder, lang)}
                      onChange={(event) =>
                        updateTranslatedField(
                          index,
                          "placeholder",
                          lang,
                          event.target.value,
                        )
                      }
                      placeholder={`Optional helper ${lang.toUpperCase()}`}
                    />
                  </label>
                ))}
              </div>

              <label className="form-label flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={field.required}
                  onChange={(event) =>
                    updateField(index, "required", event.target.checked)
                  }
                />
                Required
              </label>

              {usesOptions ? (
                <div className="grid lg:grid-cols-3 gap-4 mt-4">
                  {LANGUAGES.map((lang) => (
                    <label
                      key={`options-${lang}`}
                      className="flex flex-col gap-2"
                    >
                      <span className="text-sm font-medium">
                        Options {lang.toUpperCase()}, one per line
                      </span>
                      <textarea
                        className="textarea min-h-[110px]"
                        value={(field.options || [])
                          .map((option) => getLangValue(option.label, lang))
                          .join("\n")}
                        onChange={(event) =>
                          updateOptions(index, lang, event.target.value)
                        }
                        placeholder={"Yes\nNo\nMaybe"}
                      />
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}

        <div className="flex">
          <button type="button" className="btn btn-primary" onClick={addField}>
            <i className="ki-outline ki-plus" /> Add Field
          </button>
        </div>

        {!fields.length ? (
          <div className="text-center py-8 text-gray-500">
            No application fields yet.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CareerApplicationFormTab;
