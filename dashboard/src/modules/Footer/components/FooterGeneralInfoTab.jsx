const FooterGeneralInfoTab = ({
  facebook,
  setFacebook,
  instagram,
  setInstagram,
  xTwitter,
  setXTwitter,
  linkedin,
  setLinkedin,
  phone,
  setPhone,
  email,
  setEmail,
  links,
  addLink,
  removeLink,
  updateLinkField,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Contact & Social Links</h3>
        </div>

        <div className="card-table scrollable-x-auto pb-3">
          <table className="table-auto w-full text-sm text-gray-600">
            <tbody>
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
                    <span className="btn btn-input w-[20%]">Facebook</span>
                    <input
                      type="text"
                      className="input"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      placeholder="Enter Facebook link"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">Instagram</span>
                    <input
                      type="text"
                      className="input"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="Enter Instagram link"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">X / Twitter</span>
                    <input
                      type="text"
                      className="input"
                      value={xTwitter}
                      onChange={(e) => setXTwitter(e.target.value)}
                      placeholder="Enter X/Twitter link"
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td className="p-2 pt-4">
                  <div className="input-group">
                    <span className="btn btn-input w-[20%]">LinkedIn</span>
                    <input
                      type="text"
                      className="input"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="Enter LinkedIn link"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="card-title">Footer Links</h3>
          <button type="button" className="btn btn-primary" onClick={addLink}>
            Add Link
          </button>
        </div>

        <div className="p-4 space-y-4">
          {links.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-gray-50 space-y-3"
            >
              <div className="input-group">
                <span className="btn btn-input w-[20%]">Title</span>
                <input
                  type="text"
                  className="input"
                  value={item.title}
                  onChange={(e) =>
                    updateLinkField(index, "title", e.target.value)
                  }
                  placeholder="Enter link title"
                />
              </div>

              <div className="input-group">
                <span className="btn btn-input w-[20%]">URL</span>
                <input
                  type="text"
                  className="input"
                  value={item.link}
                  onChange={(e) =>
                    updateLinkField(index, "link", e.target.value)
                  }
                  placeholder="Enter link URL"
                />
              </div>

              <div className="input-group">
                <span className="btn btn-input w-[20%]">Status</span>
                <select
                  className="input"
                  value={item.isActive ? "true" : "false"}
                  onChange={(e) =>
                    updateLinkField(
                      index,
                      "isActive",
                      e.target.value === "true",
                    )
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeLink(index)}
                  disabled={links.length === 1}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterGeneralInfoTab;
