import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post<User>(
        "/v1/auth/register",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Sign Up Success");
      router.push("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};
