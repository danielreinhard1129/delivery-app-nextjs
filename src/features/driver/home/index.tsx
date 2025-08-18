import DashboardWrapper from "@/components/dashboard-wrapper";

const DashboardDriver = () => {
  return (
    <DashboardWrapper
      breadcrumbLists={[{ href: "", label: "Dashboard", isActive: true }]}
    >
      <div>
        <h1>DashboardDriver</h1>
      </div>
    </DashboardWrapper>
  );
};

export default DashboardDriver;
