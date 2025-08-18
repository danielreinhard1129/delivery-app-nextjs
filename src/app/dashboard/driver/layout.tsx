import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardDriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "DRIVER") return redirect("/login");

  return <main>{children}</main>;
}
