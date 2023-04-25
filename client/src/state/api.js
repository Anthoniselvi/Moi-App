import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Profiles", "Events"],
  endpoints: (build) => ({
    postProfile: build.query({
      query: (id) => "profile/add",
      providesTags: ["Profiles"],
    }),
    getProfile: build.query({
      query: () => "profile/all",
      providesTags: ["Profiles"],
    }),
    getSingleProfile: build.query({
      query: (id) => `profile/${id}`,
      providesTags: ["Profiles"],
    }),
    getEvents: build.query({
      query: () => "events/all",
      providesTags: ["Events"],
    }),
  }),
});

export const {
  usePostProfileQuery,
  useGetProfileQuery,
  useGetSingleProfileQuery,
  useGetEventsQuery,
} = api;
