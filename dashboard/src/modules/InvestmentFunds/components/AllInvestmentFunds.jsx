import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useInvestmentFunds } from "../../hooks/useInvestmentFunds";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import AddButton from "../../../components/Global/AddButton";
import { imageURL } from "../../../Api/GlobalData";

const AllInvestmentFunds = () => {
  const navigate = useNavigate();

  const {
    investmentFunds,
    isLoading,
    error,
    deleteInvestmentFund,
    isDeleting,
  } = useInvestmentFunds({ limit: 100 });

  const handleDelete = async (id) => {
    try {
      await deleteInvestmentFund(id).unwrap();
      toast.success("Investment fund deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete investment fund");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Investment Funds</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Investment Fund"
                onClick={() => navigate("/add-investment-fund")}
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
                    <th className="min-w-[180px]">Fund Link</th>
                    <th className="min-w-[100px]">Order</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {investmentFunds?.map((fund) => (
                    <tr key={fund._id}>
                      <td>
                        {fund?.image ? (
                          <img
                            src={`${imageURL}/investmentFunds/${fund.image}`}
                            alt={fund?.title?.en || "fund"}
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
                          {fund?.title?.en ||
                            fund?.title?.ar ||
                            fund?.title?.tr ||
                            "-"}
                        </span>
                      </td>

                      <td>
                        {fund?.fundLink ? (
                          <span
                            className="text-sm text-primary underline cursor-pointer line-clamp-1"
                            onClick={() =>
                              window.open(fund?.fundLink, "_blank")
                            }
                          >
                            Click to open
                          </span>
                        ) : (
                          "No link provided"
                        )}
                      </td>

                      <td>{fund?.order ?? 0}</td>

                      <td>
                        <span
                          className={`badge ${
                            fund?.isActive ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {fund?.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/update-investment-fund/${fund._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(fund._id)}
                              disabled={isDeleting}
                            >
                              <i className="ki-filled ki-trash text-xl" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!investmentFunds?.length && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        No investment funds found
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

export default AllInvestmentFunds;
