export interface Vehicle {
  id: number;
  name: string;
  image: [string, string] | null; // [bucket_name, key_name]
  description: string;
  standardPricePerKm: string;
  hematPricePerKm: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
