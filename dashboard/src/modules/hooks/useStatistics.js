import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteStatisticMutation,
  useGetAllStatisticsQuery,
  useGetOneStatisticQuery,
  usePostStatisticMutation,
  useUpdateStatisticMutation,
} from "../../rtk/statisticsApi";

export const useStatistics = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllStatisticsQuery(queryString);

  const [postStatistic, postState] = usePostStatisticMutation();
  const [updateStatistic, updateState] = useUpdateStatisticMutation();
  const [deleteStatistic, deleteState] = useDeleteStatisticMutation();

  return {
    statistics: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postStatistic,
    isPosting: postState.isLoading,

    updateStatistic,
    isUpdating: updateState.isLoading,

    deleteStatistic,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneStatistic = (id, options = {}) => {
  const query = useGetOneStatisticQuery(id, { skip: !id, ...options });

  return {
    statistic: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
