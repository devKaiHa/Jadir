import {
  useGetFooterQuery,
  useUpdateFooterMutation,
} from "../../rtk/footerApi";

const useFooter = () => {
  const query = useGetFooterQuery();
  const [updateFooter, updateState] = useUpdateFooterMutation();

  return {
    footer: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,

    updateFooter,
    isUpdating: updateState.isLoading,
    updateError: updateState.error,
    updateSuccess: updateState.isSuccess,
  };
};

export default useFooter;
