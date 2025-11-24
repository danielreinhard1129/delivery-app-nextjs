import { axiosInstance } from "@/lib/axios";
import { DriverRequest } from "@/types/driver-request";
import {
  OffsetPaginationQueries,
  PageableResponseOffset,
} from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface Queries extends OffsetPaginationQueries {
  status?: string;
}

const useGetDriverRequests = (queries?: Queries) => {
  const session = useSession();

  return useQuery({
    queryKey: ["driver-requests", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponseOffset<DriverRequest>
      >("/v1/driver-requests", {
        params: queries,
        headers: {
          Authorization: `Bearer ${session?.data?.user.accessToken}`,
        },
      });
      return data;
    },
    enabled: !!session?.data?.user.accessToken,
  });
};

export default useGetDriverRequests;
