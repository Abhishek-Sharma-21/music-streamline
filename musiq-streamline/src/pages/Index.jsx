import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import MusicPlayer from "@/components/layout/MusicPlayer";
import SocialSidebar from "@/components/layout/SocialSidebar";

import HomeView from "@/components/views/HomeView";
import SearchView from "@/components/views/SearchView";
import LibraryView from "@/components/views/LibraryView";
import ProfileView from "@/components/views/ProfileView";
import { trendingSongs } from "@/data/mockData";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const viewComponents = {
  home: HomeView,
  search: SearchView,
  library: LibraryView,
  liked: LibraryView,
  playlists: LibraryView,
  artists: LibraryView,
  profile: ProfileView,
  radio: HomeView, // Placeholder for radio view if needed
  trending: SearchView // Placeholder
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [currentSong, setCurrentSong] = useState(trendingSongs[0]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePlay = (song) => setCurrentSong(song);

  const handleNavigate = (section) => {
    const restrictedSections = ["library", "liked", "playlists", "artists", "radio"];
    
    if (restrictedSections.includes(section) && !isAuthenticated) {
      toast("Authentication Required", {
        description: "Please log in to access your library and premium features.",
        action: {
          label: "Log In",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }
    
    setActiveSection(section);
    setMobileNavOpen(false);
  };

  const ActiveView = viewComponents[activeSection] || HomeView;

  return (
    <div className="min-h-screen font-sans bg-[#0B0F14]">
      <div className="hidden lg:block">
        <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      </div>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="p-0 w-[90vw] max-w-[320px] bg-transparent border-0">
          <Sidebar
            variant="content"
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
        </SheetContent>
      </Sheet>

      <TopNav onSearch={() => {}} onOpenSidebar={() => setMobileNavOpen(true)} onNavigate={handleNavigate} />
      <SocialSidebar />

      <main className="min-h-screen overflow-y-auto scrollbar-hide pt-24 pb-32 px-4 sm:px-6 lg:px-8 lg:ml-[260px] xl:mr-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveView currentSong={currentSong} onPlay={handlePlay} />
          </motion.div>
        </AnimatePresence>
      </main>

      <MusicPlayer currentSong={currentSong} />
    </div>
  );
};

export default Index;
