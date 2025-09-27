"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  GraduationCap, 
  Globe, 
  MapPin, 
  UserPlus,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

// Form validation schema
const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  institution: z.string().min(2, "Institution/Organization is required"),
  department: z.string().min(2, "Department is required"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  registrationType: z.enum(["Physical", "Virtual"], {
    required_error: "Please select a registration type",
  }),
});

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [particles, setParticles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  useEffect(() => {
    // Generate background particles
    const particleData = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: (i * 37 + 23) % 100,
      top: (i * 43 + 17) % 100,
      duration: 6 + (i % 3),
      delay: (i % 4) * 0.5,
    }));
    setParticles(particleData);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Registration successful! We will contact you soon.' });
        reset();
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <Header />
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-purple-300/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Conference Registration
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join ICONFST&apos;25 - International Conference on Science and Technology. 
              Register now to secure your spot at this groundbreaking event.
            </p>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-purple-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClasses}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("firstName")}
                      className={inputClasses}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClasses}>Middle Name</label>
                    <input
                      type="text"
                      {...register("middleName")}
                      className={inputClasses}
                      placeholder="Enter your middle name"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("lastName")}
                      className={inputClasses}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-purple-600" />
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className={inputClasses}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClasses}>
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className={inputClasses}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-3 text-purple-600" />
                  Professional Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>
                      Institution/Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("institution")}
                      className={inputClasses}
                      placeholder="Enter your institution or organization"
                    />
                    {errors.institution && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.institution.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClasses}>
                      Department <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("department")}
                      className={inputClasses}
                      placeholder="Enter your department"
                    />
                    {errors.department && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-purple-600" />
                  Location Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("country")}
                      className={inputClasses}
                      placeholder="Enter your country"
                    />
                    {errors.country && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClasses}>
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("state")}
                      className={inputClasses}
                      placeholder="Enter your state"
                    />
                    {errors.state && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Registration Type Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-purple-600" />
                  Registration Type
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      {...register("registrationType")}
                      value="Physical"
                      className="sr-only peer"
                    />
                    <div className="p-6 rounded-xl border-2 border-gray-200 peer-checked:border-purple-500 peer-checked:bg-purple-50 transition-all duration-300 hover:border-purple-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Physical Attendance</h3>
                          <p className="text-gray-600 mt-1">Attend the conference in person</p>
                        </div>
                        <MapPin className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </label>

                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      {...register("registrationType")}
                      value="Virtual"
                      className="sr-only peer"
                    />
                    <div className="p-6 rounded-xl border-2 border-gray-200 peer-checked:border-purple-500 peer-checked:bg-purple-50 transition-all duration-300 hover:border-purple-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Virtual Attendance</h3>
                          <p className="text-gray-600 mt-1">Join the conference online</p>
                        </div>
                        <Globe className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </label>
                </div>
                
                {errors.registrationType && (
                  <p className="mt-4 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.registrationType.message}
                  </p>
                )}
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex items-center ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 mr-3" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-3" />
                  )}
                  {submitStatus.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Submitting Registration...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-3" />
                      Complete Registration
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}