import { Container } from "@mui/material";
import Cookies from "js-cookie";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";
import baseURL, { CareersEndPoint, imageURL } from "../../../Api/GlobalData";
import { useCareerApplications, useOneCareer } from "../../hooks/useCareers";

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const localizeLabel = (value) => {
  if (typeof value === "string") return value;
  return value?.en || value?.ar || value?.tr || "-";
};

const renderAnswer = (answer) => {
  if (answer.type === "file") {
    return answer.files?.length ? (
      <div className="flex flex-col gap-1">
        {answer.files.map((file) => (
          <a
            key={file.filename}
            href={`${imageURL}/${file.path}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary"
          >
            {file.originalName || file.filename}
          </a>
        ))}
      </div>
    ) : (
      "-"
    );
  }

  if (Array.isArray(answer.value)) return answer.value.join(", ");
  return answer.value || "-";
};

const getAnswerValue = (application, matchers = []) => {
  const answer = application.answers?.find((item) => {
    const label = localizeLabel(item.label).toLowerCase();
    return matchers.some((matcher) => label.includes(matcher));
  });

  if (!answer) return "-";
  const value = renderAnswer(answer);
  return typeof value === "string" ? value : "File attached";
};

const buildSummary = (application) => {
  const values = application.answers
    ?.filter((answer) => answer.type !== "file" && answer.value)
    .slice(0, 3)
    .map((answer) => {
      const value = Array.isArray(answer.value)
        ? answer.value.join(", ")
        : answer.value;
      return `${localizeLabel(answer.label)}: ${value}`;
    });

  return values?.length ? values.join(" | ") : "No text answers";
};

const hasFilterValue = (value) =>
  value !== undefined &&
  value !== null &&
  value !== "" &&
  !(Array.isArray(value) && value.length === 0);

const buildActiveFilters = (fields, filterValues) =>
  fields
    .map((field) => {
      const value = filterValues[field._id] || {};

      if (field.type === "number") {
        if (!hasFilterValue(value.min) && !hasFilterValue(value.max)) {
          return null;
        }

        return {
          field: field._id,
          type: field.type,
          min: value.min,
          max: value.max,
        };
      }

      if (field.type === "date") {
        if (!hasFilterValue(value.from) && !hasFilterValue(value.to)) {
          return null;
        }

        return {
          field: field._id,
          type: field.type,
          from: value.from,
          to: value.to,
        };
      }

      if (field.type === "file") {
        if (!hasFilterValue(value.hasFile)) return null;

        return {
          field: field._id,
          type: field.type,
          hasFile: value.hasFile,
        };
      }

      if (!hasFilterValue(value.value)) return null;

      return {
        field: field._id,
        type: field.type,
        value: value.value,
      };
    })
    .filter(Boolean);

const ApplicationFilters = ({
  fields,
  filterValues,
  setFilterValues,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (fieldId, key, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [fieldId]: {
        ...(prev[fieldId] || {}),
        [key]: value,
      },
    }));
  };

  if (!fields.length) return null;

  return (
    <div className="border-b p-5">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 text-left"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div>
          <h4 className="font-semibold text-gray-800">Filters</h4>
          <p className="text-sm text-gray-500">
            These filters are generated from this career application form.
          </p>
        </div>

        <span className="text-sm font-medium text-gray-600">
          {isOpen ? "Hide" : "Show"}
        </span>
      </button>

      {isOpen && (
        <>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={onClear}
            >
              Clear Filters
            </button>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
            {fields.map((field) => {
              const value = filterValues[field._id] || {};
              const label = localizeLabel(field.label);

              if (["radio", "select", "checkbox"].includes(field.type)) {
                return (
                  <label key={field._id} className="flex flex-col gap-2">
                    <span className="text-sm font-medium">{label}</span>
                    <select
                      className="select"
                      value={value.value || ""}
                      onChange={(event) =>
                        updateFilter(field._id, "value", event.target.value)
                      }
                    >
                      <option value="">Any</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {localizeLabel(option.label)}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              }

              if (field.type === "number") {
                return (
                  <div key={field._id} className="flex flex-col gap-2">
                    <span className="text-sm font-medium">{label}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        className="input"
                        type="number"
                        value={value.min || ""}
                        onChange={(event) =>
                          updateFilter(field._id, "min", event.target.value)
                        }
                        placeholder="Min"
                      />
                      <input
                        className="input"
                        type="number"
                        value={value.max || ""}
                        onChange={(event) =>
                          updateFilter(field._id, "max", event.target.value)
                        }
                        placeholder="Max"
                      />
                    </div>
                  </div>
                );
              }

              if (field.type === "date") {
                return (
                  <div key={field._id} className="flex flex-col gap-2">
                    <span className="text-sm font-medium">{label}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        className="input"
                        type="date"
                        value={value.from || ""}
                        onChange={(event) =>
                          updateFilter(field._id, "from", event.target.value)
                        }
                      />
                      <input
                        className="input"
                        type="date"
                        value={value.to || ""}
                        onChange={(event) =>
                          updateFilter(field._id, "to", event.target.value)
                        }
                      />
                    </div>
                  </div>
                );
              }

              if (field.type === "file") {
                return (
                  <label key={field._id} className="flex flex-col gap-2">
                    <span className="text-sm font-medium">{label}</span>
                    <select
                      className="select"
                      value={value.hasFile || ""}
                      onChange={(event) =>
                        updateFilter(field._id, "hasFile", event.target.value)
                      }
                    >
                      <option value="">Any</option>
                      <option value="present">Has file</option>
                      <option value="missing">Missing file</option>
                    </select>
                  </label>
                );
              }

              return (
                <label key={field._id} className="flex flex-col gap-2">
                  <span className="text-sm font-medium">{label}</span>
                  <input
                    className="input"
                    value={value.value || ""}
                    onChange={(event) =>
                      updateFilter(field._id, "value", event.target.value)
                    }
                    placeholder="Search answer"
                  />
                </label>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const ApplicationDetailsModal = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[860px] max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b p-5">
          <div>
            <h3 className="text-lg font-semibold">Application Details</h3>
            <p className="text-sm text-gray-500">
              Submitted {formatDate(application.createdAt)}
            </p>
          </div>

          <button className="btn btn-xs btn-icon btn-light" onClick={onClose}>
            <i className="ki-outline ki-cross" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          <div className="mb-4 rounded-md bg-gray-50 border p-4">
            <div className="font-semibold text-gray-800">
              {application.career?.title?.en ||
                application.career?.title?.ar ||
                "Application"}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Status: {application.status}
            </div>
          </div>

          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <tbody>
                {application.answers?.map((answer) => (
                  <tr key={String(answer.field)}>
                    <th className="min-w-[220px]">
                      {localizeLabel(answer.label)}
                    </th>
                    <td>{renderAnswer(answer)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end border-t p-4">
          <button className="btn btn-light" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CareerApplications = () => {
  const { careerId } = useParams();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [isExporting, setIsExporting] = useState(false);
  const { career, isLoading: isCareerLoading } = useOneCareer(careerId);
  const filterFields = useMemo(
    () => career?.applicationForm?.fields || [],
    [career],
  );
  const activeFilters = useMemo(
    () => buildActiveFilters(filterFields, filterValues),
    [filterFields, filterValues],
  );
  const { applications, isLoading, error, updateStatus, isUpdatingStatus } =
    useCareerApplications({
      careerId,
      limit: 100,
      filters: activeFilters.length ? JSON.stringify(activeFilters) : "",
    });

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Application status updated");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const params = new URLSearchParams({ careerId });
      if (activeFilters.length) {
        params.append("filters", JSON.stringify(activeFilters));
      }

      const token = Cookies.get("Token");
      const apiBaseUrl = baseURL.replace(/\/$/, "");
      const response = await fetch(
        `${apiBaseUrl}${CareersEndPoint}/applications/export?${params.toString()}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      if (!response.ok) {
        throw new Error("Failed to export applications");
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `career-applications-${career?.title?.en}.xls`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to export applications");
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading || isCareerLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="card">
        <div className="card-header py-5 flex-wrap">
          <div>
            <h3 className="card-title">Career Applications</h3>
            <p className="text-sm text-gray-500 mt-1">
              Review submitted answers and uploaded files.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="badge">
              Application count: {applications?.length}
            </span>
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? "Exporting..." : "Export Excel"}
            </button>
          </div>
        </div>

        <ApplicationFilters
          fields={filterFields}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          onClear={() => setFilterValues({})}
        />

        <div className="card-body">
          <div className="scrollable-x-auto">
            <table className="table table-auto table-border">
              <thead>
                <tr>
                  <th className="min-w-[170px]">Applicant</th>
                  <th className="min-w-[180px]">Email</th>
                  <th className="min-w-[170px]">Submitted</th>
                  <th className="min-w-[160px]">Status</th>
                  <th className="w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td>
                      {getAnswerValue(application, [
                        "full name",
                        "name",
                        "applicant",
                      ])}
                    </td>
                    <td>{getAnswerValue(application, ["email"])}</td>
                    <td>{formatDate(application.createdAt)}</td>
                    <td>
                      <select
                        className="select w-[150px]"
                        value={application.status}
                        disabled={isUpdatingStatus}
                        onChange={(event) =>
                          handleStatusChange(
                            application._id,
                            event.target.value,
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-light"
                        onClick={() => setSelectedApplication(application)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {!applications.length ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No applications submitted yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ApplicationDetailsModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
      <ToastContainer />
    </Container>
  );
};

export default CareerApplications;
