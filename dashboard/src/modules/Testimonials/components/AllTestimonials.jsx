import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddButton from "../../../components/Global/AddButton";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";
import { useTestimonials } from "../../hooks/useTestimonials";

const AllTestimonials = () => {
  const navigate = useNavigate();
  const { testimonials, isLoading, error, deleteTestimonial, isDeleting } =
    useTestimonials({ limit: 100 });

  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id).unwrap();
      toast.success("Testimonial deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete testimonial");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Testimonials</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Testimonial"
                onClick={() => navigate("/add-testimonial")}
              />
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border">
                <thead>
                  <tr>
                    <th className="min-w-[180px]">Name</th>
                    <th className="min-w-[180px]">Role</th>
                    <th className="min-w-[180px]">Company</th>
                    <th className="min-w-[80px]">Rating</th>
                    <th className="min-w-[100px]">Featured</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((item) => (
                    <tr key={item._id}>
                      <td>{item?.name?.en || item?.name?.ar || "-"}</td>
                      <td>{item?.role?.en || item?.role?.ar || "-"}</td>
                      <td>{item?.company?.en || item?.company?.ar || "-"}</td>
                      <td>{item?.rating ?? 5}</td>
                      <td>{item?.isFeatured ? "Yes" : "No"}</td>
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
                                navigate(`/update-testimonial/${item._id}`)
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

                  {!testimonials.length && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        No testimonials found
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

export default AllTestimonials;
