import { axiosInstance } from "@/lib/axios";
import { DriverRequest, DriverRequestStatus } from "@/types/driver-request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Payload {
  status: DriverRequestStatus.APPROVED | DriverRequestStatus.REJECTED;
  rejectionReason?: string;
}

export const useUpdateDriverRequest = (id?: number) => {
  const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.patch<DriverRequest>(
        `/v1/driver-requests/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${session?.data?.user.accessToken}`,
          },
        },
      );
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["driver-requests"] });
      toast.success("Update driver request success");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};
