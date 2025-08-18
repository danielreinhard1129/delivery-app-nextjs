import { montserrat } from "@/assets/fonts";
import { IconPlaneDeparture } from "@tabler/icons-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="home"
      className="flex items-center gap-2 font-bold"
    >
      <IconPlaneDeparture />
      <span className={`${montserrat.className} text-lg`}>
        Fast
        <span className="text-primary">Delivery</span>
      </span>
    </Link>
  );
};

export default Logo;
