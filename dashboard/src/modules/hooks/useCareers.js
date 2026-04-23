import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteCareerMutation,
  useGetCareersQuery,
  useGetOneCareerQuery,
  usePostCareerMutation,
  useUpdateCareerMutation,
} from "../../rtk/careersApi";

export const useCareers = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetCareersQuery(queryString);
  const [postCareer, postState] = usePostCareerMutation();
  const [updateCareer, updateState] = useUpdateCareerMutation();
  const [deleteCareer, deleteState] = useDeleteCareerMutation();

  return {
    careers: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    postCareer,
    isPosting: postState.isLoading,
    updateCareer,
    isUpdating: updateState.isLoading,
    deleteCareer,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneCareer = (id, options = {}) => {
  const query = useGetOneCareerQuery(id, { skip: !id, ...options });

  return {
    career: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
