import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddButton from "@/components/Global/AddButton";
import { useCompanies } from "../../hooks/useCompanies";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import { imageURL } from "../../../Api/GlobalData";
import { getCountryNameByCode } from "../../../lib/helpers";

const AllCompanies = () => {
  const navigate = useNavigate();

  const { companies, isLoading, error, deleteCompany, isDeleting } =
    useCompanies({ limit: 100 });

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id).unwrap();
      toast.success("Company deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete company");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Companies</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Company"
                onClick={() => navigate("/add-company")}
              />
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[90px]">Logo</th>
                    <th className="min-w-[220px]">Name</th>
                    <th className="min-w-[140px]">Country</th>
                    <th className="min-w-[100px]">Order</th>
                    <th className="min-w-[100px]">Status</th>
                    <th className="w-[120px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {companies?.map((company) => (
                    <tr key={company._id}>
                      <td>
                        {company?.logo ? (
                          <img
                            src={`${imageURL}/companies/${company.logo}`}
                            alt={company?.name?.en || "company"}
                            className="w-[70px] h-[70px] rounded object-contain border"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">No logo</span>
                        )}
                      </td>

                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {company?.name?.en ||
                            company?.name?.ar ||
                            company?.name?.tr}
                        </span>
                      </td>

                      <td>{getCountryNameByCode(company?.country) || "-"}</td>

                      <td>{company?.order ?? 0}</td>

                      <td>
                        <span
                          className={`badge ${
                            company?.isActive ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {company?.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/update-company/${company._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(company._id)}
                              disabled={isDeleting}
                            >
                              <i className="ki-filled ki-trash text-xl" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!companies?.length && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        No companies found
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

export default AllCompanies;
