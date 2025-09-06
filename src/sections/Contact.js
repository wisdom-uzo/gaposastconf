"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Globe, Send, MessageCircle, Users, Network } from "lucide-react";
import { conferenceData } from "@/data/conference";

export default function Contact() {
  const [particles, setParticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate deterministic particle positions
    const particleData = Array.from({ length: 7 }, (_, i) => ({
      id: i,
      left: (i * 39 + 27) % 100,
      top: (i * 61 + 11) % 100,
      duration: 3 + (i % 2),
      delay: (i % 4) * 0.5,
    }));
    setParticles(particleData);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50" />
        <img 
          src="/images/conference-network.svg" 
          alt="Conference Network" 
          className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/50" />
      </div>
      
      {/* Floating contact elements */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
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
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 mb-6 border border-blue-200"
          >
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-semibold">Get In Touch</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Have questions about ICONFST'25? We're here to help. Reach out to our organizing committee 
            for any inquiries about submissions, registration, or conference details.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8">
              Get in Touch
            </h3>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-start space-x-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="w-6 h-6 text-blue-600" />
                </motion.div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">{conferenceData.contact.email}</p>
                  <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Phone className="w-6 h-6 text-emerald-600" />
                </motion.div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">{conferenceData.contact.phone}</p>
                  <p className="text-sm text-gray-500 mt-1">Available Monday - Friday, 9 AM - 5 PM</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="w-6 h-6 text-purple-600" />
                </motion.div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">{conferenceData.location}</p>
                  <p className="text-sm text-gray-500 mt-1">Conference venue details coming soon</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Globe className="w-6 h-6 text-orange-600" />
                </motion.div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Website</h4>
                  <p className="text-gray-600">www.iconfst2025.org</p>
                  <p className="text-sm text-gray-500 mt-1">Visit for latest updates and announcements</p>
                </div>
              </motion.div>
            </div>

            {/* Quick Contact Options */}
            <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Quick Contact</h4>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Send Email</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-300">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Live Chat</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM0 20.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8">
                  Send us a Message
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 bg-white/70 backdrop-blur-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 bg-white/70 backdrop-blur-sm">
                      <option value="">Select a topic</option>
                      <option value="submission">Paper Submission</option>
                      <option value="registration">Registration</option>
                      <option value="speakers">Speaking Opportunities</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 resize-none bg-white/70 backdrop-blur-sm"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-xl font-bold mb-4">Organizing Committee</h4>
                <p className="opacity-90">
                  Led by distinguished faculty from leading universities worldwide, 
                  ensuring the highest academic standards.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Technical Support</h4>
                <p className="opacity-90">
                  Our technical team provides 24/7 support for submission systems, 
                  registration, and conference platform access.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-4">Media Inquiries</h4>
                <p className="opacity-90">
                  Press and media representatives can contact our communications team 
                  for interviews, press releases, and conference coverage.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}