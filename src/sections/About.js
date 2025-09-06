"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, Recycle, Globe, Users, Award, Target, Lightbulb, Zap } from "lucide-react";
import { conferenceData } from "@/data/conference";

export default function About() {
  const [particles, setParticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate deterministic particle positions
    const particleData = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: (i * 43 + 19) % 100,
      top: (i * 53 + 31) % 100,
      duration: 4 + (i % 2),
      delay: (i % 4) * 0.5,
    }));
    setParticles(particleData);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-blue-100" />
        <img 
          src="/images/ai-sustainability.svg" 
          alt="Background" 
          className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/50" />
      </div>
      
      {/* Floating background elements */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-4 h-4 bg-blue-200 rounded-full opacity-20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.1, 0.3, 0.1],
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
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full px-6 py-3 mb-6 border border-blue-200"
          >
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-semibold">About the Conference</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-emerald-800 bg-clip-text text-transparent mb-6">
            About ICONFST&apos;25
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            The International Conference on Science and Technology brings together leading researchers, 
            innovators, and industry experts to explore the transformative potential of artificial intelligence 
            and circular economy solutions.
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-white/50 overflow-hidden"
        >
          {/* Card background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-emerald-800 bg-clip-text text-transparent">Conference Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                ICONFST&apos;25 aims to foster collaboration between artificial intelligence researchers and 
                circular economy experts to address one of the most pressing challenges of our time: 
                global waste management and environmental sustainability.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Through interdisciplinary dialogue and innovative research presentations, we seek to 
                identify synergistic solutions that leverage AI technologies to accelerate the transition 
                to a circular economy and mitigate global waste crises.
              </p>
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <Recycle className="w-4 h-4 text-emerald-600" />
                </motion.div>
                <span className="text-emerald-700 font-semibold">Sustainable AI Solutions</span>
              </div>
            </div>
            <div className="relative">
              <motion.div 
                className="w-full h-64 bg-gradient-to-br from-blue-100 via-purple-50 to-emerald-100 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-emerald-200/30"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Globe className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-gray-700 font-semibold">Global Impact</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200/50 shadow-lg"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Brain className="w-12 h-12 text-blue-600 mb-4" />
            </motion.div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">AI Innovation</h4>
            <p className="text-slate-600">Cutting-edge artificial intelligence research and applications</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200/50 shadow-lg"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Recycle className="w-12 h-12 text-emerald-600 mb-4" />
            </motion.div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Circular Economy</h4>
            <p className="text-slate-600">Sustainable solutions for waste reduction and resource optimization</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200/50 shadow-lg"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Globe className="w-12 h-12 text-purple-600 mb-4" />
            </motion.div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Global Impact</h4>
            <p className="text-slate-600">International collaboration for worldwide environmental challenges</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200/50 shadow-lg"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <Users className="w-12 h-12 text-orange-600 mb-4" />
            </motion.div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Networking</h4>
            <p className="text-slate-600">Connect with leading researchers and industry professionals</p>
          </motion.div>
        </div>

        {/* Conference Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <Target className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Conference Objectives
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Knowledge Exchange
              </h4>
              <p className="text-slate-600">
                Facilitate the sharing of cutting-edge research findings and innovative solutions 
                in AI and circular economy domains.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Collaborative Research
              </h4>
              <p className="text-slate-600">
                Foster interdisciplinary collaboration between AI researchers and sustainability experts 
                to develop integrated solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Policy Impact
              </h4>
              <p className="text-slate-600">
                Influence policy development and implementation strategies for sustainable 
                technology adoption and waste management.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-full mb-6">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Join the Future of Sustainable Technology</span>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Be part of this groundbreaking conference that will shape the future of AI-driven 
            sustainability solutions. Submit your research, connect with peers, and contribute 
            to solving global environmental challenges.
          </p>
        </motion.div>
      </div>
    </section>
  );
}