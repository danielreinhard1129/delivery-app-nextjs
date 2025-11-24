import { FC, PropsWithChildren } from "react";
import { SiteHeader } from "./site-header";
import { SidebarInset } from "./ui/sidebar";

interface DashboardWrapperProps extends PropsWithChildren {
  breadcrumbLists: { href: string; label: string; isActive?: boolean }[];
}

const DashboardWrapper: FC<DashboardWrapperProps> = ({
  children,
  breadcrumbLists,
}) => {
  return (
    <SidebarInset>
      <SiteHeader breadcrumbLists={breadcrumbLists} />
      <div className="">{children}</div>
    </SidebarInset>
  );
};

export default DashboardWrapper;
