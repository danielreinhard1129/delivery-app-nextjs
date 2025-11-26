import DriverRequest from "@/features/user/driver-request";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const DriverRequestPage = async () => {
  const session = await auth();

  if (session?.user.role !== "USER") return redirect("/");

  return <DriverRequest />;
};

export default DriverRequestPage;
