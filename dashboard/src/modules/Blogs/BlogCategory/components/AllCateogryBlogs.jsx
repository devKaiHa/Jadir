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

  const localizedCategoriesCount = categories.filter(
    (category) =>
      category?.name?.en || category?.name?.ar,
  ).length;

  return (
    <Container>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Blog Categories
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Organize blog content into clear editorial groups
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Manage the categories used across the blog listing and article workflow.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Total Categories</div>
                <div className="mt-2 text-2xl font-semibold">{categories.length}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Named</div>
                <div className="mt-2 text-2xl font-semibold">{localizedCategoriesCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex justify-end">
            <AddButton
              label="New Category"
              onClick={() => setOpenAddCategory(true)}
            />
          </div>
        </div>

        <div className="card card-grid min-w-full rounded-3xl border border-gray-200 shadow-sm">
          <div className="card-header py-5 flex-wrap">
            <div>
              <h3 className="card-title">Categories</h3>
              <p className="mt-1 text-sm text-gray-500">
                Showing {categories.length} available categories
              </p>
            </div>
          </div>

          <div className="card-body">
            {categories?.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categories.map((category) => (
                  <div
                    key={category?._id}
                    className="rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          {category?.name?.en ||
                            category?.name?.ar}
                        </h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {category?.name?.en ? (
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
                              EN
                            </span>
                          ) : null}
                          {category?.name?.ar ? (
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
                              AR
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <Tooltip title="Edit" placement="top">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleEditClick(category)}
                        >
                          <i className="ki-filled ki-notepad-edit text-xl" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
                <h4 className="text-base font-semibold text-gray-900">No categories found</h4>
                <p className="mt-2 text-sm text-gray-500">
                  Add your first category to organize blog posts.
                </p>
              </div>
            )}
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
