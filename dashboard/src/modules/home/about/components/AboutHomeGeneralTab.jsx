const AboutHomeGeneralTab = ({
  prizes,
  certificates,
  addPrize,
  removePrize,
  updatePrizeField,
  updatePrizeName,
  addCertificate,
  removeCertificate,
  updateCertificateField,
  updateCertificateName,
}) => {
  const getImageLabel = (imageValue) => {
    if (!imageValue) return "No file selected";
    if (typeof imageValue === "string") return imageValue;
    return imageValue.name || "Selected file";
  };

  const renderCollection = (
    title,
    items,
    onAdd,
    onRemove,
    onFieldChange,
    onNameChange,
  ) => (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="card-title">{title}</h3>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          Add {title.slice(0, -1)}
        </button>
      </div>

      <div className="card-body space-y-6">
        {!items.length && (
          <div className="text-sm text-gray-500">No items added yet.</div>
        )}

        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">
                {title.slice(0, -1)} {index + 1}
              </h4>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => onRemove(index)}
              >
                Remove
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="input-group">
                <span className="btn btn-input w-[30%]">Provider</span>
                <input
                  type="text"
                  className="input"
                  value={item.provider || ""}
                  onChange={(e) =>
                    onFieldChange(index, "provider", e.target.value)
                  }
                  placeholder="Enter provider"
                />
              </div>

              <div className="input-group">
                <span className="btn btn-input w-[30%]">Date</span>
                <input
                  type="date"
                  className="input"
                  value={item.date || ""}
                  onChange={(e) => onFieldChange(index, "date", e.target.value)}
                />
              </div>

              <div className="input-group">
                <span className="btn btn-input w-[30%]">Image</span>
                <div className="w-full">
                  <input
                    type="file"
                    className="file-input w-full"
                    accept="image/*"
                    onChange={(e) =>
                      onFieldChange(index, "image", e.target.files?.[0] || null)
                    }
                  />
                  <div className="mt-2 text-xs text-gray-500 break-all">
                    {getImageLabel(item.image)}
                  </div>
                </div>
              </div>
            </div>

            {["en", "ar", "tr"].map((lang) => (
              <div className="input-group" key={`${title}-${index}-${lang}`}>
                <span className="btn btn-input w-[20%] capitalize">
                  Name ({lang})
                </span>
                <input
                  type="text"
                  className="input"
                  value={item?.name?.[lang] || ""}
                  onChange={(e) => onNameChange(index, lang, e.target.value)}
                  placeholder={`Enter name in ${lang.toUpperCase()}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderCollection(
        "Prizes",
        prizes,
        addPrize,
        removePrize,
        updatePrizeField,
        updatePrizeName,
      )}
      {renderCollection(
        "Certificates",
        certificates,
        addCertificate,
        removeCertificate,
        updateCertificateField,
        updateCertificateName,
      )}
    </div>
  );
};

export default AboutHomeGeneralTab;
