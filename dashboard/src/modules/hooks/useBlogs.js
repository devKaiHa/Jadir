import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useGetOneBlogQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
} from "../../rtk/blogsApi";

export const useBlogs = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllBlogsQuery(queryString);

  const [postBlog, postState] = usePostBlogMutation();
  const [updateBlog, updateState] = useUpdateBlogMutation();
  const [deleteBlog, deleteState] = useDeleteBlogMutation();

  return {
    blogs: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postBlog,
    isPosting: postState.isLoading,

    updateBlog,
    isUpdating: updateState.isLoading,

    deleteBlog,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneBlog = (id, options = {}) => {
  const query = useGetOneBlogQuery(id, { skip: !id, ...options });

  return {
    blog: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
