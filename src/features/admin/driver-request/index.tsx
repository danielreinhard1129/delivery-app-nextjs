"use client";

import DashboardWrapper from "@/components/dashboard-wrapper";
import { DataTable } from "@/components/data-table";
import { OffsetPaginationSection } from "@/components/pagination-section";
import { DriverRequest, DriverRequestStatus } from "@/types/driver-request";
import dynamic from "next/dynamic";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import useGetDriverRequests from "./api/useGetDriverRequests";
import { useUpdateDriverRequest } from "./api/useUpdateDriverRequest";
import { getColumns } from "./components/columns";
import Header from "./components/header";

const DialogDetails = dynamic(() => import("./components/dialog-details"), {
  ssr: false,
});

const DialogConfirmation = dynamic(
  () => import("@/components/dialog-confirmation"),
  { ssr: false },
);

const DialogReject = dynamic(() => import("./components/dialog-reject"), {
  ssr: false,
});

const AdminDriverRequest = () => {
  const [modalOpen, setModalOpen] = useState({
    details: false,
    accept: false,
    reject: false,
  });

  const [selectedRequest, setSelectedRequest] = useState<DriverRequest | null>(
    null,
  );

  const columns = getColumns({
    onClickDetails: (req) => {
      setSelectedRequest(req);
      setModalOpen((prev) => ({ ...prev, details: true }));
    },
    onClickAccept: (req) => {
      setSelectedRequest(req);
      setModalOpen((prev) => ({ ...prev, accept: true }));
    },
    onClickReject: (req) => {
      setSelectedRequest(req);
      setModalOpen((prev) => ({ ...prev, reject: true }));
    },
  });

  const [status, setStatus] = useQueryState("status", { defaultValue: "" });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data: driverRequests, isPending } = useGetDriverRequests({
    page,
    status,
  });

  const { mutateAsync: updateDriverRequest } = useUpdateDriverRequest(
    selectedRequest?.id,
  );

  return (
    <DashboardWrapper
      breadcrumbLists={[
        { href: "/dashboard/admin", label: "Dashboard" },
        { href: "", label: "Driver Requests", isActive: true },
      ]}
    >
      <div className="m-4 flex flex-col gap-4 md:m-8">
        <Header onChangeStatus={setStatus} />

        <DataTable
          columns={columns}
          data={driverRequests?.data}
          isPending={isPending}
        />

        {!!driverRequests?.data.length && (
          <OffsetPaginationSection
            meta={driverRequests.meta}
            onChangePage={setPage}
          />
        )}
      </div>

      <DialogDetails
        selectedRequest={selectedRequest}
        open={modalOpen.details}
        onOpenChange={(open) => {
          setModalOpen((prev) => ({ ...prev, details: open }));
        }}
      />
      <DialogConfirmation
        title="Accept Request"
        open={modalOpen.accept}
        onOpenChange={(open) => {
          setModalOpen((prev) => ({ ...prev, accept: open }));
        }}
        onConfirm={async () => {
          await updateDriverRequest({ status: DriverRequestStatus.APPROVED });
          setModalOpen((prev) => ({ ...prev, accept: false }));
        }}
      />
      <DialogReject
        open={modalOpen.reject}
        onOpenChange={(open) => {
          setModalOpen((prev) => ({ ...prev, reject: open }));
        }}
        onConfirm={async (reason) => {
          await updateDriverRequest({
            status: DriverRequestStatus.REJECTED,
            rejectionReason: reason,
          });
          setModalOpen((prev) => ({ ...prev, reject: false }));
        }}
      />
    </DashboardWrapper>
  );
};

export default AdminDriverRequest;
