import { Container, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddButton from "@/components/Global/AddButton";
import { useCompanies } from "../../hooks/useCompanies";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import { imageURL } from "../../../Api/GlobalData";

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
  const withBriefCount = companies.filter(
    (company) => company?.brief?.en || company?.brief?.ar,
  ).length;

  return (
    <Container>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Trusted Companies
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Manage the trusted-company logos and short blurbs used across
                the site
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Keep brand names, logos, ordering, and short descriptions
                aligned with the sitemap from the PDF.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-grid min-w-full rounded-3xl border border-gray-200 shadow-sm">
          <div className="card-header py-5 flex-wrap">
            <div>
              <h3 className="card-title">Company List</h3>
              <p className="mt-1 text-sm text-gray-500">
                Showing {companies.length} logo entries
              </p>
            </div>

            <AddButton
              label="New Company"
              onClick={() => navigate("/add-company")}
            />
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[90px]">Logo</th>
                    <th className="min-w-[220px]">Name</th>
                    <th className="min-w-[100px]">Order</th>
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
                            "-"}
                        </span>
                      </td>

                      <td>{company?.order ?? 0}</td>

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
