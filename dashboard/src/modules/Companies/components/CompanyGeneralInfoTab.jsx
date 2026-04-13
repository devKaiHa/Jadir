import { CrudAvatarUpload } from "../../../partials/crud/CrudAvatarUpload";
import { CountrySelect } from "../../../components/CountrySelect";
import MultiSelect from "../../../components/MultiSelect";

const CompanyGeneralInfoTab = ({
  experienceYears,
  setExperienceYears,
  country,
  setCountry,
  phone,
  setPhone,
  email,
  setEmail,
  website,
  setWebsite,
  isActive,
  setIsActive,
  order,
  setOrder,
  fundsAssociated,
  setFundsAssociated,
  investmentFunds,
  services,
  values,
  addresses,
  goals,
  statistics,
  socialLinks,
  handleSocialChange,
  logoPreview,
  onLogoChange,
  backgroundPreview,
  onBackgroundChange,
  addService,
  removeService,
  updateService,
  addValue,
  removeValue,
  updateValue,
  addAddress,
  removeAddress,
  updateAddress,
  addGoal,
  removeGoal,
  updateGoal,
  addStatistic,
  removeStatistic,
  updateStatisticField,
  updateStatisticLangField,
}) => {
  const renderMultilingualCollection = (
    title,
    items,
    onAdd,
    onRemove,
    onChange,
  ) => (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="card-title">{title}</h3>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          Add Item
        </button>
      </div>

      <div className="card-body space-y-4">
        {!items.length && (
          <div className="text-sm text-gray-500">No items added yet.</div>
        )}

        {items.map((item, index) => (
          <div
            key={`${title}-${index}`}
            className="border border-gray-200 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">
                {title} Item {index + 1}
              </h4>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => onRemove(index)}
              >
                Remove
              </button>
            </div>

            {["en", "ar", "tr"].map((lang) => (
              <div className="input-group" key={`${title}-${index}-${lang}`}>
                <span className="btn btn-input w-[20%] capitalize">
                  {lang}
                </span>
                <input
                  type="text"
                  className="input"
                  value={item?.[lang] || ""}
                  onChange={(e) => onChange(index, lang, e.target.value)}
                  placeholder={`Enter ${title.toLowerCase()} in ${lang.toUpperCase()}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">General Info</h3>
        </div>

        <div className="card-table scrollable-x-auto pb-3 overflow-visible">
          <table className="table-auto w-full text-sm text-gray-600">
            <tbody>
              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">
                      Experience Years
                    </span>
                    <input
                      type="text"
                      className="input"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      placeholder="Enter experience years"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Country</span>
                    <CountrySelect
                      value={country}
                      onChange={(e) => setCountry(e)}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Order</span>
                    <input
                      type="number"
                      className="input"
                      value={order}
                      onChange={(e) => setOrder(Number(e.target.value))}
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Phone</span>
                    <input
                      type="text"
                      className="input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Email</span>
                    <input
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Website</span>
                    <input
                      type="text"
                      className="input"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Enter website"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Status</span>
                    <select
                      className="input"
                      value={isActive ? "true" : "false"}
                      onChange={(e) => setIsActive(e.target.value === "true")}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group items-start">
                    <span className="btn btn-input w-[20%]">
                      Associated Funds
                    </span>
                    <div className="w-full">
                      <MultiSelect
                        options={investmentFunds}
                        selected={fundsAssociated}
                        onChange={setFundsAssociated}
                        placeholder="Select investment funds"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Social Links</h3>
        </div>

        <div className="card-table scrollable-x-auto pb-3">
          <table className="table-auto w-full text-sm text-gray-600">
            <tbody>
              {["facebook", "instagram", "xTwitter", "linkedin"].map(
                (field) => (
                  <tr key={field}>
                    <td className="p-2 pt-4">
                      <div className="input-group">
                        <span className="btn btn-input w-[20%]">{field}</span>
                        <input
                          type="text"
                          className="input"
                          value={socialLinks[field] || ""}
                          onChange={(e) =>
                            handleSocialChange(field, e.target.value)
                          }
                          placeholder={`Enter ${field} URL`}
                        />
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Company Logo</h3>
          </div>
          <div className="p-6">
            <CrudAvatarUpload
              onChange={onLogoChange}
              value={logoPreview}
              initialImageURL={
                typeof logoPreview === "string" ? `${logoPreview}` : ""
              }
              adviceMessage="Logo | Max 1MB"
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Background Image</h3>
          </div>
          <div className="p-6">
            <CrudAvatarUpload
              onChange={onBackgroundChange}
              value={backgroundPreview}
              initialImageURL={
                typeof backgroundPreview === "string"
                  ? `${backgroundPreview}`
                  : ""
              }
              adviceMessage="Background | Max 1MB"
            />
          </div>
        </div>
      </div>

      {renderMultilingualCollection(
        "Services",
        services,
        addService,
        removeService,
        updateService,
      )}

      {renderMultilingualCollection(
        "Values",
        values,
        addValue,
        removeValue,
        updateValue,
      )}

      {renderMultilingualCollection(
        "Addresses",
        addresses,
        addAddress,
        removeAddress,
        updateAddress,
      )}

      {renderMultilingualCollection(
        "Goals",
        goals,
        addGoal,
        removeGoal,
        updateGoal,
      )}

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="card-title">Statistics</h3>
          <button type="button" className="btn btn-primary" onClick={addStatistic}>
            Add Statistic
          </button>
        </div>

        <div className="card-body space-y-4">
          {!statistics.length && (
            <div className="text-sm text-gray-500">No statistics added yet.</div>
          )}

          {statistics.map((item, index) => (
            <div
              key={`stat-${index}`}
              className="border border-gray-200 rounded-xl p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">
                  Statistic {index + 1}
                </h4>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => removeStatistic(index)}
                >
                  Remove
                </button>
              </div>

              <div className="input-group">
                <span className="btn btn-input w-[20%]">Value</span>
                <input
                  type="text"
                  className="input"
                  value={item?.value || ""}
                  onChange={(e) =>
                    updateStatisticField(index, "value", e.target.value)
                  }
                  placeholder="Enter value"
                />
              </div>

              {["en", "ar", "tr"].map((lang) => (
                <div key={`stat-${index}-${lang}`} className="space-y-3">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%] capitalize">
                      Title ({lang})
                    </span>
                    <input
                      type="text"
                      className="input"
                      value={item?.title?.[lang] || ""}
                      onChange={(e) =>
                        updateStatisticLangField(
                          index,
                          "title",
                          lang,
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="input-group">
                    <span className="btn btn-input w-[20%] capitalize">
                      Description ({lang})
                    </span>
                    <input
                      type="text"
                      className="input"
                      value={item?.description?.[lang] || ""}
                      onChange={(e) =>
                        updateStatisticLangField(
                          index,
                          "description",
                          lang,
                          e.target.value,
                        )
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

export default CompanyGeneralInfoTab;
