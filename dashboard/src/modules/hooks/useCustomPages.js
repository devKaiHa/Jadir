import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteCustomPageMutation,
  useGetAllCustomPagesQuery,
  useGetOneCustomPageQuery,
  usePostCustomPageMutation,
  useUpdateCustomPageMutation,
} from "../../rtk/customPagesApi";

export const useCustomPages = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllCustomPagesQuery(queryString);

  const [postCustomPage, postState] = usePostCustomPageMutation();
  const [updateCustomPage, updateState] = useUpdateCustomPageMutation();
  const [deleteCustomPage, deleteState] = useDeleteCustomPageMutation();

  return {
    customPages: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postCustomPage,
    isPosting: postState.isLoading,

    updateCustomPage,
    isUpdating: updateState.isLoading,

    deleteCustomPage,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneCustomPage = (id, options = {}) => {
  const query = useGetOneCustomPageQuery(id, { skip: !id, ...options });

  return {
    customPage: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
