import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteResearchMutation,
  useGetAllResearchQuery,
  useGetOneResearchQuery,
  usePostResearchMutation,
  useUpdateResearchMutation,
} from "../../rtk/researchApi";

export const useResearch = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllResearchQuery(queryString);

  const [postResearch, postState] = usePostResearchMutation();
  const [updateResearch, updateState] = useUpdateResearchMutation();
  const [deleteResearch, deleteState] = useDeleteResearchMutation();

  return {
    research: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postResearch,
    isPosting: postState.isLoading,

    updateResearch,
    isUpdating: updateState.isLoading,

    deleteResearch,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneResearch = (id, options = {}) => {
  const query = useGetOneResearchQuery(id, { skip: !id, ...options });

  return {
    researchItem: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
