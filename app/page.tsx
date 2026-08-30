import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import ContactBanner from "@/components/ContactBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyUs />
      <Testimonials />
      <ContactBanner />
    </>
  );
}
