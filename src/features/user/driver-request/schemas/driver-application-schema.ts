import { z } from "zod";

export const driverApplicationSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address cannot exceed 500 characters"),
  ktp: z.instanceof(File, { message: "ID card (KTP) is required" }),
  sim: z.instanceof(File, { message: "Driver's license (SIM) is required" }),
  stnk: z.instanceof(File, {
    message: "Vehicle registration (STNK) is required",
  }),
  vehiclePhoto: z.instanceof(File, { message: "Vehicle photo is required" }),
});

export type DriverApplicationFormData = z.infer<typeof driverApplicationSchema>;
