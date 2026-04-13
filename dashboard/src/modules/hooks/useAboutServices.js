import {
  useGetAboutServicesQuery,
  useUpdateAboutServicesMutation,
} from "../../rtk/aboutServicesApi";

const useAboutServices = () => {
  const query = useGetAboutServicesQuery();
  const [updateAboutServices, updateState] = useUpdateAboutServicesMutation();

  return {
    aboutServices: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    updateAboutServices,
    isUpdating: updateState.isLoading,
    updateError: updateState.error,
    updateSuccess: updateState.isSuccess,
  };
};

export default useAboutServices;
