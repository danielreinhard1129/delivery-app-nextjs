"use client";

import type React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePresignedQuery } from "@/hooks/usePresignedViewUrls";
import type { DriverRequest } from "@/types/driver-request";
import { FileText, Mail, MapPin, Phone, User } from "lucide-react";
import { type FC, useMemo } from "react";

interface DialogDetailsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  selectedRequest: DriverRequest | null;
}

const DialogDetails: FC<DialogDetailsProps> = ({
  open,
  onOpenChange,
  selectedRequest,
}) => {
  const allKeys = useMemo(() => {
    if (!selectedRequest) return null;

    return [
      selectedRequest.ktp[1],
      selectedRequest.sim[1],
      selectedRequest.stnk[1],
      selectedRequest.vehiclePhoto[1],
    ];
  }, [selectedRequest]);

  const { data, isLoading, error } = usePresignedQuery(allKeys);

  const getUrl = (key: string) => data?.find((item) => item.key === key)?.url;

  const renderImages = (
    label: string,
    icon: React.ReactNode,
    items?: string[],
  ) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="text-blue-600">{icon}</div>
        <h3 className="font-semibold text-gray-900">{label}</h3>
      </div>

      {isLoading && (
        <div className="flex aspect-video w-full animate-pulse items-center justify-center rounded-lg border border-gray-200 bg-gray-100">
          <p className="text-sm text-gray-500">Loading image…</p>
        </div>
      )}
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
          Failed to fetch presigned URL
        </p>
      )}

      {!isLoading && items?.length && (
        <div
          onClick={() => {
            const url = getUrl(items?.[1]);
            if (url) window.open(url, "_blank");
          }}
          className="aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
        >
          <img
            src={getUrl(items?.[1]) || "/placeholder.svg"}
            alt={label}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );

  if (!selectedRequest) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto md:max-w-4xl lg:max-w-5xl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Driver Request Details
          </DialogTitle>
          <DialogDescription className="mt-1 text-gray-600">
            Review submitted driver request information and documents
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* User Info Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Full Name */}
              <div className="flex gap-3 rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-50 p-3">
                <User className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-gray-600 uppercase">
                    Full Name
                  </p>
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {selectedRequest?.user?.fullName}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 rounded-lg border border-purple-100 bg-gradient-to-br from-purple-50 to-purple-50 p-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-gray-600 uppercase">
                    Email
                  </p>
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {selectedRequest?.user?.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 rounded-lg border border-green-100 bg-gradient-to-br from-green-50 to-green-50 p-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-gray-600 uppercase">
                    Phone
                  </p>
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {selectedRequest?.phoneNumber}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-3 rounded-lg border border-orange-100 bg-gradient-to-br from-orange-50 to-orange-50 p-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-gray-600 uppercase">
                    Address
                  </p>
                  <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {selectedRequest?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Documents</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {renderImages(
                "KTP (Identity Card)",
                <FileText className="h-5 w-5" />,
                selectedRequest?.ktp,
              )}
              {renderImages(
                "SIM (Driving License)",
                <FileText className="h-5 w-5" />,
                selectedRequest?.sim,
              )}
              {renderImages(
                "STNK (Vehicle Registration)",
                <FileText className="h-5 w-5" />,
                selectedRequest?.stnk,
              )}
              {renderImages(
                "Vehicle Photos",
                <FileText className="h-5 w-5" />,
                selectedRequest?.vehiclePhoto,
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetails;
