import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session) return redirect("/login");

  if (role === "USER") return redirect("/");

  if (role === "DRIVER") return redirect("/dashboard/driver");

  return <main>{children}</main>;
}
