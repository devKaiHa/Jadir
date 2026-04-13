const createBranch = () => ({
  name: { en: "", ar: "", tr: "" },
  address: { en: "", ar: "", tr: "" },
  mapLink: "",
  phonesText: "",
  whatsapp: "",
  isActive: true,
  order: 0,
});

const ContactUsGeneralInfoTab = ({
  emailsText,
  setEmailsText,
  phonesText,
  setPhonesText,
  mapLink,
  setMapLink,
  whatsapp,
  setWhatsapp,
  address,
  onAddressChange,
  branches,
  setBranches,
}) => {
  const updateBranch = (index, key, value) => {
    setBranches((prev) =>
      prev.map((branch, currentIndex) =>
        currentIndex === index ? { ...branch, [key]: value } : branch,
      ),
    );
  };

  const updateBranchLang = (index, key, lang, value) => {
    setBranches((prev) =>
      prev.map((branch, currentIndex) =>
        currentIndex === index
          ? {
              ...branch,
              [key]: {
                ...(branch[key] || {}),
                [lang]: value,
              },
            }
          : branch,
      ),
    );
  };

  const addBranch = () => {
    setBranches((prev) => [...prev, createBranch()]);
  };

  const removeBranch = (index) => {
    setBranches((prev) =>
      prev.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Main Contact Info</h3>
        </div>

        <div className="card-body space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="input-group">
              <span className="btn btn-input w-[28%]">Emails</span>
              <textarea
                className="input min-h-[96px]"
                value={emailsText}
                onChange={(e) => setEmailsText(e.target.value)}
                placeholder="One email per line"
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[28%]">Phones</span>
              <textarea
                className="input min-h-[96px]"
                value={phonesText}
                onChange={(e) => setPhonesText(e.target.value)}
                placeholder="One phone number per line"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="input-group">
              <span className="btn btn-input w-[28%]">Map Link</span>
              <input
                type="text"
                className="input"
                value={mapLink}
                onChange={(e) => setMapLink(e.target.value)}
                placeholder="Enter Google Maps or map URL"
              />
            </div>

            <div className="input-group">
              <span className="btn btn-input w-[28%]">Whatsapp</span>
              <input
                type="text"
                className="input"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Enter whatsapp number"
              />
            </div>
          </div>

          {["en", "ar", "tr"].map((lang) => (
            <div className="input-group" key={lang}>
              <span className="btn btn-input w-[28%] capitalize">
                Address ({lang})
              </span>
              <textarea
                className="input min-h-[96px]"
                value={address?.[lang] || ""}
                onChange={(e) => onAddressChange(lang, e.target.value)}
                placeholder={`Enter main address in ${lang.toUpperCase()}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="card-title">Branches</h3>
          <button type="button" className="btn btn-primary" onClick={addBranch}>
            Add Branch
          </button>
        </div>

        <div className="card-body space-y-6">
          {!branches.length && (
            <div className="text-sm text-gray-500">No branches added yet.</div>
          )}

          {branches.map((branch, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">
                  Branch {index + 1}
                </h4>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => removeBranch(index)}
                >
                  Remove
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="input-group">
                  <span className="btn btn-input w-[28%]">Map Link</span>
                  <input
                    type="text"
                    className="input"
                    value={branch.mapLink || ""}
                    onChange={(e) =>
                      updateBranch(index, "mapLink", e.target.value)
                    }
                  />
                </div>

                <div className="input-group">
                  <span className="btn btn-input w-[28%]">Whatsapp</span>
                  <input
                    type="text"
                    className="input"
                    value={branch.whatsapp || ""}
                    onChange={(e) =>
                      updateBranch(index, "whatsapp", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="input-group">
                  <span className="btn btn-input w-[35%]">Phones</span>
                  <textarea
                    className="input min-h-[96px]"
                    value={branch.phonesText || ""}
                    onChange={(e) =>
                      updateBranch(index, "phonesText", e.target.value)
                    }
                    placeholder="One phone per line"
                  />
                </div>

                <div className="input-group">
                  <span className="btn btn-input w-[35%]">Order</span>
                  <input
                    type="number"
                    className="input"
                    value={branch.order ?? 0}
                    onChange={(e) =>
                      updateBranch(index, "order", Number(e.target.value))
                    }
                  />
                </div>

                <div className="input-group">
                  <span className="btn btn-input w-[35%]">Status</span>
                  <select
                    className="input"
                    value={branch.isActive ? "true" : "false"}
                    onChange={(e) =>
                      updateBranch(index, "isActive", e.target.value === "true")
                    }
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              {["en", "ar", "tr"].map((lang) => (
                <div key={`${index}-${lang}`} className="grid md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[28%] capitalize">
                      Name ({lang})
                    </span>
                    <input
                      type="text"
                      className="input"
                      value={branch?.name?.[lang] || ""}
                      onChange={(e) =>
                        updateBranchLang(index, "name", lang, e.target.value)
                      }
                    />
                  </div>

                  <div className="input-group">
                    <span className="btn btn-input w-[28%] capitalize">
                      Address ({lang})
                    </span>
                    <textarea
                      className="input min-h-[96px]"
                      value={branch?.address?.[lang] || ""}
                      onChange={(e) =>
                        updateBranchLang(index, "address", lang, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsGeneralInfoTab;
