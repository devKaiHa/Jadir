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
  const linkedCount = investmentFunds.filter(
    (fund) => (fund?.companiesAssociated?.length || 0) > 0,
  ).length;

  return (
    <Container>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Investment Funds
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Manage fund profiles with the same clean admin experience as board members
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Track active funds, review linked companies, and edit public
                fund pages from a consistent overview.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Total</div>
                <div className="mt-2 text-2xl font-semibold">{investmentFunds.length}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Active</div>
                <div className="mt-2 text-2xl font-semibold">{activeCount}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Linked Companies</div>
                <div className="mt-2 text-2xl font-semibold">{linkedCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Investment Funds</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeCount} active and {inactiveCount} inactive funds
              </p>
            </div>

            <AddButton
              label="New Investment Fund"
              onClick={() => navigate("/add-investment-fund")}
            />
          </div>
        </div>

        <div className="card card-grid min-w-full rounded-3xl border border-gray-200 shadow-sm">
          <div className="card-header py-5 flex-wrap">
            <div>
              <h3 className="card-title">Funds List</h3>
              <p className="mt-1 text-sm text-gray-500">
                Showing {investmentFunds.length} investment funds
              </p>
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[90px]">Image</th>
                    <th className="min-w-[220px]">Title</th>
                    <th className="min-w-[140px]">Companies</th>
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
                            "-"}
                        </span>
                      </td>

                      <td>{fund?.companiesAssociated?.length || 0}</td>

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
                            "badge-success"
                          }`}
                        >
                          {"Active"}
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
                        colSpan={7}
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
