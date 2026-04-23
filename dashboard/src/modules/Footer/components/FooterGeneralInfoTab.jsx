const SummaryCard = ({ icon, label, value, description }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <i className={icon}></i>
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          {label}
        </div>
        <div className="mt-1 text-sm font-semibold text-gray-900 break-all">
          {value || "Not set yet"}
        </div>
      </div>
    </div>
    {description ? (
      <p className="mt-3 text-sm text-gray-500">{description}</p>
    ) : null}
  </div>
);

const SectionField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) => (
  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
      {label}
    </label>
    <input
      type={type}
      className="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const WorkingScheduleEditor = ({ schedule = [], setSchedule }) => {
  const updateDay = (index, group, lang, value) => {
    setSchedule((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index
          ? {
              ...item,
              [group]: {
                ...(item[group] || {}),
                [lang]: value,
              },
            }
          : item,
      ),
    );
  };

  const updateClosed = (index, isClosed) => {
    setSchedule((prev) =>
      prev.map((item, currentIndex) =>
        currentIndex === index ? { ...item, isClosed } : item,
      ),
    );
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900">
          Working Days & Hours
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Set every day separately in English and Arabic. Mark a day as closed
          when there are no working hours.
        </p>
      </div>

      <div className="space-y-4">
        {schedule.map((day, index) => (
          <div
            key={day.key || index}
            className="rounded-3xl border border-gray-200 bg-gray-50 p-4"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {day?.day?.en || `Day ${index + 1}`}
                </h4>
                <p className="mt-1 text-xs text-gray-500">
                  Schedule row {index + 1}
                </p>
              </div>

              <label className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm">
                <input
                  type="checkbox"
                  checked={Boolean(day.isClosed)}
                  onChange={(e) => updateClosed(index, e.target.checked)}
                />
                Closed
              </label>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Day EN
                </label>
                <input
                  type="text"
                  className="input"
                  value={day?.day?.en || ""}
                  onChange={(e) =>
                    updateDay(index, "day", "en", e.target.value)
                  }
                  placeholder="Monday"
                />
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Day AR
                </label>
                <input
                  type="text"
                  className="input text-right"
                  dir="rtl"
                  value={day?.day?.ar || ""}
                  onChange={(e) =>
                    updateDay(index, "day", "ar", e.target.value)
                  }
                  placeholder="الاثنين"
                />
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Hours EN
                </label>
                <input
                  type="text"
                  className="input"
                  value={day?.hours?.en || ""}
                  disabled={day.isClosed}
                  onChange={(e) =>
                    updateDay(index, "hours", "en", e.target.value)
                  }
                  placeholder="09:00 - 17:00"
                />
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Hours AR
                </label>
                <input
                  type="text"
                  className="input text-right"
                  dir="rtl"
                  value={day?.hours?.ar || ""}
                  disabled={day.isClosed}
                  onChange={(e) =>
                    updateDay(index, "hours", "ar", e.target.value)
                  }
                  placeholder="09:00 - 17:00"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
  workDays,
  setWorkDays,
  workingHours,
  setWorkingHours,
  workingSchedule,
  setWorkingSchedule,
  links,
  addLink,
  removeLink,
  updateLinkField,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Footer Contact Details
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                These details usually appear in the footer and contact areas.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SectionField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
              <SectionField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter footer email"
              />
              <SectionField
                label="Legacy Work Days"
                value={workDays}
                onChange={(e) => setWorkDays(e.target.value)}
                placeholder="Fallback only, example: Monday - Friday"
              />
              <SectionField
                label="Legacy Working Hours"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                placeholder="Fallback only, example: 09:00 - 18:00"
              />
            </div>
          </div>

          <WorkingScheduleEditor
            schedule={workingSchedule}
            setSchedule={setWorkingSchedule}
          />

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Social Media
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Add the channels that should be available in the footer.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SectionField
                label="Facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Facebook URL"
              />
              <SectionField
                label="Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram URL"
              />
              <SectionField
                label="X / Twitter"
                value={xTwitter}
                onChange={(e) => setXTwitter(e.target.value)}
                placeholder="X or Twitter URL"
              />
              <SectionField
                label="LinkedIn"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="LinkedIn URL"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Footer Snapshot
            </h3>
            <div className="mt-4 space-y-4">
              <SummaryCard
                icon="ki-outline ki-phone"
                label="Primary Phone"
                value={phone}
                description="Used as the main footer contact number."
              />
              <SummaryCard
                icon="ki-outline ki-sms"
                label="Primary Email"
                value={email}
                description="Used as the main footer contact email."
              />
              <SummaryCard
                icon="ki-outline ki-time"
                label="Working Schedule"
                value={
                  workingSchedule?.length
                    ? `${workingSchedule.length} days configured`
                    : workDays || workingHours
                      ? `${workDays || "Days not set"}${workingHours ? ` - ${workingHours}` : ""}`
                      : ""
                }
                description="Shows daily availability in both languages."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage the links that appear in the footer navigation area.
            </p>
          </div>

          <button type="button" className="btn btn-primary" onClick={addLink}>
            <i className="ki-outline ki-plus mr-1"></i>
            Add Link
          </button>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {links.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    {item.title || `Link ${index + 1}`}
                  </h4>
                </div>
              </div>

              <div className="space-y-4">
                <SectionField
                  label="Title"
                  value={item.title}
                  onChange={(e) =>
                    updateLinkField(index, "title", e.target.value)
                  }
                  placeholder="Enter link title"
                />
                <SectionField
                  label="URL"
                  value={item.link}
                  onChange={(e) =>
                    updateLinkField(index, "link", e.target.value)
                  }
                  placeholder="Enter link URL"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="btn btn-danger btn-outline"
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
