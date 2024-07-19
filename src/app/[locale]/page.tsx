import DownloadSection from "@/components/sections/DownloadSection";
import FAQCollapse from "@/components/sections/FAQSection";
import FooterSection from "@/components/sections/FooterSection";
import SupportedSocialSection from "@/components/sections/SupportedSocialSection";
// import EngageSection from "@/components/sections/EngageSection";
// import FooterSection from "@/components/sections/FooterSection";
// import HelpUsSection from "@/components/sections/HelpUsSection";
// import HeroSection from "@/components/sections/HeroSection";
// import KickstartSection from "@/components/sections/KickstartSection";
// import OnboardSection from "@/components/sections/OnboardSection";
// import ReimagineSection from "@/components/sections/ReimagineSection";
// import StartupSection from "@/components/sections/StartupSection";

export default function Home() {
  return (
    <div>
      <DownloadSection />
      <SupportedSocialSection />
      <FAQCollapse />
    </div>
  );
}
