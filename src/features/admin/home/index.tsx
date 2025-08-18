import DashboardWrapper from "@/components/dashboard-wrapper";
import { SectionCards } from "@/components/section-cards";

const DashboardAdmin = () => {
  return (
    <DashboardWrapper
      breadcrumbLists={[{ href: "", label: "Dashboard", isActive: true }]}
    >
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardAdmin;
