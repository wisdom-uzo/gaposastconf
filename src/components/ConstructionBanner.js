import { AlertTriangle, Wrench } from "lucide-react";
import { conferenceData } from "@/data/conference";

export default function ConstructionBanner() {
  if (!conferenceData.isUnderConstruction) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-center space-x-3">
        <div className="flex items-center space-x-2">
          <Wrench className="w-5 h-5 animate-pulse" />
          <AlertTriangle className="w-5 h-5 animate-bounce" />
        </div>
        <span className="font-semibold text-center">
          {conferenceData.constructionMessage}
        </span>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 animate-bounce" />
          <Wrench className="w-5 h-5 animate-pulse" />
        </div>
      </div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>
    </div>
  );
}