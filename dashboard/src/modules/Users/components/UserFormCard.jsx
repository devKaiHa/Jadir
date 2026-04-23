const UserFormCard = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  errors = {},
  isEdit = false,
}) => {
  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="card-title">{isEdit ? "Update User" : "Create User"}</h3>
      </div>

      <div className="card-table scrollable-x-auto pb-3">
        <table className="table-auto w-full text-sm text-gray-600">
          <tbody>
            <tr>
              <td className="p-2 pt-4">
                <div className="input-group">
                  <span className="btn btn-input w-[20%]">Name</span>
                  <input
                    type="text"
                    className={`input ${errors.name ? "border-red-500" : ""}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter user name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </td>
            </tr>

            <tr>
              <td className="p-2 pt-4">
                <div className="input-group">
                  <span className="btn btn-input w-[20%]">Email</span>
                  <input
                    type="email"
                    className={`input ${errors.email ? "border-red-500" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                  <span className="btn btn-input w-[20%]">
                    {isEdit ? "New Password" : "Password"}
                  </span>
                  <input
                    type="password"
                    className={`input ${errors.password ? "border-red-500" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      isEdit
                        ? "Leave empty to keep current password"
                        : "Enter password"
                    }
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserFormCard;
