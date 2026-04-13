import React, { useState } from "react";
import { Container, Tooltip } from "@mui/material";
import LoadingCard from "@/components/Global/LoadingCard";
import ErrorMessageCard from "@/components/Global/ErrorMessageCard";
import AddButton from "@/components/Global/AddButton";
import { ToastContainer } from "react-toastify";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { useCategories } from "../../../hooks/useCategories";

const AllCateogryBlogs = () => {
  const { categories, isLoading, error } = useCategories({
    limit: 100,
  });

  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setOpenUpdateCategory(true);
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Blog Categories</h3>
            <div className="flex gap-6">
              <AddButton
                label="New Category"
                onClick={() => setOpenAddCategory(true)}
              />
            </div>
          </div>

          <div className="card-body">
            <div data-datatable="true" data-datatable-page-size="5">
              <div className="scrollable-x-auto">
                <table
                  className="table table-auto table-border"
                  id="grid_table"
                >
                  <thead>
                    <tr>
                      <th className="min-w-[175px]">Category</th>
                      <th className="w-[80px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((category) => (
                      <tr key={category?._id}>
                        <td className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800">
                            {category?.name?.en ||
                              category?.name?.ar ||
                              category?.name?.tr}
                          </span>
                        </td>

                        <td>
                          <div className="flex gap-3">
                            <Tooltip title="Edit" placement="top">
                              <button
                                className="cursor-pointer"
                                onClick={() => handleEditClick(category)}
                              >
                                <i className="ki-filled ki-notepad-edit text-xl" />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {!categories?.length && (
                      <tr>
                        <td
                          colSpan={2}
                          className="text-center py-6 text-gray-500"
                        >
                          No categories found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddCategoryModal
        isOpen={openAddCategory}
        onClose={() => setOpenAddCategory(false)}
      />

      <UpdateCategoryModal
        isOpen={openUpdateCategory}
        onClose={() => setOpenUpdateCategory(false)}
        initialCategory={selectedCategory}
      />

      <ToastContainer />
    </Container>
  );
};

export default AllCateogryBlogs;
