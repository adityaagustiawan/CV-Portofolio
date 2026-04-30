import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import ScrollToTop from "@/components/layout/ScrollToTop";
import IntroOverlay from "@/components/intro/IntroOverlay";
import GameBackground from "@/components/layout/GameBackground";
import VideoBackground from "@/components/layout/VideoBackground";
import AIAgentUI from "@/components/ui/AIAgentUI";
import { Outlet } from "react-router-dom";

export default function SiteLayout() {
  return (
    <div id="top" className="min-h-dvh bg-zinc-950 text-zinc-50 selection:bg-cyan-500/30">
      <ScrollToTop />
      <GameBackground />
      <VideoBackground />
      <SiteHeader />
      <IntroOverlay />
      <main className="relative">
        <Outlet />
      </main>
      <AIAgentUI />
      <SiteFooter />
    </div>
  );
}

