import DashboardSidebar from "@/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <DashboardSidebar>{children}</DashboardSidebar>
    </main>
  );
}
