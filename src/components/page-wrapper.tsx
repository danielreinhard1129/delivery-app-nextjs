import { PropsWithChildren } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div id="page-wrapper" className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-14 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default PageWrapper;
