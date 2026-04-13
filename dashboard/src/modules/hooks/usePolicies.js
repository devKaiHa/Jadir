import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeletePolicyMutation,
  useGetAllPoliciesQuery,
  useGetOnePolicyQuery,
  usePostPolicyMutation,
  useUpdatePolicyMutation,
} from "../../rtk/policiesApi";

export const usePolicies = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllPoliciesQuery(queryString);

  const [postPolicy, postState] = usePostPolicyMutation();
  const [updatePolicy, updateState] = useUpdatePolicyMutation();
  const [deletePolicy, deleteState] = useDeletePolicyMutation();

  return {
    policies: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    postPolicy,
    isPosting: postState.isLoading,
    updatePolicy,
    isUpdating: updateState.isLoading,
    deletePolicy,
    isDeleting: deleteState.isLoading,
  };
};

export const useOnePolicy = (id, options = {}) => {
  const query = useGetOnePolicyQuery(id, { skip: !id, ...options });

  return {
    policy: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
