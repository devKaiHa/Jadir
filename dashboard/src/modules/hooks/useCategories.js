import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetOneCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../rtk/categoriesApi";

export const useCategories = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllCategoriesQuery(queryString);

  const [postCategory, postState] = useCreateCategoryMutation();
  const [updateCategory, updateState] = useUpdateCategoryMutation();
  const [deleteCategory, deleteState] = useDeleteCategoryMutation();

  return {
    categories: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postCategory,
    isPosting: postState.isLoading,

    updateCategory,
    isUpdating: updateState.isLoading,

    deleteCategory,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneCategory = (id, options = {}) => {
  const query = useGetOneCategoryQuery(id, { skip: !id, ...options });

  return {
    category: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
