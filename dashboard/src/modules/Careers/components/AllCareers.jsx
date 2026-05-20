import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddButton from "../../../components/Global/AddButton";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";
import { useCareers, useCareerStatistics } from "../../hooks/useCareers";
import { Briefcase, CircleCheck, FilePen, Users } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
};

const AllCareers = () => {
  const navigate = useNavigate();
  const { careers, isLoading, error, deleteCareer, isDeleting } = useCareers({
    limit: 100,
  });
  const { statistics } = useCareerStatistics();

  const stats = [
    {
      title: "Total Careers",
      value: statistics?.totalCareers ?? 0,
      icon: <Briefcase />,
      color: "from-slate-900 to-slate-700",
      glow: "bg-slate-500/10",
    },
    {
      title: "Published",
      value: statistics?.publishedCareers ?? 0,
      icon: <CircleCheck />,
      color: "from-emerald-600 to-emerald-500",
      glow: "bg-emerald-500/10",
    },
    {
      title: "Drafts",
      value: statistics?.draftCareers ?? 0,
      icon: <FilePen />,
      color: "from-amber-500 to-orange-400",
      glow: "bg-amber-500/10",
    },
    {
      title: "Applications",
      value: statistics?.totalApplications ?? 0,
      icon: <Users />,
      color: "from-indigo-600 to-violet-500",
      glow: "bg-indigo-500/10",
    },
  ];

  const handleDelete = async (id) => {
    try {
      await deleteCareer(id).unwrap();
      toast.success("Career job deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete career job");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-6">
          {stats.map((item) => (
            <div
              key={item?.title}
              className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl ${item?.glow}`}
              />

              <div className="relative flex items-start justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    {item?.title}
                  </span>

                  <div className="mt-4 flex items-end gap-2">
                    <strong className="text-4xl font-black tracking-tight text-gray-900">
                      {item?.value}
                    </strong>
                  </div>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${item?.color}`}
                >
                  {item?.icon}
                </div>
              </div>

              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${item?.color}`}
                  style={{
                    width: `100%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Careers</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Job"
                onClick={() => navigate("/add-career")}
              />
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border">
                <thead>
                  <tr>
                    <th className="min-w-[220px]">Title</th>
                    {/* <th className="min-w-[220px]">Position</th> */}
                    <th className="min-w-[260px]">Location</th>
                    <th className="min-w-[110px]">Status</th>
                    <th className="min-w-[120px]">End Date</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {careers.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item?.title?.en || item?.title?.ar || "-"}</td>
                        {/* <td>
                          {item?.position?.en || item?.position?.ar || "-"}
                        </td> */}
                        <td>
                          {item?.location?.en || item?.location?.ar || "-"}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              item?.status === "draft"
                                ? "badge-warning"
                                : "badge-success"
                            }`}
                          >
                            {item?.status || "published"}
                          </span>
                        </td>
                        <td>{formatDate(item?.endDate)}</td>
                        <td>
                          <div className="flex gap-3">
                            <Tooltip
                              disableInteractive
                              title="Edit"
                              placement="top"
                            >
                              <button
                                className="cursor-pointer"
                                onClick={() =>
                                  navigate(`/update-career/${item?._id}`)
                                }
                              >
                                <i className="ki-filled ki-notepad-edit text-xl" />
                              </button>
                            </Tooltip>
                            <Tooltip
                              disableInteractive
                              title="Applications"
                              placement="top"
                            >
                              <button
                                className="cursor-pointer text-primary"
                                onClick={() =>
                                  navigate(`/career-applications/${item?._id}`)
                                }
                              >
                                <i className="ki-filled ki-user-tick text-xl" />
                              </button>
                            </Tooltip>
                            <Tooltip
                              disableInteractive
                              title="Delete"
                              placement="top"
                            >
                              <button
                                className="cursor-pointer text-red-500"
                                onClick={() => handleDelete(item?._id)}
                                disabled={isDeleting}
                              >
                                <i className="ki-filled ki-trash text-xl" />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {!careers.length && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        No career jobs found
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

export default AllCareers;
