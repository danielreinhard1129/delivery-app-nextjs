import PageWrapper from "@/components/page-wrapper";
import { DriverApplicationForm } from "./components/driver-applicantion-form";
import { DriverRequestHistory } from "./components/driver-requests-history";

const DriverRequest = () => {
  return (
    <PageWrapper>
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <DriverRequestHistory />
        <DriverApplicationForm />
      </div>
    </PageWrapper>
  );
};

export default DriverRequest;
