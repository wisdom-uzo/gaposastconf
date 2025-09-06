"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Coffee, Presentation, CalendarDays, Timer } from "lucide-react";
import { conferenceData } from "@/data/conference";

export default function Schedule() {
  const [particles, setParticles] = useState([]);
  const [backgroundParticles, setBackgroundParticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate deterministic particle positions for floating elements
    const particleData = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: (i * 45 + 15) % 100,
      top: (i * 55 + 25) % 100,
      duration: 4 + (i % 2),
      delay: (i % 4) * 0.5,
    }));
    setParticles(particleData);
    
    // Generate deterministic positions for background elements
    const bgParticleData = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: (i * 67 + 33) % 100,
      top: (i * 73 + 19) % 100,
      duration: 10 + (i % 3) * 2,
      delay: (i % 3) * 1,
    }));
    setBackgroundParticles(bgParticleData);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50" />
        <img 
          src="/images/hero-bg.svg" 
          alt="Conference Background" 
          className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/50" />
      </div>
      
      {/* Floating time elements */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-4 h-4 bg-blue-400 rounded-full opacity-20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.4, 0.1],
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
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full px-6 py-3 mb-6 border border-blue-200"
          >
            <CalendarDays className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-semibold">Event Schedule</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-emerald-800 bg-clip-text text-transparent mb-6">
            Conference Schedule
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            A comprehensive program featuring keynote presentations, research sessions, 
            and networking opportunities across multiple days.
          </p>
        </motion.div>

        {/* Schedule Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-white/50 overflow-hidden shadow-xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20h20v20H20z'/%3E%3Cpath d='M0 0h20v20H0z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative z-10">
              <motion.div 
                className="w-24 h-24 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Calendar className="w-12 h-12 text-white" />
              </motion.div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-emerald-800 bg-clip-text text-transparent mb-6">
                Detailed Schedule Coming Soon
              </h3>
              
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                We are carefully curating a dynamic program that will maximize learning opportunities 
                and foster meaningful connections between AI and circular economy communities.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div 
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Presentation className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Keynote Sessions</h4>
                  <p className="text-gray-600 text-sm">Inspiring presentations from industry leaders</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Users className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Research Papers</h4>
                  <p className="text-gray-600 text-sm">Latest findings in AI and sustainability</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Coffee className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Networking Breaks</h4>
                  <p className="text-gray-600 text-sm">Connect with peers and experts</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Panel Discussions</h4>
                  <p className="text-gray-600 text-sm">Interactive sessions on key topics</p>
                </motion.div>
              </div>

              <motion.div 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Program Details Coming Soon</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Preliminary Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-emerald-800 bg-clip-text text-transparent text-center mb-12">
            Preliminary Conference Timeline
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white font-bold text-xl">Day 1</span>
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Opening & Keynotes</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Welcome & Opening Ceremony</li>
                <li>• Keynote: AI Revolution Overview</li>
                <li>• Keynote: Circular Economy Fundamentals</li>
                <li>• Welcome Reception</li>
              </ul>
            </motion.div>

            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white font-bold text-xl">Day 2</span>
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Research & Innovation</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Technical Paper Sessions</li>
                <li>• AI Applications in Waste Management</li>
                <li>• Circular Economy Technologies</li>
                <li>• Poster Presentations</li>
              </ul>
            </motion.div>

            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white font-bold text-xl">Day 3</span>
              </motion.div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Collaboration & Future</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Panel Discussions</li>
                <li>• Industry Partnerships</li>
                <li>• Future Research Directions</li>
                <li>• Closing Ceremony</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Important Dates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 rounded-2xl p-8 md:p-12 text-white overflow-hidden">
            {/* Animated background elements */}
            {isMounted && (
              <div className="absolute inset-0 overflow-hidden">
                {backgroundParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-16 h-16 border border-white/20 rounded-full"
                    style={{
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.1, 0.3, 0.1],
                      rotate: [0, 180, 360],
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
              <h3 className="text-3xl font-bold text-center mb-8">
                Important Dates
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div 
                  className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Timer className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                  <div className="text-2xl font-bold mb-2">TBD</div>
                  <div className="text-sm opacity-90">Abstract Submission Deadline</div>
                </motion.div>
                
                <motion.div 
                  className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Users className="w-6 h-6 mx-auto mb-2 text-emerald-200" />
                  <div className="text-2xl font-bold mb-2">TBD</div>
                  <div className="text-sm opacity-90">Notification of Acceptance</div>
                </motion.div>
                
                <motion.div 
                  className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-200" />
                  <div className="text-2xl font-bold mb-2">TBD</div>
                  <div className="text-sm opacity-90">Early Bird Registration</div>
                </motion.div>
                
                <motion.div 
                  className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <CalendarDays className="w-6 h-6 mx-auto mb-2 text-yellow-200" />
                  <div className="text-2xl font-bold mb-2">{conferenceData.date}</div>
                  <div className="text-sm opacity-90">Conference Dates</div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}