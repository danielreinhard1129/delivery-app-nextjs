"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DriverRequest, DriverRequestStatus } from "@/types/driver-request";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

interface GetColumnsProps {
  onClickDetails: (req: DriverRequest) => void;
  onClickAccept: (req: DriverRequest) => void;
  onClickReject: (req: DriverRequest) => void;
}

export const getColumns = ({
  onClickDetails,
  onClickAccept,
  onClickReject,
}: GetColumnsProps): ColumnDef<DriverRequest>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },

  {
    id: "fullName",
    accessorFn: (row) => row.user?.fullName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("fullName")}</div>
    ),
  },

  {
    id: "email",
    accessorFn: (row) => row.user?.email,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("email")}</div>
    ),
  },

  {
    id: "phoneNumber",
    accessorFn: (row) => row.phoneNumber,
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("phoneNumber")}</div>
    ),
  },

  {
    id: "vehicleName",
    accessorFn: (row) => row?.vehicle?.name,
    header: "Vehicle",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("vehicleName")}</div>
    ),
  },

  {
    id: "status",
    accessorFn: (row) => row.status,
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as DriverRequestStatus;

      const colorClass =
        status === DriverRequestStatus.APPROVED
          ? "text-green-600"
          : status === DriverRequestStatus.REJECTED
            ? "text-red-600"
            : status === DriverRequestStatus.PENDING
              ? "text-yellow-600"
              : "text-gray-600";

      return <div className={`font-bold ${colorClass}`}>{status}</div>;
    },
  },

  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onClickDetails(row.original)}>
            Details
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onClickAccept(row.original)}>
            Accept
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClickReject(row.original)}>
            Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
