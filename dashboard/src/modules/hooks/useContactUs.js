import {
  useGetContactUsQuery,
  useUpdateContactUsMutation,
} from "../../rtk/contactUsApi";

export const useContactUs = () => {
  const query = useGetContactUsQuery();
  const [updateContactUs, updateState] = useUpdateContactUsMutation();

  return {
    contactUs: query.data?.data || null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
    updateContactUs,
    isUpdating: updateState.isLoading,
  };
};
