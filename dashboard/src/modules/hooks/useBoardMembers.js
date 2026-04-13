import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteBoardMemberMutation,
  useGetAllBoardMembersQuery,
  useGetOneBoardMemberQuery,
  usePostBoardMemberMutation,
  useUpdateBoardMemberMutation,
} from "../../rtk/boardMembersApi";

export const useBoardMembers = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllBoardMembersQuery(queryString);

  const [postBoardMember, postState] = usePostBoardMemberMutation();
  const [updateBoardMember, updateState] = useUpdateBoardMemberMutation();
  const [deleteBoardMember, deleteState] = useDeleteBoardMemberMutation();

  return {
    boardMembers: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postBoardMember,
    isPosting: postState.isLoading,

    updateBoardMember,
    isUpdating: updateState.isLoading,

    deleteBoardMember,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneBoardMember = (id, options = {}) => {
  const query = useGetOneBoardMemberQuery(id, { skip: !id, ...options });

  return {
    boardMember: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
