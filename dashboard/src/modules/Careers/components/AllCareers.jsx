import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddButton from "../../../components/Global/AddButton";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";
import { useCareers } from "../../hooks/useCareers";

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
};

const AllCareers = () => {
  const navigate = useNavigate();
  const { careers, isLoading, error, deleteCareer, isDeleting } = useCareers({
    limit: 100,
  });

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
                    <th className="min-w-[260px]">Application Link</th>
                    <th className="min-w-[120px]">End Date</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {careers.map((item) => (
                    <tr key={item._id}>
                      <td>{item?.title?.en || item?.title?.ar || "-"}</td>
                      <td>
                        {item?.applicationLink ? (
                          <a
                            href={item.applicationLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary"
                          >
                            {item.applicationLink}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{formatDate(item?.endDate)}</td>
                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer"
                              onClick={() => navigate(`/update-career/${item._id}`)}
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

                  {!careers.length && (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-gray-500">
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
