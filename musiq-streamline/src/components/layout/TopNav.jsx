import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Bell, ChevronDown, X } from "lucide-react";
import { trendingSongs } from "@/data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const TopNav = ({ onSearch, onOpenSidebar, onNavigate }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const results =
    query.length > 0
      ? trendingSongs
          .filter(
            (s) =>
              s.title.toLowerCase().includes(query.toLowerCase()) ||
              s.artist.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
      : [];

  return (
    <header
      className="fixed top-0 z-30 h-20 flex items-center gap-4 px-4 sm:px-6 lg:px-8 left-0 right-0 lg:left-[260px] xl:right-[280px]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(11,15,20,0.98) 0%, rgba(11,15,20,0) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <button
        type="button"
        onClick={onOpenSidebar}
        className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white/70"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1 max-w-xl relative">
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: focused
              ? "1px solid rgba(0,229,255,0.5)"
              : "1px solid rgba(255,255,255,0.06)",
            boxShadow: focused ? "0 0 12px rgba(0,229,255,0.15)" : "none",
          }}
        >
          <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            className="flex-1 bg-transparent text-white/90 placeholder:text-white/25 text-sm outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-white/30 hover:text-white/60"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {focused && query.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50"
              style={{
                background: "rgba(15,20,28,0.97)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              }}
            >
              {results.length > 0 ? (
                <>
                  <div className="px-4 pt-3 pb-2">
                    <div className="flex gap-2">
                      {["All", "Songs", "Artists", "Albums"].map((f) => (
                        <button
                          key={f}
                          className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/50 hover:border-primary/50 hover:text-primary transition-all first:bg-primary/10 first:border-primary/30 first:text-primary"
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  {results.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/90 truncate">
                          {song.title}
                        </p>
                        <p className="text-xs text-white/40 truncate">
                          {song.artist}
                        </p>
                      </div>
                      <span className="text-xs text-white/25 font-mono">
                        {song.duration}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="px-4 py-6 text-center text-white/30 text-sm">
                  No results for "{query}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hidden sm:flex">
          <Bell className="w-4 h-4 text-white/60" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary shadow-glow-cyan"></div>
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              {isAuthenticated ? (user?.name?.charAt(0)?.toUpperCase() || "U") : "G"}
            </div>
            <span className="text-sm text-white/80 hidden sm:block">
              {isAuthenticated ? (user?.name || "User") : "Guest"}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-white/40 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full right-0 mt-2 w-48 rounded-2xl overflow-hidden z-50"
                style={{
                  background: "rgba(15,20,28,0.97)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                }}
              >
                {isAuthenticated ? (
                  ["Profile", "Settings", "Premium", "Sign out"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        if (item === "Sign out") handleLogout();
                        else if (item === "Profile" && onNavigate) {
                          onNavigate("profile");
                          setProfileOpen(false);
                        }
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                        item === "Sign out"
                          ? "text-red-400/80 border-t border-white/5 mt-1"
                          : "text-white/70"
                      }`}
                    >
                      {item}
                    </button>
                  ))
                ) : (
                  <button
                    onClick={handleLogin}
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 text-primary"
                  >
                    Log In / Sign Up
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
