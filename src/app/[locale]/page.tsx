// Home Page combining various sections


import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HomeHeroSection } from "@/container/home/heroSection";
import { HomeInfoSection } from "@/container/home/infoSection";
import { HomeMapSection } from "@/container/home/mapSection";
import { CardNavigation } from "@/container/home/cardNavigation";

export default function Home() {

  /**
   * 
   * Home Page combining Hero, Info, and Map sections along with Footer
   * 
   *  @returns {JSX.Element}
   * 
   */

  return (
    <main className="min-h-screen flex flex-col font-sans">

      {/* Hero Section */}
      <HomeHeroSection />

      {/* Card Navigation */}
      <CardNavigation />

      {/* Info Section */}
      <HomeInfoSection />

      {/* Map Section */}
      <HomeMapSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
