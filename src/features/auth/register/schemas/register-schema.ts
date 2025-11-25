import z from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "FullName must be at least 2 characters." }),
  email: z.email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
