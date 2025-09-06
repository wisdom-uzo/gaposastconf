"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain, Recycle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { conferenceData } from "@/data/conference";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Subthemes", href: "#subthemes" },
    { name: "Speakers", href: "#speakers" },
    { name: "Schedule", href: "#schedule" },
    { name: "Registration", href: "#registration" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-white/20"
          : "bg-gradient-to-r from-white/10 via-white/5 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center space-x-2">
              <motion.div 
                className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Brain className="w-5 h-5 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300" />
              </motion.div>
              <motion.div 
                className="relative w-8 h-8 bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: -360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Recycle className="w-4 h-4 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300" />
              </motion.div>
            </div>
            <div>
              <h1 className={`font-bold text-lg leading-tight transition-all duration-300 ${
                isScrolled ? "text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" : "text-white drop-shadow-lg"
              }`}>
                {conferenceData.subtitle}
              </h1>
              <p className={`text-sm font-medium transition-colors duration-300 ${
                isScrolled ? "text-gray-600" : "text-blue-100 drop-shadow"
              }`}>
                Science & Technology
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
                    : "text-white hover:text-blue-200 hover:bg-white/20 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                {item.name}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className={`relative transition-all duration-300 font-semibold shadow-lg overflow-hidden ${
                  isScrolled
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white hover:shadow-xl"
                    : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 hover:shadow-xl"
                }`}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Submit Abstract
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ rotate: 180 }}
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 backdrop-blur-sm ${
              isScrolled
                ? "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
                : "text-white hover:bg-white/20 hover:shadow-lg"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-2xl"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 font-medium transition-all duration-300 group shadow-sm hover:shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.name}</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Submit Abstract
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}