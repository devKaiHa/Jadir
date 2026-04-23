import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSectors } from "../../hooks/useSectors";
import { Container, Tooltip } from "@mui/material";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import AddButton from "../../../components/Global/AddButton";

const AllSectors = () => {
  const navigate = useNavigate();

  const { sectors, isLoading, error, deleteSector, isDeleting } = useSectors({
    limit: 100,
  });

  const handleDelete = async (id) => {
    try {
      await deleteSector(id).unwrap();
      toast.success("Sector deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete sector");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;
  const orderedCount = sectors.filter(
    (sector) => typeof sector?.order === "number" && sector.order > 0,
  ).length;

  return (
    <Container>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Market Sectors
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Organize sector entries with the same structured overview used
                across leadership pages
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Maintain clear ordering, keep visible sectors active, and edit
                translated labels from one consistent workspace.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-grid min-w-full rounded-3xl border border-gray-200 shadow-sm">
          <div className="card-header py-5 flex-wrap">
            <div>
              <h3 className="card-title">Sectors List</h3>
              <p className="mt-1 text-sm text-gray-500">
                Showing {sectors.length} sector entries
              </p>
            </div>

            <AddButton
              label="New Sector"
              onClick={() => navigate("/add-sector")}
            />
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[220px]">Name</th>
                    <th className="min-w-[280px]">Description</th>
                    <th className="min-w-[100px]">Order</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {sectors?.map((sector) => (
                    <tr key={sector._id}>
                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {sector?.name?.en || sector?.name?.ar || "-"}
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700 line-clamp-2">
                          {sector?.description?.en ||
                            sector?.description?.ar ||
                            "-"}
                        </span>
                      </td>

                      <td>{sector?.order ?? 0}</td>

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
                                navigate(`/update-sector/${sector._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(sector._id)}
                              disabled={isDeleting}
                            >
                              <i className="ki-filled ki-trash text-xl" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!sectors?.length && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No sectors found
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

export default AllSectors;
