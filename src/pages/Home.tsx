import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import ValueProposition from "@/components/home/ValueProposition";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <ValueProposition />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
