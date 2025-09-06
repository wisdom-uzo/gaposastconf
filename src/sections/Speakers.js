"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, Mail, Calendar, Award, MessageSquare, ExternalLink, Mic, Star } from "lucide-react";
import { conferenceData } from "@/data/conference";

export default function Speakers() {
  const [particles, setParticles] = useState([]);
  const [ctaParticles, setCtaParticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate deterministic particle positions for floating network nodes
    const particleData = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: (i * 37 + 23) % 100,
      top: (i * 41 + 17) % 100,
      duration: 3 + (i % 3),
      delay: (i % 4) * 0.5,
    }));
    setParticles(particleData);
    
    // Generate deterministic positions for call-to-action background elements
    const ctaParticleData = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: (i * 53 + 29) % 100,
      top: (i * 61 + 31) % 100,
      duration: 8 + (i % 3) * 2,
      delay: (i % 3) * 0.7,
    }));
    setCtaParticles(ctaParticleData);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
        <img 
          src="/images/conference-network.svg" 
          alt="Conference Network" 
          className="absolute left-0 top-0 w-1/2 h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-white/70 to-white/50" />
      </div>
      
      {/* Floating network nodes */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-3 h-3 bg-blue-300 rounded-full opacity-30"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-6 py-3 mb-6 border border-purple-200"
          >
            <Mic className="w-5 h-5 text-purple-600" />
            <span className="text-purple-800 font-semibold">Featured Speakers</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
            Keynote Speakers
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Distinguished experts and thought leaders will share their insights on artificial intelligence 
            and circular economy innovations.
          </p>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center mb-16 border border-white/50 overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10">
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Users className="w-12 h-12 text-white" />
            </motion.div>
            
            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Speakers Announcement Coming Soon
            </h3>
            
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              We are finalizing our lineup of distinguished keynote speakers and industry experts. 
              Stay tuned for announcements of world-class researchers and thought leaders who will share 
              their insights on AI and circular economy innovations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Notified
              </motion.button>
              <motion.button 
                className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-white/50 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Past Speakers
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Call for Speakers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-2xl shadow-xl p-12 text-center text-white overflow-hidden"
        >
          {/* Animated background elements */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden">
              {ctaParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-20 h-20 border border-white/20 rounded-full"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: [0, 360],
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
          
          <div className="relative z-10">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Award className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            </motion.div>
            
            <h3 className="text-3xl font-bold mb-6">Call for Speakers</h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
              Are you a researcher, industry expert, or thought leader in AI or sustainability? 
              We invite you to share your groundbreaking work and insights with our global audience.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <MessageSquare className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Keynote Presentations</h4>
                <p className="text-sm opacity-80">45-minute featured talks on cutting-edge research</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <Users className="w-8 h-8 mx-auto mb-3 text-purple-200" />
                <h4 className="font-semibold mb-2">Panel Discussions</h4>
                <p className="text-sm opacity-80">Interactive sessions with industry experts</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <Calendar className="w-8 h-8 mx-auto mb-3 text-emerald-200" />
                <h4 className="font-semibold mb-2">Workshop Sessions</h4>
                <p className="text-sm opacity-80">Hands-on learning experiences and tutorials</p>
              </motion.div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Proposal
              </motion.button>
              <motion.button 
                className="border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Speaker Guidelines
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}