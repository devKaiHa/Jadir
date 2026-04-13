import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useResearch } from "../../hooks/useResearch";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import AddButton from "../../../components/Global/AddButton";
import { imageURL } from "../../../Api/GlobalData";

const AllResearch = () => {
  const navigate = useNavigate();
  const { research, isLoading, error, deleteResearch, isDeleting } =
    useResearch({ limit: 100 });

  const handleDelete = async (id) => {
    try {
      await deleteResearch(id).unwrap();
      toast.success("Research deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete research");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Research</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Research"
                onClick={() => navigate("/add-research")}
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
                    <th className="min-w-[100px]">Order</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="min-w-[100px]">Published</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {research?.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item?.image ? (
                          <img
                            src={`${imageURL}/research/${item.image}`}
                            alt={item?.title?.en || "research"}
                            className="w-[70px] h-[70px] rounded object-cover border"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No image
                          </span>
                        )}
                      </td>
                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {item?.title?.en ||
                            item?.title?.ar ||
                            item?.title?.tr ||
                            "-"}
                        </span>
                      </td>
                      <td>{item?.order ?? 0}</td>
                      <td>
                        <span
                          className={`badge ${
                            item?.isActive ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {item?.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item?.isPublished
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {item?.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/update-research/${item._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>
                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(item._id)}
                              disabled={isDeleting}
                            >
                              <i className="ki-filled ki-trash text-xl" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!research?.length && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        No research found
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

export default AllResearch;
