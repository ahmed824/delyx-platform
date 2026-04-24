import WebsiteLayout from "@/components/WebsiteLayout";
import PageHero from "@/components/PageHero";
import ProductFeatures from "@/components/ProductFeatures";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import ProductGallery from "@/components/ProductGallery";
import UseCases from "@/components/UseCases";
import CallToAction from "@/components/CallToAction";

export default function Product() {
  return (
    <WebsiteLayout>
      <main>
        <PageHero 
          title="DELY X Autonomous Delivery Robot" 
          subtitle="Precision delivery powered by AI and robotics"
        />
        <ProductFeatures />
        <TechnicalSpecs />
        <ProductGallery />
        <UseCases />
        <CallToAction 
          title="Ready to Transform Your Delivery Operations?"
          description="Contact our team to learn how DELY X can optimize delivery for your organization."
          primaryButtonText="Schedule a Demo"
          primaryButtonHref="/contact"
          secondaryButtonText="View Services"
          secondaryButtonHref="/services"
        />
      </main>
    </WebsiteLayout>
  );
}
