import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteOurServiceMutation,
  useGetAllOurServicesQuery,
  useGetOneOurServiceQuery,
  usePostOurServiceMutation,
  useUpdateOurServiceMutation,
} from "../../rtk/ourServicesApi";

export const useOurServices = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllOurServicesQuery(queryString);

  const [postOurService, postState] = usePostOurServiceMutation();
  const [updateOurService, updateState] = useUpdateOurServiceMutation();
  const [deleteOurService, deleteState] = useDeleteOurServiceMutation();

  return {
    services: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postOurService,
    isPosting: postState.isLoading,

    updateOurService,
    isUpdating: updateState.isLoading,

    deleteOurService,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneOurService = (id, options = {}) => {
  const query = useGetOneOurServiceQuery(id, { skip: !id, ...options });

  return {
    service: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
