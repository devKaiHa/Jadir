import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useProjects } from "../../hooks/useProjects";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import AddButton from "../../../components/Global/AddButton";
import { imageURL } from "../../../Api/GlobalData";
import { truncateText } from "../../../lib/helpers";

const AllProjects = () => {
  const navigate = useNavigate();

  const { projects, isLoading, error, deleteProject, isDeleting } = useProjects(
    { limit: 100 },
  );

  const handleDelete = async (id) => {
    try {
      await deleteProject(id).unwrap();
      toast.success("Project deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete project");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Projects</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Project"
                onClick={() => navigate("/add-project")}
              />
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[90px]">Image</th>
                    <th className="min-w-[220px]">Title</th>
                    <th className="min-w-[260px]">Brief</th>
                    <th className="min-w-[180px]">Project Link</th>
                    <th className="min-w-[100px]">Order</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {projects?.map((project) => (
                    <tr key={project._id}>
                      <td>
                        {project?.image ? (
                          <img
                            src={`${imageURL}/projects/${project.image}`}
                            alt={project?.title?.en || "project"}
                            className="w-[70px] h-[70px] rounded object-contain border"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No image
                          </span>
                        )}
                      </td>

                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {project?.title?.en ||
                            project?.title?.ar ||
                            project?.title?.tr ||
                            "-"}
                        </span>
                      </td>

                      <td>
                        <span className="text-sm text-gray-700 line-clamp-2">
                          {truncateText(
                            project?.brief?.en ||
                              project?.brief?.ar ||
                              project?.brief?.tr ||
                              "-",
                            50,
                          )}
                        </span>
                      </td>

                      <td>
                        <span
                          className="text-sm text-gray-700 line-clamp-1 cursor-pointer underline"
                          onClick={() =>
                            window.open(project?.projectLink, "_blank")
                          }
                        >
                          Open URL
                        </span>
                      </td>

                      <td>{project?.order ?? 0}</td>

                      <td>
                        <span
                          className={`badge ${
                            project?.isActive ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {project?.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/update-project/${project._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(project._id)}
                              disabled={isDeleting}
                            >
                              <i className="ki-filled ki-trash text-xl" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!projects?.length && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        No projects found
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

export default AllProjects;
