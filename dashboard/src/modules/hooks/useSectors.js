import {
  useDeleteSectorMutation,
  useGetAllSectorsQuery,
  useGetOneSectorQuery,
  usePostSectorMutation,
  useUpdateSectorMutation,
} from "../../rtk/sectorsApi";

export const useSectors = (query = "") => {
  const { data, isLoading, isFetching, error, refetch } =
    useGetAllSectorsQuery(query);

  const [postSector, postResult] = usePostSectorMutation();
  const [updateSector, updateResult] = useUpdateSectorMutation();
  const [deleteSector, deleteResult] = useDeleteSectorMutation();

  return {
    sectors: data?.data || data?.sectors || data || [],
    isLoading,
    isFetching,
    error,
    refetch,

    postSector,
    isPosting: postResult.isLoading,

    updateSector,
    isUpdating: updateResult.isLoading,

    deleteSector,
    isDeleting: deleteResult.isLoading,
  };
};

export const useOneSector = (id) => {
  const { data, isLoading, error, refetch } = useGetOneSectorQuery(id, {
    skip: !id,
  });

  return {
    sector: data?.data || data?.sector || data || null,
    isLoading,
    error,
    refetch,
  };
};
