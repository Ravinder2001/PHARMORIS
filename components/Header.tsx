"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { NavItem } from "@/lib/types";

interface HeaderProps {
  activeNav: string;
  onNavChange: (key: string) => void;
}

export default function Header({ activeNav, onNavChange }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-colors duration-200 dark:border-[#1E1F28] dark:bg-[#0A0B0F]/90">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#4F6EF7]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-widest text-gray-900 dark:text-[#F0F1F5]">
            PHARMORIS
          </span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {navItems.map((item: NavItem) => {
            const isActive = activeNav === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavChange(item.key)}
                className={`relative rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "text-gray-900 dark:text-[#F0F1F5]"
                      : "text-gray-500 hover:text-gray-900 dark:text-[#8B8FA8] dark:hover:text-[#C8CDE0]"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-gray-100 dark:bg-[#1E1F28]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right side — theme toggle + avatar/placeholder */}
        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-[#8B8FA8] dark:hover:bg-[#1E1F28] dark:hover:text-[#F0F1F5] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          )}
          
          <div className="h-px w-px" aria-hidden="true" />
          <div
            className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-[#4F6EF7]/10 text-xs font-semibold text-[#4F6EF7] ring-1 ring-[#4F6EF7]/20 dark:bg-[#4F6EF7]/20 dark:ring-[#4F6EF7]/30"
            aria-label="User profile"
          >
            RN
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-[#8B8FA8] dark:hover:bg-[#1E1F28] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-b border-gray-200 bg-white dark:border-[#1E1F28] dark:bg-[#0A0B0F]"
        >
          <nav className="flex flex-col px-4 py-4 space-y-1">
            {navItems.map((item: NavItem) => {
              const isActive = activeNav === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavChange(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-gray-100 text-gray-900 dark:bg-[#1E1F28] dark:text-[#F0F1F5]"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-[#8B8FA8] dark:hover:bg-[#13141D] dark:hover:text-[#F0F1F5]"
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
