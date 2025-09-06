"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CreditCard, Users, Calendar, CheckCircle, Star, Globe, UserPlus } from "lucide-react";
import { conferenceData } from "@/data/conference";

export default function Registration() {
  const [particles, setParticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Generate deterministic particle positions
    const particleData = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: (i * 41 + 29) % 100,
      top: (i * 59 + 13) % 100,
      duration: 5 + (i % 2),
      delay: (i % 3) * 0.7,
    }));
    setParticles(particleData);
  }, []);

  const registrationTiers = [
    {
      name: "Student",
      price: "TBD",
      description: "For undergraduate and graduate students",
      features: [
        "Access to all sessions",
        "Conference materials",
        "Networking events",
        "Student poster session",
        "Certificate of participation"
      ],
      icon: Users,
      color: "blue"
    },
    {
      name: "Academic",
      price: "TBD",
      description: "For faculty and researchers",
      features: [
        "All student benefits",
        "Priority seating",
        "Access to speaker meet & greet",
        "Research collaboration opportunities",
        "Publication opportunities"
      ],
      icon: Star,
      color: "emerald",
      popular: true
    },
    {
      name: "Industry",
      price: "TBD",
      description: "For industry professionals",
      features: [
        "All academic benefits",
        "VIP networking sessions",
        "Industry partnership opportunities",
        "Technology showcase access",
        "Premium conference materials"
      ],
      icon: Globe,
      color: "purple"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50" />
        <img 
          src="/images/conference-network.svg" 
          alt="Conference Network" 
          className="absolute left-0 top-0 w-1/2 h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-white/70 to-white/50" />
      </div>
      
      {/* Floating registration elements */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-3 h-3 bg-emerald-400 rounded-full opacity-20"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                x: [-15, 15, -15],
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
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full px-6 py-3 mb-6 border border-emerald-200"
          >
            <UserPlus className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-semibold">Conference Registration</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 bg-clip-text text-transparent mb-6">
            Conference Registration
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Join leading researchers, academics, and industry professionals at ICONFST'25. 
            Choose the registration tier that best fits your needs.
          </p>
        </motion.div>

        {/* Registration Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-white shadow-xl border border-white/50 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative z-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8">
              <motion.div
                className="w-16 h-16 mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Calendar className="w-16 h-16 mx-auto" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Registration Opening Soon</h3>
              <p className="text-lg opacity-90 mb-6">
                Registration will open once the conference program is finalized. 
                Stay tuned for early bird pricing and special offers!
              </p>
              <motion.button 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Notified When Registration Opens
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Registration Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {registrationTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 ${
                  tier.popular 
                    ? 'border-emerald-500 transform scale-105' 
                    : 'border-slate-200'
                } hover:shadow-xl transition-all duration-300`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`w-16 h-16 bg-gradient-to-br from-${tier.color}-500 to-${tier.color}-600 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                  {tier.name}
                </h3>
                
                <p className="text-slate-600 text-center mb-6">
                  {tier.description}
                </p>
                
                <div className="text-center mb-8">
                  <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                  {tier.price !== "TBD" && <span className="text-slate-600 ml-2">USD</span>}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className={`w-5 h-5 text-${tier.color}-500 mr-3 flex-shrink-0`} />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    tier.popular
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : `bg-${tier.color}-500 text-white hover:bg-${tier.color}-600`
                  }`}
                  disabled
                >
                  Coming Soon
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Registration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            What's Included
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Networking</h4>
              <p className="text-slate-600 text-sm">Connect with global experts and peers</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Certification</h4>
              <p className="text-slate-600 text-sm">Official conference participation certificate</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Materials</h4>
              <p className="text-slate-600 text-sm">Conference proceedings and resources</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Global Access</h4>
              <p className="text-slate-600 text-sm">International research collaboration opportunities</p>
            </div>
          </div>
        </motion.div>

        {/* Contact for Registration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-6">
              Questions About Registration?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
              Our registration team is here to help you choose the best option for your needs. 
              Contact us for group discounts, special accommodations, or any other inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors duration-300">
                Contact Registration Team
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300">
                View Registration FAQ
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}