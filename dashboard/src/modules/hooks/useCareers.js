import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useCreateCareerTemplateMutation,
  useDeleteCareerMutation,
  useGetCareersQuery,
  useGetCareerApplicationsQuery,
  useGetCareerStatisticsQuery,
  useGetCareerTemplatesQuery,
  useGetOneCareerQuery,
  usePostCareerMutation,
  useUpdateCareerApplicationStatusMutation,
  useUpdateCareerMutation,
} from "../../rtk/careersApi";

export const useCareers = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetCareersQuery(queryString);
  const [postCareer, postState] = usePostCareerMutation();
  const [updateCareer, updateState] = useUpdateCareerMutation();
  const [deleteCareer, deleteState] = useDeleteCareerMutation();
  const [createTemplate, createTemplateState] =
    useCreateCareerTemplateMutation();

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
    createTemplate,
    isCreatingTemplate: createTemplateState.isLoading,
  };
};

export const useCareerTemplates = () => {
  const query = useGetCareerTemplatesQuery();

  return {
    templates: query.data?.data || [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useCareerStatistics = () => {
  const query = useGetCareerStatisticsQuery();

  return {
    statistics: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
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

export const useCareerApplications = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetCareerApplicationsQuery(queryString);
  const [updateStatus, updateStatusState] =
    useUpdateCareerApplicationStatusMutation();

  return {
    applications: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    updateStatus,
    isUpdatingStatus: updateStatusState.isLoading,
  };
};
