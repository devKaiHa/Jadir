import {
  useGetPageBannersQuery,
  useUpdatePageBannersMutation,
} from "../../rtk/pageBannersApi";

export const usePageBanners = () => {
  const query = useGetPageBannersQuery();
  const [updatePageBanners, updateState] = useUpdatePageBannersMutation();

  return {
    pageBanners: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    updatePageBanners,
    isUpdating: updateState.isLoading,
  };
};
