import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteTestimonialMutation,
  useGetAllTestimonialsQuery,
  useGetOneTestimonialQuery,
  usePostTestimonialMutation,
  useUpdateTestimonialMutation,
} from "../../rtk/testimonialsApi";

export const useTestimonials = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllTestimonialsQuery(queryString);

  const [postTestimonial, postState] = usePostTestimonialMutation();
  const [updateTestimonial, updateState] = useUpdateTestimonialMutation();
  const [deleteTestimonial, deleteState] = useDeleteTestimonialMutation();

  return {
    testimonials: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    postTestimonial,
    isPosting: postState.isLoading,
    updateTestimonial,
    isUpdating: updateState.isLoading,
    deleteTestimonial,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneTestimonial = (id, options = {}) => {
  const query = useGetOneTestimonialQuery(id, { skip: !id, ...options });

  return {
    testimonial: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
