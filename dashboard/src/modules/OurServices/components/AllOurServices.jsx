import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useOurServices } from "../../hooks/useOurServices";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import AddButton from "../../../components/Global/AddButton";

const AllOurServices = () => {
  const navigate = useNavigate();

  const { services, isLoading, error, deleteOurService, isDeleting } =
    useOurServices({ limit: 100 });

  const handleDelete = async (id) => {
    try {
      await deleteOurService(id).unwrap();
      toast.success("Service deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete service");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Our Services</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Service"
                onClick={() => navigate("/add-our-service")}
              />
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[220px]">Title</th>
                    <th className="min-w-[260px]">Description</th>
                    <th className="min-w-[100px]">Order</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {services?.map((service) => (
                    <tr key={service._id}>
                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {service?.title?.en ||
                            service?.title?.ar ||
                            service?.title?.tr ||
                            "-"}
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700 line-clamp-2">
                          {service?.description?.en ||
                            service?.description?.ar ||
                            service?.description?.tr ||
                            "-"}
                        </span>
                      </td>

                      <td>{service?.order ?? 0}</td>

                      <td>
                        <span
                          className={`badge ${
                            service?.isActive ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {service?.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/update-our-service/${service._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(service._id)}
                              disabled={isDeleting}
                            >
                              <i className="ki-filled ki-trash text-xl" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!services?.length && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No services found
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

export default AllOurServices;
