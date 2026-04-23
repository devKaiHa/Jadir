import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCustomPages } from "../../hooks/useCustomPages";
import { Container, Tooltip } from "@mui/material";
import AddButton from "../../../components/Global/AddButton";

const AllCustomPages = () => {
  const navigate = useNavigate();

  const [params, setParams] = useState({
    keyword: "",
    page: 1,
    limit: 10,
  });

  const { customPages, pagination, isLoading, deleteCustomPage, isDeleting } =
    useCustomPages(params);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;

    try {
      await deleteCustomPage(id).unwrap();
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Custom Pages</h3>

            <div className="flex gap-6">
              <AddButton
                label="Add Custom Page"
                onClick={() => navigate("/add-custom-page")}
              />
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {customPages?.map((page) => (
                    <tr key={page._id} className="border-t">
                      <td className="p-3">{page?.title?.en}</td>
                      <td>
                        <span
                          className={`badge ${
                            "badge-success"
                          }`}
                        >
                          {"Active"}
                        </span>
                      </td>

                      <td className="p-3 flex gap-2">
                        <div className="flex gap-3">
                          <Tooltip title="Edit" placement="top">
                            <button
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(`/update-custom-page/${page?._id}`)
                              }
                            >
                              <i className="ki-filled ki-notepad-edit text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(page._id)}
                              disabled={isDeleting}
                            >
                              <i className="ki-filled ki-trash text-xl" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {customPages?.length === 0 && (
                    <tr>
                      <td colSpan="3" className="p-4 text-center">
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AllCustomPages;
