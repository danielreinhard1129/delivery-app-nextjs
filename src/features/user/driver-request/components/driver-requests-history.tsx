"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetDriverRequests from "@/features/admin/driver-request/api/useGetDriverRequests";
import { DriverRequestStatus } from "@/types/driver-request";
import { format } from "date-fns";

export function DriverRequestHistory() {
  const { data: driverRequests } = useGetDriverRequests({
    take: 3,
    sortOrder: "DESC",
  });

  const getStatusColor = (status: DriverRequestStatus) => {
    switch (status) {
      case DriverRequestStatus.APPROVED:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case DriverRequestStatus.REJECTED:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case DriverRequestStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  if (!driverRequests?.data.length) return;

  return (
    <Card
      id="driver-application-history"
      className="border-border mb-8 border shadow-lg"
    >
      <CardHeader>
        <CardTitle className="text-lg">Application History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {driverRequests.data.map((request) => (
            <div
              key={request.id}
              className="border-border flex items-start justify-between border-b pb-4 last:border-b-0"
            >
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                  <span className="text-muted-foreground text-sm">
                    {format(new Date(request.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="text-foreground text-sm">
                  <p>
                    <strong>Phone:</strong> {request.phoneNumber}
                  </p>
                  <p className="text-muted-foreground mt-1">
                    <strong>Address:</strong> {request.address}
                  </p>
                </div>
                {request.rejectionReason && (
                  <div className="text-destructive mt-2 text-sm">
                    <strong>Rejection Reason:</strong> {request.rejectionReason}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
