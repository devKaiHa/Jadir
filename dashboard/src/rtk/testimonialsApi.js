import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import { TestimonialsEndPoint } from "../Api/GlobalData";

export const testimonialsApi = createApi({
  reducerPath: "testimonialsApi",
  baseQuery,
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    getAllTestimonials: builder.query({
      query: (query = "") => `${TestimonialsEndPoint}?${query}`,
      providesTags: ["Testimonial"],
    }),

    getOneTestimonial: builder.query({
      query: (id) => `${TestimonialsEndPoint}/${id}`,
      providesTags: ["Testimonial"],
    }),

    postTestimonial: builder.mutation({
      query: (formData) => ({
        url: TestimonialsEndPoint,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Testimonial"],
    }),

    updateTestimonial: builder.mutation({
      query: ({ id, data }) => ({
        url: `${TestimonialsEndPoint}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Testimonial"],
    }),

    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `${TestimonialsEndPoint}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonial"],
    }),
  }),
});

export const {
  useGetAllTestimonialsQuery,
  useGetOneTestimonialQuery,
  usePostTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialsApi;
