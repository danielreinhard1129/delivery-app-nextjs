import { axiosInstance } from "@/lib/axios";
import { PresignedUrl } from "@/types/presigned-url";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface Payload {
  key?: string;
  keys?: string[];
}

export const useCreatePresignedDriverUrls = () => {
  const session = useSession();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post<PresignedUrl[]>(
        "/v1/storages/presigned-upload-drivers",
        payload,
        {
          headers: {
            Authorization: `Bearer ${session?.data?.user.accessToken}`,
          },
        },
      );
      return data;
    },
  });
};
