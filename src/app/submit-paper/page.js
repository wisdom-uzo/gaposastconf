'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { UploadButton } from '@uploadthing/react';
import { FileText, Upload, CheckCircle, AlertCircle, User, Mail, Building, MapPin, Phone, Globe, X } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

// Form validation schema
const submitPaperSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  authorName: z.string().min(1, 'Author name is required'),
  authorEmail: z.string().email('Valid email is required'),
  authorPhone: z.string().min(1, 'Phone number is required'),
  authorInstitution: z.string().min(1, 'Institution is required'),
  presentationType: z.enum(['physical', 'virtual'], {
    required_error: 'Please select a presentation type',
  }),
  researchArea: z.string().min(1, 'Research area is required'),
  keywords: z.string().min(1, 'Keywords are required'),
  abstractFile: z.string().min(1, 'Abstract file is required'),
  fullPaperFile: z.string().optional(),
});

const researchAreas = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Computer Vision',
  'Natural Language Processing',
  'Robotics',
  'Cybersecurity',
  'Software Engineering',
  'Human-Computer Interaction',
  'Bioinformatics',
  'Other'
];

export default function SubmitPaperPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [abstractFile, setAbstractFile] = useState(null);
  const [fullPaperFile, setFullPaperFile] = useState(null);
  const [isAbstractUploading, setIsAbstractUploading] = useState(false);
  const [isFullPaperUploading, setIsFullPaperUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(submitPaperSchema),
  });

  // Watch form values for validation
  const watchedValues = watch();
  
  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      'title',
      'authorName', 
      'authorEmail',
      'authorPhone',
      'authorInstitution',
      'presentationType',
      'researchArea',
      'keywords',
      'abstractFile'
    ];
    
    return requiredFields.every(field => {
      const value = watchedValues[field];
      return value && value.toString().trim() !== '';
    }) && abstractFile; // Also check if abstract file is actually uploaded
  };

  const handleDeleteAbstractFile = () => {
    setAbstractFile(null);
    setValue('abstractFile', '');
  };

  const handleDeleteFullPaperFile = () => {
    setFullPaperFile(null);
    setValue('fullPaperFile', '');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit-paper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          abstractFile: abstractFile?.url,
          fullPaperFile: fullPaperFile?.url,
        }),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Paper submitted successfully!' });
        // Clear form after successful submission
        reset();
        setAbstractFile(null);
        setFullPaperFile(null);
      } else {
        const errorData = await response.json();
        setSubmitStatus({ 
          type: 'error', 
          message: errorData.message || 'Failed to submit paper. Please try again.' 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Submit Your Paper
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Submit your abstract and research paper for ICONFST&apos;25 - International Conference on Science and Technology.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-base font-semibold text-gray-800 mb-3">
                  Title of the Abstract *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  id="title"
                  className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500"
                  placeholder="Enter the title of your abstract"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.title.message}</p>
                )}
              </div>

              {/* Author Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="authorName" className="block text-base font-semibold text-gray-800 mb-3">
                    Corresponding Author&apos;s Name *
                  </label>
                  <input
                    {...register('authorName')}
                    type="text"
                    id="authorName"
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500"
                    placeholder="Enter your full name"
                  />
                  {errors.authorName && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.authorName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="authorEmail" className="block text-base font-semibold text-gray-800 mb-3">
                    Corresponding Author&apos;s Email *
                  </label>
                  <input
                    {...register('authorEmail')}
                    type="email"
                    id="authorEmail"
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500"
                    placeholder="Enter your email address"
                  />
                  {errors.authorEmail && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.authorEmail.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="authorPhone" className="block text-base font-semibold text-gray-800 mb-3">
                    Corresponding Author&apos;s Phone Number *
                  </label>
                  <input
                    {...register('authorPhone')}
                    type="tel"
                    id="authorPhone"
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500"
                    placeholder="Enter your phone number"
                  />
                  {errors.authorPhone && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.authorPhone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="authorInstitution" className="block text-base font-semibold text-gray-800 mb-3">
                    Corresponding Author&apos;s Institution *
                  </label>
                  <input
                    {...register('authorInstitution')}
                    type="text"
                    id="authorInstitution"
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500"
                    placeholder="Enter your institution name"
                  />
                  {errors.authorInstitution && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.authorInstitution.message}</p>
                  )}
                </div>
              </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="presentationType" className="block text-base font-semibold text-gray-800 mb-3">
                Presentation Type *
              </label>
              <select
                {...register('presentationType')}
                id="presentationType"
                className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                <option value="" className="text-gray-500">Select presentation type</option>
                <option value="physical" className="text-gray-900">Physical Presentation</option>
                <option value="virtual" className="text-gray-900">Virtual Presentation</option>
              </select>
              {errors.presentationType && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.presentationType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="researchArea" className="block text-base font-semibold text-gray-800 mb-3">
                Research Area *
              </label>
              <select
                {...register('researchArea')}
                id="researchArea"
                className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                <option value="" className="text-gray-500">Select research area</option>
                {researchAreas.map((area) => (
                  <option key={area} value={area.toLowerCase().replace(/\s+/g, '-')} className="text-gray-900">
                    {area}
                  </option>
                ))}
              </select>
              {errors.researchArea && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.researchArea.message}</p>
              )}
            </div>
          </div>

              {/* Keywords */}
              <div>
                <label htmlFor="keywords" className="block text-base font-semibold text-gray-800 mb-3">
                  Keywords *
                </label>
                <textarea
                  {...register('keywords')}
                  id="keywords"
                  rows={3}
                  className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
                  placeholder="Enter keywords separated by commas (e.g., artificial intelligence, machine learning, sustainability)"
                />
                {errors.keywords && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.keywords.message}</p>
                )}
              </div>

              {/* File Uploads */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Abstract File */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach the file of your abstract *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {isAbstractUploading ? (
                      <div className="text-blue-600">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="font-medium">Uploading abstract...</p>
                        <p className="text-sm text-gray-500">Please wait while your file is being uploaded</p>
                      </div>
                    ) : abstractFile ? (
                      <div className="text-green-600 relative bg-green-50 border border-green-200 rounded-lg p-4">
                        <button
                          type="button"
                          onClick={handleDeleteAbstractFile}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-semibold text-green-700">Abstract uploaded successfully!</p>
                        <p className="text-sm text-green-600 mt-1 pr-8">{abstractFile.name}</p>
                      </div>
                    ) : (
                      <div>
                        <UploadButton
                          endpoint="abstractUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Abstract upload complete on client:", res);
                            console.log("Endpoint used: abstractUploader");
                            setIsAbstractUploading(false);
                            if (res && res[0]) {
                              const fileUrl = res[0].url || res[0].fileUrl;
                              setAbstractFile(res[0]);
                              setValue('abstractFile', fileUrl);
                              console.log("Abstract file set:", res[0]);
                              console.log("Form value set to:", fileUrl);
                            }
                          }}
                          onUploadError={(error) => {
                            console.error("Abstract upload error:", error);
                            setIsAbstractUploading(false);
                            alert(`Abstract upload ERROR! ${error.message}`);
                          }}
                          onUploadBegin={(name) => {
                            console.log("Abstract upload begin:", name);
                            setIsAbstractUploading(true);
                          }}
                          appearance={{
                            button: "ut-ready:bg-blue-600 ut-ready:text-white ut-uploading:cursor-not-allowed ut-uploading:bg-blue-400",
                            container: "w-full flex-col",
                            allowedContent: "text-sm text-gray-600"
                          }}
                          content={{
                            button({ ready }) {
                              if (ready) return "Choose Abstract File";
                              return "Getting ready...";
                            },
                            allowedContent({ ready, fileTypes, isUploading }) {
                              if (!ready) return "Checking what you allow";
                              if (isUploading) return "Uploading...";
                              return "Word documents (.docx, .doc) up to 4MB";
                            }
                          }}
                        />
                          <p className="text-sm text-gray-500 mt-2">
                            Upload a Word document (.docx or .doc)
                          </p>
                      </div>
                    )}
                  </div>
                  {errors.abstractFile && (
                    <p className="mt-1 text-sm text-red-600">{errors.abstractFile.message}</p>
                  )}
                </div>

                {/* Full Paper File */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach your full paper (optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {isFullPaperUploading ? (
                      <div className="text-blue-600">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="font-medium">Uploading full paper...</p>
                        <p className="text-sm text-gray-500">Please wait while your file is being uploaded</p>
                      </div>
                    ) : fullPaperFile ? (
                      <div className="text-green-600 relative bg-green-50 border border-green-200 rounded-lg p-4">
                        <button
                          type="button"
                          onClick={handleDeleteFullPaperFile}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-semibold text-green-700">Full paper uploaded successfully!</p>
                        <p className="text-sm text-green-600 mt-1 pr-8">{fullPaperFile.name}</p>
                      </div>
                    ) : (
                      <div>
                        <UploadButton
                          endpoint="paperUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Paper upload complete on client:", res);
                            setIsFullPaperUploading(false);
                            if (res && res[0]) {
                              const fileUrl = res[0].url || res[0].fileUrl;
                              setFullPaperFile(res[0]);
                              setValue('fullPaperFile', fileUrl);
                            }
                          }}
                          onUploadError={(error) => {
                            console.error("Paper upload error:", error);
                            setIsFullPaperUploading(false);
                            alert(`Paper upload ERROR! ${error.message}`);
                          }}
                          onUploadBegin={(name) => {
                            console.log("Paper upload begin:", name);
                            setIsFullPaperUploading(true);
                          }}
                          appearance={{
                            button: "ut-ready:bg-green-600 ut-ready:text-white ut-uploading:cursor-not-allowed ut-uploading:bg-green-400",
                            container: "w-full flex-col",
                            allowedContent: "text-sm text-gray-600"
                          }}
                          content={{
                            button({ ready }) {
                              if (ready) return "Choose Full Paper";
                              return "Getting ready...";
                            },
                            allowedContent({ ready, fileTypes, isUploading }) {
                              if (!ready) return "Checking what you allow";
                              if (isUploading) return "Uploading...";
                              return "PDF or Word documents (.pdf, .docx, .doc) up to 8MB";
                            }
                          }}
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Upload a PDF or Word document (.pdf, .docx, .doc)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {submitStatus && (
                <div className={cn(
                  "p-4 rounded-lg",
                  submitStatus.type === 'success' 
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                )}>
                  {submitStatus.message}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className={cn(
                    "px-8 py-3 font-semibold rounded-lg transition-all duration-200",
                    isFormValid() && !isSubmitting
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Abstract'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}