import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteMessageMutation,
  useGetAllMessagesQuery,
  useGetOneMessageQuery,
  usePostMessageReplyMutation,
} from "../../rtk/messagesApi";

export const useMessages = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllMessagesQuery(queryString);

  const [postMessageReply, replyState] = usePostMessageReplyMutation();
  const [deleteMessage, deleteState] = useDeleteMessageMutation();

  return {
    messages: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postMessageReply,
    isReplying: replyState.isLoading,

    deleteMessage,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneMessage = (id, options = {}) => {
  const query = useGetOneMessageQuery(id, { skip: !id, ...options });

  return {
    messageItem: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
