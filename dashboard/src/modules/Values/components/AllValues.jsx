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

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Values</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Value"
                onClick={() => navigate("/add-value")}
              />
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[200px]">Name</th>
                    <th className="min-w-[220px]">Description</th>
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
                            value?.name?.ar ||
                            value?.name?.tr}
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700 line-clamp-2">
                          {value?.description?.en ||
                            value?.description?.ar ||
                            value?.description?.tr ||
                            "-"}
                        </span>
                      </td>

                      <td>{value?.order ?? 0}</td>

                      <td>
                        <span
                          className={`badge ${
                            value?.isActive ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {value?.isActive ? "Active" : "Inactive"}
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
                        colSpan={5}
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
