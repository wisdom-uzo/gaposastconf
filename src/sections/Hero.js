import { Button } from "@/components/ui/button";
import { conferenceData } from "@/data/conference";
import { formatDate, formatTime } from "@/lib/utils";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Conference Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {conferenceData.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-6 text-blue-100">
            {conferenceData.subtitle}
          </p>
          
          {/* Theme */}
          <p className="text-lg md:text-xl mb-8 text-blue-200">
            Theme: {conferenceData.theme}
          </p>
          
          {/* Description */}
          <p className="text-lg mb-12 max-w-3xl mx-auto text-blue-100">
            {conferenceData.description}
          </p>
          
          {/* Event Details */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-12">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(conferenceData.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{formatTime(conferenceData.time)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{conferenceData.venue}</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Register Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              View Schedule
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}