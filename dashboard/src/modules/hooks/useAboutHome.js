import {
  useGetAboutHomeQuery,
  useUpdateAboutHomeMutation,
} from "../../rtk/aboutHomeApi";

const useAboutHome = () => {
  const query = useGetAboutHomeQuery();
  const [updateAboutHome, updateState] = useUpdateAboutHomeMutation();

  return {
    aboutHome: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    updateAboutHome,
    isUpdating: updateState.isLoading,
    updateError: updateState.error,
    updateSuccess: updateState.isSuccess,
  };
};

export default useAboutHome;
