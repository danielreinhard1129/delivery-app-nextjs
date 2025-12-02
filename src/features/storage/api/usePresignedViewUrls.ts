import { axiosInstance } from "@/lib/axios";
import { PresignedUrl } from "@/types/presigned-url";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const usePresignedQuery = (keys: string[] | null) => {
  const session = useSession();

  return useQuery({
    queryKey: ["presigned-view", keys],
    queryFn: async () => {
      const { data } = await axiosInstance.post<PresignedUrl[]>(
        "/v1/storages/presigned-views-drivers",
        { keys },
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        },
      );

      return data;
    },
    enabled: !!keys && keys.length > 0 && !!session.data?.user.accessToken,
    staleTime: 0,
  });
};
