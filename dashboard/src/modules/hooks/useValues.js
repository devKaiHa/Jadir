import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteValueMutation,
  useGetAllValuesQuery,
  useGetOneValueQuery,
  usePostValueMutation,
  useUpdateValueMutation,
} from "../../rtk/valuesApi";

export const useValues = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllValuesQuery(queryString);

  const [postValue, postState] = usePostValueMutation();
  const [updateValue, updateState] = useUpdateValueMutation();
  const [deleteValue, deleteState] = useDeleteValueMutation();

  return {
    values: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postValue,
    isPosting: postState.isLoading,

    updateValue,
    isUpdating: updateState.isLoading,

    deleteValue,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneValue = (id, options = {}) => {
  const query = useGetOneValueQuery(id, { skip: !id, ...options });

  return {
    value: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
