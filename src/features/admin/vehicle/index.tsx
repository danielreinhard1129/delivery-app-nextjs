"use client";

import DashboardWrapper from "@/components/dashboard-wrapper";
import { CursorPaginationSection } from "@/components/pagination-section";
import { CursorPaginationQueries } from "@/types/pagination";
import { useState } from "react";
import { DataTable } from "../../../components/data-table";
import { useGetVehicles } from "./api/useGetVehicles";
import { columns } from "./components/columns";

const AdminVehicle = () => {
  const [pagination, setPagination] = useState<CursorPaginationQueries>({
    take: 5,
  });

  const { data: vehicle, isPending } = useGetVehicles(pagination);

  return (
    <DashboardWrapper
      breadcrumbLists={[
        { href: "/dashboard/admin", label: "Dashboard" },
        { href: "", label: "Vehicles", isActive: true },
      ]}
    >
      <div className="m-4 flex flex-col gap-4 md:m-8">
        <h1 className="text-2xl font-semibold">Vehicles</h1>

        <DataTable
          columns={columns}
          data={vehicle?.data}
          isPending={isPending}
        />

        {!!vehicle?.data?.length && (
          <CursorPaginationSection
            className="justify-end"
            response={vehicle}
            setPagination={setPagination}
          />
        )}
      </div>
    </DashboardWrapper>
  );
};

export default AdminVehicle;
