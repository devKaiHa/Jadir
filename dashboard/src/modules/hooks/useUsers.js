import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetOneUserQuery,
  usePostUserMutation,
  useUpdateUserMutation,
} from "../../rtk/usersApi";

export const useUsers = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllUsersQuery(queryString);

  const [postUser, postState] = usePostUserMutation();
  const [updateUser, updateState] = useUpdateUserMutation();
  const [deleteUser, deleteState] = useDeleteUserMutation();

  return {
    users: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postUser,
    isPosting: postState.isLoading,

    updateUser,
    isUpdating: updateState.isLoading,

    deleteUser,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneUser = (id, options = {}) => {
  const query = useGetOneUserQuery(id, { skip: !id, ...options });

  return {
    user: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
