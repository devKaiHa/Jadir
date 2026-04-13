import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeletePartnerMutation,
  useGetAllPartnersQuery,
  useGetOnePartnerQuery,
  usePostPartnerMutation,
  useUpdatePartnerMutation,
} from "../../rtk/partnersApi";

export const usePartners = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllPartnersQuery(queryString);

  const [postPartner, postState] = usePostPartnerMutation();
  const [updatePartner, updateState] = useUpdatePartnerMutation();
  const [deletePartner, deleteState] = useDeletePartnerMutation();

  return {
    partners: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postPartner,
    isPosting: postState.isLoading,

    updatePartner,
    isUpdating: updateState.isLoading,

    deletePartner,
    isDeleting: deleteState.isLoading,
  };
};

export const useOnePartner = (id, options = {}) => {
  const query = useGetOnePartnerQuery(id, { skip: !id, ...options });

  return {
    partner: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
