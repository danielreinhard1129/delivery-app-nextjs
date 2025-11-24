"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

interface HeaderProps {
  onChangeStatus: (status: string) => void;
}

const Header: FC<HeaderProps> = ({ onChangeStatus }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Driver Request</h1>
      <div className="flex items-center justify-between">
        <Select
          onValueChange={(value) => {
            if (value === "all") onChangeStatus("");
            else onChangeStatus(value);
          }}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;
