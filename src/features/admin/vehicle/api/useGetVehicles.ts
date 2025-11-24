"use client";

import { axiosInstance } from "@/lib/axios";
import {
  CursorPaginationQueries,
  PageableResponseCursor,
} from "@/types/pagination";
import { Vehicle } from "@/types/vehicle";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicles = (queries: CursorPaginationQueries) => {
  return useQuery({
    queryKey: ["vehicles", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponseCursor<Vehicle>>(
        "/v1/vehicles",
        { params: queries },
      );
      return data;
    },
  });
};
