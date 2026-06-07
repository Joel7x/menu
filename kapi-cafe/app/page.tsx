import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import FooterSection from "@/components/FooterSection";
import GoldProgressLine from "@/components/GoldProgressLine";
import OrderTray from "@/components/OrderTray";
import BootScreen from "@/components/BootScreen";

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", background: "#0d0500" }}>
      <BootScreen />
      <GoldProgressLine />
      <HeroSection />
      <MenuSection />
      <FooterSection />
      <OrderTray />
    </main>
  );
}
