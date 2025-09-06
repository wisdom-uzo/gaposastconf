"use client";

import { motion } from "framer-motion";
import { Brain, Recycle, Cpu, Database, Shield, Leaf, Microscope, Zap } from "lucide-react";
import { conferenceData } from "@/data/conference";

const themeIcons = {
  "AI": Brain,
  "Green": Leaf,
  "Robotics": Cpu,
  "Big Data": Database,
  "Blockchain": Shield,
  "Biotechnology": Microscope,
  "Nanotechnology": Zap,
  "Renewable": Recycle,
};

function getThemeIcon(theme) {
  for (const [key, Icon] of Object.entries(themeIcons)) {
    if (theme.toLowerCase().includes(key.toLowerCase())) {
      return Icon;
    }
  }
  return Brain; // Default icon
}

export default function Subthemes() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Conference Subthemes
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Explore {conferenceData.subthemes.length} cutting-edge research areas at the intersection of 
            artificial intelligence and circular economy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferenceData.subthemes.map((theme, index) => {
            const IconComponent = getThemeIcon(theme);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                      {theme}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Contribute to the Future?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Submit your research abstract and join leading scientists and researchers 
              in shaping the future of AI and circular economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
                Submit Abstract
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300">
                Download Call for Papers
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}