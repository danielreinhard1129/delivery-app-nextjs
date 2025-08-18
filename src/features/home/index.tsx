import PageWrapper from "@/components/page-wrapper";
import FAQs from "./components/faqs";
import Features from "./components/features";
import Hero from "./components/hero";
import Integrations from "./components/integrations";
import Testimonials from "./components/testimonials";

const Home = () => {
  return (
    <PageWrapper>
      <Hero />
      <Features />
      <Integrations />
      <Testimonials />
      <FAQs />
    </PageWrapper>
  );
};

export default Home;
