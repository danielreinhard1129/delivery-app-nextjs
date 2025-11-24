import { User } from "./user";
import { Vehicle } from "./vehicle";

export enum DriverRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface DriverRequest {
  id: number;
  phoneNumber: string;
  address: string;
  ktp: string[]; // [bucket, key]
  sim: string[];
  stnk: string[];
  vehiclePhoto: string[];
  status: DriverRequestStatus;
  rejectionReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  vehicleId: number;

  user?: User;
  vehicle?: Vehicle;
}
