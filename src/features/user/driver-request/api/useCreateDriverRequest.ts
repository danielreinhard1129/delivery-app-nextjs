import { axiosInstance } from "@/lib/axios";
import { DriverRequest } from "@/types/driver-request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Payload {
  phoneNumber: string;
  address: string;
  ktp: string[];
  sim: string[];
  stnk: string[];
  vehiclePhoto: string[];
}

export const useCreateDriverRequest = () => {
  const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post<DriverRequest>(
        "/v1/driver-requests",
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
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};
