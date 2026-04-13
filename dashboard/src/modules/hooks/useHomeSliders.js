import { buildQueryString } from "../../hooks/buildQueryString";
import {
  useDeleteHomeSliderMutation,
  useGetAllHomeSlidersQuery,
  useGetOneHomeSliderQuery,
  usePostHomeSliderMutation,
  useUpdateHomeSliderBulkMutation,
  useUpdateHomeSliderMutation,
} from "../../rtk/homeSliderApi";

export const useHomeSliders = (params = {}) => {
  const queryString = buildQueryString(params);
  const query = useGetAllHomeSlidersQuery(queryString);

  const [postHomeSlider, postState] = usePostHomeSliderMutation();
  const [updateHomeSlider, updateState] = useUpdateHomeSliderMutation();
  const [updateHomeSliderBulk, bulkState] = useUpdateHomeSliderBulkMutation();
  const [deleteHomeSlider, deleteState] = useDeleteHomeSliderMutation();

  return {
    sliders: query.data?.data || [],
    pagination: query.data?.pagination || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    postHomeSlider,
    isPosting: postState.isLoading,

    updateHomeSlider,
    isUpdating: updateState.isLoading,

    updateHomeSliderBulk,
    isBulkUpdating: bulkState.isLoading,

    deleteHomeSlider,
    isDeleting: deleteState.isLoading,
  };
};

export const useOneHomeSlider = (id, options = {}) => {
  const query = useGetOneHomeSliderQuery(id, {
    skip: !id,
    ...options,
  });

  return {
    slider: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
