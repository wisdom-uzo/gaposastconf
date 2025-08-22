"use client";

import { Button } from "@/components/ui/button";
import { conferenceData } from "@/data/conference";
import { formatDate, formatTime } from "@/lib/utils";
import { Calendar, MapPin, Clock, Sparkles, Zap, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-70 animate-bounce"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Icons */}
        <motion.div className="absolute -top-10 left-1/4 text-yellow-400" variants={itemVariants}>
          <Sparkles className="w-8 h-8 animate-spin" />
        </motion.div>
        <motion.div className="absolute -top-5 right-1/4 text-cyan-400" variants={itemVariants}>
          <Zap className="w-6 h-6 animate-pulse" />
        </motion.div>
        <motion.div className="absolute top-5 left-1/3 text-pink-400" variants={itemVariants}>
          <Rocket className="w-7 h-7 animate-bounce" />
        </motion.div>

        {/* Conference Title */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          {conferenceData.title}
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-3xl mb-8 text-gray-200 font-light"
          variants={itemVariants}
        >
          {conferenceData.subtitle}
        </motion.p>
        
        {/* Theme with special styling */}
        <motion.div 
          className="mb-10"
          variants={itemVariants}
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm border border-purple-400/30 rounded-full">
            <p className="text-lg md:text-xl text-purple-200 font-medium">
              🎯 {conferenceData.theme}
            </p>
          </div>
        </motion.div>
        
        {/* Description */}
        <motion.p 
          className="text-lg md:text-xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed"
          variants={itemVariants}
        >
          {conferenceData.description}
        </motion.p>
        
        {/* Event Details */}
        <motion.div 
          className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 mb-12"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <Calendar className="w-6 h-6 text-cyan-400" />
            <span className="text-white font-medium">
              {conferenceData.date === "TBD" ? "Date: TBD" : formatDate(conferenceData.date)}
            </span>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <Clock className="w-6 h-6 text-purple-400" />
            <span className="text-white font-medium">
              {conferenceData.time === "TBD" ? "Time: TBD" : formatTime(conferenceData.time)}
            </span>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <MapPin className="w-6 h-6 text-pink-400" />
            <span className="text-white font-medium">{conferenceData.venue}</span>
          </div>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          variants={itemVariants}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            🚀 Get Notified
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
          >
            📋 Learn More
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  );
}