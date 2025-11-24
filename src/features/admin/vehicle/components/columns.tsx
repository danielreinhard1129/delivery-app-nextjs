"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Vehicle } from "@/types/vehicle";
import { formatCurrency } from "@/utils/formatter";
import { getFileStorage } from "@/utils/get-file-storage";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<Vehicle>[] = [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageValue = row.getValue("image") as [string, string] | null;
      const fallbackSrc = "/fallback.png";
      let src = fallbackSrc;

      if (imageValue && imageValue.length === 2) {
        const [bucket, key] = imageValue;
        src = getFileStorage(bucket, key);
      }

      return (
        <Image
          src={src}
          alt="image vehicle"
          width={100}
          height={100}
          className="rounded-md object-cover"
          sizes="100vw"
          style={{
            maxWidth: "120px",
            height: "80px",
          }}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "standardPricePerKm",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Standard Price" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("standardPricePerKm"));
      const formatted = formatCurrency(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "hematPricePerKm",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hemat Price" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("hematPricePerKm"));
      const formatted = formatCurrency(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "isActive",
    cell: ({ row }) => {
      return <Switch checked={row.getValue("isActive")} />;
    },
  },
  {
    id: "actions",
    header: () => <div className="">Actions</div>,
    cell: ({ row }) => {
      //   const payment = row.original;

      return (
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
              // onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
