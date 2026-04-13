import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useGetOneProjectQuery,
  usePostProjectMutation,
  useUpdateProjectMutation,
} from "../../rtk/projectsApi";

export const useProjects = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllProjectsQuery(queryString);

  const [postProject, postState] = usePostProjectMutation();
  const [updateProject, updateState] = useUpdateProjectMutation();
  const [deleteProject, deleteState] = useDeleteProjectMutation();

  return {
    projects: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postProject,
    isPosting: postState.isLoading,

    updateProject,
    isUpdating: updateState.isLoading,

    deleteProject,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneProject = (id, options = {}) => {
  const query = useGetOneProjectQuery(id, { skip: !id, ...options });

  return {
    project: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
