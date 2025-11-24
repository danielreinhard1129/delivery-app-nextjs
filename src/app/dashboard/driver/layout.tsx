import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardDriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session) return redirect("/login");

  if (role === "USER") return redirect("/");

  if (role === "SUPER_ADMIN") return redirect("/dashboard/admin");

  return <main>{children}</main>;
}
