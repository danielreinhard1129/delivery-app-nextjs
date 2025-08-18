import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "SUPER_ADMIN") return redirect("/login");

  return <main>{children}</main>;
}
