import WebsiteLayout from "@/components/WebsiteLayout";
import PageHero from "@/components/PageHero";
import ServiceCards from "@/components/ServiceCards";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import CallToAction from "@/components/CallToAction";

export default function Services() {
  return (
    <WebsiteLayout>
      <main>
        <PageHero 
          title="Our Services" 
          subtitle="End-to-end autonomous delivery solutions"
        />
        <ServiceCards />
        <HowItWorks />
        <Benefits />
        <CallToAction 
          title="Start Your Autonomous Delivery Journey Today"
          description="Partner with DELY X and revolutionize your delivery operations with intelligent automation."
          primaryButtonText="Get In Touch"
          primaryButtonHref="/contact"
          secondaryButtonText="View Product"
          secondaryButtonHref="/product"
        />
      </main>
    </WebsiteLayout>
  );
}
