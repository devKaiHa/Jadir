import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeletePlanMutation,
  useGetAllPlansQuery,
  useGetOnePlanQuery,
  usePostPlanMutation,
  useUpdatePlanMutation,
} from "../../rtk/plansApi";

export const usePlans = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllPlansQuery(queryString);

  const [postPlan, postState] = usePostPlanMutation();
  const [updatePlan, updateState] = useUpdatePlanMutation();
  const [deletePlan, deleteState] = useDeletePlanMutation();

  return {
    plans: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postPlan,
    isPosting: postState.isLoading,

    updatePlan,
    isUpdating: updateState.isLoading,

    deletePlan,
    isDeleting: deleteState.isLoading,
  };
};

export const useOnePlan = (id, options = {}) => {
  const query = useGetOnePlanQuery(id, { skip: !id, ...options });

  return {
    plan: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
