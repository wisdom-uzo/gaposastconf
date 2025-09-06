"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, ArrowRight, Brain, Recycle, Globe, Award, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { conferenceData } from "@/data/conference";
import { formatDate, formatTime } from "@/lib/utils";

export default function Hero() {
  const [particles, setParticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate deterministic particle positions
    const particleData = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 37 + 23) % 100, // Deterministic positioning
      top: (i * 47 + 17) % 100,
      duration: 3 + (i % 3),
      delay: (i % 5) * 0.4,
    }));
    setParticles(particleData);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero-bg.svg" 
          alt="Conference Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-blue-900/50 to-emerald-900/70" />
      </div>
      
      {/* Floating particles animation */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="text-left">
            {/* Conference Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8"
            >
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">International Conference 2025</span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-medium text-blue-300 mb-2">
                  {conferenceData.title}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
                  {conferenceData.subtitle}
                </span>
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Recycle className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Theme */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed font-light max-w-2xl">
                {conferenceData.theme}
              </p>
            </motion.div>

            {/* Conference Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-2xl"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Calendar className="w-6 h-6 text-blue-400 mb-2" />
                <h3 className="text-white font-medium text-sm mb-1">Date</h3>
                <p className="text-blue-200 text-sm">{conferenceData.date}</p>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <MapPin className="w-6 h-6 text-emerald-400 mb-2" />
                <h3 className="text-white font-medium text-sm mb-1">Location</h3>
                <p className="text-blue-200 text-sm">{conferenceData.venue}</p>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Users className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="text-white font-medium text-sm mb-1">Expected</h3>
                <p className="text-blue-200 text-sm">500+ Participants</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Submit Abstract</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Download Brochure</span>
              </motion.button>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex items-center space-x-6 text-sm text-blue-200"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Registration Open</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{conferenceData.subthemes.length} Research Topics</span>
              </div>
            </motion.div>
          </div>

          
          {/* Right Visual Content */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              {/* Main illustration */}
              <div className="relative">
                <img 
                  src="/images/ai-sustainability.svg" 
                  alt="AI and Sustainability" 
                  className="w-full max-w-lg mx-auto"
                />
                
                {/* Floating elements */}
                <motion.div
                  className="absolute top-10 right-10 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Brain className="w-6 h-6 text-blue-400" />
                </motion.div>
                
                <motion.div
                  className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <Recycle className="w-6 h-6 text-emerald-400" />
                </motion.div>
              </div>
              
              {/* Key Research Areas Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-bold text-white mb-4 text-center">Key Research Areas</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {conferenceData.subthemes.slice(0, 6).map((theme, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                      className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs text-white font-medium"
                    >
                      {theme}
                    </motion.span>
                  ))}
                  <span className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs text-white font-medium">
                    +{conferenceData.subthemes.length - 6} more
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}