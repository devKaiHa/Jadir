import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useOurServices } from "../../hooks/useOurServices";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import AddButton from "../../../components/Global/AddButton";
import { imageURL } from "../../../Api/GlobalData";

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
  const linkedProjectsCount = services.filter(
    (service) => (service?.relatedProjects?.length || 0) > 0,
  ).length;

  return (
    <Container>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Service Catalog
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Manage core service pages with the same polished overview as
                board members
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Review service visibility, linked projects, and localized copy
                from a cleaner, more consistent admin surface.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-grid min-w-full rounded-3xl border border-gray-200 shadow-sm">
          <div className="card-header py-5 flex-wrap">
            <div>
              <h3 className="card-title">Services List</h3>
              <p className="mt-1 text-sm text-gray-500">
                Showing {services.length} service pages
              </p>
            </div>
            <AddButton
              label="New Service"
              onClick={() => navigate("/add-our-service")}
            />
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[110px]">Banner</th>
                    <th className="min-w-[220px]">Title</th>
                    <th className="min-w-[120px]">Projects</th>
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
                        {service?.bannerImage ? (
                          <img
                            src={`${imageURL}/ourServices/${service.bannerImage}`}
                            alt={service?.title?.en || "service"}
                            className="w-[80px] h-[60px] rounded object-cover border"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No image
                          </span>
                        )}
                      </td>

                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {service?.title?.en || service?.title?.ar || "-"}
                        </span>
                      </td>

                      <td>{service?.relatedProjects?.length || 0}</td>

                      <td>
                        <span className="text-sm text-gray-700 line-clamp-2">
                          {service?.description?.en ||
                            service?.description?.ar ||
                            "-"}
                        </span>
                      </td>

                      <td>{service?.order ?? 0}</td>

                      <td>
                        <span className={`badge ${"badge-success"}`}>
                          {"Active"}
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
                        colSpan={7}
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
