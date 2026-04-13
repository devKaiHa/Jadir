import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { ProjectsEndPoint } from "../Api/GlobalData";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery,
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: (query = "") => `${ProjectsEndPoint}?${query}`,
      providesTags: ["Project"],
    }),

    getOneProject: builder.query({
      query: (id) => `${ProjectsEndPoint}/${id}`,
      providesTags: ["Project"],
    }),

    postProject: builder.mutation({
      query: (formData) => ({
        url: ProjectsEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ProjectsEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${ProjectsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetOneProjectQuery,
  usePostProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
