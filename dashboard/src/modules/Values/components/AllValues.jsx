import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoadingCard from "@/components/Global/LoadingCard";
import ErrorMessageCard from "@/components/Global/ErrorMessageCard";
import AddButton from "@/components/Global/AddButton";
import { useValues } from "../../hooks/useValues";

const AllValues = () => {
  const navigate = useNavigate();

  const { values, isLoading, error, deleteValue, isDeleting } = useValues({
    limit: 100,
  });

  const handleDelete = async (id) => {
    try {
      await deleteValue(id).unwrap();
      toast.success("Value deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete value");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;
  const highlightedCount = values.filter(
    (value) => typeof value?.order === "number" && value.order <= 3,
  ).length;

  return (
    <Container>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Brand Values
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Keep the company value system clear, ordered, and ready for
                publishing
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Review the public-facing values, adjust their order, and
                maintain consistent messaging across all languages.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-grid min-w-full rounded-3xl border border-gray-200 shadow-sm">
          <div className="card-header py-5 flex-wrap">
            <div>
              <h3 className="card-title">Values List</h3>
              <p className="mt-1 text-sm text-gray-500">
                Showing {values.length} values configured for the website
              </p>
            </div>

            <AddButton
              label="New Value"
              onClick={() => navigate("/add-value")}
            />
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[220px]">Name</th>
                    <th className="min-w-[180px]">Content</th>
                    <th className="min-w-[280px]">Description</th>
                    <th className="min-w-[100px]">Order</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {values?.map((value) => (
                    <tr key={value._id}>
                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {value?.name?.en ||
                            value?.name?.ar}
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700 line-clamp-1">
                          {value?.content?.en ||
                            value?.content?.ar ||
                            "-"}
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700 line-clamp-2">
                          {value?.description?.en ||
                            value?.description?.ar ||
                            "-"}
                        </span>
                      </td>

                      <td>{value?.order ?? 0}</td>

                      <td>
                        <span
                          className={`badge ${
                            "badge-success"
                          }`}
                        >
                          {"Active"}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/update-value/${value._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(value._id)}
                              disabled={isDeleting}
                            >
                              <i className="ki-filled ki-trash text-xl" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!values?.length && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        No values found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default AllValues;
